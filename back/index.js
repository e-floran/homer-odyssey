// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connection = require('./config');

const { port } = connection.config;

const app = express();
const routes = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(path.join(__dirname, 'public'));

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
