// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjhL-MJXx6J8ziSiy1sKPXp9GMHY7w9BI",
  authDomain: "mini-linkedin-176a3.firebaseapp.com",
  projectId: "mini-linkedin-176a3",
  storageBucket: "mini-linkedin-176a3.firebasestorage.app",
  messagingSenderId: "244361771545",
  appId: "1:244361771545:web:118c787462b84736a14888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);