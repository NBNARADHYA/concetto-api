const jwt = require('jsonwebtoken');

/**
 * @typedef {import { Request } from "express";} Request
 * @typedef {import { Response } from "express";} Response
 * @typedef {import { next } from "express";} Next
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function verifyAccessToken(req, res, next) {
  if (req.headers.access_token) {
    jwt.verify(
      req.headers.access_token,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          res.status(401).json({
            success: false,
            error,
            results: null
          });
          return;
        }
        req.body.email = decoded.email;
        next();
      }
    );
  } else {
    res.status(401).json({
      success: false,
      error: 'Access code not included in the header of the request',
      results: null
    });
    return;
  }
}

module.exports = verifyAccessToken;
