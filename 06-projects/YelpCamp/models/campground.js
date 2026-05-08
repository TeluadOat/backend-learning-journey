const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    fileName: String,
    size: Number // in bytes
}, {
    virtuals: {
        thumbnail: {
            get() {
                return this.url.replace('/upload/', '/upload/w_300,h_200,c_fill/');
            }
        }
    }
});

const campgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    totalStorageUsed: {
        type: Number,
        default: 0
    },
    maxStorageAllowed: {
        type: Number,
        default: 25 * 1024 * 1024, //25MB default
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            }
        })
    }
});

module.exports = mongoose.model('Campground', campgroundSchema);