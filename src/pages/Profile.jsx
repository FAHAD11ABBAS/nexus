// src/pages/Profile.jsx
// Full-featured Social Media Profile supporting Public/Creator Mode & Private Stealth Mode

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Share2,
  Grid,
  Clapperboard,
  Bookmark,
  MapPin,
  CheckCircle2,
  UserPlus,
  Lock,
  Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/ui/Avatar';
import NexusWatermark from '@/components/ui/NexusWatermark';
import UserDiscoveryModal from '@/components/profile/UserDiscoveryModal';
import userService from '@/services/userService';

const USER_POSTS = [
  {
    id: 'p1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
    likes: 1420,
    comments: 248,
    caption: 'Quantum node operational on Web3 edge network! 🚀',
  },
  {
    id: 'p2',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600',
    likes: 3890,
    comments: 642,
    caption: 'Neon Tokyo reflections 🌌 Auto AI enhancement test.',
  },
  {
    id: 'p3',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
    likes: 2560,
    comments: 194,
    caption: 'Glassmorphism cyberpunk UI design system.',
  },
];

export default function Profile() {
  const { t } = useTranslation();
  const { currentUser, userProfile } = useAuth();
  const [profileMode, setProfileMode] = useState(userService.getProfileMode());
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'reels' | 'saved'
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  const handleToggleMode = () => {
    const nextMode = profileMode === 'public' ? 'private' : 'public';
    setProfileMode(userService.setProfileMode(nextMode));
    toast.success(
      nextMode === 'public'
        ? t('profile.publicActive')
        : t('profile.stealthActive')
    );
  };

  const handleShareProfile = () => {
    const handle = userProfile?.username || 'cybernaut';
    navigator.clipboard.writeText(`https://nexus.app/u/${handle}`);
    toast.success(t('common.copied'));
  };

  const isCreator = profileMode === 'public';

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 space-y-4 pb-20 animate-fade-in">
      {/* ── Cover Banner & Avatar ── */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-nexus-border/60 shadow-xl">
        {/* Banner Cover Image */}
        <div className="h-36 sm:h-48 w-full bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 relative">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg via-transparent to-black/30" />

          {/* Mode Badge Indicator */}
          <button
            onClick={handleToggleMode}
            className={`absolute top-3 end-3 px-3 py-1.5 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 backdrop-blur-md border transition-all active:scale-95 shadow-lg ${
              isCreator
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30'
            }`}
          >
            {isCreator ? <Globe size={14} /> : <Lock size={14} />}
            <span>{isCreator ? t('profile.creatorMode') : t('profile.privateMode')}</span>
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-5 pb-5 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            {/* Avatar with Status Ring */}
            <div className="relative p-1 rounded-3xl bg-nexus-bg ring-4 ring-nexus-primary/50 shadow-nexus-lg">
              <Avatar
                src={userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                name={userProfile?.username || 'Cybernaut'}
                size="xl"
                isOnline={true}
              />
            </div>

            {/* Action Buttons Cluster */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsDiscoveryOpen(true)}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-2xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus-sm hover:scale-105 transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus size={15} />
                <span>{t('discovery.title')}</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="px-3.5 py-2 rounded-2xl glass-card border border-nexus-border hover:border-nexus-secondary text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <Share2 size={15} className="text-nexus-cyan" />
                <span className="hidden sm:inline">{t('profile.shareProfile')}</span>
              </button>
            </div>
          </div>

          {/* User Name & Handle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-white">
                {userProfile?.username || 'Cybernaut'}
              </h1>
              <CheckCircle2 size={18} className="text-nexus-cyan fill-nexus-cyan/20" />
            </div>

            <p className="text-xs text-nexus-muted font-mono">
              @{userProfile?.username?.toLowerCase() || 'cybernaut'}
            </p>

            {/* Bio */}
            <p className="text-xs text-nexus-text/90 pt-1 leading-relaxed max-w-xl">
              ⚡ Building decentralized mesh protocols & glassmorphism dark apps.
              Web3 Creator on NEXUS Core Network.
            </p>

            {/* Location & Node Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-nexus-muted pt-2">
              <div className="flex items-center gap-1 text-nexus-secondary">
                <MapPin size={13} />
                <span>{userProfile?.country || 'Neo Tokyo Node'}</span>
              </div>
              <div className="flex items-center gap-1 text-nexus-dim font-mono text-[11px]">
                <span>Node ID: nx_98a72b</span>
              </div>
            </div>
          </div>

          {/* Social Engagement Stats Strip */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-nexus-border/40 mt-4 text-center">
            <div className="p-2 rounded-2xl glass-card border border-nexus-border/40">
              <p className="text-sm font-extrabold text-white">3</p>
              <p className="text-[10px] text-nexus-muted uppercase">{t('profile.posts')}</p>
            </div>
            <div className="p-2 rounded-2xl glass-card border border-nexus-border/40">
              <p className="text-sm font-extrabold text-nexus-cyan">12.8k</p>
              <p className="text-[10px] text-nexus-muted uppercase">{t('profile.followers')}</p>
            </div>
            <div className="p-2 rounded-2xl glass-card border border-nexus-border/40">
              <p className="text-sm font-extrabold text-white">340</p>
              <p className="text-[10px] text-nexus-muted uppercase">{t('profile.following')}</p>
            </div>
            <div className="p-2 rounded-2xl glass-card border border-nexus-border/40">
              <p className="text-sm font-extrabold text-rose-400">98.4k</p>
              <p className="text-[10px] text-nexus-muted uppercase">{t('profile.likes')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Banner Alert */}
      <div className="p-3 rounded-2xl glass-card border border-nexus-border/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isCreator ? (
            <Globe size={18} className="text-emerald-400 animate-pulse" />
          ) : (
            <Lock size={18} className="text-purple-400 animate-pulse" />
          )}
          <span className="text-xs text-white font-medium">
            {isCreator ? t('profile.publicActive') : t('profile.stealthActive')}
          </span>
        </div>

        <button
          onClick={handleToggleMode}
          className="px-3 py-1 rounded-xl bg-nexus-surface border border-nexus-border text-xs font-bold text-nexus-cyan hover:text-white transition-all"
        >
          Switch Mode
        </button>
      </div>

      {/* Feed Category Tabs */}
      <div className="flex items-center justify-center gap-2 p-1 glass-card rounded-2xl border border-nexus-border/60">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'posts'
              ? 'bg-nexus-gradient text-white shadow-nexus-sm'
              : 'text-nexus-muted hover:text-white'
          }`}
        >
          <Grid size={15} />
          <span>{t('profile.posts')}</span>
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'reels'
              ? 'bg-nexus-gradient text-white shadow-nexus-sm'
              : 'text-nexus-muted hover:text-white'
          }`}
        >
          <Clapperboard size={15} />
          <span>Reels</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'saved'
              ? 'bg-nexus-gradient text-white shadow-nexus-sm'
              : 'text-nexus-muted hover:text-white'
          }`}
        >
          <Bookmark size={15} />
          <span>{t('reels.saved')}</span>
        </button>
      </div>

      {/* Media Grid Showcase with NEXUS Watermarks */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {USER_POSTS.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10 group cursor-pointer shadow-lg"
          >
            <img
              src={post.image}
              alt="Grid Item"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* NEXUS Smart Digital Watermark */}
            <NexusWatermark creatorHandle={`@${userProfile?.username || 'cybernaut'}`} />

            {/* Hover overlay stats */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
              <div className="flex items-center gap-1 text-rose-400">
                <span>❤️</span>
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-nexus-cyan">
                <span>💬</span>
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Discovery & Add Friend Modal */}
      <UserDiscoveryModal
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
      />
    </div>
  );
}
