const leaderboard = require('../../models/leaderboard');
const middleware = require('../auth/middlewares');
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/**
 *
 * @param {Array} errArray
 * @return {String}
 */

router.get('/leaderboard', middleware.verifyAccessToken, (req, res) => {
  leaderboard
    .getLeaderBoard()
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Some Error') {
        return res.status(404).json({
          success: false,
          error,
          results: null
        });
      }
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});
