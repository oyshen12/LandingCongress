<template>
  <div class="list">
    <div class="list-wrapper container-wrapper">
      <div class="list__title text24 bold">
        На XXVII ежегодной конференции по недвижимости зарегистировано:
      </div>
      <div class="list__amount bold">9862</div>
      <MainButton
        @click="modalListRegistered = true"
        color-white
        class="list__button"
        >Список участников</MainButton
      >
    </div>
    <DefaultModal
      :modal="modalListRegistered"
      width="920"
      height="auto"
      @close="modalListRegistered = false"
    >
      <template #title>Зарегистрировалось: 87</template>
      <template #additional>
        <div class="table">
          <div class="table__row header">
            <div class="table__item company header">Название компании</div>
            <div class="table__item name header">ФИ</div>
            <div class="table__item city header">Город</div>
            <div class="table__item amount header">Кол-во</div>
          </div>
          <div v-for="(registered, i) in rows" :key="i" class="table__row">
            <div class="table__row-wrapper">
              <div class="table__item company">
                {{ registered.companyName }}
              </div>
              <div class="table__item name">{{ registered.name }}</div>
            </div>
            <div class="table__row-wrapper">
              <div class="table__item city">{{ registered.city }}</div>
              <div class="table__item amount">{{ registered.amount }}</div>
            </div>
          </div>
          <div class="table__expand">
            <MainButton
              v-if="registered.length > rows.length"
              @click="rowsShowingAdd"
              class="table__expand-btn"
              >Показать еще</MainButton
            >
          </div>
        </div>
      </template>
    </DefaultModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";

type tableItem = {
  companyName: string;
  name: string;
  city: string;
  amount: string;
};
const rowsShowing = 5;

export default Vue.extend({
  name: "ListParticipant",
  components: { MainButton, DefaultModal },
  data() {
    return {
      rowsShowing: rowsShowing,
      modalListRegistered: false,
    };
  },
  computed: {
    registered(): tableItem[] {
      return Array(20).fill({
        companyName: "Lorem ipsum dolor sit amet",
        name: "Имя Фамилия",
        city: "Белгород",
        amount: "4",
      });
    },
    rows(): tableItem[] {
      return this.registered?.slice(0, this.rowsShowing) ?? [];
    },
  },
  methods: {
    rowsShowingAdd() {
      this.rowsShowing += rowsShowing;
    },
  },
});
</script>

<style scoped lang="scss" src="./ListParticipant.scss"></style>
