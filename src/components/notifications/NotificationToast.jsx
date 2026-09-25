// src/components/notifications/NotificationToast.jsx
// Floating glassmorphism top banner for real-time push notifications

import { X, MessageSquare, PhoneCall, Heart, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/context/NotificationContext';
import Avatar from '@/components/ui/Avatar';

export default function NotificationToast() {
  const { activeToast, dismissToast } = useNotifications();
  const navigate = useNavigate();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'message':
        return <MessageSquare size={14} className="text-nexus-cyan" />;
      case 'call':
        return <PhoneCall size={14} className="text-emerald-400" />;
      case 'like':
        return <Heart size={14} className="text-rose-400" />;
      case 'system':
      default:
        return <ShieldAlert size={14} className="text-nexus-accent" />;
    }
  };

  const handleToastClick = () => {
    if (activeToast.actionUrl) {
      navigate(activeToast.actionUrl);
    }
    dismissToast();
  };

  return (
    <div className="fixed top-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-slide-down">
      <div
        onClick={handleToastClick}
        className="pointer-events-auto max-w-md w-full glass-card border border-nexus-primary/50 shadow-2xl p-3.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer hover:border-nexus-secondary transition-all transform hover:scale-[1.02]"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {activeToast.avatar ? (
            <Avatar src={activeToast.avatar} name={activeToast.title} size="md" />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-nexus-gradient flex items-center justify-center text-white flex-shrink-0">
              {getIcon()}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white truncate">
                {activeToast.title}
              </span>
              <span className="p-1 rounded-md bg-nexus-surface/80 border border-nexus-border/60">
                {getIcon()}
              </span>
              <span className="text-[9px] text-nexus-dim font-mono ms-auto">
                {activeToast.time}
              </span>
            </div>
            <p className="text-xs text-nexus-muted truncate mt-0.5">
              {activeToast.body}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissToast();
          }}
          className="p-1.5 rounded-lg text-nexus-dim hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
