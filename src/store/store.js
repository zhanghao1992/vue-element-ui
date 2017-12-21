import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    captcha: state => state.captcha
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    EXIT: (state) => {
      state.user = null
    }
  },
  actions: {
    setUser: ({commit}, user) => {
      commit('SET_USER', user)
    },
    exit: ({commit}) => {
      commit('EXIT')
    }
  }
})
