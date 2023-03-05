import { State } from "./state";

export default {
  openModalPersonalCabinet(state: State) {
    state.modalPersonalCabinet.opened = true;
  },
  openModalOrderCall(state: State) {
    state.modalOrderCall.opened = true;
  },
  changeModalPersonalCabinet(
    state: State,
    payload: State["modalPersonalCabinet"]
  ) {
    (Object.keys(payload) as Array<keyof State["modalPersonalCabinet"]>).map(
      (key) => {
        if (key in state.modalPersonalCabinet) {
          (state.modalPersonalCabinet as any)[key]! = payload[key]!;
        }
      }
    );
  },
  changeModalOrderCall(state: State, payload: State["modalOrderCall"]) {
    (Object.keys(payload) as Array<keyof State["modalOrderCall"]>).map(
      (key) => {
        if (key in state.modalOrderCall) {
          (state.modalOrderCall as any)[key] = payload[key];
        }
      }
    );
  },
  setUser(state: State, user: State["user"]) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  setAuthed(state: State, payload: boolean) {
    state.authed = payload;
  },
  openAlert(state: State, text: string) {
    state.alertModal = { show: true, text: text };
  },
  closeAlert(state: State) {
    state.alertModal = { show: false, text: "" };
  },
  logout(state: State) {
    state.user = {
      id: 0,
      accessBack: false,
      firstName: "",
      lastName: "",
      patronymic: "",
    };
    state.authed = false;
    localStorage.removeItem("user");
  },
};
