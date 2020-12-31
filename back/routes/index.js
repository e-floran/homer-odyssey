const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const profileRouter = require('./profile');

router.get('/', (req, res) => {
  res.send('youhou');
});

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

module.exports = router;
