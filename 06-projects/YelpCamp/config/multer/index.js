const { cloudinary, storage } = require('../cloudinary');
const ExpressError = require('../../utils/ExpressError');

const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new ExpressError('Only image files are allowed', 400), false);
    };
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 5,
        fileSize: 25 * 1024 * 1024,
    },
    fileFilter
});

module.exports = upload;