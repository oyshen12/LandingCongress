<template>
  <DefaultModal :modal="modal" @close="$emit('close')" class="modal">
    <template #title>Восстановление пароля</template>
    <template #text
      >Для восстановления доступа на почту придет письмо с ссылкой
    </template>
    <template #additional>
      <div class="modal__additional">
        <div v-if="commonError" class="modal__additional-error text24">
          {{ commonError }}
        </div>
        <v-form
          @submit.prevent="restorePassword"
          ref="form"
          class="modal__additional-form"
        >
          <MainInput
            :value="email"
            @input="email = $event"
            v-on:keydown.enter.prevent="restorePassword"
            :error="emailError !== ''"
            :error-message="emailError"
            label="Email"
            class="modal__additional-form-input"
            :rules="['required', 'email']"
          ></MainInput>
        </v-form>
        <MainButton
          @click="restorePassword"
          :loading="passwordRequestSending"
          class="modal__additional-form-recovery"
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
  components: { DefaultModal, MainInput, MainButton },
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
.modal__additional {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__additional-form {
  width: 100%;
}

.modal__additional-form-input {
  width: 100%;
}

.modal__additional-form-recovery {
  margin: 0 auto;
}

.modal__additional-error {
  color: #f44336;
  align-self: self-start;
  margin-bottom: 16px;
}
</style>
