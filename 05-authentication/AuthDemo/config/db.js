const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/authDemo');
        console.log("DB connected");
    } catch (err) {
        console.error("Erro connecting to DB");
        console.error(err);
        process.exit(1);
    }

};

module.exports = connectDB;
