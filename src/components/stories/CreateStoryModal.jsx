// src/components/stories/CreateStoryModal.jsx
// Modal for creating and sharing 24-hour ephemeral stories

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Sparkles, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';

const PRESET_BACKGROUNDS = [
  {
    name: 'Cyber Grid',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Neon Shinjuku',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Quantum Violet',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Holo Horizon',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80',
  },
];

export default function CreateStoryModal({ isOpen, onClose, onCreateStory }) {
  const { t } = useTranslation();
  const { currentUser, userProfile } = useAuth();

  const [selectedPreset, setSelectedPreset] = useState(PRESET_BACKGROUNDS[0].url);
  const [customUrl, setCustomUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const activeMediaUrl = customUrl.trim() || selectedPreset;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeMediaUrl) return;

    setSubmitting(true);
    try {
      await onCreateStory({
        userId: currentUser?.uid || 'user_me',
        userName: userProfile?.username || currentUser?.email?.split('@')[0] || 'You',
        userAvatar: userProfile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.uid || 'me'}`,
        mediaUrl: activeMediaUrl,
        caption: caption.trim(),
      });

      toast.success('Story shared! Evaporates in 24 hours 🔥');
      setCaption('');
      setCustomUrl('');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to share story');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('stories.createStory')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Preview image */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-nexus-primary/30 shadow-inner group">
          <img
            src={activeMediaUrl}
            alt="Story Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* 24-hour tag badge */}
          <div className="absolute top-3 start-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-nexus-accent/25 border border-nexus-accent/40 text-nexus-accent text-[10px] font-bold backdrop-blur-md">
            <Flame size={12} />
            <span>24h Ephemeral</span>
          </div>

          {/* Caption overlay preview */}
          {caption && (
            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-medium inline-block max-w-full truncate">
                {caption}
              </span>
            </div>
          )}
        </div>

        {/* Preset background selector */}
        <div>
          <label className="block text-[11px] font-semibold text-nexus-muted mb-2 flex items-center gap-1.5">
            <Sparkles size={13} className="text-nexus-cyan" />
            <span>{t('stories.samplePreset')}</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_BACKGROUNDS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setSelectedPreset(preset.url);
                  setCustomUrl('');
                }}
                className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  activeMediaUrl === preset.url
                    ? 'border-nexus-secondary scale-95 shadow-nexus-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Image URL (Optional) */}
        <div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Or paste an image URL..."
              className="w-full px-3.5 py-2 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary text-nexus-text text-xs outline-none transition-all placeholder:text-nexus-dim"
            />
          </div>
        </div>

        {/* Caption Input */}
        <div>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={t('stories.storyCaption')}
            maxLength={120}
            className="w-full px-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary text-nexus-text text-xs outline-none transition-all placeholder:text-nexus-dim"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 rounded-xl bg-nexus-gradient hover:opacity-95 text-white font-bold text-xs shadow-nexus flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send size={15} />
              <span>{t('stories.postStory')}</span>
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}
