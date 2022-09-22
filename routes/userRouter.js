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
const { userSchemaConstants } = require('../models/userModel');

// Declare some repeating model schemas for Joi validation
// See: https://joi.dev/ & https://github.com/arb/celebrate
const nameSchema = Joi.string()
  .min(userSchemaConstants.nameMinLength)
  .max(userSchemaConstants.nameMaxLength);
const aboutSchema = Joi.string()
  .min(userSchemaConstants.aboutMinLength)
  .max(userSchemaConstants.aboutMaxLength);
const avatarSchema = Joi.string().uri();

// Define routes
userRouter.get('/me', getProfile);
userRouter.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({ avatar: avatarSchema.required() }),
}), updateProfileAvatar);

userRouter.get('/', getUsers);
userRouter.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
userRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
    email: Joi.string().email(),
    password: Joi.string().min(userSchemaConstants.passwordMinLength),
  }),
}), createUser);

module.exports = userRouter;
