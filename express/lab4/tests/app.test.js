const app = require('../app');
const authTest = require('./auth');
const categoryTest = require('./category');
const postTest = require('./post');
const userTest = require('./user');
authTest(app);
categoryTest(app);
postTest(app);
userTest(app);
