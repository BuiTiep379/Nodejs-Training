const request = require('supertest');
const { authRouteConstants, userRouteConstants } = require('../constants');
const { StatusCodes } = require('http-status-codes');
const userSignin = {
  email: 'xuanphuong@gmail.com',
  password: '130901',
};

const userTest = (app) => {
  describe('handle permission', () => {
    let token = '';
    test('Signin route success', async () => {
      const res = await request(app).post(authRouteConstants.SIGNIN_ROUTE).send(userSignin);
      token = res.body.data.token;
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty('message');
      expect(res.body.data).toHaveProperty('token');
    });
    test('Add permission', async () => {
      const res = await request(app).post(userRouteConstants.ADD_PERMISSION).set('Authorization', `Bearer ${token}`).send({
        permission_id: 2,
      });
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty('message');
    });
    test('Delete permission', async () => {
      const res = await request(app).delete(userRouteConstants.DELETE_PERMISSION).set('Authorization', `Bearer ${token}`).send({
        permission_id: 1,
      });
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty('message');
    });
  });
};
module.exports = userTest;
