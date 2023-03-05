<template>
  <v-dialog :value="alertModal.show" @input="close" max-width="400">
    <v-card class="pa-5">
      <v-card-text
        class="modal__text text-body-1 text-center"
        style="color: #000"
        >{{ alertModal.text }}</v-card-text
      >
      <v-card-actions class="justify-center">
        <v-btn outlined width="100" color="#2396CA" @click="close">ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapMutations, mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "AlertModal",
  computed: { ...mapState(["alertModal"]) },
  methods: {
    ...mapMutations(["closeAlert"]),

    close() {
      console.log("close");
      this.closeAlert();
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  &__text {
    white-space: pre-wrap;
  }
}
</style>
