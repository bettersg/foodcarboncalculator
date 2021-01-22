const firebase = require('firebase/app');
require('firebase/auth');

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
});

firebaseApp.auth().useDeviceLanguage();

const firebaseAuth = firebaseApp.auth();
const firebaseAuthGoogle = new firebase.auth.GoogleAuthProvider();
const firebaseAuthFacebook = new firebase.auth.FacebookAuthProvider();

module.exports = {
    firebaseAuth, firebaseAuthGoogle, firebaseAuthFacebook
}