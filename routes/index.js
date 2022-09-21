const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');
const { login, createUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');

module.exports = function useMainRouter(app) {
  app.post('/signin', login);
  app.post('/signup', createUser);

  app.use(auth);

  app.use('/users', userRouter);
  app.use('/cards', cardRouter);
};
