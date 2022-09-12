const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const useMainRouter = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '631efb2d9a828dce250c0779',
  };

  next();
});

useMainRouter(app);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening on port ${PORT}`);
});
