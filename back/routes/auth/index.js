const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const connection = require('../../config');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, firstname, lastname } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  try {
    const results = await connection.query(
      'INSERT INTO users(email, password, firstname, lastname) VALUES (?,?,?,?)',
      [email, password, firstname, lastname],
    );
    res.status(201).json({ flash: 'User has been signup !' });
    console.log(results);
  } catch (error) {
    res.status(500).json({ flash: error.message });
  }
});

router.post('/signin', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    const token = jwt.sign(user, process.env.SECRET);
    return res.json({ user, token, flash: 'User connected' });
  })(req, res);
});

module.exports = router;
