const campground = require("../models/campground");

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const foundCampground = await campground.findById(id);;
    if (!foundCampground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
};

module.exports = isAuthor;