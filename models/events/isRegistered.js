<<<<<<< HEAD
const pool = require('../db');
=======
const { pool } = require('../db');
>>>>>>> e112aa9905e020248fb1933189b4b8b300d0970a

/**
 *
 * @param {String} email
 * @param {String} event
 * @return {Promise}
 */
function isRegistered(email, event) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(user) AS count FROM users_events_teams_map WHERE user=? AND event=?`,
      [email, event],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(Boolean(results[0].count));
      }
    );
  });
}

module.exports = isRegistered;
