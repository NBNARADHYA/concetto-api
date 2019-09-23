const { pool } = require('../db');
const bcrypt = require('bcryptjs');
/**
 *
 * @param {String} param0.email
 * @param {String} param0.password
 * @return {Promise}
 */
function isCorrect(email, password) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT password FROM users WHERE email=? AND is_email_verified=?`,
      [email, 1],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.length) {
          return reject('Account does not exist or email not verified');
        }
        bcrypt.compare(password, results[0].password, (error, res) => {
          if (error) {
            return reject(error);
          }

          if (!res) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        });
      }
    );
  });
}

module.exports = isCorrect;
