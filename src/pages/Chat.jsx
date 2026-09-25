// src/pages/Chat.jsx
// Main conversations list with search, active nodes, Broadcast Channels & Super Communities

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Flame, MessageSquare, Radio, Bot, Check, Bell } from 'lucide-react';
import useConversations from '@/hooks/useConversations';
import Avatar from '@/components/ui/Avatar';
import communityService from '@/services/communityService';
import NexusAiAssistantModal from '@/components/ai/NexusAiAssistantModal';
import toast from 'react-hot-toast';

export default function Chat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { conversations } = useConversations();
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' | 'channels'
  const [search, setSearch] = useState('');
  const [channels, setChannels] = useState(communityService.getChannels());
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleToggleSub = (chId) => {
    const updated = communityService.toggleSubscribe(chId);
    setChannels(updated);
    toast.success('Subscription updated ✨');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      c.participant.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredChannels = channels.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-4 animate-fade-in pb-20">
      {/* Header with self-destruct security badge & AI Co-Pilot button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            {t('chat.title')}
          </h1>
          <p className="text-xs text-nexus-muted">
            {t('chat.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiOpen(true)}
            className="p-2 rounded-2xl bg-indigo-600/25 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-nexus-sm"
          >
            <Bot size={16} className="animate-pulse" />
            <span className="hidden sm:inline">AI Co-Pilot</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nexus-accent/15 border border-nexus-accent/30 text-nexus-accent text-[11px] font-semibold">
            <Flame size={13} />
            <span className="hidden sm:inline">E2E Evaporating</span>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs (Direct Chats vs Channels) */}
      <div className="flex items-center gap-2 p-1 glass-card rounded-2xl border border-nexus-border/60">
        <button
          onClick={() => setActiveTab('chats')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'chats'
              ? 'bg-nexus-gradient text-white shadow-nexus-sm'
              : 'text-nexus-muted hover:text-white'
          }`}
        >
          <MessageSquare size={14} />
          <span>Direct Encrypted Chats</span>
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'channels'
              ? 'bg-nexus-gradient text-white shadow-nexus-sm'
              : 'text-nexus-muted hover:text-white'
          }`}
        >
          <Radio size={14} />
          <span>Channels & Super Groups</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={activeTab === 'chats' ? t('chat.searchPlaceholder') : 'Search channels & super groups...'}
          className="w-full ps-10 pe-4 py-2.5 rounded-2xl bg-nexus-surface/80 border border-nexus-border/70 focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary text-nexus-text text-xs outline-none transition-all placeholder:text-nexus-dim"
        />
        <Search size={16} className="absolute start-3.5 text-nexus-muted pointer-events-none" />
      </div>

      {/* Direct Chats View */}
      {activeTab === 'chats' && (
        <>
          {/* Active Online Contacts Horizontal Bar */}
          <div className="flex items-center gap-4 overflow-x-auto py-2 no-scrollbar">
            {conversations.map((c) => (
              <div
                key={'story_' + c.id}
                onClick={() => navigate(`/chat/${c.id}`)}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
              >
                <div className="relative p-0.5 rounded-2xl ring-2 ring-nexus-primary/60 group-hover:ring-nexus-secondary transition-all">
                  <Avatar
                    src={c.participant.avatar}
                    name={c.participant.name}
                    size="md"
                    isOnline={c.participant.online}
                  />
                </div>
                <span className="text-[10px] text-nexus-muted group-hover:text-white mt-1 max-w-[64px] truncate text-center">
                  {c.participant.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Conversations List */}
          <div className="space-y-2">
            {filteredConversations.map((conv) => {
              const timeFormatted = conv.lastMessageTime
                ? new Date(conv.lastMessageTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '';

              return (
                <div
                  key={conv.id}
                  onClick={() => navigate(`/chat/${conv.id}`)}
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-nexus-border/60 hover:border-nexus-primary/50 hover:bg-nexus-surface/80 transition-all duration-200 cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <Avatar
                      src={conv.participant.avatar}
                      name={conv.participant.name}
                      size="md"
                      isOnline={conv.participant.online}
                    />
                    <div className="min-w-0 flex-1 pe-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-nexus-secondary transition-colors truncate">
                          {conv.participant.name}
                        </h3>
                        <span className="text-[10px] text-nexus-dim font-mono">
                          {timeFormatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-nexus-muted truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="badge text-[10px] px-1.5 py-0.2 text-white ms-2">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="text-center py-12 glass-card border border-nexus-border/60 rounded-3xl p-6">
                <MessageSquare size={36} className="mx-auto text-nexus-dim mb-2" />
                <p className="text-xs text-nexus-muted">No conversations found</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Broadcast Channels & Super Communities View */}
      {activeTab === 'channels' && (
        <div className="space-y-3">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-4 rounded-3xl glass-card border border-nexus-border/60 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar src={channel.avatar} name={channel.title} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                        {channel.title}
                      </h3>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-nexus-cyan/20 text-nexus-cyan uppercase">
                        {channel.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-nexus-muted font-mono truncate">
                      {channel.subscribersCount.toLocaleString()} Subscribers · {channel.owner}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSub(channel.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all flex-shrink-0 ${
                    channel.isSubscribed
                      ? 'bg-nexus-surface border border-nexus-border text-nexus-muted hover:text-white'
                      : 'bg-nexus-gradient text-white shadow-nexus-sm hover:scale-105'
                  }`}
                >
                  {channel.isSubscribed ? <Check size={13} /> : <Bell size={13} />}
                  <span>{channel.isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                </button>
              </div>

              <p className="text-xs text-nexus-text/90 leading-relaxed">
                {channel.description}
              </p>

              {/* Latest Post Stream */}
              {channel.posts && channel.posts.length > 0 && (
                <div className="p-3 rounded-2xl bg-nexus-surface/60 border border-nexus-border/40 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-nexus-dim font-mono mb-1">
                    <span>📢 Latest Post by {channel.posts[0].author}</span>
                    <span>{channel.posts[0].time}</span>
                  </div>
                  <p className="text-nexus-text text-xs">{channel.posts[0].text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* AI Co-Pilot Modal Launcher */}
      <NexusAiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        contextText="NEXUS Super App Quantum Communication"
      />
    </div>
  );
}

