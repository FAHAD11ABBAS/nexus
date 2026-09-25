// src/components/ai/UniversalCommandBar.jsx
// Floating Universal Command Bar (Cmd+K / Ctrl+K) for instant AI actions, navigation, NEXUS Hub, Pages, Cinema, Guilds, Academy, News, Mail, Maps, Library

import { useState, useEffect } from 'react';
import { Search, Sparkles, Shield, Globe, Cpu, X, Terminal, GitBranch, Rocket, Tv, Users, GraduationCap, Newspaper, Mail, Compass, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UniversalCommandBar({
  onOpenAiStudio,
  onOpenPlugins,
  onOpenTheme,
  onOpenHub,
  onOpenPages,
  onOpenCinema,
  onOpenGuilds,
  onOpenAcademy,
  onOpenNews,
  onOpenWorkspace,
  onOpenNav,
  onOpenLibrary,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'ai-studio',
      title: 'Launch NEXUS AI Studio Poly-Engine',
      category: 'AI Poly-Engine',
      icon: Sparkles,
      color: 'text-emerald-400',
      action: () => {
        onOpenAiStudio();
        setIsOpen(false);
      },
    },
    {
      id: 'mail',
      title: 'NEXOS Mail & Cloud Workspace',
      category: 'Sovereign Workspace',
      icon: Mail,
      color: 'text-emerald-400',
      action: () => {
        if (onOpenWorkspace) onOpenWorkspace('mail');
        setIsOpen(false);
      },
    },
    {
      id: 'maps',
      title: 'NEXOS Maps & Satellite GPS',
      category: 'Real-World Intelligence',
      icon: Compass,
      color: 'text-cyan-400',
      action: () => {
        if (onOpenNav) onOpenNav('maps');
        setIsOpen(false);
      },
    },
    {
      id: 'library',
      title: 'NEXUS Multilingual Digital Library',
      category: 'Literature & Philosophy',
      icon: BookOpen,
      color: 'text-amber-400',
      action: () => {
        if (onOpenLibrary) onOpenLibrary();
        setIsOpen(false);
      },
    },
    {
      id: 'cinema',
      title: 'NEXUS Cinema & Live Stream Vault',
      category: 'Omniverse Media',
      icon: Tv,
      color: 'text-rose-400',
      action: () => {
        if (onOpenCinema) onOpenCinema();
        setIsOpen(false);
      },
    },
    {
      id: 'guilds',
      title: 'NEXUS Guilds & Voice Communities',
      category: 'Discord Alternative',
      icon: Users,
      color: 'text-indigo-400',
      action: () => {
        if (onOpenGuilds) onOpenGuilds();
        setIsOpen(false);
      },
    },
    {
      id: 'academy',
      title: 'NEXUS Academy & Open University',
      category: 'Autonomous LMS',
      icon: GraduationCap,
      color: 'text-emerald-400',
      action: () => {
        if (onOpenAcademy) onOpenAcademy();
        setIsOpen(false);
      },
    },
    {
      id: 'news',
      title: 'NEXUS Global News & AI Summaries',
      category: 'Intelligence Feed',
      icon: Newspaper,
      color: 'text-cyan-400',
      action: () => {
        if (onOpenNews) onOpenNews();
        setIsOpen(false);
      },
    },
    {
      id: 'hub',
      title: 'NEXUS Hub Code Repositories',
      category: 'Developer Workspace',
      icon: GitBranch,
      color: 'text-violet-400',
      action: () => {
        if (onOpenHub) onOpenHub();
        setIsOpen(false);
      },
    },
    {
      id: 'pages',
      title: 'Deploy to NEXUS Pages Gateway',
      category: 'Zero-Cost Hosting',
      icon: Rocket,
      color: 'text-amber-400',
      action: () => {
        if (onOpenPages) onOpenPages();
        setIsOpen(false);
      },
    },
    {
      id: 'plugins',
      title: 'Open-Core Micro-Plugin Registry',
      category: 'Architecture',
      icon: Cpu,
      color: 'text-cyan-400',
      action: () => {
        onOpenPlugins();
        setIsOpen(false);
      },
    },
    {
      id: 'theme',
      title: 'Glassmorphism Theme Customizer',
      category: 'UI & Aesthetics',
      icon: Globe,
      color: 'text-purple-400',
      action: () => {
        onOpenTheme();
        setIsOpen(false);
      },
    },
    {
      id: 'panic',
      title: 'Trigger Decoy Panic Defense',
      category: 'Privacy',
      icon: Shield,
      color: 'text-rose-400',
      action: () => {
        window.dispatchEvent(new CustomEvent('nexus_toggle_panic'));
        setIsOpen(false);
      },
    },
  ];

  const filteredActions = query.trim()
    ? actions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
    : actions;

  return (
    <div className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-4 space-y-3 shadow-2xl">
        
        {/* Input */}
        <div className="relative flex items-center">
          <Search size={18} className="absolute start-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search action (e.g. Mail, Maps, Library, AI Studio)..."
            className="w-full ps-10 pe-10 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 outline-none focus:border-emerald-500"
          />
          <button onClick={() => setIsOpen(false)} className="absolute end-3 text-slate-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Action List */}
        <div className="space-y-1.5 max-h-64 overflow-y-auto pe-1 custom-scrollbar">
          {filteredActions.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/40 flex items-center justify-between text-start transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-slate-900 ${item.color}`}>
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.category}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">↵ Execute</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Universal Command Bar</span>
          <span>Press ESC or Cmd+K to close</span>
        </div>

      </div>
    </div>
  );
}
