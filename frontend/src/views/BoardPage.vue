<template>
  <v-container
    class="fill-height align-start"
    :style="{ backgroundImage: 'url(' + board.backgroundUrl + ')', backgroundSize: 'cover'}"
    fluid
  >
    <v-row>
      <v-col v-if="isFindPending" cols="12" class="pt-6 pl-6 primary">
        <span>Searching for board...</span>
      </v-col>
      <v-col
        v-else
        cols="12"
        class="d-flex pt-6 pl-6 align-center"
        :class="{red: showErrorMessage, primary: !showErrorMessage}"
      >
        <v-btn small plain @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span>
          {{ showErrorMessage || board.name }}
        </span>
      </v-col>
      <Lists :board="board" />
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';
import Lists from '../components/Lists.vue';

export default {
  name: 'BoardPage',
  components: { Lists },
  props: {
    id: {
      type: String,
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapState('boards', ['isFindPending']),
    Board: () => models.api.Board,
    board: vm => vm.Board.getFromStore(vm.id) || vm.Board.instanceDefaults(),
    showErrorMessage: vm => {
      if (!vm.board._id) {
        return 'Didn\'t find the board';
      }
      return false;
    },
    // loading: ({ Board }) => {
    //   if (Board.store.state.boards.isFindPending) {
    //     return 'Searching for board...';
    //   }
    //   return '';
    // },
  },
  created() {
    this.Board.find();
  }
};
</script>

<style>

</style>
