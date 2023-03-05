<template>
  <div class="participate" id="participate">
    <div class="container-wrapper">
      <div class="participate__banner">
        <div class="participate__banner-name bold">
          В этот раз твое участие необходимо!
        </div>
        <div class="participate__banner-list">
          <div class="participate__banner-list-item">
            <div class="participate__banner-list-item-img"></div>
            <div class="participate__banner-list-item-text">
              Новый формат — теперь ты определяешь программу конгресса
            </div>
          </div>
          <div class="participate__banner-list-item">
            <div class="participate__banner-list-item-img"></div>
            <div class="participate__banner-list-item-text large">
              Знания и практики, которые ты можешь получить - приоритет
              организации конгресса
            </div>
          </div>
        </div>
      </div>
      <div class="participate__banner-mobile">
        <div class="participate__banner-mobile-header">
          <div class="participate__banner-mobile-header-text bold">
            В этот раз твое участие необходимо!
          </div>
        </div>
        <div class="participate__banner-mobile-list">
          <div class="participate__banner-mobile-list-item">
            <v-img
              width="36"
              height="36"
              src="../../assets/Participate/check_mark.png"
              class="mt-1"
            ></v-img>
            <div class="participate__banner-mobile-list-item-text">
              Новый формат — теперь ты определяешь программу конгресса
            </div>
          </div>
          <div class="participate__banner-mobile-list-item mt-4">
            <v-img
              width="36"
              height="36"
              src="../../assets/Participate/check_mark.png"
              class="mt-1"
            ></v-img>
            <div class="participate__banner-mobile-list-item-text">
              Знания и практики, которые ты можешь получить - приоритет
              организации конгресса
            </div>
          </div>
        </div>
      </div>
      <div class="participate__divider">
        <div class="dash"></div>
        <div class="participate__divider-text text24 bold">
          Почему в этот раз стоит участвовать?
        </div>
        <div class="dash"></div>
      </div>
      <div class="participate__choice">
        <div class="participate__choice-left">
          <div class="participate__choice-left-title text24 bold">
            Отказался и поэтому отстал от коллег в конкуренции
          </div>
          <div
            v-for="(opportunity, i) in opportunitiesFirstBlock"
            :key="i"
            class="participate__choice-left-item"
          >
            <div class="participate__choice-left-item-title bold">
              {{ opportunity.title }}
            </div>
            <div class="participate__choice-left-item-text">
              {{ opportunity.text }}
            </div>
            <div
              v-if="i !== opportunitiesFirstBlock.length - 1"
              class="participate__choice-left-item-divider"
            ></div>
          </div>
        </div>
        <div class="participate__choice-right">
          <div class="participate__choice-right-title text24 bold">
            Получил возможность - принял участие
          </div>
          <div
            v-for="(opportunity, i) in opportunitiesSecondBlock"
            :key="i"
            class="participate__choice-right-item"
          >
            <div class="participate__choice-right-item-title bold">
              {{ opportunity.title }}
            </div>
            <div class="participate__choice-right-item-text">
              {{ opportunity.text }}
            </div>
            <div
              v-if="i !== opportunitiesSecondBlock.length - 1"
              class="participate__choice-right-item-divider"
            ></div>
          </div>
        </div>
        <div class="participate__smile sad"></div>
        <div class="participate__smile happy"></div>
      </div>
      <div class="participate__choice-mobile">
        <div class="participate__choice-mobile top">
          <v-img
            src="../../assets/Participate/smile2.png"
            width="66"
            height="95"
          ></v-img>
          <div class="d-flex flex-column ml-0 ml-sm-8">
            <div class="participate__choice-mobile-title bold">
              Отказался и поэтому отстал от коллег в конкуренции
            </div>
            <div
              v-for="(opportunity, i) in opportunitiesFirstBlock"
              :key="i"
              class="participate__choice-mobile-item"
            >
              <div class="participate__choice-mobile-item-title bold">
                {{ opportunity.title }}
              </div>
              <div class="participate__choice-mobile-item-text">
                {{ opportunity.text }}
              </div>
              <div
                v-if="i !== opportunitiesFirstBlock.length - 1"
                class="participate__choice-mobile-item-divider"
              ></div>
            </div>
          </div>
        </div>
        <div class="participate__choice-mobile bottom">
          <v-img
            src="../../assets/Participate/smile1.png"
            width="66"
            height="95"
          ></v-img>
          <div class="d-flex flex-column ml-0 ml-sm-8">
            <div class="participate__choice-mobile-title bold">
              Получил возможность - принял участие
            </div>
            <div
              v-for="(opportunity, i) in opportunitiesSecondBlock"
              :key="i"
              class="participate__choice-mobile-item"
            >
              <div class="participate__choice-mobile-item-title bold">
                {{ opportunity.title }}
              </div>
              <div class="participate__choice-mobile-item-text">
                {{ opportunity.text }}
              </div>
              <div
                v-if="i !== opportunitiesSecondBlock.length - 1"
                class="participate__choice-mobile-item-divider bottom"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="participate__owner">
        <div
          v-for="(owner, i) in owners"
          :key="i"
          class="participate__owner-item"
        >
          <v-hover v-slot="{ hover }">
            <div class="participate__owner-item-wrap">
              <div v-if="!hover" class="participate__owner-item-view">
                <v-img
                  :src="owner.img"
                  class="participate__owner-item-view-img"
                ></v-img>
                <div class="participate__owner-item-view-title text24 bold">
                  {{ owner.title }}
                </div>
              </div>
              <div v-else class="participate__owner-item-info">
                <div class="participate__owner-item-info-title text24 bold">
                  {{ owner.title }}
                </div>
                <ul class="participate__owner-item-info-list">
                  <li
                    v-for="(profit, i) in owner.profits"
                    :key="i"
                    class="participate__owner-item-info-list-item"
                  >
                    {{ profit }}
                  </li>
                </ul>
              </div>
            </div>
          </v-hover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { opportunity } from "@/types/types";

export default Vue.extend({
  name: "ParticipateComponent",
  data() {
    return {
      opportunities: [
        {
          title: "Нет новизны проф. контактов",
          text: "Lorem ipsum dolor sit amet, consectetu adipiscing elit, sed",
        },
        {
          title: "Потрерял возможность первым узнать новые технологии",
          text: "Duis aute irure dolor in reprehenderit",
        },
        {
          title: "Упустил возможность стать эффективнее ",
          text: "Sed ut perspiciatis, unde omnis iste natus",
        },
        {
          title: "Остался в неизвестности",
          text: "Sed ut perspiciatis, unde omnis iste natus",
        },
        {
          title: "Погряз в рутине",
          text:
            "Ut enim ad minim veniam, quis nostrud\n" +
            "exercitation ullamco laboris nisi ut aliquip",
        },
        {
          title: "Получил региональных партнеров",
          text:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\n" +
            "nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "Интегрировал новые продукты в компанию",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n" +
            "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Перенял  успешный опыт коллег",
          text:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\n" +
            "nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "Заявил о себе",
          text:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum\n" +
            "dolore eu fugiat nulla pariatur.",
        },
        {
          title: "Переключился и получил заряд энергии от коллег",
          text: "Sed ut perspiciatis, unde omnis iste natus error sit.",
        },
      ] as opportunity[],
      owners: [
        {
          title: "Агенту",
          profits: [
            "Практическая польза",
            "Новизна практик",
            "Эффективные инструменты работы",
          ],
          img: require("../../assets/Participate/agent.png"),
        },
        {
          title: "Брокеру",
          profits: [
            "Готовые чек листы и скрипты",
            "Новизна практик",
            "Прокачай лидерские навыки",
          ],
          img: require("../../assets/Participate/broker.png"),
        },
        {
          title: "Директору/владелецу",
          profits: [
            '"Встряхни" свою команду',
            "Эффективные инструменты управления",
            "Увеличение контактов и связей",
          ],
          img: require("../../assets/Participate/director.png"),
        },
        {
          title: "Банкам",
          profits: [
            "Заяви о себе",
            "Расширь горизонты продаж",
            "Получи целевую аудиторию",
          ],
          img: require("../../assets/Participate/banks.png"),
        },
        {
          title: "Строительным компаниям",
          profits: [
            "Увеличь дилерскую сеть",
            "Заяви о себе",
            "Тренды потребностей и предпочтений",
          ],
          img: require("../../assets/Participate/companies.png"),
        },
        {
          title: "Страховым компаниям",
          profits: [
            "Расширь горизонты продаж",
            "Увеличь дилерскую сеть",
            "Заяви о себе",
          ],
          img: require("../../assets/Participate/insure.png"),
        },
      ],
    };
  },
  computed: {
    opportunitiesFirstBlock(): opportunity[] {
      return this.opportunities.slice(0, 5);
    },
    opportunitiesSecondBlock(): opportunity[] {
      return this.opportunities.slice(5);
    },
  },
});
</script>

<style scoped lang="scss" src="./Participate.scss"></style>
