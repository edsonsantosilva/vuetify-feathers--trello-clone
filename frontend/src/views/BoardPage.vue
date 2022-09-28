<template>
  <v-container
    class="fill-height align-start"
    :style="{ backgroundImage: 'url(' + '' + ')', backgroundSize: 'cover'}"
    fluid
  >
    <v-row>
      {{ isBoard }}
      <!-- <v-col v-if="isBoardFindPending" cols="12" class="pt-6 pl-6 primary">
        <span>Searching for board...</span>
      </v-col> -->
      <!-- <v-col
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
      </v-col> -->
      <!-- <Lists :board="currentBoard" /> -->
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import { useGet } from 'feathers-vuex';
import Lists from '../components/Lists.vue';

export default defineComponent({
  name: 'BoardPage',
  components: { Lists },
  props: {
    id: {
      type: String,
    }
  },
  setup(props) {
    const { Board } = Vue.$FeathersVuex.api;
    // debugger;
    // const Board = computed(() => models.api.Board);

    const isBoard = useGet({
      model: Board,
      id: props.id,
      // queryWhen: computed(() => (
      //   props.id && Board.getFromStore(props.id)
      // )),
      // immediate: true
    });

    // const currentBoard = computed(() => Board.value.getFromStore(props.id));
    // const isBoardFindPending = computed(() => context.root.$store.state.boards.isFindPending);

    // const showErrorMessage = computed(() => {
    //   if (!board.value._id && !isBoardFindPending.value) {
    //     return 'Didn\'t find the board';
    //   }
    //   return false;
    // });

    return { isBoard };
  }
});
</script>

<style>

</style>
