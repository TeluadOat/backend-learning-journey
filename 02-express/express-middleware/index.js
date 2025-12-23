const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

// app.use((req, res, next) => {
//     console.log('This is my first middleware!');
//     return next();
// });

// app.use((req, res, next) => {
//     console.log('This is my second middleware!');
//     return next();
// });

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "teluadoat") {
        return next();
    }
    res.send('You need a password!')
};

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log('I love dogs!!');
    next();
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: I am really working hard to be a great software engineer.');
})

app.get('/', (req, res) => {
    console.log('REQUEST TIME: ', new Date(req.requestTime));
    res.send('Home Page');
});

app.get('/dogs', (req, res) => {
    res.send('woof woof');
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})