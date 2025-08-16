import admin from "firebase-admin";
import dotenv from 'dotenv';

// Load environment variables from backend/.env
dotenv.config({ path: './backend/.env' });

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env;


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    })
  });
}

export const db = admin.firestore();

/** subcollection path: users/{uid}/transactions */
export const txCol = (uid) => db.collection("users").doc(uid).collection("transactions");

export const verifyIdToken = (token) => admin.auth().verifyIdToken(token);
