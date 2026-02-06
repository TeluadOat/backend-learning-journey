const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControllers = require('../controllers/users');
const returnTo = require('../middleware/returnTo');

router.get('/register', userControllers.renderRegister);

router.post('/register', userControllers.register);

router.get('/login', userControllers.renderLogin);

router.post(
    '/login',
    returnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    userControllers.login
);

router.get('/logout', userControllers.logout);

module.exports = router;