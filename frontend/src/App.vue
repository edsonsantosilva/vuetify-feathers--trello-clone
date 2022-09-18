<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-container fluid class="pa-0">
        <v-row class="justify-start align-center">
          <v-col class="pa-0 pl-2" cols="auto" @click="$router.push({ name: 'home'})">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </v-col>
          <v-col class="pa-0" cols="auto" @click="$router.push({ name: 'home' })">
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
            <v-menu v-else offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ currentUser.displayName }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <v-list-item-title @click="goToRoute(item.route)">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="auto">
            <v-btn
              v-if="!isAuthenticated"
              :to="{ name: 'login'}"
              text
            >
              <span class="mr-2">Login</span>
            </v-btn>
            <v-btn
              v-else
              :loading="loggingOut"
              text
              @click="logout"
            >
              <span class="mr-2">Logout</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view class="pa-0" />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { models } from 'feathers-vuex';

export default {
  name: 'App',

  data: () => ({
    loggingOut: false,
    items: [
      { title: 'Boards', route: 'boards' },
      { title: 'Settings', route: 'settings' }
    ]
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    User: () => models.api.User,
    currentUser: vm => (vm.isAuthenticated ? vm.user : new vm.User()),
    selectedTheme: vm => (vm.$vuetify.theme.dark ? 'Dark' : 'Light')
  },
  async created() {
    this.$vuetify.theme.dark = true;
    try {
      await this.authenticate();
    } catch (error) {
      console.log('created app.vue', error);
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    changeColor() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    async logout() {
      this.loggingOut = true;
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.replace({ name: 'login' });
      } catch (error) {
        console.error('An error happened during logout', error);
      }
      this.loggingOut = false;
    },
    goToRoute(route) {
      this.$router.push(`/${route}`);
    }
  }
};
</script>
