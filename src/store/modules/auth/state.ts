import store from 'store';

export interface AuthState {
  redirect: string;
  loggedFrom: string | null;
}

const state: AuthState = {
  redirect: store.get('auth.redirect'),
  // Define the user from which force login to this account was done
  loggedFrom: store.get('auth.loggedFrom') || null,
};

export default state;
