import Vue from 'vue';
import Vuex from 'vuex';

import { FeathersVuex, makeAuthPlugin } from '../plugins/feathers-client';

Vue.use(Vuex);
Vue.use(FeathersVuex);

const auth = makeAuthPlugin({ userService: 'users' });
const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
);
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    clearStore(context) {
      context.commit('boards/clearAll');
      context.commit('lists/clearAll');
      context.commit('tasks/clearAll');
    }
  },
  plugins: [...servicePlugins, auth]
});
