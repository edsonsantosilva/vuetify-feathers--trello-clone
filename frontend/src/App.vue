<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-container fluid class="pa-0">
        <v-row class="justify-start align-center">
          <v-col class="pa-0 pl-2" cols="auto" @click="$router.push('/')">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </v-col>
          <v-col class="pa-0" cols="auto" @click="$router.push('/')">
            <v-img
              alt="Vuetify Name"
              class="shrink mt-1 hidden-sm-and-down"
              contain
              min-width="100"
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
              width="100"
            />
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-switch
              v-model="$vuetify.theme.dark"
              color="black"
              hide-details
              class="mr-2"
              inset
              :label="selectedTheme"
            />
          </v-col>
          <v-col cols="auto">
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
          </v-col>
          <v-col cols="auto">
            <v-btn
              :to="{ name: 'login'}"
              text
            >
              <span class="mr-2">Login</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="">
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
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    User: () => models.api.User,
    currentUser: vm => (vm.isAuthenticated ? vm.user : new vm.User()),
    selectedTheme: vm => (vm.$vuetify.theme.dark ? 'Dark' : 'Light')
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    changeColor() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
