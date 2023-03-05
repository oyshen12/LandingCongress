<template>
  <div class="reset">
    <div class="reset__title text24 bold">Восстановление пароля</div>
    <div class="reset__inputs">
      <div
        v-if="inputErrors.common"
        class="text24 red--text align-self-start mb-4"
      >
        {{ inputErrors.common }}
      </div>
      <v-form ref="formCabinet" class="reset__inputs-form">
        <MainInput
          :value="password"
          @input="password = $event"
          :error="inputErrors.password !== ''"
          :error-message="inputErrors.password"
          label="Придумайте новый пароль"
          min="6"
          :rules="['required']"
          type-password
        />
        <MainInput
          :value="passwordConfirm"
          @input="passwordConfirm = $event"
          :error="inputErrors.confirm_password !== ''"
          :error-message="inputErrors.confirm_password"
          min="6"
          label="Подтвердите пароль"
          :rules="['required']"
          type-password
          :pass-comparison="[password, passwordConfirm]"
        />
      </v-form>
      <MainButton
        @click="resetPassword"
        :loading="loadingPasswordRequest"
        height="40"
        color-red
        class="reset__button"
        >Сменить пароль
      </MainButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { CustomAxiosError, inputValidate } from "@/types/types";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";

export default Vue.extend({
  name: "RegisterPage",
  components: { MainInput, MainButton },
  data() {
    return {
      password: "",
      passwordConfirm: "",
      loadingPasswordRequest: false,
      inputErrors: {
        password: "",
        confirm_password: "",
        common: "",
      },
    };
  },
  computed: {
    formCabinet(): inputValidate {
      return this.$refs.formCabinet as inputValidate;
    },
  },
  methods: {
    ...mapMutations(["setUser", "setAuthed"]),
    resetPassword() {
      const valid = this.formCabinet.validate();
      if (valid) {
        this.loadingPasswordRequest = true;
        const id = this.$route.query.id;
        const key = this.$route.query.key;

        this.api
          .post(process.env.VUE_APP_API_CHANGE_PASSWORD, {
            id,
            key,
            password: this.password,
            confirm_password: this.passwordConfirm,
          })
          .then(() => {
            this.openAlert("Пароль успешно изменён");
            this.$router.push({ name: "Login" });
          })
          .catch((error: CustomAxiosError) => {
            const data = error?.response?.data;
            if (
              error?.response?.status === 400 &&
              data.name === "Errors of validation"
            ) {
              if (data.fail.password) {
                this.inputErrors.password = data.fail.password[0];
              }
              if (data.fail.confirm_password) {
                this.inputErrors.confirm_password =
                  data.fail.confirm_password[0];
              }
              if (data.message) {
                this.inputErrors.common = data.message;
              }
            }
          })
          .finally(() => {
            this.loadingPasswordRequest = false;
          });
      }
    },
  },
});
</script>

<style scoped lang="scss" src="./PasswordReset.scss"></style>
