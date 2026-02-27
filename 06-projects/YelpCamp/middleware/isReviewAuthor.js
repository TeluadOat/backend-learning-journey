const review = require("../models/review");

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const foundReview = await review.findById(reviewId);;
    if (!foundReview.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
};

module.exports = isReviewAuthor;