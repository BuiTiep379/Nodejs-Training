const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category.controller');
const requireSignin = require('../lib/require-signin');
router.route('/').get(requireSignin, categoryController.getAllCategory).post(categoryController.createCategory);
router.route('/:id').get(categoryController.getOneCategory).patch(categoryController.updateCategory).delete(categoryController.deleteCategory);
module.exports = router;
