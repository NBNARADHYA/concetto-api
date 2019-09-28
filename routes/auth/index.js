const auth = require('../../models/auth');
const middleware = require('../auth/middlewares');
const ajv = require('../../schema');
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const {
  signupSchema,
  loginSchema,
  updatePasswordSchema,
  verifyEmailSchema
} = require('../../schema/auth');

/**
 *
 * @param {Array} errArray
 * @return {String}
 */
function sumErrors(errArray) {
  const cb = (a, b) => a + b.message + ', ';
  return errArray.reduce(cb, '');
}

router.post('/signup', (req, res) => {
  let validate = ajv.compile(signupSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .signup(req.body)
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

router.post('/login', (req, res) => {
  let validate = ajv.compile(loginSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .login(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Password incorrect') {
        return res.status(401).json({
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

router.get('/verify_email', middleware.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(verifyEmailSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .verifyEmail(req.body)
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

router.post('/update_password', middleware.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(updatePasswordSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .updatePassword(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Password incorrect') {
        return res.status(401).json({
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
