module.exports = {
  required: ['event', 'email', 'team', 'pass'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    },
    team: {
      type: 'string'
    },
    pass: {
      type: 'string',
      format: 'password'
    }
  },
  errorMessage: {
    required: {
      email: 'Email required',
      event: 'Event name required',
      team: 'Team name requried',
      pass: 'Team password required'
    },
    properties: {
      email: 'Email invalid',
      event: 'Event name invalid',
      team: 'Team name invalid',
      pass: 'Team password invalid'
    },
    _: 'Invalid data'
  }
};
