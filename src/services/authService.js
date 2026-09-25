// src/services/authService.js
// Firebase Auth wrapper with graceful offline / demo fallback

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

// Checks whether Firebase has valid project ID credentials
const isFirebaseConfigured = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_api_key_here');
};

const DEMO_USER_KEY = 'nexus_auth_user';

export async function signUpWithEmail({ email, password, username, phone, country }) {
  if (isFirebaseConfigured()) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await firebaseUpdateProfile(user, { displayName: username });

      // Save user profile to Firestore
      const userProfile = {
        uid: user.uid,
        email,
        username,
        phone: phone || '',
        country: country || 'Global',
        createdAt: serverTimestamp(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
      };

      try {
        await setDoc(doc(db, 'users', user.uid), userProfile);
      } catch (err) {
        console.warn('Could not write user profile to Firestore:', err);
      }

      return { user, profile: userProfile };
    } catch (error) {
      console.error('Firebase sign up error:', error);
      throw error;
    }
  }

  // Demo / Offline Mode Fallback
  const mockId = 'nexus_' + Math.random().toString(36).substring(2, 9);
  const mockProfile = {
    uid: mockId,
    email,
    username: username || email.split('@')[0],
    phone: phone || '',
    country: country || 'Global',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username || email)}`,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockProfile));
  return { user: { uid: mockId, email, displayName: mockProfile.username }, profile: mockProfile };
}

export async function signInWithEmail({ email, password }) {
  if (isFirebaseConfigured()) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      let profile = null;
      try {
        const snap = await getDoc(doc(db, 'users', cred.user.uid));
        if (snap.exists()) {
          profile = snap.data();
        }
      } catch (err) {
        console.warn('Could not read user profile from Firestore:', err);
      }
      return { user: cred.user, profile };
    } catch (error) {
      console.error('Firebase sign in error:', error);
      throw error;
    }
  }

  // Demo / Offline Mode Fallback
  const mockId = 'nexus_' + Math.random().toString(36).substring(2, 9);
  const mockProfile = {
    uid: mockId,
    email,
    username: email.split('@')[0],
    country: 'Global',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
  };

  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockProfile));
  return { user: { uid: mockId, email, displayName: mockProfile.username }, profile: mockProfile };
}

export async function signInWithGoogle() {
  if (isFirebaseConfigured()) {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const user = cred.user;

      const profile = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || 'Nexus Explorer',
        avatar: user.photoURL,
        country: 'Global',
      };

      try {
        await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      } catch (e) {
        console.warn('Failed to sync google profile to Firestore:', e);
      }

      return { user, profile };
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Guest / Demo Fallback
  return signInAsGuest();
}

export async function signInAsGuest(customName = 'Cybernaut') {
  const guestId = 'guest_' + Math.floor(1000 + Math.random() * 9000);
  const guestProfile = {
    uid: guestId,
    email: `${guestId}@nexus.io`,
    username: customName,
    country: 'Neo Tokyo',
    phone: '',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${guestId}`,
    isGuest: true,
  };
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(guestProfile));
  return { user: { uid: guestId, email: guestProfile.email, displayName: customName }, profile: guestProfile };
}

export async function signOut() {
  if (isFirebaseConfigured()) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  }
  localStorage.removeItem(DEMO_USER_KEY);
}

export function getStoredDemoUser() {
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
