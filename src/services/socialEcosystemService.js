// src/services/socialEcosystemService.js
// NEXUS Social & Relationship Ecosystem — Feed, Stories, Spark Matching

const SOCIAL_KEY = 'nexus_social_ecosystem_v1';

const SEED_PROFILES = [
  { id: 'sp1', name: 'Luna Vex', age: 26, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', bio: 'Digital artist & cyberpunk dreamer. Building immersive worlds through code and color.', interests: ['Art', 'Cyberpunk', 'VR', 'Music'], location: 'Neo Tokyo' },
  { id: 'sp2', name: 'Axel Storm', age: 29, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', bio: 'Blockchain engineer. Motorcycle enthusiast. Coffee first, code second.', interests: ['Blockchain', 'Motorcycles', 'Coffee', 'Gaming'], location: 'Berlin' },
  { id: 'sp3', name: 'Nara Chen', age: 24, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', bio: 'UX researcher by day, jazz vocalist by night. Finding harmony in chaos.', interests: ['UX Design', 'Jazz', 'Photography', 'Travel'], location: 'San Francisco' },
  { id: 'sp4', name: 'Zain Al-Rashid', age: 31, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', bio: 'Astrophysicist turned startup founder. Obsessed with quantum computing.', interests: ['Physics', 'Startups', 'AI', 'Chess'], location: 'Geneva' },
  { id: 'sp5', name: 'Mika Tanaka', age: 27, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', bio: 'Full-stack dev & anime cosplayer. Building the metaverse one pixel at a time.', interests: ['Coding', 'Anime', 'Cosplay', 'Sushi'], location: 'Osaka' },
  { id: 'sp6', name: 'Dex Mercer', age: 28, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', bio: 'Indie game developer. Retro gaming collector. Night owl coder.', interests: ['GameDev', 'RetroGaming', 'Pixel Art', 'Synthwave'], location: 'Austin' },
  { id: 'sp7', name: 'Aria Frost', age: 25, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', bio: 'Climate scientist & surfer. Saving the planet between wave sets.', interests: ['Climate', 'Surfing', 'Sustainability', 'Yoga'], location: 'Sydney' },
  { id: 'sp8', name: 'Kai Nakamura', age: 30, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200', bio: 'Music producer & DJ. Creating soundscapes for the digital age.', interests: ['Music Production', 'DJing', 'Vinyl', 'Festivals'], location: 'London' },
];

const SEED_STORIES = [
  { id: 'st1', userId: 'sp1', username: 'Luna Vex', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600', text: 'New digital art drop! 🎨', createdAt: Date.now() - 3600000 },
  { id: 'st2', userId: 'sp2', username: 'Axel Storm', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', text: 'Morning ride through the city 🏍️', createdAt: Date.now() - 7200000 },
  { id: 'st3', userId: 'sp3', username: 'Nara Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600', text: 'Jazz night vibes 🎵', createdAt: Date.now() - 14400000 },
  { id: 'st4', userId: 'sp5', username: 'Mika Tanaka', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600', text: 'New cosplay progress! ✨', createdAt: Date.now() - 18000000 },
];

const SEED_FEED_POSTS = [
  { id: 'fp1', author: { id: 'sp4', name: 'Zain Al-Rashid', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', verified: true }, content: 'Just published our paper on quantum entanglement and its applications in secure communication! 🔬 The future of privacy is quantum.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600', likes: 234, comments: 42, shares: 18, isLiked: false, createdAt: Date.now() - 1800000 },
  { id: 'fp2', author: { id: 'sp7', name: 'Aria Frost', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', verified: false }, content: 'Caught the most incredible sunrise while surfing this morning. Nature never fails to remind us what we\'re fighting for. 🌊🌅', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a5e32?w=600', likes: 567, comments: 89, shares: 34, isLiked: true, createdAt: Date.now() - 5400000 },
  { id: 'fp3', author: { id: 'sp8', name: 'Kai Nakamura', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200', verified: true }, content: 'New track dropping midnight! Genre-bending synthwave meets traditional Japanese instruments. 🎹🥁', image: null, likes: 189, comments: 31, shares: 22, isLiked: false, createdAt: Date.now() - 10800000 },
];

const DEFAULT_DATA = {
  feedPosts: SEED_FEED_POSTS,
  stories: SEED_STORIES,
  sparkProfiles: SEED_PROFILES,
  sparkMatches: [],
  sparkRejected: [],
  sparkCurrentIndex: 0,
  viewedStories: [],
};

class SocialEcosystemService {
  getData() {
    try {
      const raw = localStorage.getItem(SOCIAL_KEY);
      if (!raw) {
        localStorage.setItem(SOCIAL_KEY, JSON.stringify(DEFAULT_DATA));
        return { ...DEFAULT_DATA };
      }
      return JSON.parse(raw);
    } catch { return { ...DEFAULT_DATA }; }
  }

  save(data) {
    localStorage.setItem(SOCIAL_KEY, JSON.stringify(data));
  }

  // ── Feed ──
  getFeedPosts() { return this.getData().feedPosts; }

  addFeedPost(content, image = null) {
    const data = this.getData();
    const post = {
      id: `fp_${Date.now()}`,
      author: { id: 'me', name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200', verified: true },
      content,
      image,
      likes: 0, comments: 0, shares: 0,
      isLiked: false,
      createdAt: Date.now(),
    };
    data.feedPosts.unshift(post);
    this.save(data);
    return post;
  }

  toggleFeedLike(postId) {
    const data = this.getData();
    const post = data.feedPosts.find((p) => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      this.save(data);
    }
    return data.feedPosts;
  }

  // ── Stories (24h expiry) ──
  getStories() {
    const data = this.getData();
    const now = Date.now();
    const active = data.stories.filter((s) => now - s.createdAt < 86400000);
    if (active.length !== data.stories.length) {
      data.stories = active;
      this.save(data);
    }
    return active;
  }

  addStory(text, image = null) {
    const data = this.getData();
    const story = {
      id: `st_${Date.now()}`,
      userId: 'me',
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      image,
      text,
      createdAt: Date.now(),
    };
    data.stories.unshift(story);
    this.save(data);
    return story;
  }

  markStoryViewed(storyId) {
    const data = this.getData();
    if (!data.viewedStories.includes(storyId)) {
      data.viewedStories.push(storyId);
      this.save(data);
    }
  }

  isStoryViewed(storyId) {
    return this.getData().viewedStories.includes(storyId);
  }

  // ── Spark Matching ──
  getSparkProfiles() {
    const data = this.getData();
    return data.sparkProfiles.filter(
      (p) => !data.sparkMatches.includes(p.id) && !data.sparkRejected.includes(p.id)
    );
  }

  sparkAccept(profileId) {
    const data = this.getData();
    if (!data.sparkMatches.includes(profileId)) {
      data.sparkMatches.push(profileId);
    }
    this.save(data);
    return data.sparkMatches;
  }

  sparkReject(profileId) {
    const data = this.getData();
    if (!data.sparkRejected.includes(profileId)) {
      data.sparkRejected.push(profileId);
    }
    this.save(data);
  }

  getMatches() {
    const data = this.getData();
    return SEED_PROFILES.filter((p) => data.sparkMatches.includes(p.id));
  }

  resetSpark() {
    const data = this.getData();
    data.sparkMatches = [];
    data.sparkRejected = [];
    this.save(data);
  }
}

const socialEcosystemService = new SocialEcosystemService();
export default socialEcosystemService;
