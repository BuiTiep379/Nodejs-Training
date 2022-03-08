const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category.controller');

const { checkReadPermissions, checkWritePermissions } = require('../middleware/check-permission');
router.route('/').get(checkReadPermissions, categoryController.getAllCategory).post(checkWritePermissions, categoryController.createCategory);
router.route('/:id').get(categoryController.getOneCategory).patch(categoryController.updateCategory).delete(categoryController.deleteCategory);
module.exports = router;
