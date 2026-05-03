const cloudinary = require('cloudinary').v2;

const ALLOWED_FORMATS = ['jpeg', 'png', 'jpg', 'webp'];

module.exports = {
    cloudinary,
    ALLOWED_FORMATS
};