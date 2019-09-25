module.exports = {
  required: ['event', 'email', 'team', 'pass'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
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
