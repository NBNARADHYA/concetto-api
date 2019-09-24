module.exports = {
  required: ['event', 'email', 'first', 'second', 'third'],
  properties: {
    event: {
      type: 'string'
    },
    email: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    },
    first: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    },
    second: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    },
    third: {
      type: 'string',
      patter:
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
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
