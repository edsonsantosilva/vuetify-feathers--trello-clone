<template>
  <v-container class="justify-center fill-height text-h3">
    <v-text-field
      v-model="testing"
      label="Setting"
      required
    />
    <span>{{ testing }}</span>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {

  setup() {
    const testing = ref('');
    return {
      testing
    };
  },
};
</script>
