const express = require('express');
require('dotenv').config();
const app = express();
const { connection, client } = require('./lib');
const requireSignin = require('./middleware/require-signin');
const categoryRouter = require('./routes/category.route');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
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
app.use('/api/category', requireSignin, categoryRouter);
app.use('/api/post', requireSignin, postRouter);
app.use('/api/users', requireSignin, userRouter);
app.use('/api/', authRouter);
client.connect();
connectDB();
app.listen(2000, () => {
  // console.log(path.join(__dirname));
  console.log(`App run at http://localhost:2000`);
});
