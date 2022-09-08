import feathersClient, { makeServicePlugin, BaseModel } from '../../plugins/feathers-client';

class User extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User'

  // Define default properties here
  static instanceDefaults() {
    return {
      username: '',
      email: '',
      password: '',
      displayName: '',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
    };
  }
}

const servicePath = 'users';
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
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
});

export default servicePlugin;
