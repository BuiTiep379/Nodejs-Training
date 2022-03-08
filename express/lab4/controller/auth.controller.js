const userModel = require('../model/user.model');
const { StatusCodes } = require('http-status-codes');
const { createJWT, client, NotFound, ServerError, BadRequest, Create, Unauthorized, Response } = require('../lib');
class authController {
  static async signup(req, res) {
    try {
      const result = await userModel.signup(req.body);

      if (result[0].length === 0) {
        return BadRequest(res, 'Signup failure');
      } else {
        return Create(res, 'Signup successfully', result[0]);
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
    } catch (error) {
      return ServerError(res, error);
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userModel.signin(email);

      // console.log(user[0]);
      if (result[0].length === 0) {
        return NotFound(res, 'user');
      }
      const user = result[0][0];
      // console.log('user', user);
      if (user.passwordHash !== password) {
        return BadRequest(res, 'Passwords do not match');
      }

      // console.log(token);
      const timestamps = new Date();
      const tokenTable = {
        permissions: {
          category: {
            read: true,
            write: false,
          },
          post: {
            read: true,
            write: true,
          },
        },
        isValid: true,
        createdAt: timestamps,
        updatedAt: timestamps,
      };
      // console.log(user.id);
      client.set(`${user.id}`, JSON.stringify(tokenTable));
      const tokenValue = createJWT(user);
      // console.log(tokenValue);
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie('token', tokenValue, {
        httpOnly: true, // Đánh dấu cookie chỉ có thể truy cập ở máy chủ web
        // signed: true, // Đánh dấu cookie nên được signed
        // secure: true, // chỉ dùng với HTTPS
        expires: new Date(Date.now() + oneDay), // hết hạn như maxAge(maxAge kiểu Number) còn expires: Date
      });
      return Response(res, { message: 'Signin successfully', data: user });
    } catch (error) {
      return ServerError(res, error);
    }
  }
}
module.exports = authController;
