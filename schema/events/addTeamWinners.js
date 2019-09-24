module.exports = {
  required: ['event', 'email', 'first', 'second', 'third'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      patter: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    },
    first: {
      type: 'string'
    },
    second: {
      type: 'string'
    },
    third: {
      type: 'string'
    }
  },
  errorMessage: {
    required: {
      email: 'Email required',
      event: 'Event name required',
      first: 'first required',
      second: 'second required',
      third: 'third required'
    },
    properties: {
      email: 'Email invalid',
      event: 'Event name invalid',
      first: 'Invalid first',
      second: 'Invalid second',
      third: 'Invalid third'
    },
    _: 'Invalid data'
  }
};
