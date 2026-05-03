const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const ALLOWED_FORMATS = ['jpeg', 'png', 'jpg', 'webp'];

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'YelpCamp',
//         allowedFormats: ALLOWED_FORMATS,
//     }
// });

module.exports = {
    cloudinary,
    // storage,
    ALLOWED_FORMATS
};