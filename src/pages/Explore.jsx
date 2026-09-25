// src/pages/Explore.jsx
// NEXUS Super Explore Engine — Trends, Ideologies, Space Gate, Cosmic Hubs, Lifestyle, Healthcare, Family & Career Board

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Hash,
  Users,
  UserPlus,
  Check,
  Clapperboard,
  TrendingUp,
  Briefcase,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Scale,
  Telescope,
  FlaskConical,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Avatar from '@/components/ui/Avatar';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import NexusWatermark from '@/components/ui/NexusWatermark';
import userService from '@/services/userService';
import trendsService from '@/services/trendsService';
import CareerGigsModal from '@/components/career/CareerGigsModal';
import SpaceGateModal from '@/components/explore/SpaceGateModal';
import CosmicHubModal from '@/components/explore/CosmicHubModal';
import useReels from '@/hooks/useReels';

const TRENDING_TAGS = [
  { tag: 'QuantumNode', posts: '128.4k' },
  { tag: 'ModernFeminism', posts: '310.4k' },
  { tag: 'MasculinityAwareness', posts: '275.8k' },
  { tag: 'MedicalKnowledge', posts: '412.3k' },
  { tag: 'MarianaTrench', posts: '98.7k' },
  { tag: 'FermiParadox', posts: '184.2k' },
  { tag: 'DysonSphere', posts: '76.5k' },
];

const EXPLORE_TABS = [
  { id: 'trends', label: '🔥 Trends & Ideologies', short: 'Trends' },
  { id: 'space', label: '🌌 Space Gate', short: 'Space' },
  { id: 'cosmic', label: '🧬 Cosmic Hubs', short: 'Cosmic' },
  { id: 'reels', label: '🎬 Discover Reels', short: 'Reels' },
  { id: 'creators', label: '👥 Creators', short: 'Creators' },
];

export default function Explore() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reels } = useReels();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trends');
  const [activeCategory, setActiveCategory] = useState('all');
  const [followingList, setFollowingList] = useState(userService.getFollowingList());
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const [showCosmicModal, setShowCosmicModal] = useState(false);
  const [trends, setTrends] = useState(trendsService.getTrends('all'));

  const searchResults = userService.searchUsers(query);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setTrends(trendsService.getTrends(catId, query));
  };

  const handleSearchChange = (val) => {
    setQuery(val);
    if (activeTab === 'trends') {
      setTrends(trendsService.getTrends(activeCategory, val));
    }
  };

  const handleToggleFollow = (userId) => {
    const isNowFollowing = userService.toggleFollow(userId);
    setFollowingList(userService.getFollowingList());
    toast.success(isNowFollowing ? 'Followed creator ✨' : 'Unfollowed');
  };

  const handleUpvote = (trendId) => {
    trendsService.upvoteTrend(trendId);
    setTrends(trendsService.getTrends(activeCategory, query));
    toast.success('Insight upvoted! 👍');
  };

  const categories = trendsService.getCategories();

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 pb-20 animate-fade-in space-y-4">
      
      {/* ── Top Search + Action Buttons ── */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute start-3.5 top-3.5 text-nexus-dim" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('discovery.searchPlaceholder')}
            className="w-full ps-10 pe-4 py-3 rounded-2xl glass-card border border-nexus-border/80 focus:border-nexus-primary text-xs sm:text-sm text-white placeholder-nexus-dim outline-none shadow-lg transition-all"
          />
        </div>

        {/* Quick action launchers */}
        <button
          onClick={() => setShowSpaceModal(true)}
          className="p-3 rounded-2xl glass-card border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/20 transition-all flex-shrink-0 shadow-lg"
          title="Space Gate"
        >
          <Telescope size={18} />
        </button>
        <button
          onClick={() => setShowCosmicModal(true)}
          className="p-3 rounded-2xl glass-card border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/20 transition-all flex-shrink-0 shadow-lg"
          title="Cosmic Hubs"
        >
          <FlaskConical size={18} />
        </button>
        <button
          onClick={() => setShowCareerModal(true)}
          className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold transition-all flex-shrink-0 shadow-lg"
          title="Career Gigs Board"
        >
          <Briefcase size={18} />
        </button>
      </div>

      {/* ── Primary Navigation Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {EXPLORE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex-shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-nexus-primary text-white shadow-lg border border-indigo-400/40'
                : 'glass-card border border-nexus-border/60 text-nexus-dim hover:text-white hover:border-nexus-secondary'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.short}</span>
          </button>
        ))}
      </div>

      {/* ── Trending Hashtags Strip ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {TRENDING_TAGS.map((item) => (
          <button
            key={item.tag}
            onClick={() => { handleSearchChange(item.tag); setActiveTab('trends'); }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-nexus-border/60 hover:border-nexus-secondary text-xs font-semibold text-nexus-text hover:text-white transition-all flex-shrink-0"
          >
            <Hash size={12} className="text-nexus-secondary" />
            <span>{item.tag}</span>
            <span className="text-[10px] text-nexus-dim font-mono">({item.posts})</span>
          </button>
        ))}
      </div>

      {/* ═══ TAB CONTENT ═══ */}

      {/* TRENDS TAB */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          {/* Category Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex-shrink-0 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-nexus-primary text-white shadow-lg border border-indigo-400/40'
                    : 'glass-card border border-nexus-border/60 text-nexus-dim hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Digital Neutrality Banner */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Sparkles size={16} className="text-amber-400" />
              <span>Global Insights & Socio-Cultural Discourses</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-md flex-shrink-0">
              ⚖️ Neutral
            </span>
          </div>

          {/* Trend Cards */}
          {trends.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-3xl glass-card border border-nexus-border/60 space-y-3 shadow-xl hover:border-nexus-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex-shrink-0">
                      #{item.tag}
                    </span>
                    <span className="text-[11px] text-nexus-dim font-mono">{item.time}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{item.title}</h3>
                  <p className="text-xs text-nexus-secondary font-semibold">{item.subtitle}</p>
                </div>
                <span className="text-[10px] font-mono text-nexus-dim bg-nexus-surface/60 px-2.5 py-1 rounded-xl flex-shrink-0">
                  {item.stats}
                </span>
              </div>

              <p className="text-xs text-nexus-text leading-relaxed">{item.summary}</p>

              {item.neutralityNote && (
                <div className="p-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200/90 flex items-center gap-2">
                  <Scale size={14} className="text-indigo-400 flex-shrink-0" />
                  <span>{item.neutralityNote}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-nexus-border/40 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.author}</span>
                  {item.verified && <VerifiedBadge type={item.verificationType} size="sm" />}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-nexus-surface/80 hover:bg-nexus-surface text-nexus-text hover:text-white transition-all font-semibold"
                  >
                    <ThumbsUp size={13} className="text-nexus-cyan" />
                    <span>{item.upvotes}</span>
                  </button>
                  <button
                    onClick={() => toast.success('Joining community thread...')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-nexus-surface/80 hover:bg-nexus-surface text-nexus-text hover:text-white transition-all font-semibold"
                  >
                    <MessageSquare size={13} className="text-nexus-secondary" />
                    <span>{item.commentsCount}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SPACE TAB */}
      {activeTab === 'space' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl glass-card border border-indigo-500/40 text-center space-y-4 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <div className="text-6xl animate-pulse">🌌</div>
            <h2 className="text-xl font-bold text-white">NEXUS Space Gate</h2>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Live archives from NASA, SpaceX, ESA, Hubble & JWST. Deep-space imagery, mission telemetry, and astronomical discoveries.
            </p>
            <button
              onClick={() => setShowSpaceModal(true)}
              className="mx-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <Telescope size={18} />
              Open Space Gate Observatory
            </button>
          </div>

          {/* Quick mission cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '🔭', label: 'JWST Deep Field', agency: 'NASA/ESA' },
              { emoji: '🚀', label: 'Starship IFT-9', agency: 'SpaceX' },
              { emoji: '🪐', label: 'JUICE / Ganymede', agency: 'ESA' },
              { emoji: '🌙', label: 'Artemis Gateway', agency: 'NASA' },
            ].map((card) => (
              <button
                key={card.label}
                onClick={() => setShowSpaceModal(true)}
                className="p-4 rounded-2xl glass-card border border-nexus-border/60 hover:border-indigo-500/50 transition-all text-start space-y-1 group"
              >
                <span className="text-2xl">{card.emoji}</span>
                <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">{card.label}</p>
                <p className="text-[10px] text-slate-500">{card.agency}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* COSMIC HUBS TAB */}
      {activeTab === 'cosmic' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl glass-card border border-emerald-500/30 text-center space-y-4 shadow-[0_0_40px_rgba(52,211,153,0.1)]">
            <div className="text-6xl">🧬</div>
            <h2 className="text-xl font-bold text-white">Cosmic Intelligence Hubs</h2>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Deep-future knowledge archives spanning Bio-Eco intelligence, temporal sci-fi projections, and mystical quantum anomalies.
            </p>
            <button
              onClick={() => setShowCosmicModal(true)}
              className="mx-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <FlaskConical size={18} />
              Enter Cosmic Hub
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { emoji: '🌊', label: 'Bio-Eco Sentinel', desc: 'Wildlife tracking & marine archives', color: 'border-emerald-500/30 hover:border-emerald-500/60' },
              { emoji: '🕰️', label: 'Chrono-Nexus', desc: 'Sci-Fi futures & space colonization', color: 'border-violet-500/30 hover:border-violet-500/60' },
              { emoji: '🔮', label: 'Mystic Anomalies', desc: 'Historical mysteries & quantum philosophy', color: 'border-amber-500/30 hover:border-amber-500/60' },
            ].map((hub) => (
              <button
                key={hub.label}
                onClick={() => setShowCosmicModal(true)}
                className={`p-4 rounded-2xl glass-card border ${hub.color} transition-all text-start space-y-2`}
              >
                <span className="text-3xl">{hub.emoji}</span>
                <p className="text-xs font-bold text-white">{hub.label}</p>
                <p className="text-[11px] text-slate-400">{hub.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* REELS TAB */}
      {activeTab === 'reels' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Clapperboard size={14} className="text-nexus-accent" />
              <span>Discover Reels</span>
            </div>
            <button onClick={() => navigate('/reels')} className="text-[11px] text-nexus-muted hover:text-white font-semibold">
              Watch Feed →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {reels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => navigate('/reels')}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden glass-card border border-white/10 cursor-pointer group shadow-lg"
              >
                <video
                  src={reel.videoUrl}
                  poster={reel.posterUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted loop playsInline
                />
                <NexusWatermark creatorHandle={`@${reel.creator.handle}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <p className="text-xs font-bold truncate">{reel.creator.name}</p>
                  <p className="text-[10px] text-nexus-muted truncate">{reel.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATORS TAB */}
      {activeTab === 'creators' && (
        <div className="glass-card p-4 rounded-3xl border border-nexus-border/60 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-nexus-secondary" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                {t('discovery.recommendedCreators')}
              </h2>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck size={12} /> Neon Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {searchResults.map((user) => {
              const isFollowing = followingList.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50 flex items-center justify-between gap-3 hover:bg-nexus-surface/90 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="md"
                      isVerified={user.verified}
                      verificationType={user.verificationType || 'creator'}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">{user.name}</span>
                        {user.verified && <VerifiedBadge type={user.verificationType || 'creator'} size="sm" />}
                      </div>
                      <p className="text-[10px] text-nexus-muted truncate">@{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleFollow(user.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all flex-shrink-0 ${
                      isFollowing
                        ? 'bg-nexus-card border border-nexus-border text-nexus-muted hover:text-white'
                        : 'bg-nexus-gradient text-white shadow-nexus-sm hover:scale-105'
                    }`}
                  >
                    {isFollowing ? <Check size={12} /> : <UserPlus size={12} />}
                    <span>{isFollowing ? t('discovery.following') : t('discovery.follow')}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      <CareerGigsModal isOpen={showCareerModal} onClose={() => setShowCareerModal(false)} />
      <SpaceGateModal isOpen={showSpaceModal} onClose={() => setShowSpaceModal(false)} />
      <CosmicHubModal isOpen={showCosmicModal} onClose={() => setShowCosmicModal(false)} />
    </div>
  );
}
