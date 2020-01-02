import Vue from 'vue'
import Vuex from 'vuex'

import {routes} from './router';

const items = Object.values(routes.reduce((acc, {name, path}) => {
  if(!acc[name]) {
    acc[name] = {
        text: name,
        to: path
      }
  }
  return acc;
}, {}));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    items
  },
  getters:{
    links: (state) => {
      return state.items
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  }
})
