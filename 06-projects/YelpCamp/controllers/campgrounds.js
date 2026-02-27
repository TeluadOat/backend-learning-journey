const Campground = require('../models/campground');

const index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

const newCampgroundForm = (req, res) => {
    res.render('campgrounds/new');
};

const showCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: "author"
            }
        })
        .populate('author');
    console.log(campground)
    if (!campground) {
        req.flash('error', 'campground not found');
        return res.redirect('/campgrounds');
    };
    res.render('campgrounds/show', { campground })
};


const createCampground = async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

const editCampgroundForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'campground not found');
        return res.redirect('/campgrounds');
    };
    res.render('campgrounds/edit', { campground });
};

const updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const updatedCampground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Sucessfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground")
    res.redirect('/campgrounds');
};

module.exports = {
    index,
    newCampgroundForm,
    showCampground,
    createCampground,
    editCampgroundForm,
    updateCampground,
    deleteCampground
};