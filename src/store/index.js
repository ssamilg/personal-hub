import { createStore } from 'vuex';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// const moduleAuth = {
//   state: () => {

//   },
//   mutations: {},
// };

export default createStore({
  state: {
    auth: {},
    user: {},
  },
  mutations: {
    setAuth(state, value) {
      state.auth = value;
    },
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    setAuth({ commit }, value) {
      commit('setAuth', value);
    },
    setUser({ commit }, value) {
      commit('setUser', value);
    },
    register(_, value) {
      return createUserWithEmailAndPassword(this.state.auth, value.email, value.password);
    },
    updateUser(_, value) {
      console.log(value);
      return updateProfile(this.state.auth.currentUser, value);
    },
  },
  modules: {
  },
});
