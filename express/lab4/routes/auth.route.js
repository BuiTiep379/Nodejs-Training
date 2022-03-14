const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller');
const requireSignin = require('../middleware/require-signin');
router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/signout').post(requireSignin, authController.signout);
module.exports = router;
