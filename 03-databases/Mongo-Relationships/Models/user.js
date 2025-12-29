
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
    console.log("MongoDB Connected");
};

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [{
        _id: false,
        street: String,
        city: String,
        state: String,
        country: String,
    }]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',
        addresses: {
            street: '123 Sesame st.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        },
    });
    const res = await u.save();
    console.log(res);
};

makeUser();