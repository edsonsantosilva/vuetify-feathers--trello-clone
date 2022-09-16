<template>
  <v-container
    class="fill-height align-start"
    :style="{ backgroundImage: 'url(' + board.backgroundUrl + ')', backgroundSize: 'cover'}"
    fluid
  >
    <v-row>
      <v-col cols="12" class="pt-6 pl-6 primary">
        <v-btn plain @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Board name: {{ board.name }}
      </v-col>
      <v-col
        v-for="(lista, index) in listas"
        :key="index"
        cols="1"
        md="3"
        sm="3"
      >
        <v-list dense class="pl-2 pr-2 grey darken-3">
          <v-subheader class="font-weight-bold white--text">
            {{ lista.name }}
          </v-subheader>
          <template>
            <v-card
              v-for="task in lista.tasks"
              :key="task"
              class="mb-2"
            >
              <v-card-subtitle class="pa-1">
                Titulo
              </v-card-subtitle>
              <v-card-text>{{ task }}</v-card-text>
            </v-card>
            <v-btn @click="listas[0].tasks.push(4)">
              +
            </v-btn>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'BoardPage',
  props: {
  },
  data: vm => ({
    id: vm.$route.params.id,
    listas: [
      { name: 'To do', tasks: [1, 2, 3] },
      { name: 'Doing' },
      { name: 'Doing' },
      { name: 'Testing' },
      { name: 'Done' }
    ],
  }),
  computed: {
    Board: () => models.api.Board,
    board: vm => vm.Board.findInStore({ query: { _id: vm.id } }).data[0]
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
  }
};
</script>

<style>

</style>
