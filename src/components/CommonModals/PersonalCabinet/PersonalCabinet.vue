<template>
  <DefaultModal
    :modal="modalPersonalCabinet.opened"
    @close="changeModalPersonalCabinet({ opened: false })"
  >
    <template #title>Войти в личный кабинет</template>
    <template #inputs>
      <v-form ref="formCabinet">
        <MainInput
          :value="modalPersonalCabinet.email"
          @input="(value) => changeModalPersonalCabinet({ email: value })"
          :rules="['required', 'email']"
          label="E-mail"
        />
        <MainInput
          :value="modalPersonalCabinet.password"
          @input="(value) => changeModalPersonalCabinet({ password: value })"
          :rules="['required', 'min']"
          min="6"
          type-password
          label="Пароль"
        />
      </v-form>
    </template>
    <template #button
      ><MainButton @click="authorization" color-red width="250"
        >Войти</MainButton
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
    ...mapState(["modalPersonalCabinet"]),
    formCabinet(): inputValidate {
      return this.$refs.formCabinet as inputValidate;
    },
  },
  methods: {
    ...mapMutations(["changeModalPersonalCabinet"]),
    authorization() {
      const valid = this.formCabinet.validate();
      if (valid) {
        const emptyData = {
          opened: false,
          email: "",
          password: "",
        };
        this.changeModalPersonalCabinet(emptyData);
        this.formCabinet.resetValidation();
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
