const Campground = require('../models/campground');
const uploadImages = require('../utils/uploadImages');

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
    if (!campground) {
        req.flash('error', 'campground not found');
        return res.redirect('/campgrounds');
    };
    res.render('campgrounds/show', { campground })
};

const createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    if (req.files && req.files.length > 0) {
        const { images, totalSize } = await uploadImages(req.files);
        campground.images = images;
        campground.totalStorageUsed = totalSize;
    }
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
    const { images, totalSize } = req.files && req.files.length > 0
        ? await uploadImages(req.files)
        : { images: [], totalSize: 0 };

    const updateData = { ...req.body.campground };

    const update = {
        ...(Object.keys(updateData).length > 0 && {
            $set: updateData,
        }),
        ...(images.length > 0 ? {
            $push: { images: { $each: images } },
            $inc: { totalStorageUsed: totalSize },
        } : {})
    }

    const campground = await Campground.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true
    });

    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect('/campgrounds');
    }

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