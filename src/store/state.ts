export const state = {
  authed: false,
  alertModal: {
    show: false,
    text: "",
  },
  user: {
    id: 0,
    accessBack: false,
    firstName: "",
    lastName: "",
    patronymic: "",
  },
  topics: Array(21).fill({
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n" +
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    author: "Имя Фамилия",
    discount: "15",
    rating: 0,
  }),
  speakers: Array(21).fill({
    text: "Имя Фамилия",
    author: "Имя Фамилия",
    discount: "15",
    rating: 0,
  }),
  modalPersonalCabinet: {
    opened: false,
    email: "",
    password: "",
  },
  modalOrderCall: {
    opened: false,
    email: "",
    phone: "",
  },
};

export type State = typeof state;
