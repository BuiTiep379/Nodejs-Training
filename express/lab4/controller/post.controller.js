const postModel = require('../model/post.model');
const { NotFound, ServerError, BadRequest, Create, Get, Update, Delete } = require('../lib');

class postController {
  static async getAllPost(req, res) {
    try {
      const posts = await postModel.getAll();
      // console.log(posts);
      if (posts.length === 0) {
        return NotFound(res, 'Categories');
      }
      return Get(res, posts);
    } catch (error) {
      return ServerError(res, error);
    }
  }
  static async getOnePost(req, res) {
    const { id } = req.params;
    try {
      const post = await postModel.getOne(id);
      if (post.length === 0) {
        return NotFound(res, 'Post');
      }
      return Get(res, post[0]);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }
  static async createPost(req, res) {
    try {
      const { userid } = req.user;
      const { title, content } = req.body;
      const result = await postModel.create(userid, title, content);
      if (result[0].length === 0) {
        return BadRequest(res, 'Post not created');
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return Create(res, null, result[0]);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const post = await postModel.update(id, content);
      if (post === 0) {
        return BadRequest(res, 'Post not updated');
      }
      return Update(res);
    } catch (error) {
      return ServerError(res, error);
    }
  }
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.delete(id);
      if (post === 0) {
        return BadRequest(res, 'Post not delete');
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return Delete(res);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }
}

module.exports = postController;
