const express = require('express');
const connection = require('../../config');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
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

module.exports = router;
