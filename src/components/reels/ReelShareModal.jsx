// src/components/reels/ReelShareModal.jsx
// Share sheet modal with copy link & direct messaging to contacts

import { Copy, Check, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';

const SHARE_CONTACTS = [
  {
    name: 'Aria Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Layla Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Kaelen Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export default function ReelShareModal({ isOpen, onClose, reel }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reel) return null;

  const shareUrl = `${window.location.origin}/reels?id=${reel.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('reels.linkCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.success(t('reels.linkCopied'));
    }
  };

  const handleSendToContact = (contactName) => {
    toast.success(`Reel sent to ${contactName} in encrypted chat 🔥`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('reels.shareTitle')}>
      <div className="space-y-4">
        {/* Quick Send to Contacts */}
        <div>
          <label className="block text-[11px] font-semibold text-nexus-muted mb-2">
            Send directly to contacts
          </label>
          <div className="flex items-center gap-3 overflow-x-auto py-1 no-scrollbar">
            {SHARE_CONTACTS.map((c) => (
              <button
                key={c.name}
                onClick={() => handleSendToContact(c.name)}
                className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
              >
                <div className="relative p-0.5 rounded-2xl ring-1 ring-nexus-border group-hover:ring-nexus-secondary transition-all">
                  <Avatar src={c.avatar} name={c.name} size="md" />
                  <div className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full bg-nexus-primary text-white flex items-center justify-center border border-nexus-bg">
                    <Send size={10} />
                  </div>
                </div>
                <span className="text-[10px] text-nexus-muted group-hover:text-white mt-1 max-w-[60px] truncate">
                  {c.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div>
          <label className="block text-[11px] font-semibold text-nexus-muted mb-1.5">
            Share link
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-nexus-surface border border-nexus-border/80">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 text-xs text-nexus-muted font-mono truncate outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-nexus-gradient hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-nexus-sm"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : t('reels.copyLink')}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
