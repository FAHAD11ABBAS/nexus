// src/components/explore/SpaceGateModal.jsx
// Global Space Gate & Deep Astronomy — NASA, SpaceX, ESA, JWST archives

import { useState } from 'react';
import { X, ThumbsUp, ExternalLink, Search, Telescope, Rocket, Star } from 'lucide-react';
import astronomyService from '@/services/astronomyService';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import toast from 'react-hot-toast';

export default function SpaceGateModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [missions, setMissions] = useState(astronomyService.getMissions('all'));

  if (!isOpen) return null;

  const categories = astronomyService.getCategories();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setMissions(astronomyService.getMissions(cat, query));
  };

  const handleSearch = (val) => {
    setQuery(val);
    setMissions(astronomyService.getMissions(activeCategory, val));
  };

  const handleUpvote = (id) => {
    astronomyService.upvoteMission(id);
    setMissions(astronomyService.getMissions(activeCategory, query));
    toast.success('Mission upvoted! 🚀');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900/98 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 shadow-[0_0_16px_rgba(99,102,241,0.4)]">
              <Telescope size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                🌌 NEXUS Space Gate
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900/60 border border-indigo-500/30 text-indigo-300">DEEP ASTRONOMY</span>
              </h2>
              <p className="text-xs text-slate-400">NASA · SpaceX · ESA · Hubble · JWST live archives</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute start-3 top-3 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search missions, agencies, discoveries..."
            className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mission Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pe-1 custom-scrollbar">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 hover:border-indigo-500/40 transition-all space-y-3 group"
            >
              {/* Agency header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{mission.agencyBadge}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-400">{mission.agency}</span>
                      <VerifiedBadge type={mission.verificationType} size="sm" />
                    </div>
                    <span className="text-[10px] text-slate-500">{mission.time}</span>
                  </div>
                </div>
                <span className="text-3xl">{mission.imageEmoji}</span>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white leading-snug">{mission.title}</h3>
                <p className="text-xs text-indigo-300 font-semibold">{mission.subtitle}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{mission.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(mission.stats).map(([key, val]) => (
                  <div key={key} className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/40 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">{key.replace('_', ' ')}</p>
                    <p className="text-[11px] font-bold text-white mt-0.5 font-mono leading-tight">{val}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                <button
                  onClick={() => handleUpvote(mission.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <ThumbsUp size={13} className="text-indigo-400" />
                  <span>{mission.upvotes.toLocaleString()}</span>
                </button>

                <a
                  href={mission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/20 text-xs font-semibold transition-all"
                >
                  <ExternalLink size={12} />
                  <span>Source</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
