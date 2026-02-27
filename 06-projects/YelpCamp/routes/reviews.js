const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewControllers = require('../controllers/reviews');
const isLoggedIn = require('../middleware/isLoggedIn');
const isReviewAuthor = require('../middleware/isReviewAuthor');
const validate = require('../middleware/validate');
const { reviewSchema } = require('../schemas');

router.post("/", isLoggedIn, validate(reviewSchema), reviewControllers.addReview);

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewControllers.deleteReview);

module.exports = router;