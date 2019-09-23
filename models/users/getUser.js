const { pool } = require('../db');

/**
 *
 * @param {String} param0.email
 * @return {Promise}
 */
function getUser(email) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT email,phone,admin,college,name FROM users WHERE email=?`,
      [email],
      (error, results) => {
        if (error || !results.length) {
          return reject('User not found');
        }
        return resolve(results[0]);
      }
    );
  });
}

module.exports = getUser;
