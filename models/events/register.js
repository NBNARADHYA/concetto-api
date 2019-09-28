const { pool } = require('../db');
const isRegistered = require('./isRegistered');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.event
 */
function register({ email, event }) {
  return new Promise((resolve, reject) => {
    isRegistered(email, event)
      .then(results => {
        if (results) {
          return reject('User already registered to the event');
        }
        pool.query(
          `INSERT INTO users_events_teams_map (user,event)
          SELECT ?,? FROM dual WHERE (SELECT is_team FROM events WHERE name=?) = 0
          `,
          [email, event, event],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            if (!results.affectedRows) {
              return reject(
                'Not an individual event. Join a team or create your own'
              );
            }
            return resolve(results);
          }
        );
      })
      .catch(error => reject(error));
  });
}

module.exports = register;
