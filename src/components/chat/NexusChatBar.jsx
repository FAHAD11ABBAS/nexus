// src/components/chat/NexusChatBar.jsx
// Interactive Chat Bar with Attachment Popover Menu, Voice Note, Camera & i18n support

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  FolderDown,
  MapPin,
  ImageIcon,
  Share2,
  Camera,
  Mic,
  Send,
  Sparkles,
} from 'lucide-react';

export default function NexusChatBar({
  onSendMessage,
  onSendAttachment,
  onOpenHub,
}) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="relative flex items-center gap-2 p-2.5 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 w-full rounded-b-3xl">
      {/* Attachment Popover Menu (Folders, Location, GIFs, Social Apps) */}
      {showMenu && (
        <div className="absolute bottom-16 start-3 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 z-50 w-60 animate-slide-up">
          <button
            onClick={() => {
              onSendAttachment('folder');
              setShowMenu(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-indigo-600/30 rounded-xl transition-all text-start"
          >
            <FolderDown size={16} className="text-indigo-400" />
            <span>Folder / PDF Document</span>
          </button>

          <button
            onClick={() => {
              onSendAttachment('location');
              setShowMenu(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-indigo-600/30 rounded-xl transition-all text-start"
          >
            <MapPin size={16} className="text-emerald-400" />
            <span>Live GPS Location</span>
          </button>

          <button
            onClick={() => {
              onSendAttachment('media');
              setShowMenu(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-indigo-600/30 rounded-xl transition-all text-start"
          >
            <ImageIcon size={16} className="text-amber-400" />
            <span>GIFs & Media Assets</span>
          </button>

          <button
            onClick={() => {
              onSendAttachment('social_apps');
              setShowMenu(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-indigo-600/30 rounded-xl transition-all text-start"
          >
            <Share2 size={16} className="text-cyan-400" />
            <span>Cross-App Share</span>
          </button>

          {onOpenHub && (
            <button
              onClick={() => {
                onOpenHub();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-indigo-300 bg-indigo-600/20 hover:bg-indigo-600/40 rounded-xl transition-all border border-indigo-500/40 text-start mt-1"
            >
              <Sparkles size={16} className="text-indigo-400" />
              <span>Full Control & Share Hub</span>
            </button>
          )}
        </div>
      )}

      {/* Attachment Plus Button (+) */}
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-full transition-all flex-shrink-0"
        title="More Attachments"
      >
        <Plus size={20} className={showMenu ? 'rotate-45 transition-transform' : ''} />
      </button>

      {/* Main Input Form */}
      <form onSubmit={handleSend} className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('chat.typePlaceholder')}
          className="flex-1 bg-slate-950/70 border border-slate-700/60 rounded-full px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
        />

        {/* Direct Camera / Image Button */}
        <button
          type="button"
          onClick={() => onSendAttachment('camera')}
          className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 rounded-full transition-all flex-shrink-0"
          title="Send Photo"
        >
          <Camera size={18} />
        </button>

        {/* Direct Voice Note / Audio Fingerprint Button */}
        <button
          type="button"
          onClick={() => onSendAttachment('voice')}
          className="p-2.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 rounded-full transition-all shadow-md flex-shrink-0"
          title="Voice Note"
        >
          <Mic size={18} />
        </button>

        {/* Send Button */}
        {text.trim() && (
          <button
            type="submit"
            aria-label="Send"
            className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-all shadow-md flex-shrink-0 animate-scale-in"
          >
            <Send size={16} />
          </button>
        )}
      </form>
    </div>
  );
}
