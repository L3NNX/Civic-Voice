// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOE6UjkYzsoIus0VsyYpyK9BPVR4A8zEM",
  authDomain: "merasheher-89e47.firebaseapp.com",
  projectId: "merasheher-89e47",
  storageBucket: "merasheher-89e47.appspot.com",
  messagingSenderId: "488019310788",
  appId: "1:488019310788:web:5d7922fe2c1fab4d7bb191",
  measurementId: "G-TG6PLG4D5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use this for login
const auth = getAuth(app);

export default auth;