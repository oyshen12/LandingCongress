<template>
  <v-text-field
    v-if="!textArea"
    class="input rounded-md"
    dense
    outlined
    background-color="white"
    :value="value"
    @input="updateValue($event)"
    :label="label"
    :rules="enabledRules"
    :type="typeInput"
    :append-icon="appendIcon"
    :error="error"
    :prefix="prefix"
    :error-messages="errorMessage"
    :autocomplete="getAutocomplete"
    @click:append="passwordVisible = !passwordVisible"
  ></v-text-field>
  <v-textarea
    v-else
    dense
    outlined
    auto-grow
    :value="value"
    @input="updateValue($event)"
    :label="label"
    :error="error"
    :error-messages="errorMessage"
    :rules="enabledRules"
  ></v-textarea>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";

type rules =
  | "required"
  | "min"
  | "max"
  | "passwords"
  | "email"
  | "phone"
  | "string"
  | "number";
type validateRulesField = (v: string, v2?: string) => string | boolean;
type validateRules = {
  [key in rules]: validateRulesField;
};

export default Vue.extend({
  name: "MainInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    max: {
      type: String,
    },
    min: {
      type: String,
    },
    textArea: {
      type: Boolean,
      default: false,
    },
    typePassword: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array as unknown as () => rules[],
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
    },
    passComparison: {
      type: Array as PropType<string[]>,
    },
  },
  data() {
    return {
      passwordVisible: false,
      validateRules: {
        required: (v: string) => v !== "" || "Обязательное поле",
        min: (v: string) =>
          v.length >= +this.min || `Минимум ${this.min} символов`,
        max: (v: string) =>
          v.length <= +this.max || `Максимум ${this.max} символов`,
        passwords: (v1: string, v2: string) =>
          v1 === v2 || "Пароли должны совпадать",
        email: (v: string) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Некорректный e-mail";
        },
        phone: (v: string) => {
          // eslint-disable-next-line
          let pattern =
            // eslint-disable-next-line no-useless-escape
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          return pattern.test(v) || "Некорректный номер телефона";
        },
        string: (v: string) => {
          const pattern = /^[а-яА-ЯёЁ ]+$/g;
          return pattern.test(v) || "Только русские буквы";
        },
        number: (v: string) => {
          const pattern = /^\d+$/;
          return pattern.test(v) || "Только цифры";
        },
      } as validateRules,
    };
  },
  methods: {
    updateValue(val: Event): void {
      this.$emit("input", val);
    },
  },
  computed: {
    typeInput(): string {
      if (this.typePassword) {
        return this.passwordVisible ? "text" : "password";
      }
      return "text";
    },
    appendIcon(): string {
      if (this.typePassword) {
        return this.passwordVisible ? "mdi-eye" : "mdi-eye-off";
      }
      return "";
    },
    enabledRules() {
      let rules: validateRulesField[] = [];
      Object.keys(this.validateRules).map((rule) => {
        if (this.rules !== undefined && this.rules.includes(rule as rules)) {
          rules.push(this.validateRules[rule as rules]);
        }
      });

      if (this.passComparison !== undefined) {
        rules.push(
          this.validateRules.passwords(
            this.passComparison[0],
            this.passComparison[1]
          ) as any
        );
      }

      return rules;
    },
    getAutocomplete() {
      return this.autocomplete ? "" : "new-password";
    },
  },
});
</script>

<style scoped lang="scss" src="./MainInput.scss"></style>
