// src/components/profile/UserDiscoveryModal.jsx
// User Discovery & Connection Modal (Search by Username, Phone Number, or Direct Link)

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  UserPlus,
  Check,
  Phone,
  AtSign,
  Link,
  Copy,
  Sparkles,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import userService from '@/services/userService';

export default function UserDiscoveryModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [followingList, setFollowingList] = useState(userService.getFollowingList());

  const searchResults = userService.searchUsers(query);

  const handleToggleFollow = (userId) => {
    const isNowFollowing = userService.toggleFollow(userId);
    setFollowingList(userService.getFollowingList());
    toast.success(isNowFollowing ? 'Followed creator ✨' : 'Unfollowed');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nexus.app/u/cybernaut');
    toast.success('Direct profile link copied to clipboard!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('discovery.title')} maxWidth="max-w-lg">
      <div className="space-y-4">
        {/* Search Bar Input */}
        <div className="relative">
          <Search size={18} className="absolute start-3.5 top-3 text-nexus-dim" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('discovery.searchPlaceholder')}
            className="w-full ps-10 pe-4 py-2.5 rounded-2xl bg-nexus-surface/90 border border-nexus-border/80 focus:border-nexus-primary text-xs text-white placeholder-nexus-dim outline-none transition-all"
          />
        </div>

        {/* Quick Connection Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2.5 rounded-2xl glass-card border border-nexus-border/60 hover:border-nexus-secondary text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
          >
            <Link size={14} className="text-nexus-cyan" />
            <span>{t('discovery.copyInviteLink')}</span>
          </button>
          <button
            onClick={() => {
              toast.success('Generated Web3 Encrypted Identity QR');
            }}
            className="p-2.5 rounded-2xl glass-card border border-nexus-border/60 hover:border-nexus-primary text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
          >
            <QrCode size={14} className="text-nexus-secondary" />
            <span>{t('profile.qrCode')}</span>
          </button>
        </div>

        {/* Discovery Search Results & Recommended Creators */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-nexus-dim uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-nexus-secondary" />
              <span>{t('discovery.recommendedCreators')}</span>
            </span>
            <span className="text-[10px] text-nexus-cyan font-mono">
              {searchResults.length} {t('discovery.userFound')}
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
            {searchResults.map((user) => {
              const isFollowing = followingList.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="p-3 rounded-2xl glass-card border border-nexus-border/60 flex items-center justify-between gap-3 hover:border-nexus-border transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar src={user.avatar} name={user.name} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {user.name}
                        </span>
                        {user.verified && (
                          <ShieldCheck size={13} className="text-nexus-cyan" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-nexus-muted truncate">
                        <span>@{user.username}</span>
                        <span>•</span>
                        <span className="text-nexus-dim font-mono">{user.phone}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleFollow(user.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      isFollowing
                        ? 'bg-nexus-surface border border-nexus-border text-nexus-muted hover:text-white'
                        : 'bg-nexus-gradient text-white shadow-nexus-sm hover:scale-105'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check size={13} />
                        <span>{t('discovery.following')}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={13} />
                        <span>{t('discovery.follow')}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}

            {searchResults.length === 0 && (
              <div className="py-8 text-center text-nexus-muted text-xs">
                {t('discovery.noResults')}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
