const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @return {Promise}
 */

function verifyEmail({ email }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET is_email_verified=? WHERE email=?`,
      [1, email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.changedRows) {
          return reject('There is no account linked with this email');
        }
        return resolve('Email verified');
      }
    );
  });
}

module.exports = verifyEmail;
