const express = require('express');
require('dotenv').config();
const app = express();
const connection = require('./lib/mysql-connect');

const categoryRouter = require('./routes/category.route');
const authRouter = require('./routes/auth.route');

app.use(express.json());
// // need cookieParser middleware before we can do anything with cookies
const connectDB = () => {
  return connection.connect((error) => {
    if (error) {
      console.log('Connect failure!!!');
      return;
    }
    console.log('Connect successfully!!!');
  });
};
app.use('/api/category', categoryRouter);
app.use('/api/', authRouter);
connectDB();
app.listen(2000, () => {
  // console.log(path.join(__dirname));
  console.log(`App run at http://localhost:2000`);
});
