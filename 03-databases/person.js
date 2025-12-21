const mongoose = require("mongoose");

main();
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
        console.log("Connection Open!!!");
    } catch (err) {
        console.log(err);
    }
};

const personSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
}, {
    virtuals: {
        fullName: {
            get() {
                return this.name.first + " " + this.name.last;
            }
        }
    }
});


const Person = new mongoose.model("Person", personSchema);