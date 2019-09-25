const events = require('../../models/event-client');
const express = require('express');
const router = express.Router();
const ajv = require('../../models/db');
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));

router.get('/events', (req, res) => {
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

router.get('/events/:event_name', (req, res) => {
  events
    .getEvent(req.param.event_name)
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