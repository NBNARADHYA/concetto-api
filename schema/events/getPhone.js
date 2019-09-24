module.exports = {
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      pattern:
        '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
    }
  },
  errorMessage: {
    required: {
      email: 'Email requried'
    },
    properties: {
      email: 'Invalid email'
    },
    _: 'Invalid email'
  }
};
