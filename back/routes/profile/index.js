const express = require('express');

const router = express.Router();
const passport = require('passport');
const connection = require('../../config');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    connection.query(
      'SELECT email, name, lastname FROM users WHERE email = ?',
      req.user.email,
      (err, results) => {
        if (err) {
          res
            .status(401)
            .json({ flash: 'you are not authorized to access this page' });
        } else {
          const { email, name, lastname } = results[0];
          res.json({
            email,
            name,
            lastname,
          });
        }
      },
    );
  },
);

module.exports = router;
