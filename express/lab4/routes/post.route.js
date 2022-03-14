const express = require('express');
const router = express.Router();

const postController = require('../controller/post.controller');
const checkPermissions = require('../middleware/check-permission');
router.route('/').get(checkPermissions('post', 'get'), postController.getAllPost).post(checkPermissions('post', 'post'), postController.createPost);
router
  .route('/:id')
  .get(checkPermissions('post', 'get'), postController.getOnePost)
  .put(checkPermissions('post', 'put'), postController.updatePost)
  .delete(checkPermissions('post', 'delete'), postController.deletePost);
module.exports = router;
