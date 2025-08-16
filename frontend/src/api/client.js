import axios from "axios";
import { auth } from "../auth/firebase";
import { onIdTokenChanged, getIdToken } from "firebase/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000
});

// Attach ID token automatically
let currentToken = null;

onIdTokenChanged(auth, async (user) => {
  currentToken = user ? await getIdToken(user, true) : null;
});

api.interceptors.request.use(async (config) => {
  if (!currentToken && auth.currentUser) {
    currentToken = await getIdToken(auth.currentUser, true);
  }
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});
