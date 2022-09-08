<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-btn
        v-if="!isAuthenticated"
        :to="{ name: 'signup'}"
        text
      >
        <span class="mr-2">Signup</span>
      </v-btn>
      <v-btn
        v-else
        text
      >
        <span class="mr-2">{{ currentUser.displayName }}</span>
      </v-btn>
      <v-btn
        :to="{ name: 'login'}"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main class="grey darken-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { models } from 'feathers-vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    User: () => models.api.User,
    currentUser: vm => (vm.isAuthenticated ? vm.user : new vm.User())
  }
};
</script>
