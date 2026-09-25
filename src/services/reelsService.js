// src/services/reelsService.js
// Reels service with vertical video feeds, reactive counters, comments & sharing

const LOCAL_REELS_KEY = 'nexus_reels_store_v1';

// Seed demo reels with futuristic cyberpunk and creative themes
const SEED_REELS = [
  {
    id: 'reel_1',
    creator: {
      id: 'creator_aria',
      name: 'Aria Chen',
      handle: '@ariachen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isFollowing: false,
    },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    caption: 'Neon pulse frequency test in Neo Tokyo server clusters ⚡ #NEXUS #Cyberpunk #Tech2026',
    music: {
      title: 'Quantum Synthwave 140BPM',
      artist: 'Kaelen Vance',
    },
    likesCount: 1420,
    commentsCount: 86,
    sharesCount: 230,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c1',
        userName: 'Kaelen Vance',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'The audio sync on this is immaculate! 🔥',
        createdAt: Date.now() - 1000 * 60 * 45,
        likes: 12,
      },
      {
        id: 'c2',
        userName: 'Layla Al-Mansoor',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        text: 'Waiting for the Dubai node rollout next week!',
        createdAt: Date.now() - 1000 * 60 * 20,
        likes: 5,
      },
    ],
  },
  {
    id: 'reel_2',
    creator: {
      id: 'creator_layla',
      name: 'Layla Al-Mansoor',
      handle: '@layla_quantum',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isFollowing: true,
    },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    caption: 'Hologram projections dancing above the skyline. Decentralized social is finally here ✨🏙️ #Web3 #Decentralized',
    music: {
      title: 'Neon Dunes (Dub Mix)',
      artist: 'Layla & AudioCraft',
    },
    likesCount: 3890,
    commentsCount: 142,
    sharesCount: 650,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c3',
        userName: 'Nova Sky',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        text: 'Pure cyberpunk art! Love the colors.',
        createdAt: Date.now() - 1000 * 60 * 60,
        likes: 28,
      },
    ],
  },
  {
    id: 'reel_3',
    creator: {
      id: 'creator_kaelen',
      name: 'Kaelen Vance',
      handle: '@kaelen_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: false,
      isFollowing: false,
    },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    caption: 'Custom modular synthesizer live audio stream test. 8 channels in stereo surround sound 🎧 #ModularSynth #Audio',
    music: {
      title: 'Analog Euphoria (Live)',
      artist: 'Kaelen Vance',
    },
    likesCount: 940,
    commentsCount: 37,
    sharesCount: 118,
    isLiked: false,
    isSaved: false,
    comments: [],
  },
];

export function getLocalReels() {
  try {
    const raw = localStorage.getItem(LOCAL_REELS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local reels store:', e);
  }
  localStorage.setItem(LOCAL_REELS_KEY, JSON.stringify(SEED_REELS));
  return SEED_REELS;
}

export function saveLocalReels(reels) {
  localStorage.setItem(LOCAL_REELS_KEY, JSON.stringify(reels));
  window.dispatchEvent(new CustomEvent('nexus_reels_updated'));
}

export async function fetchReels() {
  return getLocalReels();
}

export function toggleLike(reelId) {
  const reels = getLocalReels();
  const reel = reels.find((r) => r.id === reelId);
  if (reel) {
    reel.isLiked = !reel.isLiked;
    reel.likesCount += reel.isLiked ? 1 : -1;
    saveLocalReels(reels);
    return reel;
  }
}

export function toggleSave(reelId) {
  const reels = getLocalReels();
  const reel = reels.find((r) => r.id === reelId);
  if (reel) {
    reel.isSaved = !reel.isSaved;
    saveLocalReels(reels);
    return reel;
  }
}

export function toggleFollow(creatorId) {
  const reels = getLocalReels();
  reels.forEach((r) => {
    if (r.creator.id === creatorId) {
      r.creator.isFollowing = !r.creator.isFollowing;
    }
  });
  saveLocalReels(reels);
}

export function addComment(reelId, { userName, userAvatar, text }) {
  const reels = getLocalReels();
  const reel = reels.find((r) => r.id === reelId);
  if (reel) {
    const newComment = {
      id: 'c_' + Date.now(),
      userName,
      userAvatar,
      text,
      createdAt: Date.now(),
      likes: 0,
    };
    if (!reel.comments) reel.comments = [];
    reel.comments.unshift(newComment);
    reel.commentsCount = (reel.commentsCount || 0) + 1;
    saveLocalReels(reels);
    return newComment;
  }
}
