<template>
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
    <v-btn
      class="mr-4"
      type="submit"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loginUser: {
      username: 'francisco',
      password: '123'
    },
  }),
  created() {
    console.log('sdss');
  },
  methods: {
    async login() {
      const response = await this.$store.dispatch('auth/authenticate', {
        strategy: 'local',
        ...this.loginUser
      });
      console.log('User logged', response);
    },
  },
};
</script>
