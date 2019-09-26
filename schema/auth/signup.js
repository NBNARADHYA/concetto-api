const schema = {
  required: ['email', 'name', 'password', 'phone'],
  properties: {
    email: {
      type: 'string',
      pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    },
    name: { type: 'string' },
    password: { type: 'string', format: 'password' },
    phone: { type: 'number', minLength: 10, maxLength: 10 },
    college: { type: 'string' }
  },
  errorMessage: {
    required: {
      email: 'Email required',
      name: 'Name required',
      password: 'Password required',
      phone: 'Phone required'
    },
    properties: {
      email: 'Invalid email',
      name: 'Invalid name',
      password: 'Invalid password',
      phone: 'Invalid phone',
      college: 'Invalid college'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
