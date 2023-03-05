<template>
  <v-progress-circular
    indeterminate
    :size="size"
    :color="color"
    :width="width"
  ></v-progress-circular>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CircularSpinner",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "40",
    },
    width: {
      type: String,
      default: "3",
    },
  },
});
</script>

<style scoped lang="scss"></style>
