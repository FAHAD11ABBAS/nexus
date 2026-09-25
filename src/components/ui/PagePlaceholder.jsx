// src/components/ui/PagePlaceholder.jsx
// Shared futuristic "coming soon" card used by all placeholder pages

import { useTranslation } from 'react-i18next';
import { Rocket } from 'lucide-react';

/**
 * @param {Object}   props
 * @param {React.ElementType} props.icon         - Lucide icon component
 * @param {string}   props.title                 - Page title (translated)
 * @param {string}   props.subtitle              - Page subtitle (translated)
 * @param {string}   props.accentColor           - Tailwind gradient classes e.g. "from-violet-600 to-purple-500"
 * @param {string}   props.glowColor             - CSS rgba string for glow shadow
 * @param {Array}    props.stats                 - [{icon, label, value}]
 */
export default function PagePlaceholder({
  icon: Icon,
  title,
  subtitle,
  accentColor = 'from-violet-600 to-purple-500',
  glowColor   = 'rgba(124,58,237,0.4)',
  stats       = [],
}) {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-full flex flex-col items-center justify-center px-6 py-12 page-enter">

      {/* ── Page hero card ── */}
      <div
        className="relative w-full max-w-sm glass-card p-8 flex flex-col items-center text-center"
        style={{ boxShadow: `0 0 60px ${glowColor}20, 0 8px 32px rgba(0,0,0,0.5)` }}
      >
        {/* Top accent line */}
        <div className={`absolute top-0 inset-x-12 h-0.5 rounded-full bg-gradient-to-r ${accentColor}`} />

        {/* Icon orb */}
        <div className="relative mb-6">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-150"
            style={{ background: `${glowColor}33` }}
          />
          {/* Icon container */}
          <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-xl`}>
            <Icon size={36} strokeWidth={1.5} className="text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-nexus-text mb-2 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-nexus-muted leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="flex gap-6 mb-8 w-full justify-center">
            {stats.map(({ icon: StatIcon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <StatIcon size={18} className="text-nexus-dim" />
                </div>
                <span className="text-lg font-bold text-nexus-text">{value}</span>
                <span className="text-[11px] text-nexus-dim uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-nexus-border mb-6" />

        {/* Coming soon badge */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8">
          <Rocket size={16} className="text-nexus-secondary flex-shrink-0 animate-float" />
          <div className="text-start">
            <p className="text-xs font-semibold text-nexus-text">{t('common.comingSoon')}</p>
            <p className="text-[11px] text-nexus-dim leading-snug">{t('common.underConstruction')}</p>
          </div>
        </div>

        {/* Bottom accent corner dots */}
        <div className="absolute bottom-3 end-3 flex gap-1">
          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentColor} opacity-60`} />
          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentColor} opacity-40`} />
          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentColor} opacity-20`} />
        </div>
      </div>

      {/* ── Decorative grid pattern ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
