const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {Array} param0.events
 * @param {String} param0.email
 * @return {Promise}
 */
function addEvents({ events, email }) {
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
        let query = `INSERT INTO events (name,is_team,max_participents,dept
                    ,description,is_club,about,rules,prizes,img,fee,start,end,scores) `;
        let vals = [];
        for (let i = 0; i < events.length; i++) {
          if (!i) {
            query += `(SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,? FROM dual WHERE (
              SELECT super_admin FROM users WHERE email=?
              ))`;
          } else {
            query += `,(SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,? FROM dual WHERE (
              SELECT super_admin FROM users WHERE email=?
              ))`;
          }
          const {
            name,
            is_team: isTeam,
            max_participents: maxParticipents,
            dept,
            description,
            is_club: isClub,
            about,
            rules,
            img,
            prizes,
            fee,
            start,
            end,
            scores
          } = events[i];
          vals.push(
            name,
            isTeam,
            maxParticipents,
            dept,
            description,
            isClub,
            about,
            rules,
            prizes,
            img,
            fee,
            start,
            end,
            scores
          );
          vals.push(email);
        }
        connection.query(query, vals, (error, results) => {
          if (error) {
            return connection.rollback(() => {
              connection.release();
              return reject(error);
            });
          }
          if (!results.affectedRows) {
            return connection.rollback(() => {
              connection.release();
              return reject('Unauthorized');
            });
          }
          vals = [];
          query = `INSERT INTO admin_events_map (user,event) VALUES `;
          for (let i = 0; i < events.length; i++) {
            const { admins, name } = events[i];
            for (let j = 0; j < admins.length; j++) {
              if (!i && !j) {
                query += `(?,?)`;
              } else {
                query += `,(?,?)`;
              }
              vals.push(admins[j], name);
            }
          }
          connection.query(query, vals, (error, results) => {
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
          });
        });
      });
    });
  });
}

module.exports = addEvents;
