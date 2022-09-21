const { HttpError } = require('../utils/errors');
const { ErrorAPIModel } = require('../utils/APIModels');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else if (err instanceof HttpError) {
    res.status(err.statusCode).send(new ErrorAPIModel(err.message));
  } else {
    res.status(500).send(new ErrorAPIModel('Что-то пошло не так'));
  }
};

module.exports = errorHandler;
