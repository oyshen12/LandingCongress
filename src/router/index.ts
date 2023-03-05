import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/Main/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Authorization/Login/Login.vue"),
  },
  {
    path: "/confirm/email",
    name: "ConfirmEmail",
    component: () => import("../components/ConfirmEmail/ConfirmEmail.vue"),
  },
  {
    path: "/password/reset",
    name: "PasswordRestore",
    component: () =>
      import("../views/Authorization/PasswordReset/PasswordReset.vue"),
  },
  {
    path: "*",
    redirect: () => {
      window.location.href = `${process.env.VUE_APP_BASE_URL}back/e404`;
      return {};
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
