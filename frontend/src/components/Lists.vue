<template>
  <v-row class="px-5 pt-2">
    <v-col
      v-for="(list, index) in lists"
      :key="index"
      cols="1"
      md="3"
      sm="3"
    >
      <div
        @drop="drop($event)"
        @dragover="dragover($event, list)"
      >
        <v-list
          dense
          class="pl-2 pr-2"
          :class="{ green: droppingList === list, 'grey darken-3' : droppingList != list}"
        >
          <v-subheader class="font-weight-bold white--text">
            {{ list.name }}
          </v-subheader>
          <Tasks
            :list="list"
            :dropping-list="droppingList"
            @dragStart="dragStart"
          />
        </v-list>
      </div>
    </v-col>
    <v-col v-if="!showListFormActions" cols="3" @click="initiateListForm">
      <AddComponent title="Add a list" />
    </v-col>
    <v-col v-else cols="3">
      <v-list dense class="pl-2 pr-2 grey darken-3">
        <v-text-field
          v-model="listForm.name"
          dense
          single-line
          hide-details
          label="Name"
          required
        />
        <v-container v-show="showListFormActions" class="mt-3">
          <v-row>
            <v-btn
              depressed
              color="green"
              class="white--text"
              @click="createList"
            >
              Save
            </v-btn>
            <v-icon class="ml-3 white--text" @click="cancelListCreation">
              mdi-close
            </v-icon>
          </v-row>
        </v-container>
      </v-list>
    </v-col>
    {{ droppingList }}
  </v-row>
</template>

<script>
import { models } from 'feathers-vuex';
import Tasks from './Tasks.vue';
import AddComponent from './AddComponent.vue';

export default {
  name: 'Lists',
  components: { Tasks, AddComponent },
  props: {
    board: {
      type: Object
    }
  },
  data: () => ({
    listForm: {},
    showListFormActions: false,
    isHighlighted: false,
    droppingList: null,
    draggedTask: null
  }),
  computed: {
    List: () => models.api.List,
    lists: vm => vm.List.findInStore({ query: { boardId: vm.board._id } }).data
  },
  created() {
    this.List.find({ query: { boardId: this.board._id } });
  },
  methods: {
    initiateListForm() {
      this.listForm = new this.List({ boardId: this.board._id });
      this.showListFormActions = true;
    },
    async createList() {
      // TODO: apply try catch
      await this.listForm.create();
    },
    async cancelListCreation() {
      await this.listForm.remove();
      this.showListFormActions = false;
    },
    dragStart(task) {
      this.draggedTask = task;
    },
    dragover(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    drop(event) {
      if (this.droppingList) {
        this.draggedTask.listId = this.droppingList._id;
        this.draggedTask.save();
      }
      event.preventDefault();
      this.droppingList = null;
    }
  }
};
</script>

<style>

</style>
