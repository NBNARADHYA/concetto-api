const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.adminEmail
 * @return {Promise}
 */
function makeAdmin({ email, admin_email: adminEmail }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET super_admin=? WHERE email=? AND 
                (SELECT s_admin FROM
                  (SELECT super_admin as s_admin FROM users WHERE email=?)
                  AS s_a)`,
      [1, adminEmail, email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.changedRows) {
          return reject('Unauthorized');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = makeAdmin;
