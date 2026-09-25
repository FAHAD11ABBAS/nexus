// src/components/ui/VerifiedBadge.jsx
// Official NEXUS Neon Green Verification Badge for creators, scholars, healthcare providers & official nodes

import { CheckCircle2, ShieldCheck, Stethoscope, GraduationCap } from 'lucide-react';

export default function VerifiedBadge({
  type = 'creator', // 'creator' | 'doctor' | 'scholar' | 'official'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) {
  const iconSizeMap = {
    sm: 12,
    md: 15,
    lg: 18,
  };

  const badgeConfig = {
    creator: {
      icon: CheckCircle2,
      label: 'Verified Creator Node',
      style: 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]',
    },
    doctor: {
      icon: Stethoscope,
      label: 'Verified Healthcare Professional',
      style: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]',
    },
    scholar: {
      icon: GraduationCap,
      label: 'Verified Academic Scholar',
      style: 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]',
    },
    official: {
      icon: ShieldCheck,
      label: 'Official NEXUS Authority Node',
      style: 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]',
    },
  };

  const current = badgeConfig[type] || badgeConfig.creator;
  const IconComponent = current.icon;
  const iconSize = iconSizeMap[size] || iconSizeMap.md;

  return (
    <span
      className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${current.style} ${className}`}
      title={current.label}
    >
      <IconComponent size={iconSize} className="stroke-[2.5]" />
    </span>
  );
}
