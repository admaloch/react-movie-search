const UserModel = require('../models/User')
const ReviewModel = require('../models/Review')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const { genDupErrMsg } = require('../utils/controllerHelpers')
const handlePatchDuplication = require('../utils/controllerHelpers')


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const isUsernameTaken = await UserModel.findOne({ username });
    if (isUsernameTaken) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const isEmailTaken = await UserModel.findOne({ email });
    if (isEmailTaken) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    if (newUser) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .json({ message: "Cannot find user" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userID: user._id });
});




const updateUser = asyncHandler(async (req, res) => {
    const { _id, email, username, password, imdbId, hasWatched } = req.body

    if (!_id) {
        return res.status(400).json({ message: 'No user id found' })
    }

    const user = await UserModel.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const isUsernameTaken = await UserModel.findOne({ username });
    if (isUsernameTaken) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const isEmailTaken = await UserModel.findOne({ email });
    if (isEmailTaken) {
        return res.status(400).json({ message: "Email already exists" });
    }

    if (username) user.username = username
    if (email) user.email = email

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    if (imdbId) {
        const movieIndex = user.likedMovies.findIndex(movie => movie.imdbId === imdbId);
        if (movieIndex === -1) {
            user.likedMovies.push({ imdbId, hasWatched: false });
            await user.save();
        } else {
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

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const review = await Review.findOne({ user: _id }).lean().exec()
    if (review) {
        return res.status(400).json({ message: 'User has assigned reviews' })
    }

    const user = await UserModel.findById(_id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    register,
    login,
    updateUser,
    deleteUser
}