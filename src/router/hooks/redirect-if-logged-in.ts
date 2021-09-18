import Router from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '@/store/store-config';

export default function redirectToSignUpPageIfUserNotLoggedIn(
  router: Router,
  store: Store<RootState>
) {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.guestOnly) &&
      store.getters['auth/isUserLoggedIn']
    ) {
      return next('/');
    }

    next();
  });
}
