const userRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUser,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/userController');
const { userSchemas, commonSchemas } = require('../utils/validation');

userRouter.get('/me', getProfile);
userRouter.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: userSchemas.name,
    about: userSchemas.about,
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({ avatar: commonSchemas.url.required() }),
}), updateProfileAvatar);

userRouter.get('/', getUsers);
userRouter.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: commonSchemas.id,
  }),
}), getUser);
userRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: userSchemas.name,
    about: userSchemas.about,
    avatar: commonSchemas.url,
    email: userSchemas.email,
    password: userSchemas.password,
  }),
}), createUser);

module.exports = userRouter;
