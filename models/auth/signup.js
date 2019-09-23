/* eslint-disable no-async-promise-executor */
const bcrypt = require('bcryptjs');
const { pool } = require('../db');
const { email } = require('../../utils');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.name
 * @param {String} param0.password
 * @param {Number} param0.phone
 * @param {Number} param0.college
 * @return {Promise}
 *
 */
function signup({ name, email: emailId, password, phone, college }) {
  return new Promise(async (resolve, reject) => {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
      if (error) {
        return reject(error);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }
        pool.query(
          `INSERT INTO users (name,email,password,college, 
            phone) VALUES(?,?,?,?,?)`,
          [name, emailId, hash, college, phone],
          error => {
            if (error) {
              return reject(error);
            }
            jwt.sign(
              { email },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '72h' },
              (error, accessToken) => {
                if (error) {
                  return reject(error);
                }
                let subject = 'Email verification';
                const PORT = process.env.PORT || 8080;
                let html = `<p>Hello ${name} !</p>
                          <p>Click on the following link to verify your email</p>
                          <p>This link expires in 72 hours</p>
                          <a href='http://${process.env.HOST_NAME}:${PORT}/auth/verify_email?access_token=${accessToken}'>Verify your email</a>`;
                email(emailId, subject, html);
                return resolve(
                  'Account created. Please activate your account from the email sent.'
                );
              }
            );
          }
        );
      });
    });
  });
}

module.exports = signup;
