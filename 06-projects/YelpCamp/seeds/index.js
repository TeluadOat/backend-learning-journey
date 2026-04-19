const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '698113edad2a7cffe3d16800',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmckclwvx/image/upload/v1776582854/YelpCamp/ylu8ykpk8rpu3nshqgfc.png',
                    fileName: 'YelpCamp/ylu8ykpk8rpu3nshqgfc',
                },
                {
                    url: 'https://res.cloudinary.com/dmckclwvx/image/upload/v1776582855/YelpCamp/pplvum3liw7i5mxj16bc.png',
                    fileName: 'YelpCamp/pplvum3liw7i5mxj16bc',
                }
            ],
        });
        await camp.save();
    }
}
seedDb().then(() => {
    db.close();
})