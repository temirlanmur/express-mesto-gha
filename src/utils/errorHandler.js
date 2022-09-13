/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ message: 'Что-то пошло не так' });
};

module.exports = errorHandler;
