// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5UfD0vpet-smY5X5zNQk84PtP21zubA8",
  authDomain: "langschool-c5520.firebaseapp.com",
  projectId: "langschool-c5520",
  storageBucket: "langschool-c5520.firebasestorage.app",
  messagingSenderId: "348873191369",
  appId: "1:348873191369:web:b77c9ff79fdf3a29494218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)