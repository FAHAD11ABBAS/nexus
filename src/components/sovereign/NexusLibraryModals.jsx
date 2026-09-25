// src/components/sovereign/NexusLibraryModals.jsx
// NEXUS Global Library & Philosophy Portal — Multilingual E-Reader Modal

import { useState } from 'react';
import { BookOpen, Book, Search, X, Sparkles, Languages, Type } from 'lucide-react';
import nexusLibraryService from '@/services/nexusLibraryService';
import toast from 'react-hot-toast';

export default function NexusLibraryModals({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState('all');
  const [query, setQuery] = useState('');
  const [activeBook, setActiveBook] = useState(null);
  const [fontSize, setFontSize] = useState(14); // 12 | 14 | 16 | 18

  if (!isOpen) return null;

  const books = nexusLibraryService.getBooks(selectedLang, query);

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Global Library & Philosophy</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Multilingual E-Reader
                </span>
              </div>
              <p className="text-xs text-slate-400">Classical manuscripts, philosophy, historical archives & literary treatises</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Reader Workspace */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          
          {/* Books Catalog Sidebar */}
          <div className="w-72 border-r border-slate-800 pe-3 space-y-3 overflow-y-auto custom-scrollbar flex-shrink-0">
            <div className="relative">
              <Search size={14} className="absolute start-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search library..."
                className="w-full ps-8 pe-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {['all', 'ar', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    selectedLang === lang ? 'bg-emerald-500 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'All Languages'}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {books.map((b) => {
                const isSelected = activeBook?.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBook(b)}
                    className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1 ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{b.title}</span>
                      <span className="text-base select-none">{b.flag}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">{b.author}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* E-Reader View */}
          {activeBook ? (
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden p-4 rounded-3xl bg-slate-950 border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{activeBook.flag}</span> {activeBook.title}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">{activeBook.author}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1"><Type size={12} /> Size:</span>
                  <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="px-2 py-0.5 rounded bg-slate-800 text-xs font-bold text-white">-</button>
                  <span className="text-xs font-mono text-white">{fontSize}px</span>
                  <button onClick={() => setFontSize(Math.min(22, fontSize + 2))} className="px-2 py-0.5 rounded bg-slate-800 text-xs font-bold text-white">+</button>
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto pe-2 custom-scrollbar space-y-3 leading-relaxed text-slate-200"
                style={{ fontSize: `${fontSize}px`, direction: activeBook.language === 'ar' ? 'rtl' : 'ltr' }}
              >
                {activeBook.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800/60">{paragraph}</p>
                ))}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select a book or treatise to begin reading
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
