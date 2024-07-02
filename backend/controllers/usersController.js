const User = require('../models/User')
const Review = require('../models/Review')
// dependencies helps to avoid using so many try/catch blocks as we use async methods with mongoose
const asyncHandler = require('express-async-handler')
// dependencies required to hash password before saving
const bcrypt = require('bcrypt')
const { genDupErrMsg } = require('../utils/controllerHelpers')

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
    const { _id, email, username, reviews, password } = req.body

    // Confirm data
    if (!_id || !username || !email) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    //no .lean becuase we need this to be mongoose doc with .save() etc
    const user = await User.findById(_id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicateEmail = await User.findOne({ email }).lean().exec()
    const duplicateUser = await User.findOne({ username }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' })
    }
    if (duplicateUser) {
        return res.status(409).json({ message: 'Duplicate user' })
    }

    user.username = username
    user.email = email
    user.reviews = reviews

    //didn't require pasword before becuase we don't always want to require that
    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
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