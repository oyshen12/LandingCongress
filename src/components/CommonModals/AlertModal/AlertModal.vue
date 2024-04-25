<template>
  <v-dialog
    :value="alertModal.show"
    @input="close"
    max-width="400"
    class="modal"
  >
    <v-card class="modal__content">
      <v-card-text class="modal__content-text">{{
        alertModal.text
      }}</v-card-text>
      <v-card-actions class="modal__content-text-action">
        <v-btn outlined width="100" color="#2396CA" @click="closeAlert"
          >ок</v-btn
        >
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
  },
});
</script>

<style scoped lang="scss">
.modal__content {
  padding: 20px;
}
.modal__content-text {
  text-align: center;
  white-space: pre-wrap;
  color: black;
}
.modal__content-text-action {
  display: flex;
  justify-content: center;
}
</style>
