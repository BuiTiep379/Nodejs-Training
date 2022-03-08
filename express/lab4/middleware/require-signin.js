const { StatusCodes } = require('http-status-codes');
const { isTokenValid } = require('../lib/handle-jwt');
const requireSignin = async (req, res, next) => {
  // console.log(req.headers.cookie);
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('=')[1];
    // console.log(token);
    const decoded = await isTokenValid(token);
    req.user = decoded;
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authorization required' });
  }
  next();
};

module.exports = requireSignin;
