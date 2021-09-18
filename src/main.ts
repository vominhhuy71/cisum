import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/compat/app';
import { importGlobalComponents } from './import-global-components';
import router, { setUpRouterHooks } from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

importGlobalComponents();
setUpRouterHooks(store);
try {
  const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE as string);
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  throw new Error(
    `Can't read from .env file. Please check if .env file exists or JSON config integrity inside .env file. - ` +
      e
  );
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
