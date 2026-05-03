const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            fileName: String,
            size: Number // in bytes
        }
    ],
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
})

module.exports = mongoose.model('Campground', campgroundSchema);