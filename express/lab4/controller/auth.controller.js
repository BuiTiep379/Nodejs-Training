const userModel = require('../model/user.model');
const { StatusCodes } = require('http-status-codes');
const { createJWT } = require('../lib/handle-jwt');
class authController {
  static async signup(req, res) {
    try {
      const user = await userModel.signup(req.body);
      if (user === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Signup failure' });
      }
      // return res.status(StatusCodes.OK).json({ data: category[0][0] });
      return res.status(StatusCodes.CREATED).json({ msg: 'Signup successfully' });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.signin(email);
      // console.log(user[0]);
      if (user[0].length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found with email' });
      }
      if (user[0][0].passwordHash !== password) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Password is incorrect' });
      }
      const token = await createJWT(user[0][0]);
      // console.log('token', token);
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie('token', token, {
        httpOnly: true, // Đánh dấu cookie chỉ có thể truy cập ở máy chủ web
        // signed: true, // Đánh dấu cookie nên được signed
        // secure: true, // chỉ dùng với HTTPS
        expires: new Date(Date.now() + oneDay), // hết hạn như maxAge(maxAge kiểu Number) còn expires: Date
      });
      return res.status(StatusCodes.OK).json({ data: user[0][0] });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  }
}
module.exports = authController;
