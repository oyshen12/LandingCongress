import Vue from "vue";
import { AxiosError } from "axios";

export type opportunity = {
  title: string;
  text: string;
};
export type inputValidate = Vue & {
  validate: () => boolean;
  resetValidation: () => void;
};
export type CustomAxiosError = AxiosError & {
  response: {
    data: {
      fail: {
        [key: string]: string[];
      };
      message: string;
      name: string;
      status: number;
    };
  };
};
