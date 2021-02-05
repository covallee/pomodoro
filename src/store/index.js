import { createStore } from "vuex";

export default createStore({
  state: {
    totalToday: 0
  },
  mutations: {
    increment (state) {
      state.totalToday++
    }
  },
  actions: {},
  modules: {}
});
