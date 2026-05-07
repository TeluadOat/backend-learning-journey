const { cloudinary } = require('../cloudinary');

const deleteCloudinaryImages = async (images) => {
    await Promise.all(
        images.map(img =>
            cloudinary.uploader.destroy(img.fileName)
        )
    );
};

module.exports = deleteCloudinaryImages;