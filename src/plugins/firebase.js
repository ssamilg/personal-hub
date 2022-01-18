import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const initFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: 'personal-hub-ssg.firebaseapp.com',
    projectId: 'personal-hub-ssg',
    storageBucket: 'personal-hub-ssg.appspot.com',
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: 'G-E6H2LPPT48',
  };
  initializeApp(firebaseConfig);
  // const firebaseApp = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(firebaseApp);
};

export default initFirebase;
