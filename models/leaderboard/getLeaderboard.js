const { pool } = require('../db');

/**
 * @param {String} event
 * @return {Promise}
 */
function getLeaderboard(event) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT is_team FROM events WHERE name=?`,
      [event],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        let query = ``;
        let arr = [];
        if (results[0].is_team) {
          query += `SELECT 
                      e.winners->>'$.first' first,e.winners->>'$.second' second,
                      e.winners->>'$.third' third,u.email,u.name,u.college FROM 
                      (events e
                        INNER JOIN users_events_teams_map map ON (e.name = map.event AND
                          (map.team IN (e.winners->>'$.first',e.winners->>'$.second',e.winners->>'$.third')))
                        INNER JOIN users u ON u.email = map.user
                      )
                    WHERE name=? `;
        } else {
          query += `
                  SELECT 
                  e.winners->>'$.first' first,e.winners->>'$.second' second,
                  e.winners->>'$.third' third,u.email,u.name,u.college
                FROM (events e
                  INNER JOIN users_events_teams_map map ON (map.event = e.name AND 
                    (map.user IN (e.winners->>'$.first',e.winners->>'$.second',e.winners->>'$.third')))
                  INNER JOIN users u ON u.email = map.user) WHERE e.name = ?`;
        }
        arr.push(event, event, event);
        pool.query(query, arr, (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        });
      }
    );
  });
}

module.exports = getLeaderboard;
