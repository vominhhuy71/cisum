import { RootState } from '@/store/store-config';
import { Route } from 'vue-router';
import { ActionTree } from 'vuex';
import { AuthState } from './state';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const actions: ActionTree<AuthState, RootState> = {
  handleNotLoggedInUser(
    { commit },
    { route, routerPush }: { route: Route; routerPush: (path: string) => void }
  ) {
    commit('setRedirect', route.fullPath);
    routerPush('/landing');
  },
  logOut({ commit }) {
    return signOut(auth).then(() => {
      commit('setAccessToken', '');
      commit('setLoggedFrom', null);
    });
  },
};

export default actions;
