// Application hooks that run for every service
// const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [
      // hooks.restrictToOwner({ ownerField: 'ownerId' }),
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
