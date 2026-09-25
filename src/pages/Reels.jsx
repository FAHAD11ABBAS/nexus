// src/pages/Reels.jsx
// Vertical snap-scrolling Reels video feed (TikTok & Instagram style)

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Clapperboard } from 'lucide-react';
import useReels from '@/hooks/useReels';
import ReelCard from '@/components/reels/ReelCard';

export default function Reels() {
  const { t } = useTranslation();
  const {
    reels,
    loading,
    toggleLike,
    toggleSave,
    toggleFollow,
    addComment,
  } = useReels();

  const [activeTab, setActiveTab] = useState('forYou'); // 'forYou' | 'following'
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const filteredReels =
    activeTab === 'following'
      ? reels.filter((r) => r.creator.isFollowing)
      : reels;

  // Use IntersectionObserver to track which reel is currently in the center of the viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredReels]);

  return (
    <div className="relative h-[calc(100dvh-var(--topbar-h)-var(--bottomnav-h))] w-full max-w-lg mx-auto bg-black overflow-hidden flex flex-col">
      {/* ── Top Floating Tabs (Following | For You) ── */}
      <div className="absolute top-3 inset-x-0 z-30 flex items-center justify-center gap-6 pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('following')}
            className={`text-xs font-bold transition-all ${
              activeTab === 'following'
                ? 'text-white scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('reels.following')}
          </button>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <button
            type="button"
            onClick={() => setActiveTab('forYou')}
            className={`text-xs font-bold transition-all ${
              activeTab === 'forYou'
                ? 'text-nexus-secondary scale-105 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('reels.forYou')}
          </button>
        </div>
      </div>

      {/* ── Snap-Scrolling Reels Container ── */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {filteredReels.map((reel, index) => (
          <div
            key={reel.id}
            ref={(el) => (itemRefs.current[index] = el)}
            data-index={index}
            className="w-full h-full snap-start snap-always"
          >
            <ReelCard
              reel={reel}
              isActive={index === activeIndex}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onToggleFollow={toggleFollow}
              onAddComment={addComment}
            />
          </div>
        ))}

        {filteredReels.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-nexus-muted space-y-3">
            <Clapperboard size={48} className="text-nexus-dim animate-bounce" />
            <p className="text-sm font-semibold text-white">No reels in this feed yet</p>
            <p className="text-xs text-nexus-muted max-w-xs">
              Follow creators to see their latest short videos here!
            </p>
            <button
              onClick={() => setActiveTab('forYou')}
              className="px-4 py-2 rounded-xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus"
            >
              Explore For You
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
