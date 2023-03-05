<template>
  <div>
    <div class="register container-wrapper" id="register-short">
      <div class="register__wrapper">
        <div class="d-flex justify-center align-center">
          <div class="dash"></div>
          <div class="register__title text24 bold">
            Не теряйся - регистрируйся
          </div>
          <div class="dash"></div>
        </div>
        <div class="register__inputs">
          <div v-if="this.inputErrors.common" class="text24 mb-3 red--text">
            {{ this.inputErrors.common }}
          </div>
          <v-form ref="formInputs">
            <MainInput
              label="Телефон"
              :value="phone"
              @input="phone = $event"
              :error="inputErrors.phone !== ''"
              :error-message="inputErrors.phone"
              prefix="+7"
              v-mask="'(###)###-##-##'"
              :rules="['required', 'phone']"
              class="register__inputs-input"
            ></MainInput>
            <MainInput
              label="E-mail"
              :value="email"
              @input="email = $event"
              :error="inputErrors.email !== ''"
              :error-message="inputErrors.email"
              :rules="['required', 'email']"
              class="register__inputs-input"
            ></MainInput>
            <MainInput
              label="Имя"
              :value="name"
              @input="name = $event"
              :error="inputErrors.first_name !== ''"
              :error-message="inputErrors.first_name"
              :rules="['required', 'string']"
              class="register__inputs-input"
            ></MainInput>
            <MainInput
              label="Фамилия"
              :value="secondName"
              @input="secondName = $event"
              :error="inputErrors.last_name !== ''"
              :error-message="inputErrors.last_name"
              :rules="['required', 'string']"
              class="register__inputs-input"
            ></MainInput>
            <MainInput
              :value="password"
              @input="password = $event"
              :error="inputErrors.password !== ''"
              :error-message="inputErrors.password"
              label="Придумайте пароль"
              min="6"
              :rules="['required', 'min']"
              type-password
            />
            <MainInput
              :value="passwordConfirm"
              @input="passwordConfirm = $event"
              :error="inputErrors.confirm_password !== ''"
              :error-message="inputErrors.confirm_password"
              min="6"
              label="Подтвердите пароль"
              :rules="['required', 'min']"
              type-password
              :pass-comparison="[password, passwordConfirm]"
            />
            <v-checkbox
              v-model="agreement"
              label="Согласие на обработку данных"
              class="register__checkbox"
              hide-details
              :rules="[(v) => !!v || 'Обязательное поле']"
            ></v-checkbox>
          </v-form>
        </div>
        <div class="d-flex justify-center mt-6">
          <MainButton
            @click="register"
            :loading="registerRequestSending"
            color-red
            class="register__button"
            >Зарегистрироваться
          </MainButton>
        </div>

        <v-img
          src="../../assets/Register/arrow.png"
          class="register__img"
        ></v-img>
      </div>
    </div>
    <div class="bonuses">
      <div class="bonuses__wrapper container-wrapper">
        <div class="bonuses__text text24 bold">
          <div class="dash"></div>
          <div class="bonuses__text-text">
            Прими участие в формировании программы конгресса и получи бонус
          </div>
          <div class="dash"></div>
        </div>
        <MainButton
          @click="modalListParticipant = true"
          color-white
          class="bonuses__btn"
          >Подробнее
        </MainButton>
      </div>
    </div>
    <DefaultModal
      :modal="modalListParticipant"
      height="auto"
      @close="modalListParticipant = false"
    >
      <template #title
        >Ты предложил тему/спикера и они вышли в золотую зону, это означает:
      </template>
      <template #text>
        <div>
          1. Ты получишь скидку на билет участия в конгрессе от 5 до 15%
        </div>
        <div class="mt-1">
          2. Твоя тема/спикер будет утверждены для программы конгресса
        </div>
        <div class="mt-1">
          3. Автор сессии отмечается устно, в программе и получает Диплом
        </div>
      </template>
    </DefaultModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import { CustomAxiosError, inputValidate } from "@/types/types";
import { mask } from "vue-the-mask";

export default Vue.extend({
  name: "RegisterComponent",
  directives: { mask },
  components: { MainInput, MainButton, DefaultModal },
  data() {
    return {
      agreement: false,
      modalListParticipant: false,
      phone: "",
      email: "",
      name: "",
      secondName: "",
      password: "",
      passwordConfirm: "",
      registerRequestSending: false,
      inputErrors: {
        phone: "",
        email: "",
        last_name: "",
        first_name: "",
        password: "",
        confirm_password: "",
        common: "",
      },
    };
  },
  computed: {
    formInputs(): inputValidate {
      return this.$refs.formInputs as inputValidate;
    },
  },
  methods: {
    register() {
      const valid = this.formInputs.validate();
      if (valid) {
        const phone = this.phone.replace(/[^\d]/g, "");

        const user = {
          phone,
          email: this.email,
          last_name: this.secondName,
          first_name: this.name,
          password: this.password,
          confirm_password: this.passwordConfirm,
        };
        this.registerRequestSending = true;
        this.api
          .post(process.env.VUE_APP_API_REGISTER, user)
          .then(() => {
            this.openAlert(
              "Регистрация прошла успешно, на ваш email пришло письмо для подтверждения"
            );
            this.$router.push({ name: "Login" });
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
              if (Object.keys(data.fail).length) {
                Object.keys(data.fail).map((el) => {
                  (this.inputErrors as any)[el] = data.fail[el][0];
                });
              }
            }
          })
          .finally(() => {
            this.registerRequestSending = false;
          });
        this.formInputs.resetValidation();
      }
    },
  },
});
</script>

<style scoped lang="scss" src="./Register.scss"></style>
