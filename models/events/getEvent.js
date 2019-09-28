const { pool } = require('../db');

/**
 *
 * @param {String} event
 * @return {Promise}
 */
function getEvent(event) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT e.name,e.is_team,max_participents,e.dept,e.description,e.is_club,
      e.about,e.rules,e.prizes,e.img,e.fee,e.start,e.end,e.scores,e.club,map.user,u.phone 
      FROM events e
      INNER JOIN admin_events_map map ON map.event = e.name
      INNER JOIN users u ON u.email = map.user WHERE e.name=?`,
      [event],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getEvent;
