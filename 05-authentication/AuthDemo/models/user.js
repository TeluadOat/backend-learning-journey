const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
},
    {
        statics: {
            async findAndValidate(username, password) {
                const foundUser = await this.findOne({ username });
                const isValid = await bcrypt.compare(password, foundUser.password);
                return isValid ? foundUser : false;
            }
        }
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model("User", userSchema);