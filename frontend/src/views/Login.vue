<template>
  <v-container class="fill-height">
    <v-snackbar
      v-model="errorOnLogin"
      color="red"
      content-class="pa-6 text-center"
      transition="slide-y-transition"
      timeout="2000"
      top
    >
      <v-icon
        class="mr-2"
      >
        mdi-alert-outline
      </v-icon>
      {{ messageError }}
    </v-snackbar>
    <v-container class="d-flex justify-center fill-height">
      <v-form ref="form" @submit.prevent="login">
        <v-text-field
          v-model="loginUser.username"
          label="Username"
          required
        />
        <v-text-field
          v-model="loginUser.password"
          label="Password"
          type="password"
          required
        />
        <v-progress-circular
          v-if="loggingUser"
          indeterminate
          color="primary"
        />
        <v-btn
          v-else
          color="primary"
          class="mr-4"
          type="submit"
        >
          Login
        </v-btn>
        <div>
          <v-btn
            :disabled="loggingUser"
            plain
            class="mt-6 text-overline text-decoration-underline"
            @click="$router.push({ name: 'signup' })"
          >
            Sign up for an account
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loginUser: {
      username: 'francisco',
      password: '123'
    },
    loggingUser: false,
    errorOnLogin: false,
    messageError: '',
  }),
  methods: {
    async login() {
      this.loggingUser = true;
      try {
        const response = await this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          ...this.loginUser
        });
        console.log('User logged?', response);
        this.$router.replace('/');
      } catch (error) {
        console.error('An error happened during login', error);
        this.messageError = error.message;
        this.errorOnLogin = true;
      }
      this.loggingUser = false;
    },
  },
};
</script>
