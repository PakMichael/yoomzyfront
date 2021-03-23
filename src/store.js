import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  nextPage: 'Home',
  token: localStorage.getItem('token') || '',
  is_employer: JSON.parse(localStorage.getItem('is_employer')) || false,
  modal_active: false,
    modal_message: '',
    modal_callbacks: {}
}

const mutations = {
  set(state, [variable, value]) {
    state[variable] = value
  },

  modal(state, [isActive, message, callbacks]) {
    state.modal_active = isActive;
    state.modal_message = message;
    state.modal_callbacks = callbacks;

  }
}

export default new Vuex.Store({
  state,
  mutations
})