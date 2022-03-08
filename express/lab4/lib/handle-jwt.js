const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = {
  createJWT,
  isTokenValid,
};
