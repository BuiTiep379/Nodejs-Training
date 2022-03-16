const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'blog',
});

// const connectDB = () => {
//   return connection.connect((error) => {
//     if (error) {
//       console.log('Connect failure!!!');
//       return;
//     }
//     console.log('Connect successfully!!!');
//   });
// };
module.exports = connection;
