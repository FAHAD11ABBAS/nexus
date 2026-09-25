// src/components/hub/NexusPagesModal.jsx
// NEXUS Pages — Vercel-style Zero-Cost Cloud Deployment Gateway Modal & Subdomain Router

import { useState, useEffect } from 'react';
import {
  Rocket, Globe, Terminal, ExternalLink, RotateCcw, X, Eye
} from 'lucide-react';
import nexusPagesService from '@/services/nexusPagesService';
import toast from 'react-hot-toast';

export default function NexusPagesModal({ isOpen, onClose }) {
  const [deployments, setDeployments] = useState(nexusPagesService.getDeployments());
  const [selectedDep, setSelectedDep] = useState(deployments[0] || null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = nexusPagesService.getDeployments();
      setDeployments(updated);
      if (selectedDep) {
        const fresh = nexusPagesService.getDeploymentById(selectedDep.id);
        setSelectedDep(fresh);
      }
    };
    window.addEventListener('nexus_pages_updated', handleUpdate);
    return () => window.removeEventListener('nexus_pages_updated', handleUpdate);
  }, [selectedDep]);

  if (!isOpen) return null;

  const handleRollback = (depId) => {
    const updated = nexusPagesService.rollbackDeployment(depId);
    setSelectedDep(updated);
    toast.success('Instant Version Rollback Executed ↺');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Rocket size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Pages Gateway</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Zero-Cost Cloud Hosting
                </span>
              </div>
              <p className="text-xs text-slate-400">One-click deployment, subdomain routing & version rollbacks</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Workspace Grid */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          
          {/* Deployments List */}
          <div className="w-72 border-r border-slate-800 pe-3 space-y-2 overflow-y-auto custom-scrollbar flex-shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Deployments</h3>
            {deployments.map((dep) => {
              const isSelected = selectedDep?.id === dep.id;
              const isActive = dep.status === 'Active';
              return (
                <button
                  key={dep.id}
                  onClick={() => {
                    setSelectedDep(dep);
                    setShowLivePreview(false);
                  }}
                  className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{dep.repoName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                      isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {dep.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono truncate">https://{dep.subdomain}</p>
                  <p className="text-[10px] text-slate-500 truncate">{dep.commitMessage}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Deployment Details */}
          {selectedDep && (
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              
              {/* Status Header Bar */}
              <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{selectedDep.subdomain}</h3>
                    <a
                      href={`https://${selectedDep.subdomain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline text-xs flex items-center gap-1 font-mono"
                    >
                      <Globe size={13} /> Visit <ExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Target Branch: <span className="text-emerald-300 font-mono">🌿 {selectedDep.targetBranch}</span> · Commit: <span className="text-slate-300 font-mono">{selectedDep.commitHash}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      showLivePreview ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Eye size={13} /> {showLivePreview ? 'Build Terminal' : 'Live Preview'}
                  </button>

                  <button
                    onClick={() => handleRollback(selectedDep.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <RotateCcw size={13} /> Rollback
                  </button>
                </div>
              </div>

              {/* View Switcher: Build Logs Terminal vs Live Preview iframe */}
              {showLivePreview ? (
                <div className="flex-1 rounded-2xl overflow-hidden border border-emerald-500/30 bg-white shadow-2xl">
                  <iframe
                    title="NEXUS Pages Live App Sandbox"
                    srcDoc={selectedDep.htmlBundle}
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><Terminal size={14} className="text-emerald-400" /> Live Build Logs Stream</span>
                    <span className="text-[10px] text-emerald-400">SSL Encrypted Gateway</span>
                  </div>

                  <div className="flex-1 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-y-auto custom-scrollbar">
                    {selectedDep.logs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
