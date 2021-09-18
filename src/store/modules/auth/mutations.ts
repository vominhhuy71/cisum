import { MutationTree } from 'vuex';
import { AuthState } from './state';

const mutations: MutationTree<AuthState> = {
  setRedirect(state, redirect: string) {
    state.redirect = redirect;
    store.set('auth.redirect', redirect);
  },
  setLoggedFrom(state, loggedFrom) {
    state.loggedFrom = loggedFrom;
    store.set('auth.loggedFrom', loggedFrom);
  },
};

export default mutations;
