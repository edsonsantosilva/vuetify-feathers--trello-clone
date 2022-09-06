<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="signUp"
  >
    <v-text-field
      v-model="user.username"
      :rules="usernameRules"
      label="Username"
      required
    />
    <v-text-field
      v-model="user.displayName"
      :rules="notBlank"
      label="Display Name"
      required
    />
    <v-text-field
      v-model="user.password"
      :rules="notBlank"
      label="Password"
      type="password"
      required
    />
    <v-text-field
      v-model="user.confirmPassword"
      :rules="confirmPasswordRules"
      label="Confirm Password"
      type="password"
      required
    />
    <v-text-field
      v-model="user.imageUrl"
      :rules="notBlank"
      label="Image URL"
      required
    />
    <v-btn
      class="mr-4"
      type="submit"
      :disabled="!valid"
    >
      SignUp
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Signup',
  data: vm => ({
    valid: false,
    user: {
      username: '',
      password: null,
      confirmPassword: null,
      displayName: '',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    },
    usernameRules: [v => !!v || 'Field is required'],
    notBlank: [v => !!v || 'Field is required'],
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.user.password || 'Passowords don\'t match']
  }),
  methods: {
    signUp() {
      if (this.valid) {
        console.log('hello');
      }
    }
  }
};
</script>
