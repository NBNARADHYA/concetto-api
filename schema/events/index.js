const ajv = require('../index');

ajv.addFormat('password', password => {
  return password.length >= 8;
});

const registerEventSchema = require('./registerEvent');
const registerTeamSchema = require('./registerTeam');
const registerWithTeamSchema = require('./registerWithTeam');
<<<<<<< HEAD
=======
const getPhoneSchema = require('./getPhone');
>>>>>>> e112aa9905e020248fb1933189b4b8b300d0970a

module.exports = {
  registerEventSchema,
  registerTeamSchema,
<<<<<<< HEAD
  registerWithTeamSchema
=======
  registerWithTeamSchema,
  getPhoneSchema
>>>>>>> e112aa9905e020248fb1933189b4b8b300d0970a
};
