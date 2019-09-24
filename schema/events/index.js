const ajv = require('../index');

ajv.addFormat('password', password => {
  return password.length >= 8;
});

const registerEventSchema = require('./registerEvent');
const registerTeamSchema = require('./registerTeam');
const registerWithTeamSchema = require('./registerWithTeam');
const getPhoneSchema = require('./getPhone');
const addIndividualWinnersSchema = require('./addIndividualWinners');
const addTeamWinnersSchema = require('./addTeamWinners');

module.exports = {
  registerEventSchema,
  registerTeamSchema,
  registerWithTeamSchema,
  getPhoneSchema,
  addIndividualWinnersSchema,
  addTeamWinnersSchema
};
