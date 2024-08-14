
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "flashcard-sass-7f986.firebaseapp.com",
  projectId: "flashcard-sass-7f986",
  storageBucket: "flashcard-sass-7f986.appspot.com",
  messagingSenderId: "195481619135",
  appId: "1:195481619135:web:871c189a0d5a47f993540a",
  measurementId: "G-1DP1DCR3X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);