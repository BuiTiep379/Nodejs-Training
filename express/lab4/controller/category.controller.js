const categoryModel = require('../model/category.model');
const { NotFound, ServerError, BadRequest, Create, Update, Get, Delete, client } = require('../lib');
class categoryController {
  static async getAllCategory(req, res) {
    try {
      let categories;
      const categoriesRedis = await client.get('categories');
      categories = JSON.parse(categoriesRedis);

      if (!categories) {
        categories = await categoryModel.getAll();
        if (categories.length === 0) {
          return NotFound(res, 'Categories');
        }
        await client.setEx('categories', 3600, JSON.stringify(categories));
        return Get(res, categories);
      } else {
        return Get(res, categories);
      }
    } catch (error) {
      return ServerError(res, error);
    }
  }
  static async getOneCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await categoryModel.getOne(id);
      if (category.length === 0) {
        return NotFound(res, 'Category');
      }
      return Get(res, category[0]);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }
  static async createCategory(req, res) {
    try {
      const { title, content } = req.body;
      const result = await categoryModel.create(title, content);
      if (result[0].length === 0) {
        return BadRequest(res, 'Category not created');
      }
      return Create(res, null, result[0]);
    } catch (error) {
      return ServerError(res, error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const category = await categoryModel.update(id, title, content);
      if (category === 0) {
        return BadRequest(res, 'Category not updated');
      }
      return Update(res);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryModel.delete(id);
      if (category === 0) {
        return BadRequest(res, 'Category not delete');
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return Delete(res);
    } catch (error) {
      // console.log(error.message);
      return ServerError(res, error);
    }
  }
}

module.exports = categoryController;
