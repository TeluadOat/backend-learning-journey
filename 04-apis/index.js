const express = require("express");
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride = require("method-override");

app = express();

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let comments = [
    {
        id: uuid(),
        username: "Michael",
        comment: "lol, that is funny"
    },
    {
        id: uuid(),
        username: "Joel",
        comment: "I am not gonna lie. That is Hilarious"
    },
    {
        id: uuid(),
        username: "Michelle",
        comment: "Huhhh. WHat ever you say."
    },
    {
        id: uuid(),
        username: "onlysaywoof",
        comment: "woof woof woof"
    }
]


app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new");
})

app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuid(), username, comment })
    res.redirect("/comments")
})

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render("comments/show", { comment })
})

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render("comments/edit", { comment })
})

app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments")
})

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect("/comments")
})



// app.get("/teluad", (req, res) => {
//     res.send("GET /teluad response")
// })
// app.post("/teluad", (req, res) => {
//     const { name, age } = req.body;
//     res.send(`Confirm your name is ${name} and age is ${age}`)
// })

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})