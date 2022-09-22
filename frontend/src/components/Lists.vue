<template>
  <v-row class="px-5 pt-2">
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
            v-for="task in tasks[index]"
            :key="task._id"
            class="mb-2"
          >
            <v-card-text>{{ task.name }}</v-card-text>
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
        <v-btn
          v-if="!showListFormActions"
          small
          block
          class="grey darken-1"
          @click="initiateListForm"
        >
          Add a list
        </v-btn>
        <v-text-field
          v-else
          v-model="listForm.name"
          dense
          single-line
          hide-details
          label="Name"
          required
        />
        <v-container v-show="showListFormActions" class="mt-3">
          <v-row>
            <v-btn depressed class="white--text green" @click="createList">
              Save
            </v-btn>
            <v-icon class="ml-3 white--text" @click="cancelListCreation">
              mdi-close
            </v-icon>
          </v-row>
        </v-container>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'List',
  props: {
    boardId: {
      type: String
    }
  },
  data: vm => ({
    id: vm.$route.params.id,
    listForm: {},
    taskForm: {},
    showListFormActions: false,
    showTaskForm: false,
    showTaskFormInList: ''
  }),
  computed: {
    List: () => models.api.List,
    lists: vm => vm.List.findInStore({ query: { boardId: vm.id } }).data,
    Task: () => models.api.Task,
    tasks: vm => {
      const tasks = vm.Task.findInStore().data;
      const tasksFiltered = [];
      vm.lists.forEach(list => {
        tasksFiltered.push(tasks.filter(task => task.listId === list._id));
      });
      return tasksFiltered;
    },
  },
  methods: {
    initiateListForm() {
      if (this.listForm.name) { return; }
      this.listForm = new this.List();
      this.listForm.boardId = this.id;
      this.showListFormActions = true;
    },
    initiateTaskForm(list) {
      this.taskForm = new this.Task();
      this.showTaskFormInList = list._id;
      this.showTaskForm = true;
    },
    async createList() {
      // TODO: apply try catch
      await this.listForm.create();
    },
    async createTask(list) {
      this.taskForm.listId = list._id;
      await this.taskForm.create();
      this.initiateTaskForm(list);
    },
    async cancelListCreation() {
      // eslint-disable-next-line
      await this.$store.commit('lists/removeTemps', [this.listForm.__id]);
      this.listForm = {};
      this.showListFormActions = false;
    }
  }
};
</script>

<style>

</style>
