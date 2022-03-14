const { isTokenValid, client, Unauthenticated } = require('../lib');
const requireSignin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = isTokenValid(token);
    const redisToken = await client.get(decoded.userid);
    if (!redisToken) {
      return Unauthenticated(res);
    }
    req.user = decoded;
    next();
  } else {
    return Unauthenticated(res);
  }
};

module.exports = requireSignin;
