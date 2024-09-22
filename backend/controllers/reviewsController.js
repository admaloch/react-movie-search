const UserModel = require('../models/User')
const ReviewModel = require('../models/Review')
const bcrypt = require('bcryptjs')

// @desc Get all reviews
// @route GET /reviews
// @access Public
const getAllReviews = async (req, res) => {
    const reviews = await ReviewModel.find().lean()
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    res.json(reviews)
};

// @desc Get reviews of specific user
// @route GET /reviews/user/:userId
// @access Public
const getUserReviews = async (req, res) => {
    const { userId } = req.params
    const reviews = await ReviewModel.find({ user: userId });
    if (!reviews) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    res.json(reviews)
};

// @desc Get reviews of specific movie
// @route GET /reviews/movie/:movieId
// @access Public
const getMovieReviews = async (req, res) => {
    const { movieId } = req.params
    const reviews = await ReviewModel.find({ imdbId: movieId })
        .populate('user', 'username');
    if (!reviews) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    console.log(reviews)
    res.json(reviews)
};

// @desc create new review
// @route POST /reviews
// @access Private
const createReview = async (req, res) => {
    const { user, imdbId, body, rating, title } = req.body;

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
};

// @desc update movie review
// @route PATCH /reviews/:id
// @access Private
const updateReview = async (req, res) => {
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
    res.json({ message: `Review # ${updatedReview.id} updated`, review })
};

// @desc delete review
// @route DELETE /reviews/:id
// @access Private
const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Review ID Required' });
    }

    // Find and delete the review
    const review = await ReviewModel.findById(id);
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }

    await ReviewModel.findByIdAndDelete(id);
    res.json({ message: `Review ${id} deleted`, });
};

module.exports = {
    getAllReviews,
    getUserReviews,
    getMovieReviews,
    createReview,
    updateReview,
    deleteReview
}