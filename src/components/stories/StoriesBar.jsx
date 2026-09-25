// src/components/stories/StoriesBar.jsx
// Horizontal 24-hour stories carousel for the Home page

import { useState } from 'react';
import { Plus, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import useStories from '@/hooks/useStories';
import Avatar from '@/components/ui/Avatar';
import StoryViewer from './StoryViewer';
import CreateStoryModal from './CreateStoryModal';

export default function StoriesBar() {
  const { t } = useTranslation();
  const { currentUser, userProfile } = useAuth();
  const { stories, createStory, markSeen, likeSlide } = useStories();

  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const myUid = currentUser?.uid || 'user_me';
  const myStory = stories.find((s) => s.userId === myUid);
  const otherStories = stories.filter((s) => s.userId !== myUid);

  const handleOpenStory = (userStory) => {
    const idx = stories.findIndex((s) => s.userId === userStory.userId);
    if (idx !== -1) {
      setActiveStoryIndex(idx);
      setIsViewerOpen(true);
      markSeen(userStory.userId);
    }
  };

  return (
    <div className="relative py-2.5 px-3 glass-card border border-nexus-border/60 rounded-3xl mx-2 my-2">
      {/* Header mini-label */}
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5">
          <Flame size={13} className="text-nexus-accent" />
          <span>{t('stories.activeStories')}</span>
        </span>
        <span className="text-[10px] text-nexus-dim font-mono">
          24h Ephemeral
        </span>
      </div>

      <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1">
        {/* ── Your Story (+) Item ── */}
        <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
          <div className="relative">
            <div
              onClick={() => {
                if (myStory) handleOpenStory(myStory);
                else setIsCreateOpen(true);
              }}
              className={`p-0.5 rounded-2xl transition-all ${
                myStory
                  ? 'ring-2 ring-nexus-secondary shadow-nexus-sm'
                  : 'ring-1 ring-nexus-border/80 group-hover:ring-nexus-primary'
              }`}
            >
              <Avatar
                src={userProfile?.avatar}
                name={userProfile?.username || 'You'}
                size="md"
              />
            </div>

            {/* Plus add button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateOpen(true);
              }}
              aria-label={t('stories.addStory')}
              title={t('stories.addStory')}
              className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full bg-nexus-gradient text-white flex items-center justify-center border-2 border-nexus-bg shadow-nexus-sm group-hover:scale-110 transition-transform"
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </div>

          <span className="text-[10px] text-nexus-muted group-hover:text-white mt-1 max-w-[64px] truncate text-center">
            {t('stories.yourStory')}
          </span>
        </div>

        {/* ── Other Users' Stories ── */}
        {otherStories.map((userStory) => (
          <div
            key={userStory.id}
            onClick={() => handleOpenStory(userStory)}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
          >
            <div
              className={`p-[2.5px] rounded-2xl transition-all duration-300 ${
                userStory.hasUnseen
                  ? 'bg-gradient-to-tr from-nexus-primary via-purple-500 to-nexus-accent shadow-nexus-sm group-hover:scale-105'
                  : 'ring-1 ring-nexus-border/60 opacity-80 group-hover:opacity-100'
              }`}
            >
              <div className="p-0.5 rounded-[14px] bg-nexus-bg">
                <Avatar
                  src={userStory.userAvatar}
                  name={userStory.userName}
                  size="md"
                />
              </div>
            </div>

            <span className="text-[10px] text-nexus-muted group-hover:text-white mt-1 max-w-[68px] truncate text-center">
              {userStory.userName.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {isViewerOpen && activeStoryIndex !== null && (
        <StoryViewer
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          stories={stories}
          initialUserIndex={activeStoryIndex}
          onLikeSlide={likeSlide}
        />
      )}

      {/* Create Story Modal */}
      <CreateStoryModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateStory={createStory}
      />
    </div>
  );
}
