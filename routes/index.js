const authRouter = require('./auth');
const userRouter = require('./users');
const eventsRouter = require('./events');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/events', eventsRouter);

module.exports = router;
