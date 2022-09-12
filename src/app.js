const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const useMainRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useMainRouter(app);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening on port ${PORT}`);
});
