<template>
  <div class="congress container-wrapper" id="congress">
    <div class="congress__title">
      <div class="dash"></div>
      <div class="congress__title-text text24 bold">
        Планируемая программа конгресса
      </div>
      <div class="dash"></div>
    </div>
    <div class="congress__buttons">
      <MainButton
        v-for="day in 4"
        :key="day"
        @click="dayButtonActive = day"
        :class="[
          {
            active: dayButtonActive === day,
          },
        ]"
        class="congress__buttons-button"
        >День {{ day }}
      </MainButton>
    </div>
    <div class="congress__table">
      <div
        v-for="(program, i) in programList"
        :key="i"
        class="congress__table-row"
      >
        <div class="congress__table-row-time bold">{{ program.time }}</div>
        <div class="congress__table-row-wrap">
          <div
            class="congress__table-row-text"
            :class="{
              speaker: program.itSpeaker,
            }"
          >
            {{ program.text }}
          </div>
          <div class="congress__table-row-info">
            <div class="congress__table-row-info-author">
              {{ program.author }}
            </div>
            <div class="congress__table-row-info-place">
              {{ program.place }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="congress__table-mobile">
      <div
        v-for="(program, i) in programList"
        :key="i"
        class="congress__table-row"
      >
        <div class="d-flex align-center">
          <div class="congress__table-row-time bold">{{ program.time }}</div>
          <div>{{ program.author }}</div>
        </div>
        <div
          :style="{
            color: program.itSpeaker ? 'red' : 'black',
          }"
          class="mt-2"
        >
          {{ program.text }}
        </div>
        <div class="mt-2">
          {{ program.place }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainButton from "@/components/MainButton/MainButton.vue";

export default Vue.extend({
  name: "CongressProgram",
  components: { MainButton },
  data() {
    return {
      dayButtonActive: 1,
    };
  },
  computed: {
    programList() {
      const list = [];
      for (let i = 1; i < 10; i++) {
        list.push({
          time: "09:00",
          text:
            "Заголовок. Ut enim ad minim veniam, quis nostrud exercitation \n" +
            "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "Имя Фамилия",
          place: "Место проведения, Конференц зал 1",
          itSpeaker: false,
        });
      }
      list[1].itSpeaker = true;
      list[1].text =
        "Тут будет тема / спикер, которые наберут наибольщее кол-во голосов";
      list[5].itSpeaker = true;
      list[5].text =
        "Тут будет тема / спикер, которые наберут наибольщее кол-во голосов";
      return list;
    },
  },
});
</script>

<style scoped lang="scss" src="./CongressProgram.scss"></style>
