<template>
  <v-container class="d-flex justify-center fill-height text-h3">
    <p>Hi, Welcome to my Trello Clone</p>
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
