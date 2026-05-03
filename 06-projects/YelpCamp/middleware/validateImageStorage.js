const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError')

const validateImageStorage = async (req, res, next) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            throw new ExpressError('No files uploaded', 400);
        }

        // Find campground if updating
        let campground = null;
        if (req.params && req.params.id) {
            campground = await Campground.findById(req.params.id);
            if (!campground) {
                throw new ExpressError('Campground not found', 404);
            }
        }

        const currentUsed = campground ? campground.totalStorageUsed : 0;
        const maxAllowed = campground ? campground.maxStorageAllowed : 25 * 1024 * 1024; // 25MB default

        let totalNewSize = 0;
        const imageSignatures = {
            'image/jpeg': [0xFF, 0xD8, 0xFF],
            'image/png': [0x89, 0x50, 0x4E, 0x47],
            'image/webp': [0x52, 0x49, 0x46, 0x46]
        };

        for (const file of files) {
            // Check file size
            if (file.size <= 0) {
                throw new ExpressError('Invalid file size', 400);
            }
            totalNewSize += file.size;

            // Check file signature
            const sig = imageSignatures[file.mimetype];
            if (!sig) {
                throw new ExpressError('Unsupported image type', 400);
            }
            for (let i = 0; i < sig.length; i++) {
                if (file.buffer[i] !== sig[i]) {
                    throw new ExpressError('Invalid image file', 400);
                }
            }
        }

        // Check storage limit
        if (currentUsed + totalNewSize > maxAllowed) {
            throw new ExpressError('Storage limit exceeded', 400);
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validateImageStorage;