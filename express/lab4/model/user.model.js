const { connection } = require('../lib');
const connectionPromise = connection.promise();

class userModel {
  static async signup(data) {
    try {
      const { firstName, lastName, middleName, email, password } = data;
      const registeredAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // console.log(typeof registeredAt);
      let query = `INSERT INTO user (firstName, middleName, lastName, email, passwordHash, registeredAt) VALUES ('${firstName}', '${middleName}', '${lastName}', '${email}', '${password}', '${registeredAt}')`;
      let result = await connectionPromise.query(query);
      console.log('result', result);
      if (result[0].affectedRows === 1) {
        query = `SELECT id, email, passwordHash FROM user WHERE email='${email}' `;
        result = await connectionPromise.query(query);
        // console.log('return', result[0]);
        return result[0];
      }
      // return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async signin(email) {
    try {
      const query = `SELECT id, email, passwordHash FROM user WHERE email='${email}' `;
      // console.log(query);
      const result = await connectionPromise.query(query);
      // console.log(result[0][0].passwordHash);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userModel;
