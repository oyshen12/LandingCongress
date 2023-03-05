<template>
  <div class="registration" id="register">
    <div class="container-wrapper">
      <v-form ref="formInputs">
        <div class="registration__title">
          <div class="dash"></div>
          <div class="registration__title-text text24 bold">
            Хочешь больше привилегий? Пройди полную регистрацию
          </div>
          <div class="dash"></div>
        </div>
        <div class="registration__list">
          <div class="registration__list-info bold">
            <div class="registration__list-info-text">
              Что даст большая регистрация:
            </div>
          </div>
          <div class="registration__list-list">
            <div>
              1. Возможность купить ограниченное кол-во купонов со скидкой на
              участие в конгрессе.
            </div>
            <div>
              2. Возможность получать уникальные предложения от партнеров
              конгресса.
            </div>
            <div>
              3. Возможность получить бесплатно именной сертификат участника.
            </div>
            <div>
              4. Доступ к закрытому электронному архиву презентаций с контактами
              спикеров.
            </div>
          </div>
        </div>
        <div class="registration__dash"></div>
        <div class="registration__inputs">
          <MainInput
            :value="name"
            label="Фамилия"
            :rules="['required']"
            @input="(value) => (name = value)"
          />
          <MainInput
            :value="secondName"
            label="Имя"
            :rules="['required']"
            @input="(value) => (secondName = value)"
          />
          <MainInput
            :value="patronymic"
            label="Отчество"
            :rules="['required']"
            @input="(value) => (patronymic = value)"
          />
          <MainSelectInput
            :value="region"
            class="registration__inputs-input"
            label="Регион нахождения (часовой пояс)"
            :rules="['required']"
            :items="regionItems"
            @input="(value) => (region = value)"
          />
          <MainSelectInput
            :value="gender"
            label="Пол"
            :rules="['required']"
            :items="genders"
            @input="(value) => (gender = value)"
          />
          <v-menu
            v-model="dateOfBirthVisible"
            :close-on-content-click="false"
            :nudge-top="20"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateOfBirth"
                label="Дата рождения"
                dense
                outlined
                readonly
                background-color="white"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateOfBirth"
              @input="dateOfBirthVisible = false"
              :show-current="false"
              locale="ru-RU"
              :max="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
          <MainSelectInput
            :value="industry"
            label="Отрасль"
            :rules="['required']"
            :items="industries"
            @input="(value) => (industry = value)"
          />
          <MainInput
            :value="specialization"
            label="Специализация"
            :rules="['required']"
            @input="(value) => (specialization = value)"
          />
          <MainInput
            :value="experienceInSpecialization"
            label="Стаж в специализации"
            :rules="['required']"
            @input="(value) => (experienceInSpecialization = value)"
          />
          <MainInput
            :value="promocode"
            label="Партнерский промокод"
            @input="(value) => (promocode = value)"
          />
          <MainInput
            :value="password"
            label="Придумайте пароль"
            :rules="['required', 'min']"
            min="6"
            @input="(value) => (password = value)"
            type-password
          />
          <MainInput
            :value="passwordConfirm"
            label="Подтвердите пароль"
            :rules="['required', 'min']"
            min="6"
            @input="(value) => (passwordConfirm = value)"
            type-password
            :pass-comparison="[password, passwordConfirm]"
          />
        </div>
        <div class="registration__dash"></div>
        <div class="registration__inputs">
          <MainSelectInput
            :value="employmentType"
            label="Тип занятости"
            :rules="['required']"
            :items="employmentTypes"
            @input="(value) => (employmentType = value)"
          />
          <MainInput
            :value="post"
            label="Должность"
            :rules="['required']"
            @input="(value) => (post = value)"
          />
          <MainInput
            :value="company"
            label="Компания"
            :rules="['required']"
            @input="(value) => (company = value)"
          />
          <MainInput
            :value="site"
            label="Сайт компании"
            :rules="['required']"
            @input="(value) => (site = value)"
          />
          <MainInput
            :value="amountEmployees"
            label="Кол-во сотрудников"
            :rules="['required']"
            @input="(value) => (amountEmployees = value)"
          />
          <MainInput
            :value="entrepreneurshipTerm"
            label="Срок предпринимательства"
            :rules="['required']"
            @input="(value) => (entrepreneurshipTerm = value)"
          />
          <MainInput
            :value="billingDetails"
            label="Реквизиты для выставления счетов"
            :rules="['required']"
            @input="(value) => (billingDetails = value)"
          />
          <MainInput
            :value="taxationSystem"
            label="Система налогооблажения"
            :rules="['required']"
            @input="(value) => (taxationSystem = value)"
          />
        </div>
        <div class="registration__dash"></div>
        <div class="registration__reveal-text bold">
          Заполняется по желанию, для того, чтобы вы получали целевые
          предложения от партнеров конгресс
        </div>
        <div class="registration__reveal">
          <MainInput
            :value="incomeLevel"
            label="Уровень доходов"
            @input="(value) => (incomeLevel = value)"
            class="registration__reveal-input"
          />
          <v-checkbox
            v-model="agreement"
            light
            class="registration__reveal-checkbox"
            hide-details
            label="Согласие на обработку данных"
            :rules="[(v) => !!v || 'Обязательное поле']"
          >
          </v-checkbox>
          <MainButton
            @click="revealBonuses"
            class="registration__reveal-button"
            color-red
            >Раскрыть бонусы и привилегии
          </MainButton>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainInput from "@/components/MainInput/MainInput.vue";
import MainSelectInput from "@/components/MainSelectInput/MainSelectInput.vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import { inputValidate } from "@/types/types";

export default Vue.extend({
  name: "FullRegistration",
  components: { MainInput, MainSelectInput, MainButton },
  data() {
    return {
      name: "",
      secondName: "",
      patronymic: "",
      specialization: "",
      experienceInSpecialization: "",
      promocode: "",
      password: "",
      passwordConfirm: "",
      region: "",
      regionItems: [
        "Время МСК-1 (UTC+2) Калининградское",
        "Время МСК (UTC+3) Московское",
        "Время МСК+1 (UTC+4) Самарское",
        "Время МСК+2 (UTC+5) Иркутское",
        "Время МСК+3 (UTC+6) Омское",
        "Время МСК+4 (UTC+7) Красноярское",
        "Время МСК+5 (UTC+8) Калининградское",
        "Время МСК+6 (UTC+9) Якутское",
        "Время МСК+7 (UTC+10) Владивостокское",
        "Время МСК+8 (UTC+11) Магаданское",
        "Время МСК+9 (UTC+12) Камчатское",
      ],
      gender: "",
      genders: ["Мужской", "Женский"],
      industry: "",
      industries: [
        "Гостиницы, рестораны, общепит",
        "Государственные организации ",
        "Добывающая отрасль",
        "ЖКХ",
        "Информационные технологии",
        "Искусство, культура",
        "Медицина, фармацевтика",
        "Нефть и газ",
        "Образовательные учреждения",
        "Розничная торговля",
        "Услуги для бизнеса",
      ],
      employmentType: "",
      employmentTypes: ["Частник", "Наемник", "Собтвенник", "Гос. структура"],
      post: "",
      company: "",
      site: "",
      amountEmployees: "",
      entrepreneurshipTerm: "",
      billingDetails: "",
      taxationSystem: "",
      dateOfBirth: "",
      dateOfBirthVisible: false,
      incomeLevel: "",
      agreement: false,
    };
  },
  computed: {
    formInputs(): inputValidate {
      return this.$refs.formInputs as inputValidate;
    },
  },
  methods: {
    revealBonuses() {
      const valid = this.formInputs.validate();
      if (valid) {
        console.log("revealBonuses");
        this.formInputs.resetValidation();
      }
    },
  },
  watch: {
    dateOfBirth(newVal) {
      if (newVal) {
        this.dateOfBirthVisible = false;
      }
    },
  },
});
</script>

<style scoped lang="scss" src="./FullRegistration.scss"></style>
