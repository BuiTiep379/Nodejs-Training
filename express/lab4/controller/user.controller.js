const userPermissionModel = require('../model/user-permission.model');
const { client, NotFound, ServerError, Delete, Update, Response, Get } = require('../lib');
class userController {
  static async addPermission(req, res) {
    try {
      const { userId } = req.params;
      const result = await userPermissionModel.addPermission(userId, req.body.permission_id);
      if (result === 0) {
        return NotFound(res, 'permission');
      }
      await client.DEL(userId);
      return Update(res);
    } catch (error) {
      return ServerError(res, error);
    }
  }
  static async deletePermission(req, res) {
    try {
      const { userId } = req.params;
      const result = await userPermissionModel.deletePermission(userId, req.body.permission_id);
      if (result === 0) {
        return NotFound(res, 'permission');
      }
      await client.DEL(userId);
      return Delete(res);
    } catch (error) {
      return ServerError(res, error);
    }
  }
  static async showPermission(req, res) {
    try {
      const { userId } = req.params;
      const result = await userPermissionModel.getPermission(userId);
      if (result === 0) {
        return NotFound(res, 'permission');
      }
      // await client.DEL(userId);
      return Get(res, result);
    } catch (error) {
      return ServerError(res, error);
    }
  }
}
module.exports = userController;
