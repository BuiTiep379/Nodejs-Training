const mysql = require('mysql2');
const { connection } = require('../lib');
const connectionPromise = connection.promise();
class userPermissionModel {
  static async getPermission(userid) {
    try {
      const query = `SELECT resource, action
                    FROM permission, user_permission
                    WHERE user_permission.user_id =? AND user_permission.permission_id=permission.id`;
      const result = await connectionPromise.query(query, [userid]);
      // console.log(result[0].length);
      let permission = {};
      let actionCategory = [];
      let actionPost = [];
      if (result[0].length > 0) {
        for (let item of result[0]) {
          if (item.resource == 'category') {
            actionCategory.push(item.action);
          } else {
            actionPost.push(item.action);
          }
        }
        if (actionCategory.length > 0) {
          permission['category'] = actionCategory;
        }
        if (actionPost.length > 0) {
          permission['post'] = actionPost;
        }
      }
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
