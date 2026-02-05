const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const passport = require('passport');

router.get('/register', userControllers.renderRegister);

router.post('/register', userControllers.register);

router.get('/login', userControllers.renderLogin);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userControllers.login);

router.get('/logout', userControllers.logout);

module.exports = router;