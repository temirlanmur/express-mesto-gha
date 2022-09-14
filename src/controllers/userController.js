const User = require('../models/userModel');
const MONGOOSE_ERROR_NAMES = require('../constants/mongooseErrorNames');
const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (user === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь по указанному id ${userId} не найден` });
      else res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь по указанному id ${userId} не найден` });
          break;
        }
        default:
          next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
          break;
        }
        default:
          next(err);
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
      if (user === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь с указанным id ${userId} не найден` });
      else res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь с указанным id ${userId} не найден` });
          break;
        }
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
          break;
        }
        default:
          next(err);
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
      if (user === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь с указанным id ${userId} не найден` });
      else res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Пользователь с указанным id ${userId} не найден` });
          break;
        }
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
          break;
        }
        default:
          next(err);
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
