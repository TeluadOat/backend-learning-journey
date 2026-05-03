const { cloudinary, ALLOWED_FORMATS } = require('../config/cloudinary');

const uploadImages = async (files) => {
    const images = [];
    let totalSize = 0;
    for (const file of files) {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'YelpCamp', allowed_formats: ALLOWED_FORMATS },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(file.buffer);
        });
        images.push({ url: result.secure_url, fileName: result.public_id, size: file.size });
        totalSize += file.size;
    }
    return { images, totalSize };
};

module.exports = uploadImages;
