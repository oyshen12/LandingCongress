<template>
  <v-select
    class="input rounded-md"
    dense
    outlined
    background-color="white"
    :value="value"
    @input="updateValue($event)"
    :label="label"
    :rules="enableRules"
    :items="items"
    clearable
  >
    <template #append>
      <v-icon>mdi-menu-down</v-icon>
    </template>
  </v-select>
</template>

<script lang="ts">
import Vue from "vue";

type rules = "required";
type validateRulesField = (v: string, v2?: string) => string | boolean;
type validateRules = Record<rules, validateRulesField>;

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
    items: {
      type: Array,
    },
    rules: {
      type: Array as unknown as () => rules[],
    },
  },
  data() {
    return {
      validateRules: {
        required: (v: string) => v !== "" || "Обязательное поле",
      } as validateRules,
    };
  },
  methods: {
    updateValue(val: Event): void {
      this.$emit("input", val ?? "");
    },
  },
  computed: {
    enableRules() {
      let rules: validateRulesField[] = [];
      Object.keys(this.validateRules).map((rule) => {
        if (this.rules !== undefined && this.rules.includes(rule as rules)) {
          rules.push(this.validateRules[rule as rules]);
        }
      });
      return rules;
    },
  },
});
</script>

<style lang="scss"></style>
