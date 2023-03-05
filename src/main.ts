import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueCountdown from "@chenfengyuan/vue-countdown";
import "@/styles/style.scss";
import VueSmoothScroll from "vue2-smooth-scroll";
import apiMixin from "@/mixins/Common/Api";
import commonMixin from "@/mixins/Common/Common";

Vue.use(VueSmoothScroll);

Vue.config.productionTip = false;
Vue.component(VueCountdown.name, VueCountdown);

Vue.mixin(apiMixin);
Vue.mixin(commonMixin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
