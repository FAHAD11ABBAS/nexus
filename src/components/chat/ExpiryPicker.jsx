// src/components/chat/ExpiryPicker.jsx
// Expiration modal/sheet allowing users to choose self-destruct durations

import { useTranslation } from 'react-i18next';
import { Shield, Clock, Flame, Calendar, Check } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export const EXPIRY_OPTIONS = [
  {
    seconds: null,
    labelKey: 'chat.keepForever',
    icon: Shield,
    color: 'text-nexus-cyan',
    bgColor: 'bg-nexus-cyan/10 border-nexus-cyan/30',
    desc: 'Messages will not auto-delete',
  },
  {
    seconds: 3600, // 1 hour
    labelKey: 'chat.expire1h',
    icon: Clock,
    color: 'text-nexus-secondary',
    bgColor: 'bg-nexus-secondary/10 border-nexus-secondary/30',
    desc: 'Evaporates 60 minutes after being sent',
  },
  {
    seconds: 86400, // 24 hours
    labelKey: 'chat.expire24h',
    icon: Flame,
    color: 'text-nexus-accent',
    bgColor: 'bg-nexus-accent/10 border-nexus-accent/30',
    badge: 'Recommended',
    desc: 'Self-destructs after 24 hours client-side',
  },
  {
    seconds: 604800, // 7 days
    labelKey: 'chat.expire7d',
    icon: Calendar,
    color: 'text-nexus-gold',
    bgColor: 'bg-nexus-gold/10 border-nexus-gold/30',
    desc: 'Cleaned up automatically after 7 days',
  },
];

export default function ExpiryPicker({ isOpen, onClose, selectedSeconds, onSelect }) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('chat.expirySelectTitle')}>
      <div className="space-y-4">
        <p className="text-xs text-nexus-muted">
          {t('chat.expirySelectDesc')}
        </p>

        <div className="space-y-2.5">
          {EXPIRY_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedSeconds === opt.seconds;

            return (
              <button
                key={String(opt.seconds)}
                type="button"
                onClick={() => {
                  onSelect(opt.seconds);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 text-start group ${
                  isSelected
                    ? 'bg-nexus-primary/25 border-nexus-secondary shadow-nexus-sm'
                    : 'bg-nexus-surface/60 border-nexus-border/60 hover:bg-nexus-surface hover:border-nexus-primary/40'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${opt.bgColor} ${opt.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-nexus-secondary transition-colors">
                        {t(opt.labelKey)}
                      </span>
                      {opt.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-nexus-accent/20 text-nexus-accent font-semibold border border-nexus-accent/30">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-nexus-muted mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-nexus-secondary flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-nexus-border group-hover:border-nexus-muted" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
