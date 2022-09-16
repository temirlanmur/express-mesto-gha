const { ErrorAPIModel } = require('./APIModels');

// eslint-disable-next-line no-unused-vars
const notFoundHandler = (req, res, next) => res.status(404).send(new ErrorAPIModel('Ресурса по такому адресу не существует'));

module.exports = notFoundHandler;
