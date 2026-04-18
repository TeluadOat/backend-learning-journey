const validateImage = (req, res, next) => {
    if (!req.files || req.files.length === 0) throw new (require('../utils/ExpressError'))('Image is required', 400);
    next();
};

module.exports = validateImage;