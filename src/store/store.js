import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      name: '',
      password: ''
    }
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    EXIT: (state) => {
      state.user = {
        name: '',
        password: ''
      }
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
