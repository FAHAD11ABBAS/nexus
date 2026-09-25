// src/components/calls/IncomingCallOverlay.jsx
// Full-screen incoming call notification overlay with animated pulse ring

import { Phone, PhoneOff, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Avatar from '@/components/ui/Avatar';

export default function IncomingCallOverlay({
  caller,
  callType = 'video',
  onAccept,
  onDecline,
}) {
  const { t } = useTranslation();

  if (!caller) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-black/90 backdrop-blur-2xl animate-fade-in text-white">
      {/* Top Banner */}
      <div className="text-center pt-8">
        <span className="text-xs uppercase tracking-widest text-nexus-cyan font-mono px-3 py-1 rounded-full bg-nexus-cyan/15 border border-nexus-cyan/30">
          {callType === 'video' ? t('call.videoCall') : t('call.voiceCall')}
        </span>
        <h2 className="text-xl sm:text-2xl font-black mt-4 tracking-wide">
          {t('call.incomingCall')}
        </h2>
      </div>

      {/* Center Caller Profile with Pulsing Ring */}
      <div className="flex flex-col items-center my-auto">
        <div className="relative flex items-center justify-center">
          {/* Animated pulse rings */}
          <div className="absolute w-44 h-44 rounded-full border-2 border-nexus-secondary/30 animate-ping opacity-75" />
          <div className="absolute w-36 h-36 rounded-full border border-nexus-primary/50 animate-pulse" />

          <Avatar
            src={caller.avatar}
            name={caller.name}
            size="xl"
            isOnline={true}
            className="ring-4 ring-nexus-primary shadow-nexus-lg"
          />
        </div>

        <h3 className="text-xl font-bold mt-6">{caller.name}</h3>
        <p className="text-xs text-nexus-muted mt-1 font-mono">
          {caller.handle || '@nexus_node'}
        </p>
      </div>

      {/* Action Buttons: Accept & Decline */}
      <div className="flex items-center justify-center gap-10 pb-8 w-full max-w-sm">
        {/* Decline Button */}
        <button
          type="button"
          onClick={onDecline}
          aria-label="Decline Call"
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 rounded-full bg-rose-600 group-hover:bg-rose-700 flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.8)] transition-transform group-active:scale-95">
            <PhoneOff size={26} className="text-white" />
          </div>
          <span className="text-xs font-bold text-rose-400">
            {t('call.decline')}
          </span>
        </button>

        {/* Accept Button */}
        <button
          type="button"
          onClick={onAccept}
          aria-label="Accept Call"
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500 group-hover:bg-emerald-600 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.8)] transition-transform group-active:scale-95 animate-bounce">
            {callType === 'video' ? (
              <Video size={26} className="text-white" />
            ) : (
              <Phone size={26} className="text-white" />
            )}
          </div>
          <span className="text-xs font-bold text-emerald-400">
            {t('call.accept')}
          </span>
        </button>
      </div>
    </div>
  );
}
