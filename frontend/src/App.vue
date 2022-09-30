<template>
  <v-app>
    <v-app-bar app color="primary">
      olu
      <span v-if="isAuthenticated">USUÁRIO</span>
      <v-btn
        :to="{ name: 'login'}"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        :loading="loggingOut"
        text
        @click="logout"
      >
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>
    <!-- <v-app-bar
      app
      color="primary"
    >
      <v-container fluid class="pa-0">
        <v-row class="justify-start align-center">
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
    </v-app-bar> -->

    <v-main>
      <router-view class="pa-0" />
    </v-main>
  </v-app>
</template>

<script>
import { onMounted, ref, watch } from '@vue/composition-api';

export default {
  name: 'Appop',
  setup(props, context) {
    console.log(context);
    // debugger;
    const { $store, $router } = context.root;
    const loggingOut = ref(false);
    const isAuthenticated = ref(false);

    // Redirect to chat page if there's a user, otherwise to login page.
    watch(
      () => $store.state.auth.user,
      user => {
        const toRouteName = user ? 'home' : 'login';
        $router.replace({ name: toRouteName });
      },
      { lazy: true }
    );

    watch(
      () => $store.state.auth.user,
      user => {
        const autenticado = user.name || false;
        isAuthenticated.value = autenticado;
      },
      { lazy: true }
    );

    // Attempt jwt auth when the app mounts.
    onMounted(async () => {
      $store.dispatch('auth/authenticate').catch(error => {
        if (!error.message.includes('Could not find stored JWT')) {
          console.error('problema pra autenticar', error);
        }
      });
    });

    async function logout() {
      console.log('fazer logout');
      loggingOut.value = true;
      try {
        await $store.dispatch('auth/logout');
        $store.dispatch('clearStore');
        // $router.replace({ name: 'login' });
      } catch (error) {
        console.error('An error happened during logout', error);
      }
      loggingOut.value = false;
    }

    return { logout, loggingOut, isAuthenticated };
  },
  // data: () => ({
  //   items: [
  //     { title: 'Boards', route: 'boards' },
  //     { title: 'Settings', route: 'settings' }
  //   ]
  // }),
  // computed: {
  //   ...mapGetters('auth', ['isAuthenticated', 'user']),
  //   User: () => models.api.User,
  //   currentUser: vm => (vm.isAuthenticated ? vm.user : new vm.User()),
  //   selectedTheme: vm => (vm.$vuetify.theme.dark ? 'Dark' : 'Light')
  // },
  // async created() {
  //   this.$vuetify.theme.dark = true;
  //   try {
  //     await this.authenticate();
  //   } catch (error) {
  //     console.log('created app.vue', error);
  //     this.$router.push({ name: 'login' });
  //   }
  // },
  // methods: {
  //   ...mapActions('auth', ['authenticate']),
  //   changeColor() {
  //     this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  //   },
  //   // async logout() {
  //   //   this.loggingOut = true;
  //   //   try {
  //   //     await this.$store.dispatch('auth/logout');
  //   //     this.$store.dispatch('clearStore');
  //   //     this.$router.replace({ name: 'login' });
  //   //   } catch (error) {
  //   //     console.error('An error happened during logout', error);
  //   //   }
  //   //   this.loggingOut = false;
  //   // },
  //   goToRoute(route) {
  //     this.$router.push(`/${route}`);
  //   }
  // }
};
</script>
