const Campground = require('../models/campground');
const Review = require('../models/review');

const addReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review._id);
    await review.save();
    await campground.save();
    req.flash("success", "Successfully added a review")
    res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted reiew")
    res.redirect(`/campgrounds/${id}`);
};

module.exports = {
    addReview,
    deleteReview
};
