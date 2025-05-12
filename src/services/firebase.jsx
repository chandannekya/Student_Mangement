// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBmYAM32P2dTP2L18CLBIUEsHmUWJE3_0",
  authDomain: "student-6b937.firebaseapp.com",
  projectId: "student-6b937",
  storageBucket: "student-6b937.firebasestorage.app",
  messagingSenderId: "671029475683",
  appId: "1:671029475683:web:5136ba7afc3959476ffb56",
  measurementId: "G-5E43K8ETSL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Firestore (db) as well
