<template>
  <v-btn
    class="elevation-0 uppercase"
    :height="height"
    :width="width"
    :loading="loading"
    :disabled="disabled"
    :class="[colorButton, slim ? 'slim' : '']"
    @click="$emit('click')"
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MainBtn",
  props: {
    height: {
      type: String,
      default: "48",
    },
    width: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    colorRed: {
      type: Boolean,
      default: false,
    },
    colorWhite: {
      type: Boolean,
      default: false,
    },
    slim: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorButton(): string {
      if (this.colorRed) {
        return "main-btn red";
      }
      if (this.colorWhite) {
        return "main-btn white";
      }
      return "main-btn";
    },
  },
});
</script>
<style scoped lang="scss" src="./MainButton.scss"></style>
