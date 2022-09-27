<template>
  <div class="pl-2 text-caption button-component">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style>
.button-component {
  background: grey;
  opacity: 0.8;
}
.button-component:hover {
  text-decoration: underline;
  background: grey;
  opacity: 1;
  cursor: pointer;
}
</style>
