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

const opts = { toJSON: { virtuals: true } };

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
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`
});

// campgroundSchema.index({ geometry: '2dsphere' });

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