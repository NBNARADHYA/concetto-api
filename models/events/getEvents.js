const {pool} = require('../db');

/**
 * @return {Promise}
 */


function getEvents() {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM events`,
      (error, results) => {
        if (error) {
          console.log('error occured');
          return reject(error);
        }
        console.log('success');
        return resolve(results);
      }
    );
  });
}

module.exports = getEvents;