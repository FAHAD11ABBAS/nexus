// src/services/storyService.js
// 24-hour ephemeral stories service with Firestore real-time sync & local demo store

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

const isFirebaseConfigured = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_api_key_here');
};

const LOCAL_STORIES_KEY = 'nexus_stories_store_v1';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

// High quality cyberpunk seed stories
const SEED_STORIES = [
  {
    id: 'story_user_aria',
    userId: 'user_aria',
    userName: 'Aria Chen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 'slide_aria_1',
        mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1080&q=80',
        caption: 'Autonomous neural mesh nodes deployed across Neo Tokyo 🌐⚡',
        createdAt: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
        expiresAt: Date.now() + 1000 * 60 * 60 * 21, // 21 hours left
        views: 142,
        likes: 38,
      },
      {
        id: 'slide_aria_2',
        mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80',
        caption: 'Quantum core benchmark reached 99.98% zero-latency sync!',
        createdAt: Date.now() - 1000 * 60 * 60 * 1, // 1 hour ago
        expiresAt: Date.now() + 1000 * 60 * 60 * 23,
        views: 89,
        likes: 24,
      },
    ],
  },
  {
    id: 'story_user_layla',
    userId: 'user_layla',
    userName: 'Layla Al-Mansoor',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 'slide_layla_1',
        mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
        caption: 'Dubai Hologram Expo live from the cyber pavilion ✨',
        createdAt: Date.now() - 1000 * 60 * 60 * 5,
        expiresAt: Date.now() + 1000 * 60 * 60 * 19,
        views: 265,
        likes: 72,
      },
    ],
  },
  {
    id: 'story_user_kaelen',
    userId: 'user_kaelen',
    userName: 'Kaelen Vance',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 'slide_kaelen_1',
        mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1080&q=80',
        caption: 'Synthwave bassline synthesizer patch test 🎧🔊',
        createdAt: Date.now() - 1000 * 60 * 60 * 8,
        expiresAt: Date.now() + 1000 * 60 * 60 * 16,
        views: 310,
        likes: 95,
      },
    ],
  },
  {
    id: 'story_user_nova',
    userId: 'user_nova',
    userName: 'Nova Sky',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    hasUnseen: false,
    slides: [
      {
        id: 'slide_nova_1',
        mediaUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1080&q=80',
        caption: 'Cyber-aurora borealis over the decentralized server station 🌌',
        createdAt: Date.now() - 1000 * 60 * 60 * 12,
        expiresAt: Date.now() + 1000 * 60 * 60 * 12,
        views: 520,
        likes: 180,
      },
    ],
  },
];

export function getLocalStories() {
  try {
    const raw = localStorage.getItem(LOCAL_STORIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local stories store:', e);
  }
  localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(SEED_STORIES));
  return SEED_STORIES;
}

export function saveLocalStories(stories) {
  localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(stories));
  window.dispatchEvent(new CustomEvent('nexus_stories_updated'));
}

/**
 * Filter out expired story slides (> 24 hours)
 */
export function purgeExpiredStories(stories) {
  const now = Date.now();
  return stories
    .map((userStory) => {
      const activeSlides = userStory.slides.filter(
        (slide) => slide.expiresAt > now
      );
      return { ...userStory, slides: activeSlides };
    })
    .filter((userStory) => userStory.slides.length > 0);
}

/**
 * Fetch all active non-expired stories
 */
export async function getActiveStories() {
  const stories = getLocalStories();
  const valid = purgeExpiredStories(stories);
  return valid;
}

/**
 * Create/Share a new 24-hour ephemeral story
 */
export async function createStory({
  userId,
  userName,
  userAvatar,
  mediaUrl,
  caption = '',
}) {
  const now = Date.now();
  const expiresAt = now + TWENTY_FOUR_HOURS;

  const newSlide = {
    id: 'slide_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    mediaUrl,
    caption,
    createdAt: now,
    expiresAt,
    views: 1,
    likes: 0,
  };

  // 1. Try Firestore if configured
  if (isFirebaseConfigured()) {
    try {
      await addDoc(collection(db, 'stories'), {
        userId,
        userName,
        userAvatar,
        ...newSlide,
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromMillis(expiresAt),
      });
    } catch (e) {
      console.warn('Firestore story write failed, falling back to local store:', e);
    }
  }

  // 2. Local store
  const stories = getLocalStories();
  const existingUserStory = stories.find((s) => s.userId === userId);

  if (existingUserStory) {
    existingUserStory.slides.push(newSlide);
    existingUserStory.hasUnseen = true;
  } else {
    stories.unshift({
      id: 'story_' + userId,
      userId,
      userName,
      userAvatar,
      hasUnseen: true,
      slides: [newSlide],
    });
  }

  saveLocalStories(stories);
  return newSlide;
}

/**
 * Mark user's story as seen
 */
export function markStorySeen(userId) {
  const stories = getLocalStories();
  const story = stories.find((s) => s.userId === userId);
  if (story) {
    story.hasUnseen = false;
    saveLocalStories(stories);
  }
}

/**
 * Like a specific story slide
 */
export function likeStorySlide(userId, slideId) {
  const stories = getLocalStories();
  const userStory = stories.find((s) => s.userId === userId);
  if (userStory) {
    const slide = userStory.slides.find((s) => s.id === slideId);
    if (slide) {
      slide.likes = (slide.likes || 0) + 1;
      slide.isLiked = true;
      saveLocalStories(stories);
    }
  }
}
