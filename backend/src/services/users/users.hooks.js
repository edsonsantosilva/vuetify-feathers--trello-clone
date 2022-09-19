const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const wait = () => (
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);
module.exports = {
  before: {
    all: [wait],
    find: [],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
