const { StatusCodes } = require('http-status-codes');

const message = {
  GET: 'Get completed',
  CREATE: 'Create completed',
  UPDATE: 'Update completed',
  DELETE: 'Delete completed',
  UNAUTHENTICATE: 'Signin is required',
  UNAUTHORIZE: 'Not allowed to access',
};

const Response = (res, data, httpStatus = StatusCodes.OK) => {
  return res.status(httpStatus).json(data);
};

const Get = (res, data) => {
  return Response(res, { message: message.GET, data }, StatusCodes.OK);
};
const Create = (res, msg, data) => {
  return Response(res, { message: `${msg === null ? message.CREATE : msg}`, data }, StatusCodes.CREATED);
};
const Update = (res, data) => {
  return Response(res, {
    message: message.UPDATE,
    data,
  });
};

const Delete = (res, data) => {
  return Response(res, {
    message: message.DELETE,
    data,
  });
};
const ServerError = (res, message) => {
  return Response(res, { message }, StatusCodes.INTERNAL_SERVER_ERROR);
};
// yeu cau signin
const Unauthenticated = (res) => {
  return Response(res, { message: message.UNAUTHENTICATE }, StatusCodes.UNAUTHORIZED);
};
// ko cho phep
const Unauthorized = (res) => {
  return Response(res, { message: message.UNAUTHORIZE }, StatusCodes.FORBIDDEN);
};

const BadRequest = (res, message) => {
  return Response(res, { message }, StatusCodes.BAD_REQUEST);
};

const NotFound = (res, input) => {
  return Response(res, { message: `${input} not found` }, StatusCodes.NOT_FOUND);
};

module.exports = {
  Response,
  Get,
  Create,
  Update,
  Delete,
  BadRequest,
  Unauthenticated,
  Unauthorized,
  NotFound,
  ServerError,
};
