const authConstants = {
  SIGNUP_SUCCESS: 'Signup successfully',
  SIGNUP_FAILURE: 'Signup failure',
  SIGNIN_SUCCESS: 'Signin successfully',
  SIGNOUT_SUCCESS: 'Signout successfully',
  SIGNOUT_FAILURE: 'Signout failure',
};

const authRouteConstants = {
  SIGNUP_ROUTE: '/api/signup',
  SIGNIN_ROUTE: '/api/signin',
};
const categoryRouteConstants = {
  GET_ALL_CATEGORY: '/api/categories/',
  GET_SINGLE_CATEGORY: '/api/categories/2',
  CREATE_CATEGORY: '/api/categories/',
  UPDATE_CATEGORY: '/api/categories/',
  DELETE_CATEGORY: '/api/categories/',
};
const postRouteConstants = {
  GET_ALL_POST: '/api/posts/',
  GET_SINGLE_POST: '/api/posts/1',
  CREATE_POST: '/api/posts/',
  UPDATE_POST: '/api/posts/',
  DELETE_POST: '/api/posts/',
};
const userRouteConstants = {
  DELETE_PERMISSION: '/api/users/delete-permission/3',
  ADD_PERMISSION: '/api/users/add-permission/3',
};
module.exports = {
  authConstants,
  authRouteConstants,
  categoryRouteConstants,
  postRouteConstants,
  userRouteConstants,
};
