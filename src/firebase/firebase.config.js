// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1UUTbfZ9mSQ5wMBU3eb3cTB92AdKiAE4",
  authDomain: "uni-reside.firebaseapp.com",
  projectId: "uni-reside",
  storageBucket: "uni-reside.appspot.com",
  messagingSenderId: "926551852015",
  appId: "1:926551852015:web:f940b1499b5d549fc86c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;