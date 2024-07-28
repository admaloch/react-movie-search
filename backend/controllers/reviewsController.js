const User = require('../models/User')
const Review = require('../models/Review')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find().lean()
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }
    res.json(reviews)
})


const createReview = asyncHandler(async (req, res) => {
    const { imdbId, body, rating, author } = req.body;
    // const author = req.user._id;
    if (!imdbId || !body || !rating || !author) return res.status(400).json({ message: 'All fields are required' });
    // Check if the user has already reviewed this movie
    const usersReviews = await ReviewModel.find({ author }).lean().exec();
    const alreadyReviewed = usersReviews.some(review => review.imdbId === imdbId);
    if (alreadyReviewed) {
        return res.status(409).json({ message: 'This movie was already reviewed by the current user' });
    }
    // Create the new review
    const review = await ReviewModel.create(req.body);
    if (!review) return res.status(400).json({ message: 'Invalid review data received' });
    // Update the user's likedMovies array
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.reviews.push(review._id)
    console.log(user)
    await user.save();
    res.status(201).json({ message: `New review for imdb id # ${imdbId} created by ${author}`, review });
});



const updateReview = asyncHandler(async (req, res) => {
    const { _id, body, rating } = req.body
    if (!_id || (!body && !rating)) {
        return res.status(400).json({ message: 'Review ID and either body or rating are required' });
    }
    const review = await ReviewModel.findById(_id).exec()
    if (!review) {
        return res.status(400).json({ message: 'User not found' })
    }
   if (body) review.body = body
   if(rating) review.rating = rating
    const updatedReview = await review.save()
    res.json({ message: `Review # ${updatedReview._id} updated`, review })
})


const deleteReview = asyncHandler(async (req, res) => {
    // Get review ID from URL parameters
    const {reviewId, author} = req.body
    // const { reviewId } = req.params;
    // const author = req.user._id;
    
    if (!reviewId || !author) {
        return res.status(400).json({ message: 'Review ID Required' });
    }
    // Find and delete the review
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }
    await User.findByIdAndUpdate(author, { $pull: { reviews: reviewId } });
    await ReviewModel.findByIdAndDelete(reviewId);
    res.json({ message: `Review ${reviewId} deleted`,  });
});

module.exports = {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview
}