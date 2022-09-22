require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const useMainRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const { NODE_ENV, PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganFormat = NODE_ENV === 'development' ? 'dev' : 'common';
app.use(morgan(morganFormat));

useMainRouter(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(
    `WARNING! App has been launched in ${NODE_ENV.toUpperCase()} mode\nIt is listening to the port ${PORT}`,
  );
});
