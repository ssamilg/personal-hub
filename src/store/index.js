import { createStore } from 'vuex';
import firestoreDB from '@/plugins/firebase';
import {
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  query,
  where,
  addDoc,
  getDocs,
  collection,
} from 'firebase/firestore';

// const moduleAuth = {
//   state: () => {

//   },
//   mutations: {},
// };

export default createStore({
  state: {
    auth: {},
    isLoggedIn: false,
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
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
  actions: {
    setAuth({ commit }, value) {
      commit('setAuth', value);
    },
    setUser({ commit }, value) {
      commit('setUser', value);
    },
    setIsLoggedIn({ commit }, value) {
      commit('setIsLoggedIn', value);
    },
    switchTheme({ commit }) {
      commit('switchTheme');
    },
    registerUserToLocalStorage(_, id, token) {
      localStorage.setItem('user-id', id);
      localStorage.setItem('auth-token', token);
      this.dispatch('setIsLoggedIn', true);
    },
    register(_, value) {
      return createUserWithEmailAndPassword(this.state.auth, value.email, value.password);
    },
    login(_, value) {
      return signInWithEmailAndPassword(this.state.auth, value.email, value.password);
    },
    logout() {
      return signOut(this.state.auth);
    },
    updateUser(_, value) {
      console.log(value);
      return updateProfile(this.state.auth.currentUser, value);
    },
    fetchDataWithQuery(_, params) {
      console.log(params);
      const { key, operator, value } = params.where;
      const collectionRef = collection(firestoreDB, params.collection);
      const q = query(collectionRef, where(key, operator, value));

      return getDocs(q);
    },
    fetchAllData(_, params) {
      console.log(params);
      const collectionRef = collection(firestoreDB, params.collection);

      return getDocs(collectionRef);
    },
    addNewData(_, params) {
      return addDoc(collection(firestoreDB, params.collection), params.payload);
    },
  },
  modules: {
  },
});
