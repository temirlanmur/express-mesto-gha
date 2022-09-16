const User = require('../models/userModel');
const UserAPIModel = require('../utils/APIModels/UserAPIModel');
const ErrorAPIModel = require('../utils/APIModels/ErrorAPIModel');
const MONGOOSE_ERROR_NAMES = require('../constants/mongooseErrorNames');
const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users.map((user) => new UserAPIModel(user))))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (user === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь по указанному id ${userId} не найден`));
      return res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь по указанному id ${userId} не найден`));
        default:
          return next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CODES.CREATED).send(new UserAPIModel(user)))
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные при создании пользователя'));
        default:
          return next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User
    .findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь с указанным id ${userId} не найден`));
      return res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь с указанным id ${userId} не найден`));
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные при обновлении профиля'));
        default:
          return next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User
    .findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь с указанным id ${userId} не найден`));
      return res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Пользователь с указанным id ${userId} не найден`));
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные при обновлении профиля'));
        default:
          return next(err);
      }
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
};
