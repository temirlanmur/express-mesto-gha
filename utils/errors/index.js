const HttpError = require('./HttpError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./InternalServerError');

module.exports = {
  HttpError,

  BadRequestError,
  UnauthorizedError,
  NotFoundError,

  InternalServerError,
};
