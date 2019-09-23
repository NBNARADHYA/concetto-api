const authRouter = require('./auth');
const userRouter = require('./users');
const LeaderBoardRouter = require('./leaderboard');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/leaderboard', LeaderBoardRouter);

module.exports = router;
