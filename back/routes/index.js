const express = require('express');

const router = express.Router();

const authRouter = require('./auth');

router.get('/', (req, res) => {
  res.send('youhou');
});

router.use('/auth', authRouter);

module.exports = router;
