<template>
  <div>
    <li v-for="bordinho in items" :key="bordinho._id">
      {{ bordinho.name }}
    </li>
  </div>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { computed } from '@vue/composition-api';

export default {
  name: 'Boards',
  setup(props, context) {
    console.log('CONTEXT', context.root.$route);
    const tutorialsParams = computed(() => ({
      query: {}
    }));
    const { Board } = context.root.$FeathersVuex.api;
    console.log('Board', Board);
    const { items } = useFind({
      model: Board,
      params: tutorialsParams
    });
    const boards = computed(() => context.root.$store.boards.state);
    console.log('boards', boards);

    return { items };
  }
};
</script>

<style></style>
