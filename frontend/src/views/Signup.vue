<template>
  <v-container class="justify-center fill-height fill-width">
    <v-form
      ref="form"
      v-model="valid"
      class=" pa-2"
      style="width: 30vw; max-width: 600px; min-width: 350px;"
      @submit.prevent="signUp"
    >
      <v-text-field
        v-model="signUpUser.username"
        :rules="usernameRules"
        label="Username"
        required
      />
      <v-text-field
        v-model="signUpUser.displayName"
        :rules="notBlank"
        label="Display Name"
        required
      />
      <v-text-field
        v-model="signUpUser.email"
        :rules="notBlank"
        label="Email"
        required
      />
      <v-text-field
        v-model="signUpUser.password"
        :rules="notBlank"
        label="Password"
        type="password"
        required
      />
      <v-text-field
        v-model="signUpUser.confirmPassword"
        :rules="confirmPasswordRules"
        label="Confirm Password"
        type="password"
        required
      />
      <v-text-field
        v-model="signUpUser.imageUrl"
        :rules="notBlank"
        label="Image URL"
        required
      />
      <v-btn
        color="primary"
        class="mr-4"
        :loading="signUpUser.isCreatePending"
        type="submit"
        :disabled="!valid"
      >
        Signup
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'Signup',
  data: vm => ({
    valid: false,
    signUpUser: {},
    usernameRules: [v => !!v || 'Field is required'],
    notBlank: [v => !!v || 'Field is required'],
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.signUpUser.password || 'Passowords don\'t match'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
  }),
  computed: {
    User: () => models.api.User,
  },
  created() {
    console.log('models api', models.api);
    this.signUpUser = new this.User();
  },

  methods: {
    async signUp() {
      if (this.valid) {
        await this.signUpUser.create();
        this.signUpUser = new this.User();
        this.$router.push({ name: 'login' });
      }
    },
  }
};
</script>
