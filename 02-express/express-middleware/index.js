const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use((req, res, next) => {
    console.log('This is my first middleware!');
    return next();
});

app.use((req, res, next) => {
    console.log('This is my second middleware!');
    return next();
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/dogs', (req, res) => {
    res.send('woof woof');
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})