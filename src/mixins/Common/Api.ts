import axios from "axios";
import Vue from "vue";
import Cookies from "js-cookie";
import store from "@/store";

const isDev = process.env.VUE_APP_IS_DEV === "true";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const url = new URL(config.url ?? "", config.baseURL);
  if (isDev) {
    url.searchParams.append(
      "XDEBUG_SESSION_START",
      Cookies.get("XDEBUG_SESSION") ?? ""
    );
  }
  config.url = url.toString();
  if (isDev) {
    config.withCredentials = true;
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("AppError: ", error);
    /** Без обработки ошибок */
    const data = error.response.data;
    const errorValidation = data.name === "Errors of validation";
    if (error.config.cancelErrorHandle || errorValidation) {
      return Promise.reject(error);
    }

    const errorStatus = data.status ? `, код: ${data.status}` : "";
    const errorMessage = data.message
      ? data.message
      : "Внутрення ошибка сервера";
    store.commit("openAlert", errorMessage + errorStatus);

    return Promise.reject(error);
  }
);

export default Vue.extend({
  data() {
    return {
      api: api,
    };
  },
});
