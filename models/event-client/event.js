const pool = require('../db');

/**
 *
 * @param {String} event
 * @return {Promise}
 */
function getEvent(event) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM events WHERE name=?`,
      [event],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(Boolean(results[0].count));
      }
    );
  });
}

module.exports = getEvent;