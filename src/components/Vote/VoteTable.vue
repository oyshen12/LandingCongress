<template>
  <div class="table">
    <div class="table-header">
      <div class="table-row header">
        <div class="table-row-text header">{{ title }}</div>
        <div class="table-row-info">
          <div class="table-row-info-wrap">
            <div class="table-row-info-wrap-author header">Автор</div>
            <div class="table-row-info-wrap-discount header">Скидка</div>
          </div>
          <div class="table-row-info-stars header">Голосовать</div>
        </div>
      </div>
    </div>
    <div v-for="(item, i) in rows" :key="i" class="table-row">
      <div class="table-row-text">{{ item.text }}</div>
      <div class="table-row-info">
        <div class="table-row-info-wrap">
          <div class="table-row-info-wrap-author">{{ item.author }}</div>
          <div class="table-row-info-wrap-discount">-{{ item.discount }}%</div>
        </div>
        <div class="table-row-info-stars">
          <v-rating
            v-if="voting"
            :value="item.rating"
            @input="sendRating('input')"
            empty-icon="mdi-star"
            full-icon="mdi-star"
            color="yellow darken-3"
            background-color="grey darken-1"
            hover
            length="5"
            size="23"
          ></v-rating>
          <div v-else>Не доступно</div>
        </div>
      </div>
    </div>
    <div class="table__expand">
      <MainBtn
        v-if="tableItems.length > rows.length"
        @click="rowsShowingAdd"
        class="table__expand-btn"
        >Показать еще</MainBtn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainBtn from "@/components/MainButton/MainButton.vue";

type tableItem = {
  text: string;
  author: string;
  discount: string;
  rating: number;
};
const rowsShowing = 10;

export default Vue.extend({
  name: "VoteTable",
  components: { MainBtn },
  props: {
    tableItems: {
      type: Array as () => tableItem[],
    },
    voting: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Тема",
    },
  },
  data() {
    return {
      rowsShowing: rowsShowing,
    };
  },
  computed: {
    rows(): tableItem[] {
      return this.tableItems?.slice(0, this.rowsShowing) ?? [];
    },
  },
  methods: {
    sendRating(event: string) {
      console.log("sendRating ", event);
    },
    rowsShowingAdd() {
      this.rowsShowing += rowsShowing;
    },
  },
});
</script>

<style lang="scss">
.v-rating {
  display: flex;
  justify-content: space-between;
}
.v-rating .v-icon {
  padding: 0;
}
</style>
<style scoped lang="scss" src="./VoteTable.scss"></style>
