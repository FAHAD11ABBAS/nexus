// src/components/reels/ReelCard.jsx
// Full-screen snap Reel card with auto-play, gestures, heart particle bursts & actions bar

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  Plus,
  Check,
  Disc,
  Repeat,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Avatar from '@/components/ui/Avatar';
import NexusWatermark from '@/components/ui/NexusWatermark';
import ReelCommentsModal from './ReelCommentsModal';
import ReelShareModal from './ReelShareModal';

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
}

export default function ReelCard({
  reel,
  isActive,
  onToggleLike,
  onToggleSave,
  onToggleFollow,
  onAddComment,
}) {
  const { t } = useTranslation();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(null); // 'play' | 'pause' | null
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isExpandedCaption, setIsExpandedCaption] = useState(false);

  const lastTapRef = useRef(0);

  // Auto-play when active, pause when inactive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // In case autoplay is blocked, muted autoplay will work
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true));
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Sync mute property
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle single tap (Play/Pause) vs Double tap (Like)
  const handleVideoClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap triggered
      if (!reel.isLiked) {
        onToggleLike(reel.id);
      }
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
      lastTapRef.current = 0;
      return;
    }

    lastTapRef.current = now;

    // Single tap after timeout
    setTimeout(() => {
      if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY && lastTapRef.current !== 0) {
        togglePlayPause();
      }
    }, DOUBLE_TAP_DELAY);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowPlayIcon('play');
    } else {
      video.pause();
      setIsPlaying(false);
      setShowPlayIcon('pause');
    }
    setTimeout(() => setShowPlayIcon(null), 600);
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    setIsMuted(!isMuted);
    toast(isMuted ? 'Sound unmuted 🔊' : 'Muted 🔇');
  };

  return (
    <div className="relative w-full h-[calc(100dvh-var(--topbar-h)-var(--bottomnav-h))] snap-start snap-always bg-black overflow-hidden flex items-center justify-center select-none">
      {/* ── Background Video Player ── */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
        loop
        playsInline
        muted={isMuted}
        onClick={handleVideoClick}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Gradient overlays for bottom text & controls */}
      <div
        onClick={handleVideoClick}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-auto cursor-pointer"
      />

      {/* ── Play / Pause Icon Flash Animation ── */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-fade-in">
          <div className="p-4 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
            {showPlayIcon === 'play' ? <Play size={40} fill="white" /> : <Pause size={40} fill="white" />}
          </div>
        </div>
      )}

      {/* ── Double Tap Heart Burst Animation ── */}
      {showHeartBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-bounce">
          <Heart
            size={110}
            className="text-rose-500 fill-rose-500 drop-shadow-[0_0_35px_rgba(244,63,94,1)] animate-ping"
          />
        </div>
      )}

      {/* ── Sound Toggle Overlay Pill (Top Center) ── */}
      <button
        onClick={toggleMute}
        className="absolute top-4 end-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-lg"
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-nexus-cyan" />}
        <span className="text-[11px] font-mono">
          {isMuted ? t('reels.tapToUnmute') : 'Mute'}
        </span>
      </button>

      {/* ── NEXUS Smart Watermark Engine ── */}
      <NexusWatermark creatorHandle={reel.creator.handle} position="top-start" />

      {/* ── Right-Side Interactive Actions Bar ── */}
      <div className="absolute end-3.5 bottom-8 z-20 flex flex-col items-center gap-3.5">
        {/* Creator Avatar with Follow (+) badge */}
        <div className="relative mb-1">
          <div className="p-0.5 rounded-2xl ring-2 ring-nexus-secondary shadow-nexus-sm">
            <Avatar
              src={reel.creator.avatar}
              name={reel.creator.name}
              size="md"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFollow(reel.creator.id);
            }}
            aria-label="Follow Creator"
            className={`absolute -bottom-1.5 start-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center border-2 border-black transition-all ${
              reel.creator.isFollowing
                ? 'bg-nexus-cyan text-black'
                : 'bg-nexus-gradient text-white shadow-nexus-sm hover:scale-110'
            }`}
          >
            {reel.creator.isFollowing ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
          </button>
        </div>

        {/* Like Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(reel.id);
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
              reel.isLiked
                ? 'bg-rose-500/30 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
            }`}
          >
            <Heart
              size={22}
              className={`transition-transform duration-200 group-hover:scale-110 ${
                reel.isLiked ? 'fill-rose-500' : ''
              }`}
            />
          </div>
          <span className="text-[11px] font-bold text-white font-mono drop-shadow">
            {formatCount(reel.likesCount)}
          </span>
        </button>

        {/* Comment Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsCommentsOpen(true);
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-black/50 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90">
            <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[11px] font-bold text-white font-mono drop-shadow">
            {formatCount(reel.commentsCount)}
          </span>
        </button>

        {/* Save / Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(reel.id);
            toast.success(reel.isSaved ? 'Removed from saved' : 'Saved to collection ⭐');
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
              reel.isSaved
                ? 'bg-nexus-gold/30 text-nexus-gold shadow-[0_0_15px_rgba(251,191,36,0.6)]'
                : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
            }`}
          >
            <Bookmark
              size={22}
              className={`transition-transform group-hover:scale-110 ${
                reel.isSaved ? 'fill-nexus-gold' : ''
              }`}
            />
          </div>
          <span className="text-[11px] font-bold text-white font-mono drop-shadow">
            {reel.isSaved ? t('reels.saved') : t('reels.save')}
          </span>
        </button>

        {/* Repost / Forward Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toast.success(t('reels.reposted'));
          }}
          className="flex flex-col items-center gap-1 group"
          title="Repost to feed"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-nexus-sm">
            <Repeat size={20} className="group-hover:rotate-180 transition-transform duration-300" />
          </div>
          <span className="text-[11px] font-bold text-white font-mono drop-shadow">
            {t('reels.repost')}
          </span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsShareOpen(true);
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-black/50 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90">
            <Share2 size={22} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[11px] font-bold text-white font-mono drop-shadow">
            {formatCount(reel.sharesCount)}
          </span>
        </button>

        {/* Rotating Audio Vinyl Disc */}
        <div
          className={`relative w-11 h-11 rounded-full p-1 bg-gradient-to-tr from-gray-900 via-gray-700 to-black border border-nexus-primary/50 shadow-lg ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <div className="w-full h-full rounded-full bg-nexus-gradient flex items-center justify-center overflow-hidden">
            <Disc size={18} className="text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── Bottom-Left Info Overlay ── */}
      <div className="absolute start-4 bottom-6 end-20 z-20 space-y-2.5 text-white pointer-events-none">
        {/* Creator Info Header */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-sm font-bold drop-shadow-md">
            {reel.creator.name}
          </span>
          <span className="text-xs text-nexus-muted drop-shadow-md font-mono">
            {reel.creator.handle}
          </span>
          {reel.creator.isVerified && (
            <span className="w-4 h-4 rounded-full bg-nexus-cyan text-black flex items-center justify-center text-[10px] font-black">
              ✓
            </span>
          )}
        </div>

        {/* Caption */}
        <div className="pointer-events-auto">
          <p
            onClick={() => setIsExpandedCaption(!isExpandedCaption)}
            className={`text-xs leading-relaxed drop-shadow text-nexus-text/95 cursor-pointer ${
              isExpandedCaption ? '' : 'line-clamp-2'
            }`}
          >
            {reel.caption}
          </p>
        </div>

        {/* Audio Marquee Ticker */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 w-fit pointer-events-auto">
          <Music size={12} className="text-nexus-cyan animate-pulse" />
          <span className="text-[11px] font-medium text-white/90 truncate max-w-[200px]">
            {reel.music.title} · {reel.music.artist}
          </span>
        </div>
      </div>

      {/* Comments Sheet Modal */}
      <ReelCommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={reel.comments || []}
        onAddComment={(cmt) => onAddComment(reel.id, cmt)}
      />

      {/* Share Sheet Modal */}
      <ReelShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reel={reel}
      />
    </div>
  );
}
