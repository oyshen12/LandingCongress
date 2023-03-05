<template>
  <div class="footer">
    <div class="container-wrapper">
      <div class="footer__info">
        <div class="footer__info-item">
          <div class="d-flex">
            <div class="footer__info-img"></div>
            <div class="footer__info-img-title bold">
              Ежегодная<br />
              конференция<br />
              по недвижимости
            </div>
          </div>
        </div>
        <div class="footer__info-item">
          <div class="footer__info-item-contacts">
            Контакты: Lorem ipsum dolor sit amet, consectetur adipiscing
          </div>
        </div>
        <div class="footer__info-item button">
          <MainButton
            @click="changeModalOrderCall({ opened: true })"
            color-white
            >Заказать звонок</MainButton
          >
        </div>
        <div class="footer__info-item documents">
          <div class="d-flex flex-column">
            <div class="pointer">Оферта</div>
            <div class="mt-1 pointer">Реквизиты</div>
          </div>
        </div>
      </div>
      <div class="footer__info under">
        <div class="footer__info-item documents-under">
          <div class="pointer">Оферта</div>
          <div class="ml-5 pointer">Реквизиты</div>
        </div>
        <div class="footer__info-item footer__text">
          Основной сайт конгресса будет доступен с 1 марта
        </div>
      </div>
      <div class="footer__info-960">
        <div class="footer__info-item">
          <div class="d-flex">
            <div class="footer__info-img"></div>
            <div class="footer__info-img-title bold">
              Ежегодная<br />
              конференция<br />
              по недвижимости
            </div>
          </div>
        </div>
        <div class="footer__info-item no-border">
          <div class="footer__info-item-contacts">
            Контакты: Lorem ipsum dolor sit amet, consectetur adipiscing
          </div>
        </div>
        <div class="footer__info-item">
          <div class="pointer">Оферта</div>
          <div class="ml-5 pointer">Реквизиты</div>
        </div>
        <div class="footer__info-item no-border">
          <MainButton
            @click="changeModalOrderCall({ opened: true })"
            color-white
            >Заказать звонок</MainButton
          >
        </div>
      </div>
      <div class="footer__info-600">
        <div class="footer__info-item no-border">
          <div class="d-flex">
            <div class="footer__info-img"></div>
            <div class="footer__info-img-title bold">
              Ежегодная<br />
              конференция<br />
              по недвижимости
            </div>
          </div>
        </div>
        <div class="footer__info-item no-border">
          <div class="footer__info-item-contacts mt-7">
            Контакты: Lorem ipsum dolor sit amet, consectetur adipiscing
          </div>
        </div>
        <div class="footer__info-item mt-7 no-border">
          <MainButton
            @click="changeModalOrderCall({ opened: true })"
            color-white
            >Заказать звонок</MainButton
          >
        </div>
        <div class="footer__info-item mt-7 no-border">
          <div class="pointer">Оферта</div>
          <div class="ml-5 pointer">Реквизиты</div>
        </div>
      </div>
      <div class="footer__text mobile">
        Основной сайт конгресса будет доступен с 1 марта
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainButton from "@/components/MainButton/MainButton.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "FooterComponent",
  components: { MainButton },
  methods: {
    ...mapMutations(["changeModalOrderCall"]),
  },
});
</script>

<style lang="scss" src="./Footer.scss"></style>
