const { cloudinary } = require('../config/cloudinary');

const deleteCloudinaryImages = async (images) => {
    await Promise.all(
        images.map(img =>
            cloudinary.uploader.destroy(img)
        )
    );
};

module.exports = deleteCloudinaryImages;