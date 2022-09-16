const MongooseError = require('mongoose').Error;
const User = require('../models/userModel');
const { UserAPIModel } = require('../utils/APIModels');
const { BadRequestError, NotFoundError } = require('../utils/errors');

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
      if (user === null) next(new NotFoundError(`Пользователь по указанному id ${userId} не найден`));
      else res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Пользователь по указанному id ${userId} не найден`));
      else next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(201).send(new UserAPIModel(user)))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      else next(err);
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
      if (user === null) next(new NotFoundError(`Пользователь с указанным id ${userId} не найден`));
      else res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Пользователь с указанным id ${userId} не найден`));
      else if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      else next(err);
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
      if (user === null) next(new NotFoundError(`Пользователь с указанным id ${userId} не найден`));
      else res.send(new UserAPIModel(user));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Пользователь с указанным id ${userId} не найден`));
      else if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      else next(err);
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
};
