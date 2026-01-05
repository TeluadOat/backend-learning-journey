const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('thisisasecret'));

app.get('/greet', (req, res) => {
    console.log('Cookies: ', req.cookies);
    res.send('Hello, World!');
});

app.get("/getsignedcookie", (req, res) => {
    res.cookie('fruit', 'apple', { signed: true });
    res.send('Signed cookie has been set');
});

app.get('/verifyfruit', (req, res) => {
    // const fruit = req.signedCookies.fruit;
    res.send(req.signedCookies);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'John Doe');
    res.send('Name cookie has been set');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});