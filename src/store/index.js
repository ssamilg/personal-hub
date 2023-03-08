import { createStore } from 'vuex';
import firestoreDB from '@/plugins/firebase';
import {
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
} from 'firebase/firestore';

export default createStore({
  state: {
    auth: {},
    isLoggedIn: false,
    darkTheme: false,
    userId: null,
    selectedModule: {
      title: 'Dashboard',
      icon: 'mdi mdi-view-dashboard',
    },
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
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUserId(state, value) {
      state.userId = value;
    },
    setSelectedModule(state, value) {
      state.selectedModule = value;
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
    setUserId({ commit }, value) {
      commit('setUserId', value);
    },
    setSelectedModule({ commit }, value) {
      commit('setSelectedModule', value);
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
      return updateProfile(this.state.auth.currentUser, value);
    },
    fetchDataWithQuery(_, params) {
      // https://firebase.google.com/docs/firestore/query-data/queries
      const { key, operator, value } = params.where;
      const collectionRef = collection(firestoreDB, params.collectionPath);
      const q = query(collectionRef, where(key, operator, value));

      return getDocs(q);
    },
    fetchAllData(_, params) {
      const collectionRef = collection(firestoreDB, params.collectionPath);

      return getDocs(collectionRef);
    },
    addNewData(_, params) {
      return addDoc(collection(firestoreDB, params.collectionPath), params.payload);
    },
    deleteDataById(_, params) {
      return deleteDoc(doc(firestoreDB, params.collectionPath, params.id));
    },
    updateDataById(_, params) {
      return updateDoc(doc(firestoreDB, params.collectionPath, params.id), params.payload);
    },
  },
  modules: {
  },
});
