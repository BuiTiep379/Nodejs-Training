const express = require('express');
// const path = require('path');
const app = express();
const connection = require('./utils/connect-mysql');
const userRouter = require('./routes');
app.use(express.json());
// app.use((req, res, next) => {
//   console.log('middleware run every time the app receives a request');
//   next();
// });
const connectDB = () => {
  return connection.connect((error) => {
    if (error) {
      console.log('Connect failure!!!');
      return;
    }
    console.log('Connect successfully!!!');
  });
};
app.use('/users', userRouter);
app.use('/', (req, res, next) => {
  res.send('Hello World');
});
connectDB();
app.listen(2000, () => {
  // console.log(path.join(__dirname));
  console.log(`App run at http://localhost:2000`);
});
