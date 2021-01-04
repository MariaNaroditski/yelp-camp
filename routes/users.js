const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(users.login));

router.get('/logout', users.logout);

module.exports = router;