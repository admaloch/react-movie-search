const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviewsController')

//logic in controllers direc at reviewsController..
//we're already at users as specified in server.js.. now router.route(/) is at root of /users
router.route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReview)
    .patch(reviewsController.updateReview)
    .delete(reviewsController.deleteReview)

module.exports = router