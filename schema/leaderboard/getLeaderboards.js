module.exports = {
  required: ['event'],
  properties: {
    event: {
      type: 'string'
    }
  },
  errorMessage: {
    properties: {
      event: 'event invalid'
    },
    required: {
      event: 'event required'
    },
    _: 'Invalid data'
  }
};
