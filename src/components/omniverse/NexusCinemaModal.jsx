// src/components/omniverse/NexusCinemaModal.jsx
// NEXUS Cinema — Zero-Ad Media Vault & Glassmorphic Custom Video Player Modal

import { useState } from 'react';
import { Tv, Play, Bookmark, Search, X, Volume2, VolumeX } from 'lucide-react';
import nexusCinemaService from '@/services/nexusCinemaService';
import toast from 'react-hot-toast';

export default function NexusCinemaModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [activeMovie, setActiveMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [bookmarks, setBookmarks] = useState(nexusCinemaService.loadBookmarks());

  if (!isOpen) return null;

  const movies = nexusCinemaService.getCatalog(activeCategory, query);

  const handleToggleBookmark = (movieId, title) => {
    const isNow = nexusCinemaService.toggleBookmark(movieId);
    setBookmarks([...nexusCinemaService.loadBookmarks()]);
    toast.success(isNow ? `Added "${title}" to Bookmarks 🔖` : `Removed "${title}" from Bookmarks`);
  };

  const handleSelectMovie = (movie) => {
    setActiveMovie(movie);
    setIsPlaying(true);
  };

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
                <h2 className="text-lg font-bold text-white">NEXUS Cinema & Live Stream Hub</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Zero-Ad Environment
                </span>
              </div>
              <p className="text-xs text-slate-400">Open-source documentaries, sci-fi vault & live space streams</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Video Player Display (if movie selected) */}
        {activeMovie && (
          <div className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-black shadow-2xl space-y-2">
            <video
              src={activeMovie.videoUrl}
              controls
              autoPlay
              muted={isMuted}
              playbackRate={playbackSpeed}
              className="w-full max-h-72 object-cover"
            />
            <div className="p-3 bg-slate-900 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{activeMovie.posterEmoji}</span> {activeMovie.title}
                </h3>
                <p className="text-xs text-slate-400">{activeMovie.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1.0x Speed</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'documentary', 'scifi', 'live', 'educational'].map((cat) => (
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
              placeholder="Search films..."
              className="w-full ps-8 pe-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Media Catalog Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pe-1 custom-scrollbar">
          {movies.map((movie) => {
            const isBookmarked = bookmarks.includes(movie.id);
            return (
              <div
                key={movie.id}
                className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 hover:border-emerald-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-900 border border-slate-800">{movie.posterEmoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.views}</span>
                        <span>•</span>
                        <span className="text-amber-400">{movie.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(movie.id, movie.title)}
                    className={`p-1.5 rounded-xl transition-all ${
                      isBookmarked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{movie.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                  <div className="flex items-center gap-1">
                    {movie.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-slate-900 text-emerald-400 font-mono text-[9px]">#{t}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectMovie(movie)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
                  >
                    <Play size={13} fill="currentColor" /> Play Stream
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
