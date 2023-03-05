import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'personal-hub-ssg.firebaseapp.com',
  projectId: 'personal-hub-ssg',
  storageBucket: 'personal-hub-ssg.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-E6H2LPPT48',
};

initializeApp(firebaseConfig);
const firestoreDB = getFirestore();
// const analytics = getAnalytics(firebaseApp);

export default firestoreDB;
