<template>
  <div>
    name: {{ board.item.name }}
  </div>
</template>

<script>
import { useGet } from 'feathers-vuex';

export default {
  name: 'BoardPage',
  setup(props, context) {
    console.log('CONTEXT', context);
    const { Board } = context.root.$FeathersVuex.api;
    const { item: board, isPending } = useGet({
      model: Board,
      id: '631f3ed7732c881c98c000c5'
    });
    console.log('board', board);
    // console.log('isPending', isPending);
    return { board };
  }
};
</script>

<style>

</style>
