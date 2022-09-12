const userRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
