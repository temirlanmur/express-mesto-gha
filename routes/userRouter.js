const userRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.get('/me', getProfile);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateProfileAvatar);

module.exports = userRouter;
