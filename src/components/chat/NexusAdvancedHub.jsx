// src/components/chat/NexusAdvancedHub.jsx
// Ultimate Control & Share Hub component for styling, customization, and media attachments

import { useState } from 'react';
import {
  Sparkles,
  FolderDown,
  MapPin,
  Mic,
  Image as ImageIcon,
  Smile,
  Share2,
  X,
  Palette,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function NexusAdvancedHub({
  isOpen,
  onClose,
  onUpdateTheme,
  onSendAttachment,
}) {
  // Customization States
  const [themeMode, setThemeMode] = useState('glass'); // 'dark', 'light', 'glass', 'cyberpunk'
  const [customBg, setCustomBg] = useState('linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)');
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [bubbleColor, setBubbleColor] = useState('bg-indigo-600');

  // Background presets
  const backgroundPresets = [
    { name: 'Deep Space', value: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' },
    { name: 'Neon Cyber', value: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #4f46e5 100%)' },
    { name: 'Midnight', value: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' },
    { name: 'Pure Dark', value: '#000000' },
  ];

  // Bubble colors
  const bubbleColors = [
    { name: 'Indigo', value: 'bg-indigo-600' },
    { name: 'Emerald', value: 'bg-emerald-600' },
    { name: 'Violet', value: 'bg-violet-600' },
    { name: 'Rose', value: 'bg-rose-600' },
    { name: 'Amber', value: 'bg-amber-600' },
  ];

  if (!isOpen) return null;

  const handleBgSelect = (bgValue) => {
    setCustomBg(bgValue);
    if (onUpdateTheme) {
      onUpdateTheme({ bg: bgValue, bubbleColor, fontSize });
    }
  };

  const handleBubbleSelect = (colorValue) => {
    setBubbleColor(colorValue);
    if (onUpdateTheme) {
      onUpdateTheme({ bg: customBg, bubbleColor: colorValue, fontSize });
    }
  };

  const handleFontSelect = (sizeValue) => {
    setFontSize(sizeValue);
    if (onUpdateTheme) {
      onUpdateTheme({ bg: customBg, bubbleColor, fontSize: sizeValue });
    }
  };

  const handleAttachment = (type) => {
    if (onSendAttachment) {
      onSendAttachment(type);
    } else {
      toast.success(`Dispatched ${type} attachment to room!`);
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="p-6 rounded-3xl text-slate-100 shadow-2xl max-w-xl w-full space-y-6 border border-slate-700/50 backdrop-blur-2xl relative"
        style={{ background: customBg }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 end-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-wider text-indigo-400 flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-400 animate-pulse" />
            <span>NEXUS Ultimate Control & Share Hub</span>
          </h2>
        </div>

        {/* SECTION 1: Theme, Colors, Fonts & Backgrounds */}
        <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette size={14} className="text-indigo-400" />
            <span>Appearance & Styling</span>
          </h3>

          {/* Wallpapers */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Chat Backgrounds / Wallpapers</label>
            <div className="grid grid-cols-4 gap-2">
              {backgroundPresets.map((bg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBgSelect(bg.value)}
                  className={`h-10 rounded-xl border transition-all ${
                    customBg === bg.value
                      ? 'border-indigo-400 ring-2 ring-indigo-500/50 scale-105'
                      : 'border-slate-700'
                  }`}
                  style={{ background: bg.value }}
                  title={bg.name}
                />
              ))}
            </div>
          </div>

          {/* Bubble Color & Font Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">Bubble Color</label>
              <div className="flex gap-2">
                {bubbleColors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBubbleSelect(color.value)}
                    className={`w-7 h-7 rounded-full ${color.value} transition-transform ${
                      bubbleColor === color.value ? 'ring-2 ring-white scale-110' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">Font Size ({fontSize})</label>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {['small', 'normal', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSelect(size)}
                    className={`flex-1 text-[10px] uppercase font-bold py-1 rounded ${
                      fontSize === size ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {size[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Advanced Share Hub (Files, Folders, Location, Audio Voice Note, GIFs, Apps) */}
        <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Share2 size={14} className="text-indigo-400" />
            <span>Quick Share & Rich Media Hub</span>
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleAttachment('folder')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <FolderDown size={16} className="text-indigo-400" />
              <span>Folder / PDF</span>
            </button>

            <button
              onClick={() => handleAttachment('location')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <MapPin size={16} className="text-emerald-400" />
              <span>Live Location</span>
            </button>

            <button
              onClick={() => handleAttachment('voice')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <Mic size={16} className="text-rose-400" />
              <span>Voice Note</span>
            </button>

            <button
              onClick={() => handleAttachment('media')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <ImageIcon size={16} className="text-amber-400" />
              <span>GIFs & Media</span>
            </button>

            <button
              onClick={() => handleAttachment('emoji')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <Smile size={16} className="text-yellow-400" />
              <span>Stickers & Emojis</span>
            </button>

            <button
              onClick={() => handleAttachment('social_apps')}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            >
              <Share2 size={16} className="text-cyan-400" />
              <span>Share Apps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
