// src/components/omniverse/NexusGuildsModal.jsx
// NEXUS Guilds — Discord/Telegram Alternative Community Channels & Voice Stage Modal

import { useState, useEffect } from 'react';
import { Users, Hash, Mic, Volume2, Pin, Send, X, Shield, Sparkles } from 'lucide-react';
import nexusGuildsService from '@/services/nexusGuildsService';
import toast from 'react-hot-toast';

export default function NexusGuildsModal({ isOpen, onClose }) {
  const [guilds, setGuilds] = useState(nexusGuildsService.getGuilds());
  const [selectedGuild, setSelectedGuild] = useState(guilds[0] || null);
  const [messageInput, setMessageInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = nexusGuildsService.getGuilds();
      setGuilds(updated);
      if (selectedGuild) {
        setSelectedGuild(nexusGuildsService.getGuildById(selectedGuild.id));
      }
    };
    window.addEventListener('nexus_guilds_updated', handleUpdate);
    return () => window.removeEventListener('nexus_guilds_updated', handleUpdate);
  }, [selectedGuild]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedGuild) return;

    const updated = nexusGuildsService.sendGuildMessage(selectedGuild.id, messageInput);
    setSelectedGuild(updated);
    setMessageInput('');
  };

  const handleToggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    toast.success(!isVoiceActive ? 'Joined P2P Voice Stage 🎙️' : 'Disconnected from Voice Stage');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Users size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Guilds & Voice Communities</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Decentralized Discord Alt
                </span>
              </div>
              <p className="text-xs text-slate-400">Real-time voice stages, study channels & developer guilds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Guild Layout */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          
          {/* Guilds Sidebar */}
          <div className="w-64 border-r border-slate-800 pe-3 space-y-2 overflow-y-auto custom-scrollbar flex-shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Guilds & Communities</h3>
            {guilds.map((g) => {
              const isSelected = selectedGuild?.id === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGuild(g)}
                  className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{g.iconEmoji}</span> {g.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{g.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono pt-1">
                    <span>👥 {g.membersCount.toLocaleString()}</span>
                    <span>🟢 {g.onlineCount} online</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Guild View */}
          {selectedGuild && (
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              
              {/* Guild Banner & Voice Stage Strip */}
              <div className="p-3.5 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{selectedGuild.iconEmoji}</span> {selectedGuild.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    {selectedGuild.activeVoiceChannel?.name}
                  </p>
                </div>

                <button
                  onClick={handleToggleVoice}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isVoiceActive
                      ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-900/40'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                  }`}
                >
                  <Mic size={14} /> {isVoiceActive ? 'Leave Stage' : 'Join Voice Stage'}
                </button>
              </div>

              {/* Active Voice Speakers Visualizer */}
              {selectedGuild.activeVoiceChannel && (
                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 overflow-x-auto no-scrollbar">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 flex-shrink-0">
                    <Volume2 size={14} className="animate-pulse" /> Live Speakers:
                  </span>
                  {selectedGuild.activeVoiceChannel.speakers.map((sp) => (
                    <span key={sp} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-emerald-500/40 text-white text-[11px] font-bold flex items-center gap-1 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {sp}
                    </span>
                  ))}
                </div>
              )}

              {/* Pinned Messages */}
              {selectedGuild.pinnedMessages && (
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-amber-300 flex items-center gap-2">
                  <Pin size={14} className="flex-shrink-0 text-amber-400" />
                  <span className="truncate">{selectedGuild.pinnedMessages[0]}</span>
                </div>
              )}

              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 custom-scrollbar">
                {selectedGuild.messages.map((m) => (
                  <div key={m.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{m.author}</span>
                      <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-mono border border-indigo-500/30">
                        {m.role}
                      </span>
                      <span className="text-[10px] text-slate-500 ms-auto font-mono">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Message #${selectedGuild.name}...`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
                >
                  <Send size={14} /> Send
                </button>
              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
