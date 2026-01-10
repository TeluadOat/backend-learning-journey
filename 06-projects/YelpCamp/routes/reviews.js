const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewControllers = require('../controllers/reviews');
const validate = require('../middleware/validate');
const { reviewSchema } = require('../schemas');

router.post("/", validate(reviewSchema), reviewControllers.addReview);

router.delete("/:reviewId", reviewControllers.deleteReview);

module.exports = router;