// src/components/chat/MediaPreview.jsx
// Tap-to-reveal modal for encrypted & self-destructing media

import { useEffect, useState } from 'react';
import { X, Flame, Eye, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function MediaPreview({
  isOpen,
  onClose,
  mediaUrl,
  oneTimeView = false,
  onDestroy,
}) {
  const { t } = useTranslation();
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    if (!isOpen || !oneTimeView) return;

    setSecondsRemaining(10);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onDestroy) onDestroy();
          onClose();
          toast('🔥 Media evaporated after one-time viewing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, oneTimeView, onClose, onDestroy]);

  if (!isOpen || !mediaUrl) return null;

  const handleManualDestroy = () => {
    if (onDestroy) onDestroy();
    onClose();
    toast('Media destroyed immediately');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Top action bar */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          {oneTimeView ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold animate-pulse">
              <Flame size={14} />
              <span>Self-Destructing in {secondsRemaining}s</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-nexus-primary/20 text-nexus-secondary border border-nexus-primary/40 text-xs font-medium">
              <Eye size={14} />
              <span>Encrypted Media</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onDestroy && (
            <button
              onClick={handleManualDestroy}
              title="Destroy Now"
              className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Media container */}
      <div className="relative max-w-3xl max-h-[85vh] w-full rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
        <img
          src={mediaUrl}
          alt="Encrypted Preview"
          className="max-w-full max-h-[80vh] object-contain rounded-2xl select-none"
        />
      </div>
    </div>
  );
}
