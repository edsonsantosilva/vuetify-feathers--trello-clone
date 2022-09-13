<template>
  <v-container>
    You can see the board {{ id }}
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'BoardPage',
  props: {
  },
  data: vm => ({
    id: vm.$route.params.id
  }),
  computed: {
    Board: () => models.api.Board,
    // boards: vm => vm.Board.findInStore().data,
  },
  created() {
    this.Board.get(this.id);
  },
  methods: {
    addBoard() {
      this.boardForm = new this.Board();
      this.showAddBoardForm = true;
    },
    async createBoard() {
      await this.boardForm.create();
      this.showAddBoardForm = false;
    }
  }
};
</script>

<style>

</style>
