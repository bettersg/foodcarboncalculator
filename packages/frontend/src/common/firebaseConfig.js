import firebase from 'firebase/app';
import 'firebase/auth';

/* Variables */
// production version to have environment variables
/*
export default firebaseApp = firebase.initializeApp {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};
*/

/* ENV Variables */
//   REACT_APP_FIREBASE_API_KEY=AIzaSyAv1M7cdSf6jYUqyHX5ViGo_b7eGHcliWg
//   REACT_APP_FIREBASE_AUTH_DOMAIN=better-food-carbon-calculator.firebaseapp.com
//   REACT_APP_FIREBASE_DATABASE_URL=
//   REACT_APP_FIREBASE_PROJECT_ID=better-food-carbon-calculator
//   REACT_APP_FIREBASE_STORAGE_BUCKET=better-food-carbon-calculator.appspot.com
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1079003447909
//   REACT_APP_FIREBASE_APP_ID=1:1079003447909:web:74ba23097d370605a97c8c
//   REACT_APP_FIREBASE_MEASUREMENTID=G-VH8394Q5M8

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAv1M7cdSf6jYUqyHX5ViGo_b7eGHcliWg",
    authDomain: "better-food-carbon-calculator.firebaseapp.com",
    databaseURL: "",
    projectId: "better-food-carbon-calculator",
    storageBucket: "better-food-carbon-calculator.appspot.com",
    messagingSenderId: "1079003447909",
    appId: "1:1079003447909:web:74ba23097d370605a97c8c",
    measurementId: "G-VH8394Q5M8",
});
firebaseApp.auth().useDeviceLanguage();

export const firebaseAuth = firebaseApp.auth();
export const firebaseAuthGoogle = new firebase.auth.GoogleAuthProvider();
export const firebaseAuthFacebook = new firebase.auth.FacebookAuthProvider();