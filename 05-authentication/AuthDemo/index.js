const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/user");

const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is the home page");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User(
        {
            username,
            password: hash,
        }
    );
    await user.save();
    res.redirect("/");
})

app.get("/secret", (req, res) => {
    res.send("This is a secret page");
});


async function startServer() {
    await connectDB();

    app.listen(3000, () => {
        console.log("Serving on port 3000");
    });
};
startServer();