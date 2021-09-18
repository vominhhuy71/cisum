import { RootState } from '@/store/store-config';
import { GetterTree } from 'vuex';
import { AuthState } from './state';
import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const getters: GetterTree<AuthState, RootState> = {
  isUserLoggedIn(state) {
    const auth = getAuth();
    onAuthStateChanged(auth, function(user) {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  },
};

export default getters;
