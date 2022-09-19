import feathersClient, { makeServicePlugin, BaseModel } from '../../plugins/feathers-client';

class List extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'List'

  // Define default properties here
  static instanceDefaults() {
    return {
      name: 'List 0',
      order: 0,
      archived: false,
      boardId: '',
    };
  }
}

const servicePath = 'lists';
const servicePlugin = makeServicePlugin({
  Model: List,
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
    find: [
      // context => { context.result.data[0].name = 'Edson'; }
    ],
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
