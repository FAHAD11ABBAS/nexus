// src/services/chatService.js
// Messaging service supporting self-destructing messages and Firestore sync

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

const isFirebaseConfigured = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_api_key_here');
};

const LOCAL_STORAGE_KEY = 'nexus_mock_messages_v2';

// Seed demo conversations
const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv_aria',
    participant: {
      id: 'user_aria',
      name: 'Aria Chen',
      handle: '@ariachen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      online: true,
      bio: 'Decentralized AI Architect · Neo Tokyo',
    },
    lastMessage: 'The quantum encryption handshake is ready. Check this out!',
    lastMessageTime: Date.now() - 1000 * 60 * 5, // 5 mins ago
    unreadCount: 2,
    selfDestructDefault: 86400, // 24h
  },
  {
    id: 'conv_layla',
    participant: {
      id: 'user_layla',
      name: 'Layla Al-Mansoor',
      handle: '@layla_quantum',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      online: true,
      bio: 'WebRTC Core Engineer · Dubai Hub',
    },
    lastMessage: 'Let us test the P2P video stream now 🔥',
    lastMessageTime: Date.now() - 1000 * 60 * 45, // 45 mins ago
    unreadCount: 0,
    selfDestructDefault: 3600, // 1h
  },
  {
    id: 'conv_kaelen',
    participant: {
      id: 'user_kaelen',
      name: 'Kaelen Vance',
      handle: '@kaelen_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      online: false,
      bio: 'Holographic Visuals & Audio Synthesis',
    },
    lastMessage: 'Recorded the demo call with 60fps audio.',
    lastMessageTime: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
    unreadCount: 0,
    selfDestructDefault: null, // Keep forever
  },
];

// Initial seed messages
const DEFAULT_MESSAGES = {
  conv_aria: [
    {
      id: 'm1',
      senderId: 'user_aria',
      text: 'Hey! Welcome to the NEXUS encrypted network 🌐',
      createdAt: Date.now() - 1000 * 60 * 30,
      expiresAt: null, // Permanent
      seen: true,
    },
    {
      id: 'm2',
      senderId: 'user_aria',
      text: 'Notice the flame indicator below? This message self-destructs 24 hours after creation.',
      createdAt: Date.now() - 1000 * 60 * 15,
      expiresAt: Date.now() + 1000 * 60 * 60 * 23, // 23h remaining
      durationSec: 86400,
      seen: true,
    },
    {
      id: 'm3',
      senderId: 'user_aria',
      text: 'Here is the prototype schematic. Tap the image to reveal (one-time view)!',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      mediaType: 'image',
      createdAt: Date.now() - 1000 * 60 * 5,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
      durationSec: 86400,
      oneTimeView: true,
      seen: false,
    },
  ],
  conv_layla: [
    {
      id: 'm_layla_1',
      senderId: 'user_layla',
      text: 'Salam! We have peer-to-peer WebRTC calls ready.',
      createdAt: Date.now() - 1000 * 60 * 50,
      expiresAt: null,
      seen: true,
    },
    {
      id: 'm_layla_2',
      senderId: 'user_layla',
      text: 'Let us test the P2P video stream now 🔥',
      createdAt: Date.now() - 1000 * 60 * 45,
      expiresAt: Date.now() + 1000 * 60 * 30, // 30 mins left
      durationSec: 3600,
      seen: true,
    },
  ],
  conv_kaelen: [
    {
      id: 'm_kaelen_1',
      senderId: 'user_kaelen',
      text: 'Recorded the demo call with 60fps audio.',
      createdAt: Date.now() - 1000 * 60 * 60 * 6,
      expiresAt: null,
      seen: true,
    },
  ],
};

// Local storage helpers
export function getLocalStore() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local messages store:', e);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_MESSAGES));
  return DEFAULT_MESSAGES;
}

export function saveLocalStore(store) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent('nexus_messages_updated'));
}

/**
 * Filter out expired messages and delete them automatically
 */
export function purgeExpiredMessages(messages) {
  const now = Date.now();
  return messages.filter((msg) => {
    if (!msg.expiresAt) return true;
    return msg.expiresAt > now;
  });
}

/**
 * Fetch list of conversations
 */
export async function getConversations() {
  return DEFAULT_CONVERSATIONS;
}

/**
 * Get single conversation metadata by ID
 */
export function getConversationById(convId) {
  return (
    DEFAULT_CONVERSATIONS.find((c) => c.id === convId) || {
      id: convId,
      participant: {
        id: 'user_unknown',
        name: 'Nexus Node',
        handle: '@nexus_node',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${convId}`,
        online: true,
      },
    }
  );
}

/**
 * Send a message (Firestore + local storage fallback)
 */
export async function sendMessage({
  convId,
  senderId,
  text = '',
  mediaUrl = null,
  mediaType = null,
  durationSec = null, // null | 3600 | 86400 | 604800
  oneTimeView = false,
}) {
  const now = Date.now();
  const expiresAt = durationSec ? now + durationSec * 1000 : null;

  const newMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    convId,
    senderId,
    text,
    mediaUrl,
    mediaType,
    durationSec,
    expiresAt,
    oneTimeView,
    createdAt: now,
    seen: false,
  };

  // 1. Try Firestore if configured
  if (isFirebaseConfigured()) {
    try {
      const messagesRef = collection(db, 'conversations', convId, 'messages');
      await addDoc(messagesRef, {
        ...newMessage,
        createdAt: serverTimestamp(),
        expiresAt: expiresAt ? Timestamp.fromMillis(expiresAt) : null,
      });
    } catch (e) {
      console.warn('Firestore write failed, using local store:', e);
    }
  }

  // 2. Always write to local store for instant UI response
  const store = getLocalStore();
  if (!store[convId]) store[convId] = [];
  store[convId].push(newMessage);
  saveLocalStore(store);

  return newMessage;
}

/**
 * Delete a message (e.g., when self-destruct trigger fires or user destroys media)
 */
export async function deleteMessage(convId, messageId) {
  if (isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, 'conversations', convId, 'messages', messageId));
    } catch (e) {
      console.warn('Firestore delete failed:', e);
    }
  }

  const store = getLocalStore();
  if (store[convId]) {
    store[convId] = store[convId].filter((m) => m.id !== messageId);
    saveLocalStore(store);
  }
}

/**
 * Mark a message as seen or viewed
 */
export async function markSeen(convId, messageId) {
  const store = getLocalStore();
  if (store[convId]) {
    const msg = store[convId].find((m) => m.id === messageId);
    if (msg) {
      msg.seen = true;
      saveLocalStore(store);
    }
  }
}
