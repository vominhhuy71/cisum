import auth from './modules/auth/auth';

export interface RootState {
  auth: any;
}

export default {
  state: { auth: undefined } as RootState,
  modules: {
    auth,
  },
};
