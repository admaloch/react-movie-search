const UserModel = require('../models/User')
const ReviewModel = require('../models/Review')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { genDupErrMsg } = require('../utils/controllerHelpers')
const handlePatchDuplication = require('../utils/controllerHelpers')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await UserModel.find().select('-password').lean()
    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})
// @desc Get user
// @route GET /user/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id).select('-password').lean()

    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required to create an account' })
    }

    // Check for duplicate username
    const duplicateUsername = await UserModel.findOne({ username }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Username is already in use' })
    }
    // Check for duplicate email
    const duplicateEmail = await UserModel.findOne({ email }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Email is already in use' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, email, "password": hashedPwd }

    // Create and store new user 
    const user = await UserModel.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})



// @desc Update user
// @route PATCH /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { email, username, password, imdbId, title, hasWatched } = req.body
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'No user id found' })
    }

    const user = await UserModel.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    if (username) {
        const isUsernameTaken = await UserModel.findOne({ username });
        if (isUsernameTaken) {
            return res.status(400).json({ message: "Username already exists" });
        }
        user.username = username
    }

    if (email) {
        const isEmailTaken = await UserModel.findOne({ email });
        if (isEmailTaken) {
            return res.status(400).json({ message: "Email already exists" });
        }
        user.email = email
    }

    if (password) {
        const match = await bcrypt.compare(oldPassword, foundUser.password)

        user.password = await bcrypt.hash(password, 10)
    }

    if (imdbId && title) {
        const movieExists = user.likedMovies.some(movie => movie.imdbId === imdbId);

        if (!movieExists) {
            user.likedMovies.push({ imdbId, title, hasWatched: false });
        } else {
            return res.status(400).json({ message: 'Movie already liked' });
        }
    }

    if (imdbId && !title && !hasWatched) {
        user.likedMovies = user.likedMovies.filter(movie => movie.imdbId !== imdbId);
    }

    if (hasWatched) {
        const currMovie = user.likedMovies.find(movie => movie.imdbId === imdbId);
        if (currMovie) {
            currMovie.hasWatched = hasWatched;
            user.markModified('likedMovies');
            await user.save();
        }
    }

    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const review = await Review.findOne({ user: id }).lean().exec()
    if (review) {
        return res.status(400).json({ message: 'User has assigned reviews' })
    }

    const user = await UserModel.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}