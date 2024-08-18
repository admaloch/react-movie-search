const UserModel = require('../models/User')
const ReviewModel = require('../models/Review')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find().lean()
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    res.json(reviews)
})

// @desc Get user
// @route GET /user/:id
// @access Private
const getUserReviews = asyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find({ user: req.params.userId });
    if (!reviews) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    console.log(reviews)
    res.json(reviews)
})


const createReview = asyncHandler(async (req, res) => {
    const { user, imdbId, body, rating } = req.body;

    // const user = req.user._id;
    if (!imdbId || !body || !rating || !user) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user has already reviewed this movie
    const usersReviews = await ReviewModel.find({ user }).lean().exec();
    const alreadyReviewed = usersReviews.some(review => review.imdbId === imdbId);
    if (alreadyReviewed) {
        return res.status(409).json({ message: 'This movie was already reviewed by the current user' });
    }

    // Create the new review
    const review = await ReviewModel.create(req.body);
    if (!review) return res.status(400).json({ message: 'Invalid review data received' });

    // Update the user's likedMovies array
    const currUser = await UserModel.findById(user);
    if (!currUser) return res.status(404).json({ message: 'User not found' });
    currUser.reviews.push(review._id)
    await currUser.save();
    res.status(201).json({ message: `New review for imdb id # ${imdbId} created by ${user}`, review });
});



const updateReview = asyncHandler(async (req, res) => {
    const { id, body, rating } = req.body

    if (!id || (!body && !rating)) {
        return res.status(400).json({ message: 'Review ID and either body or rating are required' });
    }

    const review = await ReviewModel.findById(id).exec()
    if (!review) {
        return res.status(400).json({ message: 'User not found' })
    }

    if (body) review.body = body
    if (rating) review.rating = rating

    const updatedReview = await review.save()
    res.json({ message: `Review # ${updatedReview.id} updated`, review })
})


const deleteReview = asyncHandler(async (req, res) => {
    const { id, reviewId } = req.body

    if (!reviewId || !id) {
        return res.status(400).json({ message: 'Review ID Required' });
    }

    // Find and delete the review
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }

    await UserModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await ReviewModel.findByIdAndDelete(reviewId);
    res.json({ message: `Review ${reviewId} deleted`, });
});

module.exports = {
    getAllReviews,
    getUserReviews,
    createReview,
    updateReview,
    deleteReview
}