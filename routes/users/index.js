const users = require('../../models/users');
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

router.get('/:email', middleware.verifyAccessToken, (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(404).json({
      success: false,
      error: 'Not found',
      results: null
    });
  }
  users
    .getUser(email)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'User not found') {
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

module.exports = router;
