const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [ 
      context => {
        console.log(context);
      },
      hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId'})
    ],
    get: [
      // hooks.restrictToOwner({ ownerField: 'ownerId' }),
    ],
    create: [
      hooks.setField({ from: 'params.user._id', as: 'data.ownerId'})
      // hooks.associateCurrentUser({ as: 'ownerId' }),
    ],
    update: [
      // hooks.restrictToOwner({ ownerField: 'ownerId' }),
    ],
    patch: [
      // hooks.restrictToOwner({ ownerField: 'ownerId' }),
    ],
    remove: [
      // hooks.restrictToOwner({ ownerField: 'ownerId' }),
    ]
  },

  after: {
    all: [],
    find: [context => {
      console.log('ACHOU', context);
    }],
    get: [
      context => {
        console.log('ACHOU', context);
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
