// src/components/ui/NexusWatermark.jsx
// Smart digital watermark and official branding engine for NEXUS media & reels

import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';

export default function NexusWatermark({ creatorHandle, position = 'bottom-start' }) {
  const { t } = useTranslation();

  const positionClasses = {
    'bottom-start': 'bottom-3 start-3',
    'bottom-end': 'bottom-3 end-3',
    'top-start': 'top-3 start-3',
    'top-end': 'top-3 end-3',
  };

  return (
    <div
      className={`absolute ${
        positionClasses[position] || 'bottom-3 start-3'
      } z-30 pointer-events-none select-none flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-nexus-sm animate-pulse-glow`}
    >
      {/* NEXUS Logo Mark */}
      <div className="w-4 h-4 rounded-md bg-nexus-gradient flex items-center justify-center text-[9px] font-black text-white">
        NX
      </div>

      {/* Brand & Creator Stamp */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-white/90">
        <span className="text-nexus-cyan">{creatorHandle || '@NEXUS'}</span>
        <span className="text-white/40">•</span>
        <span className="text-white/80">{t('watermark.brandTagline')}</span>
        <ShieldCheck size={12} className="text-nexus-secondary ms-0.5" />
      </div>
    </div>
  );
}
