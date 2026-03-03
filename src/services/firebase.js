import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDMm9MpJW6yV1xJe_gwNssEQdrKI7hmemQ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "somaai-97af8.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "somaai-97af8",
  storageBucket: "somaai-97af8.firebasestorage.app.appspot.com",
  messagingSenderId: "202998071118",
  appId: "1:202998071118:web:622944b33f3a0cb3eb681f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
