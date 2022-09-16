const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');
const ErrorAPIModel = require('./APIModels/ErrorAPIModel');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(new ErrorAPIModel('Что-то пошло не так'));
};

module.exports = errorHandler;
