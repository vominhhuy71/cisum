import Vue from 'vue';
import { Store } from 'vuex';
import Router, { RouterOptions } from 'vue-router';
import redirectToSignUpPageIfUserNotLoggedIn from './hooks/redirect-if-not-logged-in';
import redirectToHomePagePageIfUserLoggedIn from './hooks/redirect-if-logged-in';
import store, { RootState } from '@/store/store';
import AppLayout from '@/views/app-layout.vue';

Vue.use(Router);

export const routerConfig: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter(to, from, next) {
        if (store.getters['auth/isUserLoggedIn']) {
          next('/home');
        } else {
          next('/landing');
        }
      },
    },
    {
      path: '/landing',
      meta: { guestOnly: true },
      component: () =>
        import(/* webpackChunkName: "landing" */ '../views/landing-page.vue'),
    },
    {
      path: '/sign-in',
      meta: { guestOnly: true },
      component: () =>
        import(/* webpackChunkName: "landing" */ '../views/sign-in-page.vue'),
    },
    {
      path: '/home',
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "landing" */ '../views/home-page.vue'),
    },
  ],
};

const router = new Router(routerConfig);

// tslint:disable no-shadowed-variable
export function setUpRouterHooks(store: Store<RootState>) {
  redirectToSignUpPageIfUserNotLoggedIn(router, store);
  redirectToHomePagePageIfUserLoggedIn(router, store);
}

export default router;
