const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const connection = require('./config');

const port = process.env.PORT || 5000;

const app = express();
const routes = require('./routes');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, cb) => {
      connection.query(
        'SELECT * FROM users WHERE email = ?',
        email,
        (err, results) => {
          if (err) {
            return cb(err);
          }
          if (results[0] === undefined) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
          if (bcrypt.compareSync(password, results[0].password)) {
            const user = { email };
            return cb(null, user, { message: 'User sign in!' });
          }
          return cb(null, false, { message: 'Incorrect password.' });
        },
      );
    },
  ),
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    (jwtPayload, cb) => cb(null, jwtPayload),
  ),
);
