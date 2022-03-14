const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category.controller');
const checkPermissions = require('../middleware/check-permission');
router
  .route('/')
  .get(checkPermissions('category', 'get'), categoryController.getAllCategory)
  .post(checkPermissions('category', 'post'), categoryController.createCategory);
router
  .route('/:id')
  .get(checkPermissions('category', 'get'), categoryController.getOneCategory)
  .put(checkPermissions('category', 'put'), categoryController.updateCategory)
  .delete(checkPermissions('category', 'delete'), categoryController.deleteCategory);
module.exports = router;
