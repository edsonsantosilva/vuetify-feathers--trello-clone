<template>
  <v-container class="justify-center fill-height text-h3">
    <v-row class="justify-center">
      <p>Hi, Welcome to my Trello Clone</p>
    </v-row>
    <v-btn @click="$router.push({name: 'boards'})">
      Go to Boards
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>
