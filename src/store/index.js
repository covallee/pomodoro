import { createStore } from "vuex";

export default createStore({
  state: {
    totalToday: 0,
  },
  mutations: {
    INCREMENT_TOTAL(state) {
      state.totalToday++;
    },
  },
  actions: {},
  modules: {},
});
