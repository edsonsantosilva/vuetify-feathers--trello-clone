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
        <Tasks :list="list" />
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
  </v-row>
</template>

<script>
import { models } from 'feathers-vuex';
import Tasks from './Tasks.vue';

export default {
  name: 'Lists',
  components: { Tasks },
  props: {
    board: {
      type: Object
    }
  },
  data: () => ({
    listForm: {},
    showListFormActions: false,
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
    }
  }
};
</script>

<style>

</style>
