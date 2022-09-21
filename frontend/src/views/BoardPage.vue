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
      <Lists />
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';
import Lists from '../components/Lists.vue';

export default {
  name: 'BoardPage',
  components: { Lists },
  props: {},
  data: vm => ({
    id: vm.$route.params.id,
  }),
  computed: {
    Board: () => models.api.Board,
    board: vm => vm.Board.getFromStore(vm.id),
    List: () => models.api.List,
    Task: () => models.api.Task,
  },
  created() {
    this.List.find({ query: { boardId: this.id } });
    this.Task.find();
  },
  methods: {
  }
};
</script>

<style>

</style>
