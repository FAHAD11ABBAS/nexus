// src/components/ui/Avatar.jsx
// Futuristic neon avatar with online indicator and initials fallback

import VerifiedBadge from './VerifiedBadge';

export default function Avatar({
  src,
  name = 'User',
  size = 'md',
  isOnline = false,
  isVerified = false,
  verificationType = 'creator',
  className = '',
  onClick,
}) {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const dotSizeMap = {
    sm: 'w-2.5 h-2.5 border',
    md: 'w-3 h-3 border-2',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2',
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const ringStyle = isVerified
    ? 'ring-2 ring-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]'
    : 'ring-1 ring-nexus-border/60';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-2xl overflow-hidden ${ringStyle} bg-gradient-to-br from-nexus-card to-nexus-surface flex items-center justify-center font-bold text-nexus-text shadow-sm transition-transform duration-200 hover:scale-[1.02]`}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="text-gradient font-bold">{initials}</span>
        )}
      </div>

      {/* Online indicator dot with neon glow */}
      {isOnline && (
        <span
          className={`absolute -bottom-0.5 -end-0.5 ${dotSizeMap[size] || dotSizeMap.md} rounded-full bg-emerald-400 border-nexus-bg shadow-[0_0_8px_rgba(52,211,153,0.8)]`}
          title="Online"
        />
      )}

      {/* Neon Green Verification Badge indicator if not online or alongside */}
      {isVerified && !isOnline && (
        <span className="absolute -top-1 -end-1 bg-nexus-bg rounded-full p-0.5 shadow-md">
          <VerifiedBadge type={verificationType} size="sm" />
        </span>
      )}
    </div>
  );
}
