<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col v-for="board of boards" :key="board._id" cols="3">
          <v-card @click="openBoard(board)">
            <v-img
              height="200px"
              gradient="to bottom, rgba(255,255,255,.15), rgba(0,0,0,.5)"
              :src="board.backgroundUrl"
            >
              <v-card-title>{{ board.name }}</v-card-title>
            </v-img>
            <v-card-subtitle class="py-1">
              updated at: {{ new Date(board.updatedAt).toLocaleString() }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-btn @click="showBoardForm">
        Add
      </v-btn>

      <!-- TODO: Create board example when adding a board instead of the form -->
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
    showBoardForm() {
      this.boardForm = new this.Board();
      this.showAddBoardForm = true;
    },
    async createBoard() {
      await this.boardForm.create();
      this.showAddBoardForm = false;
    },
    async openBoard(board) {
      this.$router.push({ name: 'board-page', params: { id: board._id } });
      this.showAddBoardForm = false;
    }
  }
};
</script>

<style>

</style>
