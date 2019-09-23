const { pool } = require('../db');
/**
 * @param {String} param0.eventname
 * @return {Promise}
 */
function getEventLeaderboard(eventname) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT name,email,phone,rank FROM users_events_map ORDER BY rank ASC LIMIT 5 WHERE event=?`,
      [eventname],
      (error, results) => {
        if (error || !results.length) {
          return reject('Event Not Found');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getEventLeaderboard;
