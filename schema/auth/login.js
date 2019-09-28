const schema = {
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      patter: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
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
