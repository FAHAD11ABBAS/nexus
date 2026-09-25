// src/services/callService.js
// WebRTC configuration, Google STUN servers and Firestore signaling

import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

const isFirebaseConfigured = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_api_key_here');
};

/**
 * Initialize a new call document in Firestore for WebRTC signaling
 */
export async function createCallSignaling(callId, callerInfo, callType = 'video') {
  if (!isFirebaseConfigured()) {
    console.log('[WebRTC Demo Mode] Call initiated locally:', callId);
    return callId;
  }

  try {
    const callDoc = doc(db, 'calls', callId);
    await setDoc(callDoc, {
      id: callId,
      caller: callerInfo,
      type: callType,
      status: 'calling',
      createdAt: serverTimestamp(),
    });
    return callId;
  } catch (error) {
    console.warn('Firestore call signaling create failed:', error);
    return callId;
  }
}

/**
 * Listen for remote SDP answer or status changes
 */
export function listenForCallUpdates(callId, onUpdate) {
  if (!isFirebaseConfigured()) {
    // In demo mode, automatically simulate call connection after 1.5s
    const timer = setTimeout(() => {
      onUpdate({ status: 'connected' });
    }, 1500);
    return () => clearTimeout(timer);
  }

  try {
    const callDoc = doc(db, 'calls', callId);
    return onSnapshot(callDoc, (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data());
      }
    });
  } catch (e) {
    console.warn('Error listening to call updates:', e);
    return () => {};
  }
}

/**
 * End/Clean up call document
 */
export async function endCallSignaling(callId) {
  if (!isFirebaseConfigured()) return;
  try {
    await deleteDoc(doc(db, 'calls', callId));
  } catch (e) {
    console.warn('Error ending call signaling:', e);
  }
}
