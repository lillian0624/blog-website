// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl70pIXwsfevtrUKCJ3mZG6G8PlyxcPNM",
  authDomain: "blogproject-4a273.firebaseapp.com",
  projectId: "blogproject-4a273",
  storageBucket: "blogproject-4a273.appspot.com",
  messagingSenderId: "79291620086",
  appId: "1:79291620086:web:ba8d41a7d9641d44a6aad7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
