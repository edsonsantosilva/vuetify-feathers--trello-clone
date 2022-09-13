<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col v-for="board of boards" :key="board._id" cols="3">
          <v-card @click="openBoard(board)">
            <v-card-title>{{ board.name }}</v-card-title>
            <v-card-subtitle>{{ board.name }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-btn @click="addBoard">
        Add
      </v-btn>
      <v-form v-if="showAddBoardForm" ref="form" @submit.prevent="createBoard">
        <v-text-field
          v-model="boardForm.name"
          label="Name"
          required
        />
        <v-text-field
          v-model="boardForm.backgroundUrl"
          label="Background"
          required
        />
        <v-progress-circular
          v-if="boardForm.isCreatePending"
          indeterminate
          color="primary"
        />
        <v-btn
          v-else
          color="primary"
          class="mr-4"
          type="submit"
        >
          Create Board
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'BoardView',
  data: () => ({
    boardForm: {},
    showAddBoardForm: false
  }),
  computed: {
    Board: () => models.api.Board,
    boards: vm => vm.Board.findInStore().data,
  },
  created() {
    this.Board.find();
  },
  methods: {
    addBoard() {
      this.boardForm = new this.Board();
      this.showAddBoardForm = true;
    },
    async createBoard() {
      await this.boardForm.create();
      this.showAddBoardForm = false;
    },
    async openBoard(board) {
      console.log('board clicked', board);
      this.$router.push({ name: 'board-page', params: { id: board._id } });
      this.showAddBoardForm = false;
    }
  }
};
</script>

<style>

</style>
