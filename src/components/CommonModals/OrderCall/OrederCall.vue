<template>
  <DefaultModal
    :modal="modalOrderCall.opened"
    @close="changeModalOrderCall({ opened: false })"
  >
    <template #title>Заказать звонок</template>
    <template #inputs>
      <v-form ref="formOrder">
        <MainInput
          :value="modalOrderCall.phone"
          @input="(value) => changeModalOrderCall({ phone: value })"
          :rules="['required', 'phone']"
          label="Телефон"
        />
        <MainInput
          :value="modalOrderCall.email"
          @input="(value) => changeModalOrderCall({ email: value })"
          :rules="['required', 'email']"
          label="E-mail"
        />
      </v-form>
    </template>
    <template #button
      ><MainButton @click="orderCall" color-red width="250"
        >Заказать</MainButton
      ></template
    >
  </DefaultModal>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import { inputValidate } from "@/types/types";

export default Vue.extend({
  name: "PersonalCabinetModal",
  components: { DefaultModal, MainInput, MainButton },
  computed: {
    ...mapState(["modalOrderCall"]),
    formOrder(): inputValidate {
      return this.$refs.formOrder as inputValidate;
    },
  },
  methods: {
    ...mapMutations(["changeModalOrderCall"]),
    orderCall() {
      const valid = this.formOrder.validate();
      if (valid) {
        const emptyData = {
          opened: false,
          email: "",
          phone: "",
        };
        this.changeModalOrderCall(emptyData);
        this.formOrder.resetValidation();
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
