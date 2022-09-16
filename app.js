const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const useMainRouter = require('./routes');
// const authorization = require('./utils/authorization');
const errorHandler = require('./utils/errorHandler');
const notFoundHandler = require('./utils/notFoundHandler');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(authorization);
app.use((req, res, next) => {
  req.user = {
    _id: '631efb2d9a828dce250c0779',
  };

  next();
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

useMainRouter(app);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening on port ${PORT}`);
});
