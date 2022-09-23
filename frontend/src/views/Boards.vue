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
              <v-card-title>
                <span>
                  {{ board.name }}
                </span>
                <v-spacer />
                <!-- <v-btn
                  icon
                  color="pink"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn> -->
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>
            </v-img>
            <v-card-subtitle class="py-1">
              updated at: {{ new Date(board.updatedAt).toLocaleString() }}
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="pa-2">
            <v-btn v-if="!showAddBoardForm" block @click="initiateBoardForm">
              Add a board
            </v-btn>
            <div v-else>
              <v-card-text>
                <v-form ref="form" @submit.prevent="createBoard">
                  <v-text-field
                    v-model="boardForm.name"
                    label="Board Name"
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
                    depressed
                    color="green"
                    class="white--text"
                    type="submit"
                  >
                    Create Board
                  </v-btn>
                  <v-icon class="ml-3 white--text" @click="cancelBoardCreation">
                    mdi-close
                  </v-icon>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
    initiateBoardForm() {
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
    },
    async cancelBoardCreation() {
      await this.boardForm.remove();
      this.showAddBoardForm = false;
    }
  }
};
</script>

<style>

</style>
