const userRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/userController');

userRouter.get('/me', getProfile);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateProfileAvatar);

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);

module.exports = userRouter;
