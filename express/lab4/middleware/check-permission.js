const _ = require('lodash');
const { Unauthorized } = require('../lib');
const checkPermissions = (resource, action) => {
  return (req, res, next) => {
    const { permission } = req.user;
    if (Object.keys(permission).length == 0) {
      return Unauthorized(res);
    }
    let check = false;
    _.forIn(permission, (value, key) => {
      if (key === resource) {
        _.map(value, (data, index) => {
          if (data === action) check = true;
        });
      }
    });
    if (check) {
      return next();
    } else {
      return Unauthorized(res);
    }
  };
};

module.exports = checkPermissions;
