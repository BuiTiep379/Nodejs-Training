const mysql = require('mysql2');
// create the connection to database
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'my_db',
});


module.exports = pool;
