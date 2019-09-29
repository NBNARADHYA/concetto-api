const express = require('express');
const router = express.Router();
const ajv = require('../../schema');
router.use(express.json());
router.use(
  express.urlencoded({
    extended: false
  })
);
const leaderboard = require('../../models/leaderboard');

const { getLeaderboardsSchema } = require('../../schema/leaderboard');

/**
 *
 * @param {Array} errArray
 * @return {String}
 */
function sumErrors(errArray) {
  const cb = (a, b) => a + b.message + ', ';
  return errArray.reduce(cb, '');
}

router.get('/', (req, res) => {
  leaderboard
    .getLeaderboards()
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.get('/:event_name', (req, res) => {
  let validate = ajv.compile(getLeaderboardsSchema);
  let valid = validate({ event: req.params.event_name });
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  leaderboard
    .getLeaderboard(req.params.event_name)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

module.exports = router;
