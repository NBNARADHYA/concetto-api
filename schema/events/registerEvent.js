module.exports = {
  required: ['event', 'email'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
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
