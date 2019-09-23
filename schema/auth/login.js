const schema = {
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    },
    password: { type: 'string', format: 'password' }
  },
  errorMessage: {
    required: {
      email: 'email required',
      password: 'Password required'
    },
    properties: {
      email: 'Invalid email',
      password: 'Invalid password'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
