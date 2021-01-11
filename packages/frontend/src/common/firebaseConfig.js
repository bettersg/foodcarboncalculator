import firebase from "firebase/app"
import "firebase/auth"

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
    measurementId: "G-MEASUREMENT_ID", // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
};
*/

/* ENV Variables */
//   REACT_APP_FIREBASE_API_KEY=
//   REACT_APP_FIREBASE_AUTH_DOMAIN=
//   REACT_APP_FIREBASE_DATABASE_URL=
//   REACT_APP_FIREBASE_PROJECT_ID=
//   REACT_APP_FIREBASE_STORAGE_BUCKET=
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
//   REACT_APP_FIREBASE_APP_ID=

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBq1Sy1sKiOJkNjhklHzmTDq0vytqKwP94",
    authDomain: "tapao-shawn.firebaseapp.com",
    databaseURL: "https://tapao-shawn.firebaseio.com",
    projectId: "tapao-shawn",
    storageBucket: "tapao-shawn.appspot.com",
    messagingSenderId: "690977024676",
    appId: "1:690977024676:web:26718707cbb2954ac65431"
    //measurementId: "G-MEASUREMENT_ID", // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
});
firebaseApp.auth().useDeviceLanguage();

export const firebaseAuth = firebaseApp.auth();
export const firebaseAuthGoogle = new firebase.auth.GoogleAuthProvider();
export const firebaseAuthFacebook = new firebase.auth.FacebookAuthProvider();


/* Example */
// firebaseConfig = {
//   apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
//   authDomain: "myapp-project-123.firebaseapp.com",
//   databaseURL: "https://myapp-project-123.firebaseio.com",
//   projectId: "myapp-project-123",
//   storageBucket: "myapp-project-123.appspot.com",
//   messagingSenderId: "65211879809",
//   appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
//   measurementId: "G-8GSGZQ44ST" // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// };
