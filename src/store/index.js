import { createStore } from 'vuex';
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// const moduleAuth = {
//   state: () => {

//   },
//   mutations: {},
// };

export default createStore({
  state: {
    auth: {},
    user: {},
    darkTheme: false,
  },
  getters: {
    getCurrentUser: (state) => {
      return state.auth.currentUser;
    },
  },
  mutations: {
    setAuth(state, value) {
      state.auth = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    switchTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
  actions: {
    setAuth({ commit }, value) {
      commit('setAuth', value);
    },
    setUser({ commit }, value) {
      commit('setUser', value);
    },
    switchTheme({ commit }) {
      commit('switchTheme');
    },
    registerUserToLocalStorage(_, id, token) {
      localStorage.setItem('user-id', id);
      localStorage.setItem('auth-token', token);
    },
    register(_, value) {
      return createUserWithEmailAndPassword(this.state.auth, value.email, value.password);
    },
    login(_, value) {
      return signInWithEmailAndPassword(this.state.auth, value.email, value.password);
    },
    updateUser(_, value) {
      console.log(value);
      return updateProfile(this.state.auth.currentUser, value);
    },
  },
  modules: {
  },
});
