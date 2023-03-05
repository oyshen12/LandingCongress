<template>
  <div class="greetings" id="greetings">
    <div class="container-wrapper">
      <div class="greetings-wrapper">
        <div class="greetings__events">
          <div class="greetings__events-logo">
            <div class="greetings__events-logo-name bold uppercase">
              Потрясающее событие 2023 года!
            </div>
            <div class="greetings__events-logo-wrap">
              <div class="greetings__events-logo-wrap-img"></div>
              <div
                class="greetings__events-logo-wrap-text text24 uppercase bold"
              >
                Ежегодная конференция по недвижимости
              </div>
            </div>
          </div>
          <div>
            <div class="greetings__events-numbers bold">XXVII</div>
            <div
              class="greetings__events-numbers-info text24 uppercase bold mt"
            >
              Ежегодная конференция ПО НЕДВИЖИМОСТИ
            </div>
            <div class="greetings__events-numbers-info text24 uppercase bold">
              15 июля 2023
            </div>
          </div>
        </div>
        <div class="greetings__info">
          <div class="greetings__info-text">
            <span class="bold">Организатор:</span> Российская гильдия риэлторов
          </div>
          <div class="greetings__info-text">
            <span class="bold">Место и формат проведения:</span> Москва, ул.
            Б.Ельцина 3, Ельцин Центр
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GreetingsComponent",
});
</script>

<style scoped lang="scss" src="./Greetings.scss"></style>
