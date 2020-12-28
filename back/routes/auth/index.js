const express = require('express');
const connection = require('../../config');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  connection.query(
    'INSERT INTO users (email, password, firstname, lastname) VALUES (?,?,?,?)',
    [email, password, firstname, lastname],
    (err, results) => {
      if (err) {
        results.status(500).json({ flash: err.message });
      } else {
        res.status(200).json({ flash: 'User has been signed up !' });
      }
    },
  );
});

module.exports = router;
