// src/pages/Home.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Flame,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Send,
  Image as ImageIcon,
  Smile,
  MoreHorizontal,
  CheckCircle2,
  TrendingUp,
  Clapperboard,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StoriesBar from '@/components/stories/StoriesBar';
import Avatar from '@/components/ui/Avatar';
import useReels from '@/hooks/useReels';

const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: {
      name: 'CyberAura',
      username: '@cyberaura',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      verified: true,
    },
    createdAt: '15m ago',
    content: 'Just launched the new decentralized quantum node on NEXUS! 🚀 The bandwidth latency is virtually zero across all edge clusters. What a time to build on Web3!',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    likes: 142,
    comments: 28,
    shares: 12,
    isLiked: false,
    isSaved: false,
    tags: ['Decentralized', 'Web3', 'Quantum'],
  },
  {
    id: 'post_2',
    author: {
      name: 'NeoTokyo Nomad',
      username: '@neonomad',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: true,
    },
    createdAt: '1h ago',
    content: 'Night lights in Neo Tokyo 🌌 Testing out the AI auto-enhancer for low-light photography. Zero noise, pure neon aesthetics.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    likes: 389,
    comments: 64,
    shares: 45,
    isLiked: true,
    isSaved: true,
    tags: ['Cyberpunk', 'Photography', 'Neon'],
  },
  {
    id: 'post_3',
    author: {
      name: 'Elena Rostova',
      username: '@elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      verified: false,
    },
    createdAt: '3h ago',
    content: 'Designing glassmorphism dark interfaces for the next generation of social apps. Clean lines, glowing accent accents, and seamless multi-language RTL support! ✨',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    likes: 256,
    comments: 19,
    shares: 8,
    isLiked: false,
    isSaved: false,
    tags: ['UIUX', 'Design', 'Glassmorphism'],
  },
];

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { reels } = useReels();

  const [activeTab, setActiveTab] = useState('forYou'); // 'forYou' | 'trending' | 'following'
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [postCommentsMap, setPostCommentsMap] = useState({
    post_1: [
      { id: 'c1', user: 'VortexAI', text: 'Quantum mesh speeds are unbelievable! ⚡', time: '10m ago' },
    ],
    post_2: [
      { id: 'c2', user: 'KiraSynth', text: 'These colors look phenomenal! 🔥', time: '45m ago' },
    ],
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const createdPost = {
      id: `post_${Date.now()}`,
      author: {
        name: userProfile?.username || 'You',
        username: `@${userProfile?.username?.toLowerCase() || 'user_me'}`,
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true,
      },
      createdAt: 'Just now',
      content: newPostText,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      tags: ['NexusCore', 'Update'],
    };

    setPosts([createdPost, ...posts]);
    setNewPostText('');
  };

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleToggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      user: userProfile?.username || 'You',
      text: commentInput,
      time: 'Just now',
    };

    setPostCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    );

    setCommentInput('');
  };

  return (
    <div className="min-h-full pb-20 max-w-2xl mx-auto space-y-4">
      {/* ── 24h Ephemeral Stories Bar ── */}
      <StoriesBar />

      {/* ── Feed Category Tabs ── */}
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-1.5 p-1 glass-card rounded-2xl border border-nexus-border/60">
          <button
            onClick={() => setActiveTab('forYou')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'forYou'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('reels.forYou')}
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'trending'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            Trending 🔥
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'following'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('reels.following')}
          </button>
        </div>

        <button
          onClick={() => navigate('/reels')}
          className="flex items-center gap-1.5 text-xs font-bold text-nexus-secondary hover:text-nexus-accent transition-colors px-2 py-1"
        >
          <Clapperboard size={16} />
          <span>Reels</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* ── Create Post Box ── */}
      <div className="glass-card p-3.5 rounded-3xl border border-nexus-border/60 mx-2 shadow-lg">
        <form onSubmit={handleCreatePost} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar
              src={userProfile?.avatar}
              name={userProfile?.username || 'You'}
              size="sm"
            />
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's happening in your network?"
              rows={2}
              className="flex-1 bg-transparent text-sm text-white placeholder-nexus-dim outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between border-t border-nexus-border/40 pt-2.5">
            <div className="flex items-center gap-3 text-nexus-muted">
              <button
                type="button"
                className="hover:text-nexus-primary transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <ImageIcon size={16} />
                <span className="hidden sm:inline">Media</span>
              </button>
              <button
                type="button"
                className="hover:text-nexus-secondary transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <Sparkles size={16} />
                <span className="hidden sm:inline">AI Vibe</span>
              </button>
              <button
                type="button"
                className="hover:text-nexus-accent transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <Smile size={16} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!newPostText.trim()}
              className="px-4 py-1.5 rounded-xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send size={13} />
              <span>Publish</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Featured Short Reels Preview Strip ── */}
      {reels.length > 0 && (
        <div className="mx-2 py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Clapperboard size={14} className="text-nexus-secondary" />
              <span>Trending Reels</span>
            </span>
            <button
              onClick={() => navigate('/reels')}
              className="text-[11px] text-nexus-muted hover:text-white"
            >
              Watch All &rarr;
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {reels.slice(0, 4).map((reel) => (
              <div
                key={reel.id}
                onClick={() => navigate('/reels')}
                className="relative w-28 h-40 flex-shrink-0 rounded-2xl overflow-hidden glass-card border border-white/10 cursor-pointer group shadow-lg"
              >
                <video
                  src={reel.videoUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2 inset-x-2 text-white">
                  <p className="text-[10px] font-bold truncate">{reel.creator.name}</p>
                  <p className="text-[9px] text-nexus-muted truncate">{reel.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Feed Posts ── */}
      <div className="space-y-3.5 mx-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass-card p-4 rounded-3xl border border-nexus-border/60 shadow-xl space-y-3 transition-all hover:border-nexus-border"
          >
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Avatar
                  src={post.author.avatar}
                  name={post.author.name}
                  size="md"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-white">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <CheckCircle2 size={14} className="text-nexus-primary fill-nexus-primary/20" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-nexus-muted">
                    <span>{post.author.username}</span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>

              <button className="text-nexus-muted hover:text-white p-1 rounded-lg">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-nexus-text leading-relaxed font-normal whitespace-pre-line">
              {post.content}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-nexus-secondary bg-nexus-secondary/10 px-2 py-0.5 rounded-full border border-nexus-secondary/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Media Image */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden border border-nexus-border/40 max-h-96">
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                />
              </div>
            )}

            {/* Post Action Footer */}
            <div className="flex items-center justify-between border-t border-nexus-border/40 pt-2.5 text-nexus-muted">
              {/* Like */}
              <button
                onClick={() => handleToggleLike(post.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  post.isLiked ? 'text-rose-500' : 'hover:text-rose-400'
                }`}
              >
                <Heart
                  size={18}
                  className={post.isLiked ? 'fill-rose-500 text-rose-500' : ''}
                />
                <span>{post.likes}</span>
              </button>

              {/* Comment */}
              <button
                onClick={() =>
                  setActiveCommentPost(
                    activeCommentPost === post.id ? null : post.id
                  )
                }
                className="flex items-center gap-1.5 text-xs font-semibold hover:text-nexus-primary transition-colors"
              >
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-nexus-accent transition-colors">
                <Share2 size={18} />
                <span>{post.shares}</span>
              </button>

              {/* Save */}
              <button
                onClick={() => handleToggleSave(post.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  post.isSaved ? 'text-nexus-secondary' : 'hover:text-nexus-secondary'
                }`}
              >
                <Bookmark
                  size={18}
                  className={post.isSaved ? 'fill-nexus-secondary text-nexus-secondary' : ''}
                />
              </button>
            </div>

            {/* Expanded Inline Comments */}
            {activeCommentPost === post.id && (
              <div className="border-t border-nexus-border/40 pt-3 space-y-2 animate-fadeIn">
                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                  {(postCommentsMap[post.id] || []).map((c) => (
                    <div
                      key={c.id}
                      className="bg-nexus-card/60 p-2.5 rounded-xl border border-nexus-border/40 text-xs flex justify-between items-start"
                    >
                      <div>
                        <span className="font-bold text-white mr-1.5">{c.user}:</span>
                        <span className="text-nexus-muted">{c.text}</span>
                      </div>
                      <span className="text-[9px] text-nexus-dim">{c.time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a comment..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    className="flex-1 bg-nexus-card/80 border border-nexus-border/60 rounded-xl px-3 py-1.5 text-xs text-white placeholder-nexus-dim outline-none focus:border-nexus-primary"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3 py-1.5 rounded-xl bg-nexus-gradient text-white text-xs font-bold"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

