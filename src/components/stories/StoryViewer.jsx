// src/components/stories/StoryViewer.jsx
// Full-screen Instagram/Snapchat style story viewer with segmented progress bars & gestures

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Heart, Flame, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Avatar from '@/components/ui/Avatar';

const SLIDE_DURATION_MS = 5000;

function formatHoursRemaining(expiresAt) {
  const diff = expiresAt - Date.now();
  if (diff <= 0) return '0h';
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  return `${hours}h`;
}

function formatTimeAgo(createdAt) {
  const diffHours = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  return `${diffHours}h ago`;
}

export default function StoryViewer({
  isOpen,
  onClose,
  stories = [],
  initialUserIndex = 0,
  onLikeSlide,
}) {
  const { t } = useTranslation();

  const [userIndex, setUserIndex] = useState(initialUserIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const currentStory = stories[userIndex];
  const currentSlide = currentStory?.slides?.[slideIndex];
  const totalSlides = currentStory?.slides?.length || 0;

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedProgressRef = useRef(0);

  // Advance to next slide or next user
  const handleNext = useCallback(() => {
    if (slideIndex < totalSlides - 1) {
      setSlideIndex((prev) => prev + 1);
      setProgress(0);
      pausedProgressRef.current = 0;
    } else if (userIndex < stories.length - 1) {
      setUserIndex((prev) => prev + 1);
      setSlideIndex(0);
      setProgress(0);
      pausedProgressRef.current = 0;
    } else {
      onClose();
    }
  }, [slideIndex, totalSlides, userIndex, stories.length, onClose]);

  // Go to previous slide or previous user
  const handlePrev = useCallback(() => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
      setProgress(0);
      pausedProgressRef.current = 0;
    } else if (userIndex > 0) {
      const prevUser = userIndex - 1;
      setUserIndex(prevUser);
      setSlideIndex(stories[prevUser].slides.length - 1);
      setProgress(0);
      pausedProgressRef.current = 0;
    }
  }, [slideIndex, userIndex, stories]);

  // Reset indices when opened with a new user
  useEffect(() => {
    if (isOpen) {
      setUserIndex(initialUserIndex);
      setSlideIndex(0);
      setProgress(0);
      pausedProgressRef.current = 0;
    }
  }, [isOpen, initialUserIndex]);

  // Progress animation timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentSlide) return;

    startTimeRef.current = Date.now() - (pausedProgressRef.current / 100) * SLIDE_DURATION_MS;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);
      setProgress(currentPct);

      if (currentPct >= 100) {
        clearInterval(interval);
        handleNext();
      }
    }, 50);

    timerRef.current = interval;

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentSlide, handleNext]);

  const handlePause = () => {
    setIsPaused(true);
    pausedProgressRef.current = progress;
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleHeartClick = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);
    if (onLikeSlide && currentStory && currentSlide) {
      onLikeSlide(currentStory.userId, currentSlide.id);
    }
    toast.success('Heart sent to ' + currentStory.userName + ' ❤️');
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast.success('Reply sent to ' + currentStory.userName);
    setReplyText('');
  };

  if (!isOpen || !currentStory || !currentSlide) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      {/* Story container (phone aspect ratio) */}
      <div className="relative w-full max-w-md h-[92dvh] max-h-[840px] rounded-3xl overflow-hidden shadow-2xl bg-nexus-surface border border-white/10 flex flex-col justify-between">
        {/* Background Image */}
        <img
          src={currentSlide.mediaUrl}
          alt="Story"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top/Bottom gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* Floating Heart Burst Animation */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-bounce">
            <Heart size={90} className="text-rose-500 fill-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
          </div>
        )}

        {/* ── TOP SECTION ── */}
        <div className="relative z-20 p-4 space-y-3">
          {/* Segmented progress bars */}
          <div className="flex items-center gap-1.5 w-full">
            {currentStory.slides.map((slide, idx) => {
              let fill = '0%';
              if (idx < slideIndex) fill = '100%';
              else if (idx === slideIndex) fill = `${progress}%`;

              return (
                <div
                  key={slide.id}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-75"
                    style={{ width: fill }}
                  />
                </div>
              );
            })}
          </div>

          {/* User info & controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={currentStory.userAvatar}
                name={currentStory.userName}
                size="sm"
                isOnline={true}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    {currentStory.userName}
                  </span>
                  <span className="text-[10px] text-white/70">
                    {formatTimeAgo(currentSlide.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-nexus-accent font-semibold">
                  <Flame size={10} />
                  <span>{formatHoursRemaining(currentSlide.expiresAt)} left</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── TAP NAVIGATION ZONES ── */}
        <div className="relative flex-1 flex z-10">
          <div
            onClick={handlePrev}
            className="w-1/3 h-full cursor-pointer"
            title="Previous"
          />
          <div
            onClick={handleNext}
            className="w-2/3 h-full cursor-pointer"
            title="Next"
          />
        </div>

        {/* ── BOTTOM SECTION ── */}
        <div className="relative z-20 p-4 space-y-2">
          {/* Caption text */}
          {currentSlide.caption && (
            <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs text-center leading-relaxed">
              {currentSlide.caption}
            </div>
          )}

          {/* Reply input bar & Heart reaction */}
          <form
            onSubmit={handleSendReply}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t('stories.replyPlaceholder', {
                name: currentStory.userName.split(' ')[0],
              })}
              className="flex-1 px-4 py-2.5 rounded-full bg-black/50 border border-white/20 focus:border-nexus-primary text-white text-xs outline-none placeholder:text-white/60 backdrop-blur-md"
            />
            {replyText.trim() ? (
              <button
                type="submit"
                className="p-2.5 rounded-full bg-nexus-gradient text-white shadow-nexus-sm"
              >
                <Send size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleHeartClick}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-rose-400 hover:text-rose-300 transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              >
                <Heart size={20} className={currentSlide.isLiked ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
