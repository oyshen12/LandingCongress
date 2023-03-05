<template>
  <header class="header">
    <div class="header__wrapper container-wrapper">
      <div class="header__wrapper-nav">
        <div class="header__wrapper-nav-item">
          <RouterLink class="router-link" :to="{ name: 'Main' }">
            Конгресс
          </RouterLink>
        </div>
        <div @click="goTo('participate')" class="header__wrapper-nav-item">
          Участие
        </div>
        <div @click="goTo('vote')" class="header__wrapper-nav-item">
          Спикеры и темы
        </div>
        <div @click="goTo('congress')" class="header__wrapper-nav-item">
          Расписание
        </div>
        <div
          v-if="!authed"
          @click="goTo('register')"
          class="header__wrapper-nav-item"
        >
          Зарегистрироваться
        </div>
        <div v-else @click="goTo('coupons')" class="header__wrapper-nav-item">
          Купоны
        </div>
        <div class="header__wrapper-nav-mobile">
          <v-icon
            v-if="mobileMenuOpened"
            @click="closeMobileMenu"
            class="header__wrapper-nav-mobile-img pointer"
            >mdi-window-close
          </v-icon>
          <v-icon
            v-else
            @click="openMobileMenu"
            class="header__wrapper-nav-mobile-img pointer"
            >mdi-menu
          </v-icon>
          <v-scroll-y-transition>
            <div
              v-if="mobileMenuOpened"
              class="header__wrapper-nav-mobile-menu"
            >
              <div class="header__wrapper-nav-mobile-menu-item">
                <RouterLink class="router-link" :to="{ name: 'Main' }">
                  Конгресс
                </RouterLink>
              </div>
              <div
                @click="goTo('participate')"
                class="header__wrapper-nav-mobile-menu-item"
              >
                Участие
              </div>
              <div
                @click="goTo('vote')"
                class="header__wrapper-nav-mobile-menu-item"
              >
                Спикеры и темы
              </div>
              <div
                @click="goTo('congress')"
                class="header__wrapper-nav-mobile-menu-item"
              >
                Расписание
              </div>
              <div
                v-if="!authed"
                @click="goTo('register')"
                class="header__wrapper-nav-mobile-menu-item"
              >
                Зарегистрироваться
              </div>
              <div
                v-else
                @click="goTo('coupons')"
                class="header__wrapper-nav-mobile-menu-item"
              >
                Купоны
              </div>
            </div>
          </v-scroll-y-transition>
        </div>
      </div>
      <div v-if="authed" class="header__wrapper-nav-user">
        <v-menu offset-y open-on-hover :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="pointer">
              {{ user.firstName }} {{ user.lastName }}
            </div>
          </template>
          <v-list>
            <v-list-item
              @click="FullLogout"
              class="header__wrapper-nav-user-exit pointer"
            >
              <div v-if="!logoutRequestLoading">Выход</div>
              <Spinner size="30" width="2" v-else />
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-if="user.accessBack" class="header__wrapper-nav-user-admin">
          <a :href="adminPanelLink" target="_blank">Админка</a>
        </div>
      </div>
      <div v-else>
        <RouterLink class="router-link" :to="{ name: 'Login' }">
          <MainButton color-red>Личный кабинет </MainButton>
        </RouterLink>
      </div>
    </div>
    <div
      v-if="mobileMenuOpened"
      @click="closeMobileMenu"
      class="header__wrapper-nav-mobile-wrap"
    ></div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { smoothToElems } from "@/types";
import MainButton from "@/components/MainButton/MainButton.vue";
import Spinner from "@/components/CommonComponents/Spinner/Spinner.vue";

export default Vue.extend({
  name: "App",
  components: { MainButton, Spinner },
  data: () => ({
    mobileMenuOpened: false,
    logoutRequestLoading: false,
  }),
  computed: {
    ...mapState(["authed", "user"]),
    adminPanelLink() {
      return process.env.VUE_APP_BASE_URL + "/back";
    },
  },
  methods: {
    ...mapMutations(["openModalPersonalCabinet", "logout"]),
    openMobileMenu() {
      this.mobileMenuOpened = true;
    },
    closeMobileMenu() {
      this.mobileMenuOpened = false;
    },
    goTo(id: smoothToElems) {
      this.mobileMenuOpened = false;
      this.smoothTo(id);
    },
    FullLogout() {
      if (!this.logoutRequestLoading) {
        this.logoutRequestLoading = true;
        this.api
          .get(process.env.VUE_APP_API_LOGOUT)
          .then(() => {
            this.logout();
          })
          .finally(() => {
            this.logoutRequestLoading = false;
          });
      }
    },
  },
});
</script>
<style scoped lang="scss" src="./Header.scss"></style>
