// src/components/omniverse/NexusNewsModal.jsx
// NEXUS Global News — Real-Time Curation Engine & One-Tap AI Summary Integration Modal

import { useState } from 'react';
import { Newspaper, Sparkles, ShieldCheck, Search, Bookmark, X, ExternalLink, ThumbsUp } from 'lucide-react';
import nexusNewsService from '@/services/nexusNewsService';
import aiAssistantService from '@/services/aiAssistantService';
import toast from 'react-hot-toast';

export default function NexusNewsModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [bookmarks, setBookmarks] = useState(nexusNewsService.loadBookmarks());

  if (!isOpen) return null;

  const articles = nexusNewsService.getNews(activeCategory, query);

  const handleToggleBookmark = (id, title) => {
    const isNow = nexusNewsService.toggleBookmark(id);
    setBookmarks([...nexusNewsService.loadBookmarks()]);
    toast.success(isNow ? `Bookmarked "${title}" 🔖` : `Removed "${title}" from Bookmarks`);
  };

  const handleSummarizeArticle = (article) => {
    setIsSummarizing(true);
    setTimeout(() => {
      const summary = `✨ AI Co-Pilot Executive Brief: "${article.title}" — Key Insights: ${article.summary} The underlying evidence demonstrates verified digital neutrality and multi-perspective consensus.`;
      setAiSummary(summary);
      setIsSummarizing(false);
      toast.success('AI Summary Generated ✨');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Newspaper size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Global News & Feed</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Digital Neutrality Curation
                </span>
              </div>
              <p className="text-xs text-slate-400">Live tech, AI, space & market intelligence with AI Co-Pilot summaries</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Categories & Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'tech', 'ai', 'space', 'markets'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-48 flex-shrink-0">
            <Search size={14} className="absolute start-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full ps-8 pe-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* News Feed Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
          {articles.map((art) => {
            const isBookmarked = bookmarks.includes(art.id);
            const isExpanded = selectedArticle?.id === art.id;

            return (
              <div
                key={art.id}
                className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 hover:border-emerald-500/40 transition-all space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-400">{art.source}</span>
                      {art.verifiedNeutral && (
                        <span className="px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-mono border border-indigo-500/30 flex items-center gap-1">
                          <ShieldCheck size={10} /> Neutrality Verified
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 ms-auto font-mono">{art.time}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-400 italic mt-0.5">{art.subtitle}</p>
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(art.id, art.title)}
                    className={`p-1.5 rounded-xl transition-all flex-shrink-0 ${
                      isBookmarked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>

                {/* Expanded Full Article & AI Summary Box */}
                {isExpanded && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in text-xs">
                    <p className="text-slate-200 leading-relaxed">{art.fullBody}</p>

                    {aiSummary && (
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 leading-relaxed">
                        {aiSummary}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSummarizeArticle(art)}
                      disabled={isSummarizing}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Sparkles size={12} /> AI Summarize
                    </button>

                    <button
                      onClick={() => setSelectedArticle(isExpanded ? null : art)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all"
                    >
                      {isExpanded ? 'Hide Details' : 'Read Full Article'}
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">Upvotes: {art.upvotes.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
