const pool = require('../db');

/**
 * @return {Promise}
 */
function getEvents() {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT name,about,img FROM events`,
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

module.exports = getEvents;
