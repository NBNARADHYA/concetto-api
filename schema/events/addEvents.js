module.exports = {
  type: 'object',
  required: ['email', 'events'],
  properties: {
    email: {
      type: 'string',
      pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    },
    events: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          is_team: {
            type: 'number',
            oneOf: [{ const: 1 }, { const: 0 }]
          },
          max_participents: { type: 'number' },
          dept: { type: 'string' },
          description: { type: 'string' },
          is_club: {
            type: 'number',
            oneOf: [{ const: 1 }, { const: 0 }]
          },
          about: { type: 'string' },
          rules: { type: 'string' },
          img: { type: 'string' },
          prizes: { type: 'string' },
          fee: { type: 'number' },
          start: { type: 'string' },
          end: { type: 'string' },
          scores: {
            type: 'object',
            required: ['first', 'second', 'third'],
            properties: {
              first: { type: 'number' },
              second: { type: 'number' },
              third: { type: 'number' }
            }
          },
          admins: {
            type: 'array',
            items: {
              type: 'string',
              pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
            }
          },
          club: { type: 'string' }
        },
        if: {
          properties: {
            is_club: {
              type: 'number',
              oneOf: [{ const: 1 }]
            }
          }
        },
        then: {
          required: [
            'name',
            'is_team',
            'max_participents',
            'dept',
            'description',
            'is_club',
            'about',
            'rules',
            'img',
            'prizes',
            'fee',
            'start',
            'end',
            'scores',
            'admins',
            'club'
          ]
        },
        else: {
          required: [
            'name',
            'is_team',
            'max_participents',
            'dept',
            'description',
            'is_club',
            'about',
            'rules',
            'img',
            'prizes',
            'fee',
            'start',
            'end',
            'scores',
            'admins'
          ]
        }
      }
    }
  },
  errorMessage: {
    required: {
      email: 'email required',
      events: 'events array required'
    },
    properties: {
      email: 'Invalid email',
      events: 'Invalid events'
    },
    _: 'Invalid data'
  }
};
