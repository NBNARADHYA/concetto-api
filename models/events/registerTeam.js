/* eslint-disable no-async-promise-executor */
<<<<<<< HEAD
const pool = require('../db');
=======
const { pool } = require('../db');
>>>>>>> e112aa9905e020248fb1933189b4b8b300d0970a
const isRegistered = require('./isRegistered');

/**
 *
 * @param {String} event
 * @param {String} team
 */
function isTeamNameTaken(event, team) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(name) AS count FROM teams WHERE name=? AND event=?`,
      [team, event],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(Boolean(results[0].count));
      }
    );
  });
}

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.event
 * @param {String} param0.team
 * @param {String} param0.pass
 * @return {Promise}
 */
function registerTeam({ email, event, team, pass }) {
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
    try {
      ans = await isTeamNameTaken(event, team);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      return reject('Team name already taken');
    }
    pool.getConnection((error, connection) => {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(error => {
        if (error) {
          return reject(error);
        }
        connection.query(
          `INSERT INTO teams (name,leader,event,pass) VALUES(?,?,?,?) WHERE (SELECT is_team FROM events WHERE name=?)`,
          [team, email, event, pass, event],
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
                return reject('Not a team event');
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
  });
}

module.exports = registerTeam;
