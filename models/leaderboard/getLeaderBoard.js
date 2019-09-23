const { pool } = require('../db');
/**
 *
 * @return {Promise}
 */
function getLeaderBoard() {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT email,phone,admin,college,name,score FROM users ORDER BY score DESC LIMIT 10`,
      (error, results) => {
        if (error || !results.length) {
          return reject('Some Error');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getLeaderBoard;
