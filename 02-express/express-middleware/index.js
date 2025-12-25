const express = require('express');
const morgan = require('morgan');
const AppError = require('./AppError');

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
    // res.send('You need a password!')
    // res.status(401)
    throw new AppError(401, 'Password Required!!!');
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

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    res.send('woof woof');
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})

// app.use((err, req, res, next) => {
//     console.log('***************');
//     console.log('*****ERROR*****');
//     console.log('***************');
//     // res.status(500).send('OH BOY, WE GOT AN ERROR');
//     next(err);

// })

app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).send(message || 'Something went wrong');
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})