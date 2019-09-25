<<<<<<< HEAD
const pool = require('../db');
=======
const { pool } = require('../db');
>>>>>>> e112aa9905e020248fb1933189b4b8b300d0970a
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
          `INSERT INTO users_events_teams_map (user,event) VALUES(?,?)`,
          [email, event],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        );
      })
      .catch(error => reject(error));
  });
}

module.exports = register;
