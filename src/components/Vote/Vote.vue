<template>
  <div class="vote container-wrapper" id="vote">
    <div class="vote__step text24 bold">
      Шаг 1. Ты можешь предложить для выступления спикера или тему которая тебя
      интересует
    </div>
    <div class="vote__suggest-btns">
      <MainButton @click="modalSpeaker = true" class="vote__suggest-btns-btn"
        >Предложить спикера
      </MainButton>
      <MainButton @click="modalTopic = true" class="vote__suggest-btns-btn"
        >Предложить тему
      </MainButton>
    </div>
    <div class="vote__step text24 bold">
      Шаг 2. Проголосуй за понравившуюся тему или спикера своих коллег
    </div>
    <div class="vote__timer">
      <div class="vote__timer-title text24">
        Голосование станет доступно через:
      </div>
      <countdown v-if="timeRemaining > 0" :time="timeRemaining">
        <template slot-scope="props">
          <div class="vote__timer-times">
            <div>
              <div class="vote__timer-times-time">
                {{ getReadableTime(props.days) }}
              </div>
              <div class="vote__timer-times-name">
                {{ getReadableTimeText(props.days, "дни") }}
              </div>
            </div>
            <div class="vote__timer-times-time">&nbsp;:&nbsp;</div>
            <div>
              <div class="vote__timer-times-time">
                {{ getReadableTime(props.hours) }}
              </div>
              <div class="vote__timer-times-name">
                {{ getReadableTimeText(props.hours, "часы") }}
              </div>
            </div>
            <div class="vote__timer-times-time">&nbsp;:&nbsp;</div>
            <div>
              <div class="vote__timer-times-time">
                {{ getReadableTime(props.minutes) }}
              </div>
              <div class="vote__timer-times-name">
                {{ getReadableTimeText(props.minutes, "минуты") }}
              </div>
            </div>
            <div class="vote__timer-times-time">&nbsp;:&nbsp;</div>
            <div>
              <div class="vote__timer-times-time">
                {{ getReadableTime(props.seconds) }}
              </div>
              <div class="vote__timer-times-name">Секунд</div>
            </div>
          </div>
        </template>
      </countdown>
    </div>
    <div class="vote__suggest-btns">
      <div class="vote__suggest-btns-wrap">
        <div
          class="vote__suggest-btns-triangle"
          :class="{
            active: activeButton === TOPIC,
          }"
        ></div>
        <MainButton
          class="vote__suggest-btns-btn"
          @click="activeButton = TOPIC"
          :class="{
            active: activeButton === TOPIC,
          }"
          >Голосуй за тему
        </MainButton>
      </div>
      <div class="vote__suggest-btns-wrap">
        <div
          class="vote__suggest-btns-triangle"
          :class="{
            active: activeButton === SPEAKER,
          }"
        ></div>
        <MainButton
          class="vote__suggest-btns-btn"
          @click="activeButton = SPEAKER"
          :class="{
            active: activeButton === SPEAKER,
          }"
          >Голосуй за спикера
        </MainButton>
      </div>
    </div>
    <div class="vote__divider">
      <div class="vote__divider-grey"></div>
      <div class="vote__divider-white"></div>
    </div>
    <VoteTable
      v-show="activeButton === TOPIC"
      :table-items="topics"
      :voting="timeRemaining <= 0"
    />
    <VoteTable
      v-show="activeButton === SPEAKER"
      :table-items="speakers"
      :voting="timeRemaining <= 0"
      title="Спикер"
    />
    <div class="vote__step text24 bold">
      Шаг 3. Поделись с коллегами возможностью повлиять на программу конгресса
    </div>
    <div class="vote__media">
      <SocialIcons />
    </div>
    <div class="vote__advertising">
      <Advertising />
    </div>
    <DefaultModal
      :modal="modalSpeaker"
      height="auto"
      @close="modalSpeaker = false"
    >
      <template #title>Предложить спикера</template>
      <template #inputs>
        <v-form ref="formSpeaker">
          <MainInput
            :value="proposedSpeaker.name"
            @input="(value) => (proposedSpeaker.name = value)"
            :rules="['required']"
            label="Имя Фамилия спикера"
          />
          <MainInput
            :value="proposedSpeaker.comment"
            @input="(value) => (proposedSpeaker.comment = value)"
            :rules="['required']"
            text-area
            label="Комментарий"
          />
        </v-form>
      </template>
      <template #button>
        <MainButton @click="sendSpeaker" width="250">Отправить </MainButton>
      </template>
    </DefaultModal>
    <DefaultModal :modal="modalTopic" height="auto" @close="modalTopic = false">
      <template #title>Предложить тему</template>
      <template #inputs>
        <v-form ref="formSpeaker">
          <MainInput
            :value="proposedTopic.name"
            @input="(value) => (proposedTopic.name = value)"
            :rules="['required']"
            label="Название темы"
          />
          <MainInput
            :value="proposedTopic.description"
            @input="(value) => (proposedTopic.description = value)"
            :rules="['required']"
            text-area
            label="Описание"
          />
        </v-form>
      </template>
      <template #button>
        <MainButton @click="sendTopic" width="250">Отправить </MainButton>
      </template>
    </DefaultModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import MainButton from "@/components/MainButton/MainButton.vue";
import VoteTable from "@/components/Vote/VoteTable.vue";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import MainInput from "@/components/MainInput/MainInput.vue";
import SocialIcons from "@/components/SocialIcons/SocialIcons.vue";
import Advertising from "@/components/Advertising/Advertising.vue";
import { inputValidate } from "@/types/types";

const TOPIC = "тема";
const SPEAKER = "спикер";
type typesTime = "минуты" | "часы" | "дни";

export default Vue.extend({
  name: "VoteComponent",
  components: {
    MainButton,
    VoteTable,
    DefaultModal,
    MainInput,
    SocialIcons,
    Advertising,
  },
  data() {
    return {
      timeRemaining: 0,
      TOPIC: TOPIC,
      SPEAKER: SPEAKER,
      activeButton: TOPIC,
      modalSpeaker: false,
      modalTopic: false,
      proposedSpeaker: {
        name: "",
        comment: "",
      },
      proposedTopic: {
        name: "",
        description: "",
      },
    };
  },
  mounted() {
    const startOfCongress = 1686430800000;
    this.timeRemaining = startOfCongress - Date.now();
  },
  computed: {
    ...mapState(["topics", "speakers"]),
    formSpeaker(): inputValidate {
      return this.$refs.formSpeaker as inputValidate;
    },
    formTopic(): inputValidate {
      return this.$refs.formTopic as inputValidate;
    },
  },
  methods: {
    sendSpeaker() {
      const valid = this.formSpeaker.validate();
      if (valid) {
        this.modalSpeaker = false;
        this.proposedSpeaker.name = "";
        this.proposedSpeaker.comment = "";
        this.formSpeaker.resetValidation();
      }
    },
    sendTopic() {
      const valid = this.formTopic.validate();
      if (valid) {
        this.modalTopic = false;
        this.proposedTopic.name = "";
        this.proposedTopic.description = "";
        this.formTopic.resetValidation();
      }
    },
    getReadableTime(time: number) {
      return time < 10 ? "0" + time : time;
    },
    getReadableTimeText(time: number, type: typesTime) {
      const textFormsMinutes = ["минуту", "минуты", "минут"];
      const textFormsHours = ["час", "часа", "часов"];
      const textFormsDays = ["день", "дня", "дней"];

      let textForms: string[] = [];
      if (type === "минуты") {
        textForms = textFormsMinutes;
      }
      if (type === "часы") {
        textForms = textFormsHours;
      }
      if (type === "дни") {
        textForms = textFormsDays;
      }
      if (textForms.length === 0) {
        return "";
      }

      time = Math.abs(time) % 100;
      const time1 = time % 10;

      if (time > 10 && time < 20) {
        return textForms[2];
      }
      if (time1 > 1 && time1 < 5) {
        return textForms[1];
      }
      if (time1 == 1) {
        return textForms[0];
      }
      return textForms[2];
    },
  },
});
</script>

<style scoped lang="scss" src="./Vote.scss"></style>
