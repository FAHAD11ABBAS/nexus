// src/context/AuthContext.jsx
// Global authentication context providing user profile and state

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle as authGoogle,
  signInAsGuest,
  signOut as authSignOut,
  getStoredDemoUser,
} from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase Auth is connected
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (apiKey && apiKey !== 'your_api_key_here') {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) {
              setUserProfile(snap.data());
            } else {
              setUserProfile({
                uid: user.uid,
                email: user.email,
                username: user.displayName || 'Nexus Explorer',
                avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
                country: 'Global',
              });
            }
          } catch (e) {
            console.warn('Could not fetch user document:', e);
          }
        } else {
          // Check local stored demo user if no Firebase user
          const demo = getStoredDemoUser();
          if (demo) {
            setCurrentUser({ uid: demo.uid, email: demo.email, displayName: demo.username });
            setUserProfile(demo);
          } else {
            setCurrentUser(null);
            setUserProfile(null);
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Demo mode: check localStorage
      const demo = getStoredDemoUser();
      if (demo) {
        setCurrentUser({ uid: demo.uid, email: demo.email, displayName: demo.username });
        setUserProfile(demo);
      }
      setLoading(false);
    }
  }, []);

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await signUpWithEmail(data);
      setCurrentUser(res.user);
      setUserProfile(res.profile);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await signInWithEmail(credentials);
      setCurrentUser(res.user);
      setUserProfile(res.profile || {
        uid: res.user.uid,
        email: res.user.email,
        username: res.user.displayName || 'Explorer',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${res.user.uid}`,
      });
      return res;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await authGoogle();
      setCurrentUser(res.user);
      setUserProfile(res.profile);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async (customName) => {
    setLoading(true);
    try {
      const res = await signInAsGuest(customName);
      setCurrentUser(res.user);
      setUserProfile(res.profile);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authSignOut();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = (updates) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('nexus_auth_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        loginWithGoogle,
        guestLogin,
        logout,
        updateUserProfile,
        isAuthenticated: Boolean(currentUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export default AuthContext;
