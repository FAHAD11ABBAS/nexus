// src/components/plugins/PluginRegistryModal.jsx
// Open-Core Plugin Registry & Management Modal

import { useState, useEffect } from 'react';
import {
  Cpu, Power, Trash2, Plus, ShieldCheck, Sparkles, X
} from 'lucide-react';
import pluginEngine from '@/plugins/pluginEngine';
import toast from 'react-hot-toast';

export default function PluginRegistryModal({ isOpen, onClose }) {
  const [plugins, setPlugins] = useState(pluginEngine.getPlugins());
  const [activeTab, setActiveTab] = useState('all'); // all | enabled | custom
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [newPluginName, setNewPluginName] = useState('');
  const [newPluginDesc, setNewPluginDesc] = useState('');
  const [newPluginCategory, setNewPluginCategory] = useState('Utility');

  useEffect(() => {
    const unsubscribe = pluginEngine.subscribe((updated) => setPlugins([...updated]));
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleToggle = (id, name) => {
    const isNowEnabled = pluginEngine.togglePlugin(id);
    toast.success(`${name} ${isNowEnabled ? 'Enabled ✓' : 'Disabled ⏸️'}`);
  };

  const handleUninstall = (id, name) => {
    pluginEngine.uninstallPlugin(id);
    toast.success(`Plugin "${name}" uninstalled`);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newPluginName.trim()) return;

    const created = pluginEngine.installCustomPlugin({
      name: newPluginName,
      description: newPluginDesc || 'User-defined custom client-side micro-plugin.',
      category: newPluginCategory,
      author: 'Local Developer',
      icon: 'Cpu',
    });

    toast.success(`Micro-plugin "${created.name}" installed successfully!`);
    setNewPluginName('');
    setNewPluginDesc('');
    setShowInstallModal(false);
  };

  const filteredPlugins = plugins.filter((p) => {
    if (activeTab === 'enabled') return p.enabled;
    if (activeTab === 'custom') return !p.isBuiltin;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Cpu size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Open-Core Plugin Architecture</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  {plugins.filter((p) => p.enabled).length}/{plugins.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous dynamic micro-plugin registry & execution engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {['all', 'enabled', 'custom'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? `All (${plugins.length})` : tab === 'enabled' ? `Active (${plugins.filter((p) => p.enabled).length})` : 'Custom User Plugins'}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowInstallModal(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} /> Register Plugin
          </button>
        </div>

        {/* Plugins Grid / List */}
        <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
          {filteredPlugins.length === 0 ? (
            <div className="p-8 text-center bg-slate-800/30 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              No micro-plugins found in this view.
            </div>
          ) : (
            filteredPlugins.map((plugin) => (
              <div
                key={plugin.id}
                className={`p-4 rounded-2xl border transition-all ${
                  plugin.enabled
                    ? 'bg-slate-800/60 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-900/40 border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl flex items-center justify-center ${
                      plugin.enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Cpu size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{plugin.name}</h3>
                        <span className="text-[10px] font-mono text-slate-500">v{plugin.version}</span>
                        {plugin.isBuiltin ? (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-semibold border border-indigo-500/30">
                            Core Builtin
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-semibold border border-amber-500/30">
                            User Custom
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">{plugin.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1">
                        <span>Category: {plugin.category}</span>
                        <span>• Author: {plugin.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(plugin.id, plugin.name)}
                      className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold ${
                        plugin.enabled
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      <Power size={14} />
                      <span>{plugin.enabled ? 'Active' : 'Disabled'}</span>
                    </button>

                    {!plugin.isBuiltin && (
                      <button
                        onClick={() => handleUninstall(plugin.id, plugin.name)}
                        className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-400 hover:text-rose-200 transition-all"
                        title="Uninstall plugin"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal footer / info */}
        <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/80">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Open-Core Zero-Cost Sandbox: All plugins execute strictly client-side.</span>
          </div>
          <span className="font-mono text-[10px]">IndexedDB / LocalStorage Sync</span>
        </div>

        {/* Modal to add custom micro-plugin */}
        {showInstallModal && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 animate-fade-in">
            <form onSubmit={handleAddCustom} className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" /> Register New Micro-Plugin
                </h3>
                <button type="button" onClick={() => setShowInstallModal(false)} className="text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Plugin Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Analytics Micro-Engine"
                    value={newPluginName}
                    onChange={(e) => setNewPluginName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newPluginCategory}
                    onChange={(e) => setNewPluginCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                  >
                    <option value="AI & Language">AI & Language</option>
                    <option value="Cosmic & Bio">Cosmic & Bio</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Utility">Utility</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of what this micro-plugin performs..."
                    value={newPluginDesc}
                    onChange={(e) => setNewPluginDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInstallModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Install Micro-Plugin
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
