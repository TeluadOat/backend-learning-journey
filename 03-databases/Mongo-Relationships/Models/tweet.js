const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
    console.log("MongoDB Connected");
};

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweet = async () => {
//     // const user = new User({ username: 'catlover', age: 5 });
//     const user = await User.findOne({ username: 'catlover' });
//     const tweet2 = new Tweet({ text: 'Forgot to say, my cat is Black', likes: 15, user: user });
//     await tweet2.save();
// };
// makeTweet();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username');
    console.log(t);
};
findTweet();