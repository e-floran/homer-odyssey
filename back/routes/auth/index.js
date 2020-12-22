const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('I am in POST signup');
});

module.exports = router;
