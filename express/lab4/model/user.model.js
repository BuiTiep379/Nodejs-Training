const { connection } = require('../lib');
const connectionPromise = connection.promise();
const mysql = require('mysql2');
class userModel {
  static async signup(data) {
    try {
      const { firstName, lastName, middleName, email, password } = data;
      const registeredAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // console.log(typeof registeredAt);
      let insertQuery = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
      let query = mysql.format(insertQuery, [
        'user',
        'firstName',
        'middleName',
        'lastName',
        'email',
        'passwordHash',
        'registeredAt',
        firstName,
        middleName,
        lastName,
        email,
        password,
        registeredAt,
      ]);
      // let query = `INSERT INTO user (firstName, middleName, lastName, email, passwordHash, registeredAt) VALUES ('${firstName}', '${middleName}', '${lastName}', '${email}', '${password}', '${registeredAt}')`;
      let result = await connectionPromise.query(query);
      if (result[0].affectedRows === 1) {
        let selectQuery = 'SELECT ??, ?? FROM ?? WHERE ??=?';
        query = mysql.format(selectQuery, ['id', 'email', 'user', 'email', email]);
        // query = `SELECT id, email FROM user WHERE email='${email}' `;
        result = await connectionPromise.query(query);
        return result[0];
      }
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async signin(email, password) {
    try {
      let selectQuery = 'SELECT ??, ??, ?? FROM ?? WHERE ??=? AND ??=?';
      let query = mysql.format(selectQuery, ['id', 'email', 'passwordHash', 'user', 'email', email, 'passwordHash', password]);
      const result = await connectionPromise.query(query);
      return result[0];
    } catch (error) {
      throw error.sqlMessage;
    }
  }
}

module.exports = userModel;
