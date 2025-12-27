const mongoose = require("mongoose");

const Product = require("./models/product");

main().catch(err => console.log("Mongo connection error", err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2');
    console.log("Mongo cnnection Open!!!");
}

// const p = new Product({
//     name: "Grape fruit",
//     price: 1.99,
//     category: "fruit",
// })
// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable',
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: "fruit",
    },
    {
        name: "Organic Mini Seedless Watermelon",
        price: 3.99,
        category: "fruit",
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: "vegetable"
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.9,
        category: 'dairy'
    }
]



// await Product.deleteMany({});
Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(e => console.error(e))