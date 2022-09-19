import feathersClient, { makeServicePlugin, BaseModel } from '../../plugins/feathers-client';

class Task extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Task'

  // Define default properties here
  static instanceDefaults() {
    return {
      name: 'Task',
      order: 0,
      listId: '',
    };
  }
}

const servicePath = 'tasks';
const servicePlugin = makeServicePlugin({
  Model: Task,
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
