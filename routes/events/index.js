const events = require('../../models/events');
const middleware = require('../auth/middlewares');
const express = require('express');
const router = express.Router();
const ajv = require('../../schema');
router.use(express.json());
router.use(
  express.urlencoded({
    extended: false
  })
);

const {
  registerEventSchema,
  registerTeamSchema,
  registerWithTeamSchema,
  getPhoneSchema,
  addTeamWinnersSchema,
  addIndividualWinnersSchema,
  addEventsSchema
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
);

router.get('/phone', middleware.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(getPhoneSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  events
    .getPhone(req.body.email)
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

router.get('/', (req, res) => {
  events
    .getEvents()
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
  events
    .getEvent(req.params.event_name)
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
router.post(
  '/:event_name/winners',
  middleware.verifyAccessToken,
  (req, res) => {
    if (!req.params.event_name) {
      return res.status(400).json({
        success: false,
        error: 'Event name required',
        results: null
      });
    }
    req.body.event = req.params.event_name;
    if (req.query.team) {
      let validate = ajv.compile(addTeamWinnersSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: sumErrors(validate.errors),
          results: null
        });
      }
      events
        .addTeamWinners(req.body)
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
      let validate = ajv.compile(addIndividualWinnersSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: sumErrors(validate.errors),
          results: null
        });
      }
      events
        .addIndividualWinners(req.body)
        .then(results => {
          return res.status(200).json({
            success: true,
            error: null,
            results
          });
        })
        .catch(error => {
          if (error == 'Unauthorized') {
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
    }
  }
);

router.post('/add_events', middleware.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(addEventsSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  events
    .addEvents(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error == 'Unauthorized') {
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
