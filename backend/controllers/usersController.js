const User = require('../models/User')
const Review = require('../models/Review')
// dependencies helps to avoid using so many try/catch blocks as we use async methods with mongoose
const asyncHandler = require('express-async-handler')
// dependencies required to hash password before saving
const bcrypt = require('bcrypt')
const { genDupErrMsg } = require('../utils/controllerHelpers')
const handlePatchDuplication = require('../utils/controllerHelpers')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB - using User model and find method
    // .select avoids grabbing password
    //.lean prevents mongoose from giving us .a document with .save etc...
    const users = await User.find().select('-password').lean()

    // If no users
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body

    // Confirm data
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    //lean is to prevent excess json data
    //exec - if ur passing something in use exec according to docs - ensures the promise is received properly
    const duplicateEmail = await User.findOne({ email }).lean().exec()
    const duplicateUser = await User.findOne({ username }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' })
    }
    if (duplicateUser) {
        return res.status(409).json({ message: 'Duplicate user' })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, email }

    // Create and store new user
    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { _id, email, username, password, imdbId, hasWatched } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'No user id found' })
    }

    // Does the user exist to update?
    //no .lean becuase we need this to be mongoose doc with .save() etc
    const user = await User.findById(_id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // // Check for duplicate 
    const duplicateUsername = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicateUsername && duplicateUsername?._id.toString() !== _id) {
        return res.status(409).json({ message: 'That username is already being used' })
    }

    // Check for duplicate 
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    // Allow updates to the original user 
    if (duplicateEmail && duplicateEmail?._id.toString() !== _id) {
        return res.status(409).json({ message: 'That email is already being used' })
    }

    if (username) user.username = username
    if (email) user.email = email

    //didn't require pasword before becuase we don't always want to require that
    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    // add movie or update like
    if (imdbId) {
        const movieIndex = user.likedMovies.findIndex(movie => movie.imdbId === imdbId);
        console.log('movie index', movieIndex)
        if (movieIndex === -1) {
            console.log('movie doesnt exist - create it')

            user.likedMovies.push({ imdbId, hasWatched: false });
            await user.save();
        } else {

            // Movie found, update the watched status if hasWatched property exists
            if (req.body.hasOwnProperty('hasWatched')) {
                console.log(user.likedMovies[movieIndex])
                console.log(hasWatched)

                user.likedMovies[movieIndex].hasWatched = hasWatched;
                await user.save();
            } else {
                return res.status(400).json({ message: 'Failed to update movie item' });
            }
        }
    }




    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const review = await Review.findOne({ user: _id }).lean().exec()
    if (review) {
        return res.status(400).json({ message: 'User has assigned reviews' })
    }

    // Does the user exist to delete?
    const user = await User.findById(_id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}