const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviewsController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReview)
    .patch(reviewsController.updateReview)
    .delete(reviewsController.deleteReview)

router.route('/user/:userId?')
    .get(reviewsController.getUserReviews);

module.exports = router