// src/components/chat/MessageBubble.jsx
// Chat message bubble with self-destruct countdown timer and media preview

import { useState, useEffect } from 'react';
import { Flame, Check, CheckCheck, Trash2 } from 'lucide-react';
import MediaPreview from './MediaPreview';

// Helper to format remaining duration nicely
function formatRemaining(ms) {
  if (ms <= 0) return '0s';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function MessageBubble({
  message,
  isMine = false,
  onDelete,
}) {
  const [timeLeft, setTimeLeft] = useState(
    message.expiresAt ? Math.max(0, message.expiresAt - Date.now()) : null
  );
  const [showMediaModal, setShowMediaModal] = useState(false);

  useEffect(() => {
    if (!message.expiresAt) return;

    const interval = setInterval(() => {
      const remaining = message.expiresAt - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [message.expiresAt]);

  const hasExpired = message.expiresAt && timeLeft !== null && timeLeft <= 0;
  if (hasExpired) return null;

  const timeFormatted = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex flex-col my-2 group ${
        isMine ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`relative max-w-[82%] sm:max-w-[70%] rounded-2xl p-3.5 shadow-md transition-all duration-200 ${
          isMine
            ? 'bg-gradient-to-br from-nexus-primary via-purple-600 to-indigo-700 text-white rounded-ee-sm'
            : 'bg-nexus-card/90 border border-nexus-border/70 text-nexus-text rounded-es-sm backdrop-blur-md'
        }`}
      >
        {/* Media preview thumbnail */}
        {message.mediaUrl && (
          <div className="mb-2 relative rounded-xl overflow-hidden border border-white/10 group/img">
            {message.oneTimeView ? (
              <div
                onClick={() => setShowMediaModal(true)}
                className="relative w-48 h-36 bg-nexus-surface flex flex-col items-center justify-center p-3 cursor-pointer group-hover/img:bg-nexus-surface/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-nexus-accent/20 border border-nexus-accent/40 flex items-center justify-center text-nexus-accent mb-2 animate-pulse">
                  <Flame size={20} />
                </div>
                <span className="text-xs font-bold text-white text-center">
                  One-Time View Photo
                </span>
                <span className="text-[10px] text-nexus-muted mt-0.5">
                  Tap to reveal
                </span>
              </div>
            ) : (
              <img
                src={message.mediaUrl}
                alt="Shared Media"
                onClick={() => setShowMediaModal(true)}
                className="w-full max-h-52 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              />
            )}
          </div>
        )}

        {/* Message text */}
        {message.text && (
          <p className="text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.text}
          </p>
        )}

        {/* Footer info: time, self-destruct timer & seen status */}
        <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 text-[10px] opacity-80 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {/* Self destruct indicator */}
            {message.expiresAt && timeLeft !== null && (
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-mono text-[9px] font-semibold ${
                  timeLeft < 1000 * 60 * 5
                    ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40 animate-pulse'
                    : 'bg-nexus-accent/20 text-nexus-accent border border-nexus-accent/30'
                }`}
                title="Time before message evaporates"
              >
                <Flame size={10} />
                <span>{formatRemaining(timeLeft)}</span>
              </span>
            )}
            <span>{timeFormatted}</span>
          </div>

          <div className="flex items-center gap-1">
            {isMine && (
              <span>
                {message.seen ? (
                  <CheckCheck size={13} className="text-cyan-300" />
                ) : (
                  <Check size={13} className="opacity-70" />
                )}
              </span>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(message.id)}
                title="Delete message"
                className="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-100 transition-opacity ms-1"
              >
                <Trash2 size={11} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {message.mediaUrl && (
        <MediaPreview
          isOpen={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          mediaUrl={message.mediaUrl}
          oneTimeView={message.oneTimeView}
          onDestroy={() => onDelete && onDelete(message.id)}
        />
      )}
    </div>
  );
}
