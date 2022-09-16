const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');

module.exports = function useMainRouter(app) {
  app.use('/users', userRouter);
  app.use('/cards', cardRouter);
};
