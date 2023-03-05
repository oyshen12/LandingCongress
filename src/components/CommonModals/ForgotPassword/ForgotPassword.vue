<template>
  <DefaultModal :modal="modal" @close="$emit('close')">
    <template #title>Восстановление пароля</template>
    <template #text
      >Для восстановления доступа на почту придет письмо с ссылкой
    </template>
    <template #additional>
      <div class="forgot">
        <div v-if="commonError" class="text24 red--text align-self-start mb-4">
          {{ commonError }}
        </div>
        <v-form
          @submit.prevent="restorePassword"
          ref="form"
          class="forgot__input"
        >
          <MainInput
            :value="email"
            @input="email = $event"
            v-on:keydown.enter.prevent="restorePassword"
            :error="emailError !== ''"
            :error-message="emailError"
            label="Email"
            class="forgot__input"
            :rules="['required', 'email']"
          ></MainInput>
        </v-form>
        <MainButton
          @click="restorePassword"
          :loading="passwordRequestSending"
          class="forgot__password"
          >Восстановить пароль</MainButton
        >
      </div>
    </template>
  </DefaultModal>
</template>

<script lang="ts">
import Vue from "vue";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import { CustomAxiosError, inputValidate } from "@/types/types";

export default Vue.extend({
  name: "ForgotPassword",
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      passwordRequestSending: false,
      email: "",
      emailError: "",
      commonError: "",
    };
  },
  components: { DefaultModal, MainInput, MainButton },
  computed: {
    form(): inputValidate {
      return this.$refs.form as inputValidate;
    },
  },
  methods: {
    restorePassword() {
      const valid = this.form.validate();
      if (valid) {
        this.passwordRequestSending = true;
        this.api
          .post(process.env.VUE_APP_API_RESTORE_PASSWORD, {
            email: this.email,
          })
          .then(() => {
            this.openAlert("На почту выслано письмо для восстановления пароля");
            this.$emit("close");
          })
          .catch((error: CustomAxiosError) => {
            if (
              error?.response?.status === 400 &&
              error?.response?.data.name === "Errors of validation"
            ) {
              const data = error?.response?.data;
              if (data.fail.email) {
                this.emailError = data.fail.email[0];
              }
              if (data.message) {
                this.commonError = data.message;
              }
            }
          })
          .finally(() => {
            this.passwordRequestSending = false;
          });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.forgot {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__password {
    margin: 0 auto;
  }

  &__input {
    width: 100%;
  }
}
</style>
