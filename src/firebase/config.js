// src/firebase/config.js
// Firebase v10 Modular SDK — initialized from VITE_ env vars
// Copy .env.example → .env.local and fill in your project credentials.

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSy_demo_nexus_key',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nexus-app.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nexus-app',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nexus-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:demo',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DEMO',
};

let app = null;
let auth = null;
let db = null;
let storage = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (err) {
  console.warn('NEXUS running in Local Demo Mode (Firebase live credentials omitted):', err.message);
}

export { app, auth, db, storage };
export default app;

