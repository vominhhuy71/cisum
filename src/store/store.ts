import Vue from 'vue';
import Vuex from 'vuex';
import storeConfig, { RootState } from './store-config';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>(storeConfig);

export * from './store-config';
export default store;
