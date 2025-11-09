// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD76j3xuP7saAhqRPWbPQzQQv1bk7Qaerg",
  authDomain: "plate-share-auth.firebaseapp.com",
  projectId: "plate-share-auth",
  storageBucket: "plate-share-auth.firebasestorage.app",
  messagingSenderId: "60238959303",
  appId: "1:60238959303:web:d283fca3aa00f1327da4e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
