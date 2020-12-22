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
        console.log(err);
        results.status(500).send('Error saving new user');
      } else {
        res.status(200).send('Successfully saved');
      }
    },
  );
});

module.exports = router;
