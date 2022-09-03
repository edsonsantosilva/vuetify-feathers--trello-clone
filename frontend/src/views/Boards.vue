<template>
  <v-container>
    <v-row>
      <v-col v-for="board of boards" :key="board._id" cols="3">
        <v-card>
          <v-card-title>{{ board.name }}</v-card-title>
          <v-card-subtitle>{{ board.name }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'BoardView',
  data() {
    return {

    };
  },
  computed: {
    Board: () => models.api.Board,
    boards: vm => vm.Board.findInStore().data,
  },
  created() {
    this.Board.find();
  }
};
</script>

<style>

</style>
