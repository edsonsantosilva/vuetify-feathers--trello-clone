import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
