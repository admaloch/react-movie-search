const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");
const verifyJWT = require("../middleware/verifyJWT");

// /reviews/:id
router
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(verifyJWT, reviewsController.createReview);

router
  .route("/:id")
  .patch(verifyJWT, reviewsController.updateReview)
  .delete(verifyJWT, reviewsController.deleteReview);

router.route("/user/:userId").get(reviewsController.getUserReviews);

router.route("/movie/:movieId").get(reviewsController.getMovieReviews);

module.exports = router;
