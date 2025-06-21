// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMZpCIKe-aZj_Td5yMuW6QfAkjFrl-uAw",
  authDomain: "aloimp3.firebaseapp.com",
  projectId: "aloimp3",
  storageBucket: "aloimp3.appspot.com",
  messagingSenderId: "345679592595",
  appId: "1:345679592595:web:8e3cacb25767d0642ee166",
  measurementId: "G-DR8EXD1NKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
