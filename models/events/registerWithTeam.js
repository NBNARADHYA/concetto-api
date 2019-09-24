/* eslint-disable no-async-promise-executor */
const { pool } = require('../db');
const isRegistered = require('./isRegistered');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.event
 * @param {String} param0.team
 * @param {String} param0.pass
 * @return {Promise}
 */
function registerWithTeam({ email, event, team, pass }) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isRegistered(email, event);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      return reject('User already registered');
    }
    pool.getConnection((error, connection) => {
      if (error) {
        connection.release();
        return reject(error);
      }
      connection.query(
        `UPDATE teams SET member_count = member_count + 1 WHERE member_count < (SELECT max_participents FROM events WHERE name=?) AND name=? AND event=? AND pass=?`,
        [event, team, event, pass],
        (error, results) => {
          if (error) {
            return connection.rollback(() => {
              connection.release();
              return reject(error);
            });
          }
          if (!results.changedRows) {
            return connection.rollback(() => {
              connection.release();
              return reject('Could not join the team');
            });
          }
          connection.query(
            `INSERT INTO users_events_teams_map (user,event,team) VALUES(?,?,?)`,
            [email, event, team],
            (error, results) => {
              if (error) {
                return connection.rollback(() => {
                  connection.release();
                  return reject(error);
                });
              }
              connection.commit(error => {
                if (error) {
                  return connection.rollback(() => {
                    connection.release();
                    return reject(error);
                  });
                }
                connection.release();
                return resolve(results);
              });
            }
          );
        }
      );
    });
  });
}

module.exports = registerWithTeam;
