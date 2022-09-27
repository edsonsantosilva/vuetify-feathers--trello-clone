<template>
  <div>
    <v-card
      v-for="task in tasks"
      :key="task._id"
      class="mb-2"
      draggable="true"
      @dragstart="$emit('dragStart', task)"
    >
      <v-card-text>{{ task.name }}</v-card-text>
    </v-card>
    <v-icon @click="initiateTaskForm(list)">
      mdi-plus
    </v-icon>
    <v-text-field
      v-if="showTaskForm"
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
  </div>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'Tasks',
  props: {
    list: {
      type: Object
    },
    droppingList: {
      type: Object
    }
  },
  data: () => ({
    taskForm: {},
    showTaskForm: false,
    showTaskFormInList: ''
  }),
  computed: {
    Task: () => models.api.Task,
    tasks: vm => vm.Task.findInStore({ query: { listId: vm.list._id } }).data
  },
  created() {
    this.Task.find({ query: { listId: this.list._id } });
  },
  methods: {
    initiateTaskForm(list) {
      this.taskForm = new this.Task();
      this.showTaskFormInList = list._id;
      this.showTaskForm = true;
    },
    async createTask(list) {
      this.taskForm.listId = list._id;
      await this.taskForm.create();
      this.initiateTaskForm(list);
    }
  }
};
</script>

<style>

</style>
