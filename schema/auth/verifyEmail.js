module.exports = {
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
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
