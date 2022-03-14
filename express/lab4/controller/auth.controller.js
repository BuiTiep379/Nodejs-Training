const userModel = require('../model/user.model');
const userPermissionModel = require('../model/user-permission.model');
const { authConstants } = require('../constants');
const { createJWT, client, NotFound, ServerError, BadRequest, Create, Unauthorized, Response } = require('../lib');
class authController {
  static async signup(req, res) {
    try {
      const result = await userModel.signup(req.body);

      if (result[0].length === 0) {
        return BadRequest(res, authConstants.SIGNUP_FAILURE);
      } else {
        return Create(res, authConstants.SIGNUP_SUCCESS, result[0]);
      }
    } catch (error) {
      return ServerError(res, error);
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userModel.signin(email, password);
      if (result.length === 0) {
        return NotFound(res, 'user');
      }
      const user = result[0];
      const permission = await userPermissionModel.getPermission(user.id);
      const payload = {
        permission,
        userid: user.id,
      };
      const token = createJWT(payload);

      const timestamps = new Date();
      const tokenTable = {
        tokenValue: token,
        createdAt: timestamps,
        updatedAt: timestamps,
      };

      await client.set(user.id, JSON.stringify(tokenTable));
      return Response(res, { message: authConstants.SIGNIN_SUCCESS, data: { token } });
    } catch (error) {
      return ServerError(res, error);
    }
  }

  static async signout(req, res) {
    const { userid } = req.user;
    await client.DEL(userid);
    return Response(res, { message: authConstants.SIGNOUT_SUCCESS });
  }
}
module.exports = authController;
