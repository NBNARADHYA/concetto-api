const pool = require('../db');

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
