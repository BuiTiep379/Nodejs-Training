const categoryModel = require('../model/category.model');
const { StatusCodes } = require('http-status-codes');
class categoryController {
  static async getAllCategory(req, res) {
    try {
      const categories = await categoryModel.getAll();
      // console.log(categories);
      if (categories.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Categories not found' });
      }
      return res.status(StatusCodes.OK).json({ data: categories });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
  static async getOneCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await categoryModel.getOne(id);
      if (category[0].length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Category not found' });
      }
      return res.status(StatusCodes.OK).json({ data: category[0][0] });
    } catch (error) {
      // console.log(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
  static async createCategory(req, res) {
    try {
      const category = await categoryModel.create(req.body);
      if (category === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Category not created' });
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return res.status(StatusCodes.CREATED).json({ msg: 'Create category successfully' });
    } catch (error) {
      // console.log(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryModel.update({ ...req.body, id });
      if (category === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Category not updated' });
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return res.status(StatusCodes.CREATED).json({ msg: 'Update category successfully' });
    } catch (error) {
      // console.log(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryModel.delete(id);
      if (category === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Category not delete' });
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return res.status(StatusCodes.CREATED).json({ msg: 'Delete category successfully' });
    } catch (error) {
      // console.log(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
}

module.exports = categoryController;
