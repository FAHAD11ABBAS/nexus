// src/components/explore/CosmicHubModal.jsx
// Deep-Future Cosmic, Bio-Eco & Temporal Hubs — Bio-Eco, Chrono-Nexus, Mystic & Quantum Anomalies + What-If Simulator

import { useState } from 'react';
import { X, ThumbsUp, Search, ChevronRight, Sparkles, Send } from 'lucide-react';
import cosmicHubService from '@/services/cosmicHubService';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import toast from 'react-hot-toast';

const COLOR_MAP = {
  emerald: {
    tab: 'bg-emerald-600 text-white',
    inactive: 'text-slate-400 hover:text-emerald-300',
    border: 'border-emerald-500/40',
    badge: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.2)]',
  },
  violet: {
    tab: 'bg-violet-600 text-white',
    inactive: 'text-slate-400 hover:text-violet-300',
    border: 'border-violet-500/40',
    badge: 'bg-violet-950/50 text-violet-300 border-violet-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
  },
  amber: {
    tab: 'bg-amber-600 text-white',
    inactive: 'text-slate-400 hover:text-amber-300',
    border: 'border-amber-500/40',
    badge: 'bg-amber-950/50 text-amber-300 border-amber-500/30',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]',
  },
};

export default function CosmicHubModal({ isOpen, onClose }) {
  const [activeHub, setActiveHub] = useState('bio-eco');
  const [activeMode, setActiveMode] = useState('entries'); // entries | simulator
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState(cosmicHubService.getHubEntries('bio-eco'));

  // What-If Simulator State
  const [simulations, setSimulations] = useState(cosmicHubService.getSimulations());
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const hubs = cosmicHubService.getHubs();

  if (!isOpen) return null;

  const currentHub = hubs.find((h) => h.id === activeHub);
  const colors = COLOR_MAP[currentHub?.color] || COLOR_MAP.emerald;

  const handleHubChange = (id) => {
    setActiveHub(id);
    setQuery('');
    setEntries(cosmicHubService.getHubEntries(id));
  };

  const handleUpvote = (hubId, entryId) => {
    cosmicHubService.upvoteEntry(hubId, entryId);
    setEntries(cosmicHubService.getHubEntries(hubId));
    toast.success('Insight upvoted! ✨');
  };

  const handleRunSimulation = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const res = cosmicHubService.runWhatIfSimulation(customPrompt);
      setSimulations([res, ...simulations]);
      setCustomPrompt('');
      setIsSimulating(false);
      toast.success('Quantum What-If Timeline Rendered 🌀');
    }, 800);
  };

  const filteredEntries = query.trim()
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.body.toLowerCase().includes(query.toLowerCase())
      )
    : entries;

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900/97 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white">🌌 Cosmic Intelligence Hubs</h2>
            <p className="text-xs text-slate-400">Deep-future knowledge — 200+ years ahead of the timeline</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* View Switcher: Archives vs What-If Simulator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => setActiveMode('entries')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMode === 'entries' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📚 Deep Archives
            </button>
            <button
              onClick={() => setActiveMode('simulator')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'simulator' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles size={13} /> What-If Simulator
            </button>
          </div>
        </div>

        {activeMode === 'entries' ? (
          <>
            {/* Hub Tabs */}
            <div className="flex flex-col sm:flex-row gap-2">
              {hubs.map((hub) => {
                const hubColors = COLOR_MAP[hub.color] || COLOR_MAP.emerald;
                const isActive = activeHub === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => handleHubChange(hub.id)}
                    className={`flex-1 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all text-start flex items-center justify-between gap-2 ${
                      isActive ? `${hubColors.tab} shadow-lg` : `bg-slate-800/50 border border-slate-700/50 ${hubColors.inactive}`
                    }`}
                  >
                    <span>{hub.label}</span>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </div>

            {/* Hub Description */}
            <div className={`p-3 rounded-2xl bg-slate-800/40 border ${colors.border} text-xs text-slate-300`}>
              {currentHub?.description}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute start-3 top-3 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search entries..."
                className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            {/* Entry Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-3xl bg-slate-800/40 border ${colors.border} hover:${colors.glow} transition-all space-y-3`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {entry.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono ${colors.badge}`}>
                        #{tag}
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-500 ms-auto">{entry.time}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{entry.imageEmoji}</span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white leading-snug">{entry.title}</h3>
                      <p className="text-xs text-slate-400 italic">{entry.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{entry.body}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-semibold">{entry.source}</span>
                      {entry.verified && <VerifiedBadge type={entry.verificationType} size="sm" />}
                    </div>
                    <button
                      onClick={() => handleUpvote(activeHub, entry.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold transition-all"
                    >
                      <ThumbsUp size={13} className="text-slate-400" />
                      <span>{entry.upvotes.toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* What-If Historical Simulation Engine UI */
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            <form onSubmit={handleRunSimulation} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. What if clean nuclear fusion was perfected in 1950?"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={isSimulating}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/30 disabled:opacity-50"
              >
                <Send size={14} /> Simulate
              </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
              {simulations.map((sim) => (
                <div key={sim.id} className="p-4 rounded-3xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                      Timeline {sim.timelineBranch}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Tech Growth {sim.techMultiplier}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{sim.scenario}</h3>
                  <p className="text-xs text-purple-200/90 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-purple-500/20">
                    {sim.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
