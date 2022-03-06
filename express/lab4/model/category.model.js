const connection = require('../lib/mysql-connect');
const connectionPromise = connection.promise();
const slugify = require('slugify');
class categoryModel {
  static async getAll() {
    try {
      const query = 'SELECT * FROM category';
      const [rows, fields] = await connectionPromise.query(query);
      // console.log(rows);
      return rows;
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async getOne(id) {
    try {
      const query = `SELECT * FROM category WHERE id=${id}`;
      const result = await connectionPromise.query(query);
      return result;
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async create(data) {
    try {
      const slug = slugify(data.title);
      const query = `INSERT INTO category (title, slug, content) VALUES ('${data.title}', '${slug}', '${data.content}')`;
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async update(data) {
    try {
      const slug = slugify(data.title);
      const query = `UPDATE category SET title = '${data.title}', slug='${slug}', content='${data.content}' WHERE id = ${data.id}`;
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async delete(id) {
    try {
      const query = `DELETE FROM category WHERE id = ${id}`;
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
}

module.exports = categoryModel;
