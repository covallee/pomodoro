import { createStore } from "vuex";

export default createStore({
  state: {
    totalToday: 0,
    pomodoros: [],
  },
  mutations: {
    INCREMENT_TOTAL(state) {
      state.totalToday++;
    },
    ADD_NEW_POMODORO(state, payload) {
      state.pomodoros.push(payload);
    },
  },
  actions: {
    updateRecords({ commit }, payload) {
      if (payload.type === "pomodoro") {
        commit("INCREMENT_TOTAL");
      }
      commit("ADD_NEW_POMODORO", payload);
    },
  },
  modules: {},
});
