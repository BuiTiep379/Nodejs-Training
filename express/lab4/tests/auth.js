const request = require('supertest');
const { authRouteConstants } = require('../constants');
const { StatusCodes } = require('http-status-codes');
const userSignin = {
  email: 'xuanphuong@gmail.com',
  password: '130901',
};

const authTest = (app) => {
  describe('auth route sigin', () => {
    test('Signin route success', async () => {
      const res = await request(app).post(authRouteConstants.SIGNIN_ROUTE).send(userSignin);
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty('message');
      expect(res.body.data).toHaveProperty('token');
    });
  });
  describe('auth route sigup', () => {
    test('Signup route success', async () => {
      let milliseconds = new Date().getTime();
      let email = 'buitiep';
      const userSignup = {
        firstName: 'Truong',
        middleName: 'Bui',
        lastName: 'Nguyen',
        email: `${email}${milliseconds}@gmail.com`,
        password: '130901',
      };
      const res = await request(app).post(authRouteConstants.SIGNUP_ROUTE).send(userSignup);
      expect(res.status).toEqual(StatusCodes.CREATED);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
    });
  });
};
module.exports = authTest;
