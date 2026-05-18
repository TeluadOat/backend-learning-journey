const Campground = require('../models/campground');
const uploadImages = require('../utils/uploadImages');
const deleteCloudinaryImages = require('../utils/deleteCloudinaryImages');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

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
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    console.log(geoData);
    if (!geoData.features?.length) {
        req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
        return res.redirect('/campgrounds/new');
    }
    const campground = new Campground(req.body.campground);

    campground.geometry = geoData.features[0].geometry;
    campground.location = geoData.features[0].place_name;

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

    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    // console.log(geoData);
    if (!geoData.features?.length) {
        req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
        return res.redirect(`/campgrounds/${id}/edit`);
    }


    const updateData = { ...req.body.campground };
    updateData.geometry = geoData.features[0].geometry;
    updateData.location = geoData.features[0].place_name;


    const campground = await Campground.findByIdAndUpdate(id, updateData, {
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

const showImages = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect(`/campgrounds/${id}/images`);
    }
    res.render('campgrounds/images', { campground });
}

const addImages = async (req, res) => {
    const { id } = req.params;
    const { images, totalSize } = req.files && req.files.length > 0
        ? await uploadImages(req.files)
        : { images: [], totalSize: 0 };

    const update = {
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

    req.flash('success', 'Sucessfully updated campground images(s)');
    res.redirect(`/campgrounds/${campground._id}`);

}

const deleteImages = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect(`/campgrounds/${id}/edit`);
    }

    console.log(req.body.deleteImages);

    if (req.body.deleteImages && req.body.deleteImages.length > 0) {
        await deleteCloudinaryImages(req.body.deleteImages);
        await campground.updateOne({
            $pull: { images: { fileName: { $in: req.body.deleteImages } } },
            $inc: { totalStorageUsed: -campground.images.filter(img => req.body.deleteImages.includes(img.fileName)).reduce((acc, img) => acc + (Number(img.size) || 0), 0) }
        });
        req.flash('success', 'Selected images deleted successfully');
    } else {
        req.flash('error', 'No images selected for deletion');
    }

    res.redirect(`/campgrounds/${id}/images`);

}

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
    showImages,
    addImages,
    deleteImages,
    deleteCampground
};