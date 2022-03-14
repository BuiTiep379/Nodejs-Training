const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

const setValue = (key, value) => {
  client.setEx(key, 3600, value, (err) => {
    if (err) throw err;
    return;
  });
};

const getValue = (key) => {
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      return data;
    }
  });
};

module.exports = {
  client,
  setValue,
  getValue,
};
