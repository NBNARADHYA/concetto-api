const authRouter = require('./auth');
const userRouter = require('./users');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
