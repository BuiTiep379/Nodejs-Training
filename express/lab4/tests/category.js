const request = require('supertest');
const { authRouteConstants, categoryRouteConstants } = require('../constants');
const { StatusCodes } = require('http-status-codes');
const userSigninAllowed = {
  email: 'xuanphuong@gmail.com',
  password: '130901',
};
const userSigninNotAllowed = {
  email: 'buitiep@gmail.com',
  password: '130901',
};
const categoryTest = (app) => {
  describe('Test CRUD in category ', () => {
    describe('with permission allowed', () => {
      let token = '';
      let id;
      test('Signin route success', async () => {
        const res = await request(app).post(authRouteConstants.SIGNIN_ROUTE).send(userSigninAllowed);
        token = res.body.data.token;
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toHaveProperty('token');
      });
      test('Get all category done', async () => {
        const res = await request(app).get(categoryRouteConstants.GET_ALL_CATEGORY).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Array);
      });
      test('Get single category done', async () => {
        const res = await request(app).get(categoryRouteConstants.GET_SINGLE_CATEGORY).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Object);
      });
      test('Create category done', async () => {
        const res = await request(app).post(categoryRouteConstants.CREATE_CATEGORY).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        id = res.body.data.id;
        expect(res.status).toEqual(StatusCodes.CREATED);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Object);
      });
      test('Update category done', async () => {
        const res = await request(app).put(`${categoryRouteConstants.UPDATE_CATEGORY}${id}`).set('Authorization', `Bearer ${token}`).send({
          title: 'Express',
          content: 'Test api',
        });
        expect(res.body).toHaveProperty('message');
        expect(res.status).toEqual(StatusCodes.OK);
      });
      test('Delete category done', async () => {
        const res = await request(app).delete(`${categoryRouteConstants.DELETE_CATEGORY}${id}`).set('Authorization', `Bearer ${token}`);
        console.log('res.body', res.body);
        expect(res.body).toHaveProperty('message');
        expect(res.status).toEqual(StatusCodes.OK);
      });
    });
    describe('with permission not allowed', () => {
      let token = '';
      test('Signin route success', async () => {
        const res = await request(app).post(authRouteConstants.SIGNIN_ROUTE).send(userSigninNotAllowed);
        token = res.body.data.token;
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toHaveProperty('token');
      });
      test('Get all category done', async () => {
        const res = await request(app).get(categoryRouteConstants.GET_ALL_CATEGORY).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Get single category done', async () => {
        const res = await request(app).get(categoryRouteConstants.GET_SINGLE_CATEGORY).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Create category done', async () => {
        const res = await request(app).post(categoryRouteConstants.CREATE_CATEGORY).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        console.log('res.body', res.body.data);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Update category done', async () => {
        const res = await request(app).put(`${categoryRouteConstants.UPDATE_CATEGORY}/2`).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Delete category done', async () => {
        const res = await request(app).delete(`${categoryRouteConstants.DELETE_CATEGORY}/2`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
    });
  });
};
module.exports = categoryTest;
