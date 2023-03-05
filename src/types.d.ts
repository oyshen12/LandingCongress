import Vue from "vue";

type smoothToElems =
  | "greetings"
  | "participate"
  | "vote"
  | "congress"
  | "register"
  | "coupons"
  | "register-short";

declare module "vue/types/vue" {
  interface Vue {
    api: AxiosInstance;
    smoothTo: (elemId: smoothToElems) => Promise<void>;
    openAlert: (text: string) => void;
  }
}
