// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZEhWJlRU4f-zuKF9YWeBd2xBxARCzJqU",
  authDomain: "bet-book-7cc49.firebaseapp.com",
  projectId: "bet-book-7cc49",
  storageBucket: "bet-book-7cc49.appspot.com",
  messagingSenderId: "1047913110991",
  appId: "1:1047913110991:web:5743017990c82ce2ab86ba",
  measurementId: "G-F0HDX92KQZ",
};

// Initialize Firebase
let app;
if (firebase.app.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
// const analytics = getAnalytics(app);
