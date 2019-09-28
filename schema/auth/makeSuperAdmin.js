const schema = {
  required: ['email', 'admin_email'],
  properties: {
    email: {
      type: 'string',
      patter: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    },
    admin_email: {
      type: 'string',
      patter: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    }
  },
  errorMessage: {
    required: {
      email: 'email required',
      admin_email: 'admin_email required'
    },
    properties: {
      email: 'Invalid email',
      admin_email: 'Invalid admin_email'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
