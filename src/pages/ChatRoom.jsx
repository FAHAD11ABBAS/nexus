// src/pages/ChatRoom.jsx
// Interactive chat room with real-time messages, self-destruct picker, calls & media

import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Phone,
  Video,
  Flame,
  Eye,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getConversationById } from '@/services/chatService';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/ui/Avatar';
import MessageBubble from '@/components/chat/MessageBubble';
import ExpiryPicker, { EXPIRY_OPTIONS } from '@/components/chat/ExpiryPicker';
import NexusAdvancedHub from '@/components/chat/NexusAdvancedHub';
import NexusChatBar from '@/components/chat/NexusChatBar';

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const conversation = getConversationById(id);
  const { messages, sendMessage, deleteMessage } = useMessages(id);

  const [text, setText] = useState('');
  const [expirySeconds, setExpirySeconds] = useState(86400); // 24 hours default
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [showHubModal, setShowHubModal] = useState(false);
  const [customStyle, setCustomStyle] = useState({});
  const [oneTimeView, setOneTimeView] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    const myUid = currentUser?.uid || 'user_me';
    await sendMessage({
      senderId: myUid,
      text: text.trim(),
      durationSec: expirySeconds,
    });

    setText('');
    scrollToBottom();
  };

  // Sample media sender for instant testing
  const handleSendSampleImage = async () => {
    const myUid = currentUser?.uid || 'user_me';
    const sampleImages = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    ];
    const randomImg = sampleImages[Math.floor(Math.random() * sampleImages.length)];

    await sendMessage({
      senderId: myUid,
      text: oneTimeView ? '🔒 Encrypted one-time view photo' : '📷 Shared visual asset',
      mediaUrl: randomImg,
      mediaType: 'image',
      durationSec: expirySeconds,
      oneTimeView,
    });

    toast.success(oneTimeView ? 'One-time view photo sent 🔥' : 'Media uploaded');
    scrollToBottom();
  };

  // Handle rich attachment dispatch from NexusAdvancedHub
  const handleSendAttachment = async (type) => {
    const myUid = currentUser?.uid || 'user_me';
    let attachmentText = '';
    let mediaUrl = null;

    switch (type) {
      case 'folder':
        attachmentText = '📁 Shared document: NEXUS_quantum_specs.pdf (2.4 MB)';
        break;
      case 'location':
        attachmentText = '📍 Live Location: Cyber District Node #7 (35.6762° N, 139.6503° E)';
        break;
      case 'voice':
        attachmentText = '🎙️ Voice Note (0:15) — Encrypted Audio Stream';
        break;
      case 'media':
        attachmentText = '🖼️ Shared Holographic GIF';
        mediaUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
        break;
      case 'emoji':
        attachmentText = '✨ 🔥 🚀 ⚡ 😊 Cyber Sticker Set';
        break;
      case 'social_apps':
        attachmentText = '🌐 Shared NEXUS Decentralized Web App Link';
        break;
      default:
        attachmentText = '📎 Attachment';
    }

    await sendMessage({
      senderId: myUid,
      text: attachmentText,
      mediaUrl,
      mediaType: mediaUrl ? 'image' : 'text',
      durationSec: expirySeconds,
    });

    toast.success(`${type.toUpperCase()} attachment shared!`);
    scrollToBottom();
  };

  const currentExpiryObj =
    EXPIRY_OPTIONS.find((o) => o.seconds === expirySeconds) || EXPIRY_OPTIONS[2];

  return (
    <div
      className="flex flex-col h-[calc(100dvh-var(--topbar-h)-var(--bottomnav-h))] max-w-3xl mx-auto transition-all duration-300 rounded-3xl"
      style={customStyle.bg ? { background: customStyle.bg } : {}}
    >
      {/* Chat Room Header */}
      <div className="flex items-center justify-between px-4 py-2.5 glass-card border-b border-white/10 mx-2 mt-2 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/chat')}
            aria-label="Back"
            className="p-1.5 rounded-xl hover:bg-white/10 text-nexus-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <Avatar
            src={conversation.participant.avatar}
            name={conversation.participant.name}
            size="md"
            isOnline={conversation.participant.online}
          />

          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>{conversation.participant.name}</span>
            </h2>
            <span className="text-[10px] text-nexus-cyan font-mono flex items-center gap-1">
              {conversation.participant.online ? t('chat.online') : t('chat.offline')}
            </span>
          </div>
        </div>

        {/* Action Call & Hub Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowHubModal(true)}
            title="NEXUS Control & Share Hub"
            className="p-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-indigo-300 hover:text-white transition-all shadow-nexus-sm"
          >
            <Sparkles size={17} className="animate-pulse" />
          </button>
          <button
            onClick={() => navigate(`/call/${id}?type=voice`)}
            title={t('chat.startCall')}
            className="p-2.5 rounded-xl bg-nexus-surface/80 hover:bg-nexus-surface border border-nexus-border/60 hover:border-nexus-primary/50 text-nexus-text hover:text-nexus-secondary transition-all"
          >
            <Phone size={17} />
          </button>
          <button
            onClick={() => navigate(`/call/${id}?type=video`)}
            title={t('chat.startVideo')}
            className="p-2.5 rounded-xl bg-nexus-primary/20 hover:bg-nexus-primary/30 border border-nexus-primary/40 text-nexus-secondary hover:text-white transition-all shadow-nexus-sm"
          >
            <Video size={17} />
          </button>
        </div>
      </div>

      {/* Expiry Mode Banner Pill */}
      <div className="px-4 py-1.5 flex items-center justify-between mx-2 mt-1 rounded-xl bg-nexus-surface/50 border border-nexus-border/40 text-[11px]">
        <button
          onClick={() => setShowExpiryModal(true)}
          className="flex items-center gap-1.5 text-nexus-accent hover:text-white font-semibold transition-colors"
        >
          <Flame size={14} className="animate-pulse" />
          <span>{t('chat.selfDestructActive')}: {t(currentExpiryObj.labelKey)}</span>
          <span className="text-nexus-dim text-[10px]">▾ (Change)</span>
        </button>

        <label className="flex items-center gap-1.5 cursor-pointer text-nexus-muted hover:text-white text-[10px] select-none">
          <input
            type="checkbox"
            checked={oneTimeView}
            onChange={(e) => setOneTimeView(e.target.checked)}
            className="rounded border-nexus-border text-nexus-accent focus:ring-0 bg-nexus-surface"
          />
          <Eye size={12} className={oneTimeView ? 'text-nexus-accent' : ''} />
          <span>1-View Media</span>
        </label>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === (currentUser?.uid || 'user_me')}
            onDelete={deleteMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar using NexusChatBar */}
      <div className="mx-2 mb-2">
        <NexusChatBar
          onSendMessage={async (msgText) => {
            const myUid = currentUser?.uid || 'user_me';
            await sendMessage({
              senderId: myUid,
              text: msgText,
              durationSec: expirySeconds,
            });
            scrollToBottom();
          }}
          onSendAttachment={(type) => {
            if (type === 'camera') {
              handleSendSampleImage();
            } else {
              handleSendAttachment(type);
            }
          }}
          onOpenHub={() => setShowHubModal(true)}
        />
      </div>

      {/* Expiry Selector Modal */}
      <ExpiryPicker
        isOpen={showExpiryModal}
        onClose={() => setShowExpiryModal(false)}
        selectedSeconds={expirySeconds}
        onSelect={(secs) => {
          setExpirySeconds(secs);
          toast.success('Self-destruct duration updated');
        }}
      />

      {/* Advanced Control & Share Hub Modal */}
      <NexusAdvancedHub
        isOpen={showHubModal}
        onClose={() => setShowHubModal(false)}
        onUpdateTheme={(theme) => setCustomStyle(theme)}
        onSendAttachment={handleSendAttachment}
      />
    </div>
  );
}

