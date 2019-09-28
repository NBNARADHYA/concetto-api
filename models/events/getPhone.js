const { pool } = require('../db');

function getPhone(email) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT u.name AS name, u.phone AS phone, m1.event AS event
       FROM users u
        INNER JOIN users_events_teams_map m1 ON u.email = m1.user
        INNER JOIN admin_events_map m2 ON m2.event = m1.event AND m2.user=?
       ORDER BY event
      `,
      [email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.length) {
          return reject('User is not admin of any event');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getPhone;
