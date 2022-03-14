const categoryModel = require('../model/category.model');
const { NotFound, ServerError, BadRequest, Create, Update, Get, Delete, client } = require('../lib');
class categoryController {
  static async getAllCategory(req, res) {
    try {
      let categories;
      const categoriesRedis = await client.get('categories');
      if (categoriesRedis) {
        categories = JSON.parse(categoriesRedis);
        return Get(res, categories);
      } else {
        let categories = await categoryModel.getAll();
        // console.log(categories);
        if (categories.length === 0) {
          return NotFound(res, 'Categories');
        }
        await client.setEx('categories', 3600, JSON.stringify(categories));
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
      const result = await categoryModel.create(req.body);
      if (result[0].length === 0) {
        return BadRequest(res, 'Category not created');
      } else {
        let categories = await categoryModel.getAll();
        await client.setEx('categories', 3600, JSON.stringify(categories));
        return Create(res, null, result[0]);
      }
    } catch (error) {
      return ServerError(res, error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryModel.update({ ...req.body, id });
      console.log('category', category);
      if (category === 0) {
        return BadRequest(res, 'Category not updated');
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
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
