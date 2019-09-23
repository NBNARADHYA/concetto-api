/* eslint-disable no-async-promise-executor */
const jwt = require('jsonwebtoken');
const isCorrect = require('./isCorrect');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @param {String} param0.password
 * @return {Promise}
 */
function login({ email, password }) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isCorrect(email, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '48h' },
        (error, accessToken) => {
          if (error) {
            return reject(error);
          }
          return resolve({ email, access_token: accessToken });
        }
      );
    } else {
      return reject('Password incorrect');
    }
  });
}

module.exports = login;
