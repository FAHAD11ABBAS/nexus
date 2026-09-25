// src/components/reels/ReelCommentsModal.jsx
// Slide-up bottom sheet modal for reel comments

import { useState } from 'react';
import { X, Send, Heart, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';

function formatCommentTime(ts) {
  const diffMinutes = Math.floor((Date.now() - ts) / (1000 * 60));
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours}h`;
}

export default function ReelCommentsModal({
  isOpen,
  onClose,
  comments = [],
  onAddComment,
}) {
  const { t } = useTranslation();
  const { currentUser, userProfile } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment({
      userName: userProfile?.username || currentUser?.email?.split('@')[0] || 'Cybernaut',
      userAvatar: userProfile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.uid || 'guest'}`,
      text: commentText.trim(),
    });

    setCommentText('');
    toast.success('Comment posted!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Sheet Content */}
      <div className="relative w-full max-w-lg h-[65vh] max-h-[560px] glass-card border-t sm:border border-nexus-primary/30 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col justify-between animate-slide-up bg-nexus-surface text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold tracking-wide">
              {t('reels.commentsTitle')}
            </h3>
            <span className="text-xs text-nexus-muted font-mono">
              ({comments.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-xl hover:bg-white/10 text-nexus-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar
                src={comment.userAvatar}
                name={comment.userName}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-nexus-text">
                    {comment.userName}
                  </span>
                  <span className="text-[10px] text-nexus-dim font-mono">
                    {formatCommentTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-nexus-muted mt-0.5 leading-relaxed break-words">
                  {comment.text}
                </p>
              </div>

              <button
                type="button"
                className="p-1 text-nexus-dim hover:text-rose-400 transition-colors flex flex-col items-center gap-0.5"
              >
                <Heart size={13} />
                {comment.likes > 0 && (
                  <span className="text-[9px] font-mono">{comment.likes}</span>
                )}
              </button>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-12 text-nexus-muted space-y-2">
              <MessageSquare size={32} className="mx-auto text-nexus-dim" />
              <p className="text-xs">No comments yet. Start the conversation!</p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3.5 border-t border-white/10 glass-dark rounded-b-3xl flex items-center gap-2"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t('reels.addComment')}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-nexus-card border border-nexus-border/80 focus:border-nexus-primary text-xs outline-none text-white placeholder:text-nexus-dim"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            aria-label={t('reels.post')}
            className="p-2.5 rounded-2xl bg-nexus-gradient hover:opacity-95 text-white disabled:opacity-40 transition-all shadow-nexus-sm"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
