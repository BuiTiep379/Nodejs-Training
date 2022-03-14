const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const requireSignin = require('../middleware/require-signin');
router.route('/add-permission/:userId').post(requireSignin, userController.addPermission);
router.route('/delete-permission/:userId').delete(requireSignin, userController.deletePermission);
router.route('/get-permission/:userId').get(userController.showPermission);
module.exports = router;
