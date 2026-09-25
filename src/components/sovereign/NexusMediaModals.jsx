// src/components/sovereign/NexusMediaModals.jsx
// NEXOS Immersive Entertainment & Media Empire — Live TV & Subtitled Movies Modal

import { useState } from 'react';
import { Tv, Film, Play, X, Volume2, VolumeX, Subtitles } from 'lucide-react';
import nexusMediaService from '@/services/nexusMediaService';
import toast from 'react-hot-toast';

export default function NexusMediaModals({ isOpen, onClose, initialTab = 'tv' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // tv | movies
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [selectedSub, setSelectedSub] = useState('Arabic 🇮🇶');

  if (!isOpen) return null;

  const tvChannels = nexusMediaService.getTVChannels();
  const movies = nexusMediaService.getMovies();

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Tv size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXOS TV & Media Empire</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Global Live Streams
                </span>
              </div>
              <p className="text-xs text-slate-400">Live global news feeds, tech broadcasts & translated cinema vault</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => { setActiveTab('tv'); setActiveMovie(null); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'tv' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv size={14} /> NEXOS Live TV Channels
          </button>

          <button
            onClick={() => { setActiveTab('movies'); setActiveChannel(null); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'movies' ? 'bg-rose-600 text-white font-extrabold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film size={14} /> Translated Cinema Vault
          </button>
        </div>

        {/* Player Stream Box */}
        {(activeChannel || activeMovie) && (
          <div className="rounded-3xl overflow-hidden border border-emerald-500/40 bg-black space-y-2 relative shadow-2xl">
            <video
              src={activeChannel ? activeChannel.videoUrl : activeMovie.videoUrl}
              controls
              autoPlay
              className="w-full max-h-64 object-cover"
            />
            <div className="p-3 bg-slate-900 flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                {activeChannel ? activeChannel.name : activeMovie.title}
              </span>

              {activeMovie && (
                <div className="flex items-center gap-2">
                  <Subtitles size={14} className="text-emerald-400" />
                  <select
                    value={selectedSub}
                    onChange={(e) => { setSelectedSub(e.target.value); toast.success(`Subtitles: ${e.target.value}`); }}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none"
                  >
                    {activeMovie.subtitles.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 1: Live TV */}
        {activeTab === 'tv' && (
          <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pe-1 custom-scrollbar">
            {tvChannels.map((ch) => (
              <div key={ch.id} className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 hover:border-emerald-500/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{ch.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-mono border border-rose-500/30 animate-pulse">
                    {ch.badge}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">{ch.country} · {ch.viewers} viewers</p>
                <button
                  onClick={() => { setActiveChannel(ch); setActiveMovie(null); }}
                  className="w-full py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20"
                >
                  <Play size={13} fill="currentColor" /> Watch Live Broadcast
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Translated Movies */}
        {activeTab === 'movies' && (
          <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
            {movies.map((m) => (
              <div key={m.id} className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{m.title}</h4>
                  <p className="text-slate-400 text-xs">{m.synopsis}</p>
                  <p className="text-[10px] text-emerald-400 font-mono pt-1">Subtitles: {m.subtitles.join(' · ')}</p>
                </div>
                <button
                  onClick={() => { setActiveMovie(m); setActiveChannel(null); }}
                  className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1 flex-shrink-0 shadow-md"
                >
                  <Play size={13} fill="currentColor" /> Stream Cinema
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
