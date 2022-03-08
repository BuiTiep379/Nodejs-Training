const { StatusCodes } = require('http-status-codes');
const client = require('../lib/redis-init');
const checkReadPermissions = async (req, res, next) => {
  // console.log('userid', req.user.id);
  const tokenValue = await client.get(req.user.id);
  if (!tokenValue) {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Token not match or expired' });
  }
  const parseToken = JSON.parse(tokenValue);
  // console.log(parseToken);
  const permission = parseToken.permissions.category.read;
  // console.log(permission);
  if (!permission) {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Not allowed to access' });
  }
  next();
};
const checkWritePermissions = async (req, res, next) => {
  console.log('userid', req.user.id);
  const tokenValue = await client.get(req.user.id);
  if (!tokenValue) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Token not match or expired' });
  }
  const parseToken = JSON.parse(tokenValue);
  // console.log(parseToken);
  const permission = parseToken.permissions.category.write;
  console.log(permission);
  if (!permission) {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Not allowed to access' });
  }
  next();
};

module.exports = {
  checkReadPermissions,
  checkWritePermissions,
};
