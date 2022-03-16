const request = require('supertest');
const { authRouteConstants, postRouteConstants } = require('../constants');
const { StatusCodes } = require('http-status-codes');
const userSigninAllowed = {
  email: 'xuanphuong@gmail.com',
  password: '130901',
};
const userSigninNotAllowed = {
  email: 'buitiep@gmail.com',
  password: '130901',
};
const postTest = (app) => {
  describe('Test CRUD in post ', () => {
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
      test('Get all post done', async () => {
        const res = await request(app).get(postRouteConstants.GET_ALL_POST).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Array);
      });
      test('Get single post done', async () => {
        const res = await request(app).get(postRouteConstants.GET_SINGLE_POST).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Object);
      });
      test('Create post done', async () => {
        const res = await request(app).post(postRouteConstants.CREATE_POST).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        id = res.body.data.id;
        expect(res.status).toEqual(StatusCodes.CREATED);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toBeInstanceOf(Object);
      });
      test('Update post done', async () => {
        const res = await request(app).put(`${postRouteConstants.UPDATE_POST}${id}`).set('Authorization', `Bearer ${token}`).send({
          title: 'Express',
          content: 'Test api',
        });
        console.log('res.body', res.body);
        expect(res.body).toHaveProperty('message');
        expect(res.status).toEqual(StatusCodes.OK);
      });
      test('Delete post done', async () => {
        const res = await request(app).delete(`${postRouteConstants.DELETE_POST}${id}`).set('Authorization', `Bearer ${token}`);
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
      test('Get all post done', async () => {
        const res = await request(app).get(postRouteConstants.GET_ALL_POST).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Get single post done', async () => {
        const res = await request(app).get(postRouteConstants.GET_SINGLE_POST).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Create post done', async () => {
        const res = await request(app).post(postRouteConstants.CREATE_POST).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        console.log('res.body', res.body.data);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Update post done', async () => {
        const res = await request(app).put(`${postRouteConstants.UPDATE_POST}/2`).set('Authorization', `Bearer ${token}`).send({
          title: 'Nodejs',
          content: 'Test api',
        });
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
      test('Delete post done', async () => {
        const res = await request(app).delete(`${postRouteConstants.DELETE_POST}/2`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(StatusCodes.FORBIDDEN);
        expect(res.body).toHaveProperty('message');
      });
    });
  });
};
module.exports = postTest;
