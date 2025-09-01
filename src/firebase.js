import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMm9MpJW6yV1xJe_gwNssEQdrKI7hmemQ",
  authDomain: "somaai-97af8.firebaseapp.com",
  projectId: "somaai-97af8",
  storageBucket: "somaai-97af8.firebasestorage.app.appspot.com",
  messagingSenderId: "202998071118",
  appId: "1:202998071118:web:622944b33f3a0cb3eb681f"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;