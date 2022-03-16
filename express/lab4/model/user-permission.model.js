const mysql = require('mysql2');
const _ = require('lodash');
const { connection } = require('../lib');
const connectionPromise = connection.promise();
class userPermissionModel {
  static async getPermission(userid) {
    try {
      const query = `SELECT resource, action
                    FROM permission, user_permission
                    WHERE user_permission.user_id =? AND user_permission.permission_id=permission.id`;
      const result = await connectionPromise.query(query, [userid]);
      const resultPermission = result[0];
      let permission = {};
      _.forEach(resultPermission, (value) => {
        const resource = value.resource;
        const action = value.action;
        permission[resource] ? permission[resource].push(action) : (permission[resource] = [action]);
      });
      // console.log('permission', permission);
      return permission;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async addPermission(userId, permissionId) {
    try {
      let insertQuery = 'INSERT INTO ?? (??, ??) VALUES (?, ?)';
      let query = mysql.format(insertQuery, ['user_permission', 'user_id', 'permission_id', userId, permissionId]);
      const result = await connectionPromise.query(query);
      console.log('result', result);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
  static async deletePermission(userId, permissionId) {
    try {
      let deleteQuery = 'DELETE FROM ?? WHERE ?? = ? AND ??=?';
      let query = mysql.format(deleteQuery, ['user_permission', 'user_id', userId, 'permission_id', permissionId]);
      const result = await connectionPromise.query(query);
      return result[0].affectedRows;
    } catch (error) {
      throw error.sqlMessage;
    }
  }
}

module.exports = userPermissionModel;
