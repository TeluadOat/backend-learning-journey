const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
    console.log("MongoDB Connected");
};

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 3.99, season: 'Summer' },
//     { name: 'Orange Pumpkin', price: 2.99, season: 'Fall' },
//     { name: 'Kiku Apple', price: 1.29, season: 'Fall' },
//     { name: 'Mutsu Apple', price: 1.29, season: 'Fall' },
// ])


// const makeFarm = async () => {
//     const farm = new Farm({
//         name: 'Full Belly Farms',
//         city: 'Guinda, CA',
//     });
//     const melon = await Product.findOne({ name: 'Goddess Melon' });
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProductToFarm = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
};
addProductToFarm();