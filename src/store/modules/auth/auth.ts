import router from '@/router/router';
import { RootState } from '@/store/store-config';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import store from 'store';
import { RawLocation, Route } from 'vue-router';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
export interface AuthState {
  redirect: string;
  loggedFrom: string | null;
  token: string;
}

const state: AuthState = {
  redirect: store.get('auth.redirect'),
  // Define the user from which force login to this account was done
  loggedFrom: store.get('auth.loggedFrom') || null,
  token: store.get('token'),
};

const getters: GetterTree<AuthState, RootState> = {
  isUserLoggedIn(state): boolean {
    return Boolean(state.token);
  },
};

const mutations: MutationTree<AuthState> = {
  setRedirect(state, redirect: string) {
    state.redirect = redirect;
    store.set('auth.redirect', redirect);
  },
  setLoggedFrom(state, loggedFrom) {
    state.loggedFrom = loggedFrom;
    store.set('auth.loggedFrom', loggedFrom);
  },
  setAccessToken(state, token: string) {
    state.token = token;
    store.set('token', token);
  },
};

const actions: ActionTree<AuthState, RootState> = {
  handleNotLoggedInUser(
    { commit },
    { route, routerPush }: { route: Route; routerPush: (path: string) => void }
  ) {
    commit('setRedirect', route.fullPath);
    routerPush('/landing');
  },
  logOut({ commit }) {
    const auth = getAuth();
    return signOut(auth).then(() => {
      commit('setAccessToken', '');
      commit('setLoggedFrom', null);
    });
  },
  goToAppAndFinishAuth(
    { commit },
    { location = '/' }: { location?: RawLocation } = {}
  ) {
    router.push(state.redirect || location, () => {
      commit('setRedirect', '');
    });
  },
  async signInWithGoogle({ commit, dispatch }) {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        commit('setAccessToken', token);
        dispatch('goToAppAndFinishAuth');
      }
    });
  },
};

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default auth;
