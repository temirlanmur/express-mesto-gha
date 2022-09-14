const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');

/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
};

module.exports = errorHandler;
