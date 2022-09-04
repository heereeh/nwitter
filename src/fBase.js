import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MASSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseUrl: process.env.REACT_APP_DATABASE_URL,
}

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth()
export const dbService = getFirestore()
export const database = getDatabase()