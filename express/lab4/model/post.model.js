const { connection } = require('../lib');
const mysql = require('mysql2');
const connectionPromise = connection.promise();
const slugify = require('slugify');
class postModel {
  static async getAll() {
    try {
      const query = 'SELECT * FROM post';
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
      const query = `SELECT * FROM post WHERE id=${id}`;
      const result = await connectionPromise.query(query);
      return result[0];
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async create(userId, title, content) {
    try {
      const slug = slugify(title);
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      let query = `INSERT INTO post (authorId, title, slug, createdAt, content) VALUES (?, ?, ?, ?, ?)`;
      let result = await connectionPromise.query(query, [userId, title, slug, createdAt, content]);
      if (result[0].affectedRows === 1) {
        let selectQuery = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
        let query = mysql.format(selectQuery, ['post', 'authorId', userId, 'slug', slug]);
        result = await connectionPromise.query(query);
        return result[0];
      }
    } catch (error) {
      // console.log(error);
      throw error.sqlMessage;
    }
  }
  static async update(postId, content) {
    try {
      const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `UPDATE post SET content = ?, updatedAt = ? WHERE id = ?`;
      const result = await connectionPromise.query(query, [content, updatedAt, postId]);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async delete(id) {
    try {
      const query = `DELETE FROM post WHERE id = ?`;
      const result = await connectionPromise.query(query, [id]);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
}

module.exports = postModel;
