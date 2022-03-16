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
app.use('/api/categories', requireSignin, categoryRouter);
app.use('/api/posts', requireSignin, postRouter);
app.use('/api/users', requireSignin, userRouter);
app.use('/api/', authRouter);
client.connect();
module.exports = app;
