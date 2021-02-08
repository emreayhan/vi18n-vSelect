import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },

  actions: {
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", null);
    },
    sendInfo(_, payload) {
      // post request to the related endpoint with payload
      console.log(payload);
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  modules: {}
});
