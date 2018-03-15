import Vue from 'vue'
import Vuex from 'vuex'
import {componentNavData} from '../data'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    headerActiveIndex: '/home/componentHome',
    comLibNavData: [],
    activeIndex: '/home/componentHome/installPage'
  },
  mutations: {
    getLibNavData (state) {
      state.comLibNavData = componentNavData;
    },
    changeHeaderIndex(state, payload){
      state.headerActiveIndex = payload.headerIndex
    },
    changeIndex(state, payload){
      state.activeIndex = payload.index
    }
  }
})
