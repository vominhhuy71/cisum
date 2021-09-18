import Router from 'vue-router';
import { Store } from 'vuex';

export default function redirectToSignUpPageIfUserNotLoggedIn<RootState>(
  router: Router,
  store: Store<RootState>
) {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !store.getters['auth/isUserLoggedIn']
    ) {
      store.dispatch('auth/handleNotLoggedInUser', {
        route: to,
        routerPush: next,
      });
    }

    next();
  });
}
