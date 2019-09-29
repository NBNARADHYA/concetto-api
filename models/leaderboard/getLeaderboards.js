const { pool } = require('../db');

/**
 * @return {Promise}
 */
function getLeaderboards() {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT email,name,score,college FROM users ORDER BY score DESC LIMIT ?`,
      [parseInt(process.env.NUM_TOP_LEADERBOARD)],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getLeaderboards;
