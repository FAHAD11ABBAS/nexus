// src/components/ghost/GhostAnonymousModal.jsx
// Ghost NEXUS Anonymous Ecosystem — identity masking, anonymous posting, ephemeral ghost handle manager

import { useState } from 'react';
import { Ghost, RefreshCw, X, Shield, EyeOff, MessageSquare, Check } from 'lucide-react';
import ghostNexusService from '@/services/ghostNexusService';
import toast from 'react-hot-toast';

export default function GhostAnonymousModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState(ghostNexusService.getSettings());

  if (!isOpen) return null;

  const handleToggle = () => {
    const isNowActive = ghostNexusService.toggleGlobalAnonymous();
    setSettings(ghostNexusService.getSettings());
    toast.success(
      isNowActive
        ? `Ghost Mode ACTIVATED — Your identity is now: ${settings.ghostHandle} 👻`
        : 'Ghost Mode deactivated. Real identity restored.'
    );
  };

  const handleRegenerateHandle = () => {
    const newHandle = ghostNexusService.regenerateHandle();
    setSettings(ghostNexusService.getSettings());
    toast.success(`New ghost handle: ${newHandle}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/25 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              <Ghost size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Ghost NEXUS Anonymous Mode</h2>
              <p className="text-xs text-slate-400">Zero-trace identity masking for absolute freedom</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Active Ghost Identity Card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          settings.isGhostNexusActive
            ? 'bg-purple-950/50 border-purple-500/60 shadow-[0_0_24px_rgba(168,85,247,0.3)]'
            : 'bg-slate-800/40 border-slate-700/40'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`text-4xl ${settings.isGhostNexusActive ? 'animate-pulse' : 'opacity-40'}`}>👻</div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Ghost Identity</p>
                <p className={`text-base font-bold font-mono ${settings.isGhostNexusActive ? 'text-purple-300' : 'text-slate-500'}`}>
                  {settings.ghostHandle}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {settings.isGhostNexusActive ? 'Live — All messages sent as this ghost' : 'Inactive — Real identity shown'}
                </p>
              </div>
            </div>
            <button
              onClick={handleRegenerateHandle}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
              title="Generate new ghost handle"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            settings.isGhostNexusActive
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
        >
          <Ghost size={16} />
          {settings.isGhostNexusActive ? 'Deactivate Ghost Mode' : 'Activate Ghost NEXUS Mode'}
        </button>

        {/* Feature Explainers */}
        <div className="space-y-2">
          {[
            { icon: EyeOff, title: 'Identity Masking', desc: 'Username, phone & profile link hidden from all recipients.' },
            { icon: MessageSquare, title: 'Anonymous Comments', desc: 'Post on Reels & articles as Ghost identity — untraceable.' },
            { icon: Shield, title: 'Zero-Trace Commitment', desc: 'Ghost handle never stored on external servers — local only.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-3">
              <Icon size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">{title}</p>
                <p className="text-[11px] text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Anonymous Features Grid */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Anonymous Mode Coverage</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Chat Messages', active: settings.isGhostNexusActive },
              { label: 'Reel Comments', active: settings.isGhostNexusActive && settings.anonymousCommentsEnabled },
              { label: 'Community Posts', active: settings.isGhostNexusActive },
              { label: 'Broadcast Replies', active: settings.isGhostNexusActive },
              { label: 'Profile Link Hidden', active: settings.isGhostNexusActive },
              { label: 'Read Receipts Off', active: settings.isGhostNexusActive },
            ].map(({ label, active }) => (
              <div
                key={label}
                className={`p-2.5 rounded-xl border text-[11px] font-semibold flex items-center gap-2 ${
                  active
                    ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                    : 'bg-slate-800/40 border-slate-700/40 text-slate-500'
                }`}
              >
                <Check size={12} className={active ? 'text-purple-400' : 'text-slate-600'} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
