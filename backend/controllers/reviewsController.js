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
    // console.log(reviews)
    res.json(reviews)
})
// @desc Get user
// @route GET /user/movieId
// @access Private
const getMovieReviews = asyncHandler(async (req, res) => {

    const reviews = await ReviewModel.find({ imdbId: req.params.movieId })
        .populate('user', 'username');

    if (!reviews) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    console.log(reviews)
    res.json(reviews)
})


const createReview = asyncHandler(async (req, res) => {
    const { user, imdbId, body, rating, title } = req.body;

    // const user = req.user._id;
    if (!imdbId || !body || !rating || !user || !title) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user has already reviewed this movie
    const usersReviews = await ReviewModel.find({ user }).lean().exec();
    const alreadyReviewed = usersReviews.some(review => review.imdbId === imdbId);
    if (alreadyReviewed) {
        return res.status(409).json({ message: 'You have already submitted a review for this movie' });
    }

    // Create the new review
    const review = await ReviewModel.create(req.body);
    if (!review) return res.status(400).json({ message: 'Invalid review data received' });

    res.status(201).json({ message: `New review for imdb id # ${imdbId} created by ${user}`, review });
});



const updateReview = asyncHandler(async (req, res) => {
    const { body, rating } = req.body
    const { id } = req.params;
    if (!body || !rating || !id) {
        return res.status(400).json({ message: 'Review ID and either body or rating are required' });
    }

    const review = await ReviewModel.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Movie not found' })
    }

    if (body) review.body = body
    if (rating) review.rating = rating

    const updatedReview = await review.save()
    // console.log('update review just ran', updateReview)
    res.json({ message: `Review # ${updatedReview.id} updated`, review })
})


const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Review ID Required' });
    }

    // Find and delete the review
    const review = await ReviewModel.findById(id);
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }

    // await UserModel.findByIdAndUpdate(userId, { $pull: { reviews: id } });
    await ReviewModel.findByIdAndDelete(id);
    res.json({ message: `Review ${id} deleted`, });
});

module.exports = {
    getAllReviews,
    getUserReviews,
    getMovieReviews,
    createReview,
    updateReview,
    deleteReview
}