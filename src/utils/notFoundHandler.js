const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');
const ErrorAPIModel = require('./APIModels/ErrorAPIModel');

// eslint-disable-next-line no-unused-vars
const notFoundHandler = (req, res, next) => res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel('Ресурса по такому адресу не существует'));

module.exports = notFoundHandler;
