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
              v-for="task in tasks"
              :key="task"
              class="mb-2"
            >
              <v-card-subtitle class="pa-1">
                Titulo
              </v-card-subtitle>
              <v-card-text>{{ task }}</v-card-text>
            </v-card>
            <v-icon v-if="showTaskFormInList != list._id" @click="initiateTaskForm(list)">
              mdi-plus
            </v-icon>
            <v-text-field
              v-if="showTaskForm && showTaskFormInList === list._id"
              v-model="taskForm.name"
              dense
              single-line
              hide-details
              label="Add task"
              required
            >
              <template v-slot:append>
                <v-icon @click="createTask(list)">
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
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
    listForm: {},
    taskForm: {},
    showTaskForm: false,
    showTaskFormInList: ''
  }),
  computed: {
    Board: () => models.api.Board,
    board: vm => vm.Board.getFromStore(vm.id),
    List: () => models.api.List,
    lists: vm => vm.List.findInStore({ query: { boardId: vm.id } }).data,
    Task: () => models.api.Task,
    tasks: vm => vm.Task.findInStore().data,
  },
  created() {
    this.List.find({ query: { boardId: this.id } });
    this.Task.find();
    this.initiateListForm();
    // this.initiateTaskForm();
  },
  beforeDestroy() {
    this.$store.commit('lists/clearAll');
    this.$store.commit('tasks/clearAll');
  },
  methods: {
    initiateListForm() {
      this.listForm = new this.List();
      this.listForm.boardId = this.id;
    },
    initiateTaskForm(list) {
      this.taskForm = new this.Task();
      this.showTaskFormInList = list._id;
      this.showTaskForm = true;
    },
    async createList() {
      // TODO: apply try catch
      await this.listForm.create();
      this.initiateListForm();
    },
    async createTask(list) {
      console.log('list info', list);
      this.taskForm.listId = list._id;
      await this.taskForm.create();
      this.initiateTaskForm();
    },
  }
};
</script>

<style>

</style>
