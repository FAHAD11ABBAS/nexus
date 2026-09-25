// src/components/theme/ThemeCustomizerModal.jsx
// Neon Green & Glassmorphism Theme Customizer Modal

import { useState } from 'react';
import { Palette, Check, Sparkles, X, Layers } from 'lucide-react';
import themeService, { THEME_PRESETS } from '@/services/themeService';
import toast from 'react-hot-toast';

export default function ThemeCustomizerModal({ isOpen, onClose }) {
  const [currentTheme, setCurrentTheme] = useState(themeService.getTheme());

  if (!isOpen) return null;

  const handleSelectTheme = (presetId) => {
    const updated = themeService.setTheme(presetId);
    setCurrentTheme(updated);
    toast.success(`Theme switched to "${updated.name}" ✨`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-5 space-y-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Palette size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Glassmorphism & Neon Themes</h2>
              <p className="text-xs text-slate-400">Persistent theme customization via localStorage</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Theme List */}
        <div className="space-y-3">
          {THEME_PRESETS.map((preset) => {
            const isSelected = currentTheme.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectTheme(preset.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/80 border-emerald-500 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/50'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatch */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/20 shadow-md"
                    style={{ backgroundColor: preset.primary, boxShadow: preset.primaryGlow }}
                  >
                    <Sparkles size={14} className="text-slate-950" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{preset.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Glass Blur: {preset.blurAmount}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="p-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300/80 flex items-center gap-2">
          <Layers size={16} className="text-emerald-400 flex-shrink-0" />
          <span>NEXUS Neon Green checkmarks and borders update dynamically with theme selection.</span>
        </div>

      </div>
    </div>
  );
}
