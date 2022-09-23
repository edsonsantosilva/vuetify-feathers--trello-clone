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
      <Lists :board="board" />
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';
import Lists from '../components/Lists.vue';

export default {
  name: 'BoardPage',
  components: { Lists },
  data: () => ({
  }),
  computed: {
    Board: () => models.api.Board,
    board: vm => vm.Board.getFromStore(vm.$route.params.id),
    stylo: vm => {
      if (vm.board) {
        return vm.board.backgroundUrl;
      }
      return true;
    },
  },
  created() {
    this.Board.find();
  }
};
</script>

<style>

</style>
