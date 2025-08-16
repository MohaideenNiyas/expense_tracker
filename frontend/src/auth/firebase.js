// Client-side Firebase (for Auth)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/**
 * Add .env values:
 * VITE_FIREBASE_API_KEY=...
 * VITE_FIREBASE_AUTH_DOMAIN=...
 * VITE_FIREBASE_PROJECT_ID=...
 * VITE_FIREBASE_APP_ID=...
 */

const firebaseConfig = {
  apiKey: "AIzaSyBeHXvyFdWM1w8fI8FVor7RIJGYYVvCvkI",
  authDomain: "expense-tracker-634e4.firebaseapp.com",
  projectId: "expense-tracker-634e4",
  storageBucket: "expense-tracker-634e4.firebasestorage.app",
  messagingSenderId: "292368059259",
  appId: "1:292368059259:web:da98b4c0caa0e5202d4bde"
};
console.log("Frontend Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
