module.exports = {
  required: ['event', 'email'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      patter: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    }
  },
  errorMessage: {
    required: {
      email: 'Email required',
      event: 'Event name required'
    },
    properties: {
      email: 'Email invalid',
      event: 'Event name invalid'
    },
    _: 'Invalid data'
  }
};
