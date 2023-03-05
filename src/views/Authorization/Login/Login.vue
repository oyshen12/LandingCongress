<template>
  <div class="register">
    <div class="register__title text24 bold">Войти в личный кабинет</div>
    <div class="register__inputs">
      <div v-if="inputErrors.common" class="register__inputs-error text24">
        {{ inputErrors.common }}
      </div>
      <v-form ref="formCabinet" class="register__inputs-form">
        <MainInput
          :value="email"
          @input="email = $event"
          :rules="['required', 'email']"
          :error="inputErrors.email !== ''"
          :error-message="inputErrors.email"
          autocomplete
          label="E-mail"
        />
        <MainInput
          :value="password"
          @input="password = $event"
          :rules="['required', 'min']"
          min="6"
          type-password
          :error="inputErrors.password !== ''"
          :error-message="inputErrors.password"
          autocomplete
          label="Пароль"
        />
      </v-form>
      <v-checkbox
        v-model="agreement"
        light
        class="register__checkbox"
        hide-details
        label="Запомнить меня"
      >
      </v-checkbox>
      <MainButton
        @click="login"
        :loading="loadingLoginRequest"
        height="40"
        color-red
        class="register__button"
        >Войти
      </MainButton>
      <MainButton @click="register" height="40" class="register__button"
        >Регистрация
      </MainButton>
    </div>
    <div class="divider mt-4"></div>
    <v-btn
      @click="modalForgotPassword = true"
      class="mt-2"
      color="white"
      depressed
      >Забыли пароль?
    </v-btn>
    <ForgotPassword
      :modal="modalForgotPassword"
      @close="modalForgotPassword = false"
    ></ForgotPassword>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { CustomAxiosError, inputValidate } from "@/types/types";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import ForgotPassword from "@/components/CommonModals/ForgotPassword/ForgotPassword.vue";

export default Vue.extend({
  name: "RegisterPage",
  components: { MainInput, MainButton, ForgotPassword },
  data() {
    return {
      email: "",
      password: "",
      agreement: false,
      forgotPassword: "",
      modalForgotPassword: false,
      inputErrors: {
        email: "",
        password: "",
        common: "",
      },
      loadingLoginRequest: false,
    };
  },
  computed: {
    ...mapState(["authed"]),
    formCabinet(): inputValidate {
      return this.$refs.formCabinet as inputValidate;
    },
  },
  methods: {
    ...mapMutations(["setUser", "setAuthed"]),
    login() {
      const valid = this.formCabinet.validate();
      if (valid) {
        this.loadingLoginRequest = true;
        this.api
          .post(process.env.VUE_APP_API_LOGIN, {
            username: this.email,
            password: this.password,
            rememberMe: this.agreement ? 1 : 0,
          })
          .then((data: any) => {
            const user = {
              id: data.data.id,
              accessBack: data.data.access_back,
              firstName: data.data.first_name,
              lastName: data.data.last_name,
              patronymic: data.data.patronymic,
            };
            this.setUser(user);
            this.setAuthed(true);
            this.$router.push({ name: "Main" });
          })
          .catch((error: CustomAxiosError) => {
            if (
              error?.response?.status === 400 &&
              error?.response?.data.name === "Errors of validation"
            ) {
              const data = error?.response?.data;
              if (data?.message) {
                this.inputErrors.common = error.response.data.message;
              }
              if (data.fail.username) {
                this.inputErrors.email = data.fail.username[0];
              }
              if (data.fail.password) {
                this.inputErrors.password = data.fail.password[0];
              }
            }
          })
          .finally(() => {
            this.loadingLoginRequest = false;
          });
      }
    },
    register() {
      this.smoothTo("register-short");
    },
  },
  mounted() {
    if (this.authed) {
      this.$router.push({ name: "Main" });
    }
  },
});
</script>

<style scoped lang="scss" src="./Login.scss"></style>
