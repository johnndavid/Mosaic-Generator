import Vuex from 'vuex';
import Vue from 'vue';
import CampainState from './modules/CampainState';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    CampainState,
  }
});
