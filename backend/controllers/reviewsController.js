// const User = require('../models/User')
// const Review = require('../models/Review')
// // dependencies helps to avoid using so many try/catch blocks as we use async methods with mongoose
// const asyncHandler = require('express-async-handler')
// // dependencies required to hash password before saving
// const bcrypt = require('bcrypt')
// const { genDupErrMsg } = require('../utils/controllerHelpers')

// // @desc Get all reviews
// // @route GET /reviews
// // @access Private
// const getAllReviews = asyncHandler(async (req, res) => {
//     // Get all reviews from MongoDB - using User model and find method
//     // .select avoids grabbing password
//     //.lean prevents mongoose from giving us .a document with .save etc...
//     const reviews = await Review.find().lean()

//     // If no reviews
//     if (!reviews?.length) {
//         return res.status(400).json({ message: 'No reviews found' })
//     }

//     res.json(reviews)
// })

// // @desc Create new reviews
// // @route POST /reviews
// // @access Private
// const createNewReview = asyncHandler(async (req, res) => {
//     const { movie, body, rating } = req.body

//     // Confirm data
//     if (!movie || !body || !rating ) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     const author = req.user._id

//     // Check for duplicate username
//     //lean is to prevent excess json data
//     //exec - if ur passing something in use exec according to docs - ensures the promise is received properly



//     const newReview = { movie, body, rating, author }

//     // Create and store new user
//     const user = await Review.create(newReview)

//     if (user) { //created
//         res.status(201).json({ message: `New user ${username} created` })
//     } else {
//         res.status(400).json({ message: 'Invalid user data received' })
//     }
// })

// // @desc Update a user
// // @route PATCH /users
// // @access Private
// const updateReview = asyncHandler(async (req, res) => {
//     const { id, email, username, reviews, password } = req.body

//     // Confirm data
//     if (!id || !username || email) {
//         return res.status(400).json({ message: 'All fields except password are required' })
//     }

//     // Does the user exist to update?
//     //no .lean becuase we need this to be mongoose doc with .save() etc
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // Check for duplicate
//     const duplicateUser = await User.findOne({ username }).lean().exec()
//     const duplicateEmail = await User.findOne({ email }).lean().exec()

//     // Allow updates to the original user - avoid catching current user that is trying to update though with optional chaining
//     if (duplicateUser && duplicateUser?._id.toString() !== id ||
//         duplicateEmail && duplicateEmail?._id.toString() !== id
//     ) {
//         return res.status(409).json({ message: genDupErrMsg(duplicateEmail, duplicateUser) })
//     }

//     user.username = username
//     user.email = email
//     user.reviews = reviews

//     //didn't require pasword before becuase we don't always want to require that
//     if (password) {
//         // Hash password
//         user.password = await bcrypt.hash(password, 10) // salt rounds
//     }

//     const updatedUser = await user.save()

//     res.json({ message: `${updatedUser.username} updated` })
// })

// // @desc Delete a user
// // @route DELETE /users
// // @access Private
// const deleteReview = asyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user still have assigned notes?
//     const review = await Review.findOne({ user: id }).lean().exec()
//     if (review) {
//         return res.status(400).json({ message: 'User has assigned notes' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// })

// module.exports = {
//     getAllReviews,
//     createNewReview,
//     updateReview,
//     deleteReview
// }