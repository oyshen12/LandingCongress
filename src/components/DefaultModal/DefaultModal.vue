<template>
  <v-dialog :value="modal" @input="modalClose" :width="width">
    <div
      class="modal"
      :style="{
        height: height,
      }"
    >
      <div class="modal__title text24 bold">
        <slot name="title"></slot>
      </div>
      <div class="modal__text">
        <slot name="text"></slot>
      </div>
      <div class="modal__inputs">
        <slot name="inputs"></slot>
      </div>
      <div class="modal__button">
        <slot name="button"></slot>
      </div>
      <slot name="additional"></slot>
      <v-btn @click="modalClose" class="modal__close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DefaultModal",
  props: {
    modal: {
      type: Boolean,
      required: true,
      default: false,
    },
    width: {
      type: String,
      default: "650",
    },
    height: {
      type: String,
      default: "320px",
    },
  },
  methods: {
    modalClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped lang="scss" src="./DefaultModal.scss"></style>
