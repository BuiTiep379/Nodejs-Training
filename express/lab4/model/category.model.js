const mysql = require('mysql2');
const { connection } = require('../lib');
const connectionPromise = connection.promise();
const slugify = require('slugify');
class categoryModel {
  static async getAll() {
    try {
      const query = 'SELECT * FROM category';
      const [rows, fields] = await connectionPromise.query(query);
      return rows[0];
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async getOne(id) {
    try {
      // const query = `SELECT * FROM category WHERE id=${id}`;
      let selectQuery = 'SELECT * FROM ?? WHERE ??=?';
      let query = mysql.format(selectQuery, ['category', 'id', id]);
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
      let insertQuery = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
      let query = mysql.format(insertQuery, ['category', 'title', 'slug', 'content', data.title, slug, data.content]);
      // const query = `INSERT INTO category (title, slug, content) VALUES ('${data.title}', '${slug}', '${data.content}')`;
      let result = await connectionPromise.query(query);
      if (result[0].affectedRows === 1) {
        let selectQuery = 'SELECT * FROM ?? WHERE ??=?';
        let query = mysql.format(selectQuery, ['category', 'slug', slug]);
        result = await connectionPromise.query(query);
        return result[0];
      }
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async update(data) {
    try {
      console.log(data);
      const slug = slugify(data.title);
      let updateQuery = 'UPDATE ?? SET ?? = ?, ??=?, ??=? WHERE ?? = ?';
      let query = mysql.format(updateQuery, ['category', 'title', data.title, 'slug', slug, 'content', data.content, 'id', data.id]);
      // console.log('query', query);
      // const query = `UPDATE category SET title = '${data.title}', slug='${slug}', content='${data.content}' WHERE id = ${data.id}`;
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async delete(id) {
    try {
      // const query = `DELETE FROM category WHERE id = ${id}`;
      let deleteQuery = 'DELETE FROM ?? WHERE ?? = ?';
      let query = mysql.format(deleteQuery, ['category', 'id', id]);
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
}

module.exports = categoryModel;
