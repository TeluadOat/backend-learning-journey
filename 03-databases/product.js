const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    console.log("Connection Open!!!");
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onsale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

productSchema.methods.greet = function () {
    console.log("Hello, Hi its Howdy!!");
    console.log(`- from ${this.name}`)
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: "Mountain Bike" });

    if (!foundProduct) {
        console.log("No product found!");
        return;
    }

    foundProduct.greet();
};

findProduct();



// Product.findOneAndUpdate({ name: "Mountain Bike" }, { price: 78 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("Saved Successfully:", data);
//     })
//     .catch(err => {
//         console.log("Error Saving:", err);
//     })

