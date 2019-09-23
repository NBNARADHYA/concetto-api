const events = require('../../models/events');
const middleware = require('../auth/middlewares');
const express = require('express');
const router = express.Router();
const ajv = require('../../models/db');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const {
  registerEventSchema,
  registerTeamSchema,
  registerWithTeamSchema
} = require('../../schema/events');

/**
 *
 * @param {Array} errArray
 * @return {String}
 */
function sumErrors(errArray) {
  const cb = (a, b) => a + b.message + ', ';
  return errArray.reduce(cb, '');
}

router.post(
  '/:event_name/register',
  middleware.verifyAccessToken,
  (req, res) => {
    req.body.event = req.params.event_name;
    if (!req.query.team) {
      let validate = ajv.compile(registerEventSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: sumErrors(validate.errors),
          results: null
        });
      }
      events
        .register(req.body)
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
    } else {
      let validate = ajv.compile(registerWithTeamSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: sumErrors(validate.errors),
          results: null
        });
      }
      events
        .registerWithTeam(req.body)
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
    }
  }
);

router.post(
  '/:event_name/team/register',
  middleware.verifyAccessToken,
  (req, res) => {
    req.body.event = req.params.event_name;
    let validate = ajv.compile(registerTeamSchema);
    let valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: sumErrors(validate.errors),
        results: null
      });
    }
    events
      .registerTeam(req.body)
      .then(results => {
        return res.status(200).json({
          success: true,
          error: null,
          results: results
        });
      })
      .catch(error => {
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  }
);
