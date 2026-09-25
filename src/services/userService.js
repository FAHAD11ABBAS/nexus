// src/services/userService.js
// User service for Dual Profiles (Creator vs Private Mode) and Multi-Way Discovery

const STORAGE_USERS_KEY = 'nexus_users_db_v1';
const STORAGE_FOLLOWING_KEY = 'nexus_following_v1';
const STORAGE_PROFILE_MODE_KEY = 'nexus_profile_mode_v1';

const MOCK_USERS = [
  {
    id: 'user_cyberaura',
    username: 'cyberaura',
    name: 'CyberAura',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    bio: '⚡ Building quantum mesh nodes & glassmorphism decentralized apps. Web3 Creator.',
    phone: '+1 (555) 234-5678',
    mode: 'public', // 'public' | 'private'
    verified: true,
    stats: { posts: 42, followers: 12800, following: 340, likes: 98400 },
  },
  {
    id: 'user_neonomad',
    username: 'neonomad',
    name: 'NeoTokyo Nomad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    bio: '🌌 Night photography in Neo Tokyo. Zero noise, pure neon aesthetics.',
    phone: '+81 90 1234 5678',
    mode: 'public',
    verified: true,
    stats: { posts: 89, followers: 34200, following: 120, likes: 215000 },
  },
  {
    id: 'user_elena',
    username: 'elena_design',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    bio: '✨ UI/UX Architect crafting next-gen decentralized social platforms.',
    phone: '+44 7700 900077',
    mode: 'public',
    verified: false,
    stats: { posts: 19, followers: 4500, following: 210, likes: 32000 },
  },
  {
    id: 'user_aria',
    username: 'aria_chen',
    name: 'Aria Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    bio: '🔒 Encrypted stealth node. Strictly private P2P communication.',
    phone: '+1 (555) 987-6543',
    mode: 'private',
    verified: true,
    stats: { posts: 0, followers: 85, following: 12, likes: 0 },
  },
];

class UserService {
  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(MOCK_USERS));
        return MOCK_USERS;
      }
      return JSON.parse(raw);
    } catch (e) {
      return MOCK_USERS;
    }
  }

  getFollowingList() {
    try {
      const raw = localStorage.getItem(STORAGE_FOLLOWING_KEY);
      return raw ? JSON.parse(raw) : ['user_cyberaura', 'user_neonomad'];
    } catch (e) {
      return ['user_cyberaura', 'user_neonomad'];
    }
  }

  toggleFollow(userId) {
    const following = this.getFollowingList();
    const isFollowing = following.includes(userId);
    const updated = isFollowing
      ? following.filter((id) => id !== userId)
      : [...following, userId];

    localStorage.setItem(STORAGE_FOLLOWING_KEY, JSON.stringify(updated));
    return !isFollowing;
  }

  getProfileMode() {
    return localStorage.getItem(STORAGE_PROFILE_MODE_KEY) || 'public'; // 'public' | 'private'
  }

  setProfileMode(mode) {
    localStorage.setItem(STORAGE_PROFILE_MODE_KEY, mode);
    return mode;
  }

  searchUsers(query) {
    if (!query || !query.trim()) return this.getUsers().slice(0, 3);

    const q = query.trim().toLowerCase().replace('@', '');
    const users = this.getUsers();

    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        (u.phone && u.phone.includes(q))
    );
  }
}

export const userService = new UserService();
export default userService;
