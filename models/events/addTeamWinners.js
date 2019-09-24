const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.event
 * @param {String} param0.first
 * @param {String} param0.second
 * @param {String} param0.third
 * @return {Promise}
 */
function addTeamWinners({ email, event, first, second, third }) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(error => {
        if (error) {
          connection.release();
          return reject(error);
        }
        let winners = JSON.stringify({ first, second, third });
        connection.query(
          `UPDATE events SET winners=? WHERE is_team=? AND name=? AND 
              name=(SELECT event FROM admin_events_map WHERE user=?)`,
          [winners, 1, event, email],
          (error, results) => {
            if (error) {
              return connection.rollback(() => {
                connection.release();
                return reject(error);
              });
            }
            if (!results.changedRows) {
              connection.release();
              return reject('Unauthorized');
            }
            connection.query(
              `SELECT scores FROM events WHERE name=?`,
              [event],
              (error, results) => {
                if (error) {
                  return connection.rollback(() => {
                    connection.release();
                    return reject(error);
                  });
                }
                let scores = JSON.parse(results[0].scores);
                connection.query(
                  `UPDATE users
                            SET score = CASE
                                            WHEN email IN 
                                            (SELECT user FROM users_events_teams_map WHERE team=?) THEN ?
                                            WHEN email = IN
                                            (SELECT user FROM users_events_teams_map WHERE team=?) THEN ?
                                            ELSE ?`,
                  [first, scores.first, second, scores.second, scores.third],
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
                        return reject('User(s) not found');
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
          }
        );
      });
    });
  });
}

module.exports = addTeamWinners;
