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
        v-for="(list, index) in lists"
        :key="index"
        cols="1"
        md="3"
        sm="3"
      >
        <v-list dense class="pl-2 pr-2 grey darken-3">
          <v-subheader class="font-weight-bold white--text">
            {{ list.name }}
          </v-subheader>
          <template>
            <v-card
              v-for="task in list.tasks"
              :key="task"
              class="mb-2"
            >
              <v-card-subtitle class="pa-1">
                Titulo
              </v-card-subtitle>
              <v-card-text>{{ task }}</v-card-text>
            </v-card>
            <v-btn @click="lists[0].tasks.push(4)">
              +
            </v-btn>
          </template>
        </v-list>
      </v-col>
      <v-col cols="3">
        <v-list dense class="pl-2 pr-2 grey darken-3">
          <v-text-field
            v-model="listForm.name"
            dense
            single-line
            hide-details
            label="Name"
            required
          >
            <template v-slot:append>
              <v-icon @click="createList">
                mdi-plus
              </v-icon>
            </template>
          </v-text-field>
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
    // listas: [
    //   { name: 'To do', tasks: [1, 2, 3] },
    //   { name: 'Doing' },
    //   { name: 'Doing' },
    //   { name: 'Testing' },
    //   { name: 'Done' }
    // ],
    listForm: {},
  }),
  computed: {
    Board: () => models.api.Board,
    board: vm => vm.Board.getFromStore(vm.id),
    List: () => models.api.List,
    lists: vm => vm.List.findInStore({ query: { boardId: vm.id } }).data,
  },
  created() {
    this.List.find({ query: { boardId: this.id } });
    this.initiateListForm();
  },
  beforeDestroy() {
    this.$store.commit('lists/clearAll');
  },
  methods: {
    initiateListForm() {
      this.listForm = new this.List();
      this.listForm.boardId = this.id;
    },
    async createList() {
      // TODO: apply try catch
      await this.listForm.create();
      this.initiateListForm();
    },
  }
};
</script>

<style>

</style>
