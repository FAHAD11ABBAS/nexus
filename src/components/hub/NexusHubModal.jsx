// src/components/hub/NexusHubModal.jsx
// NEXUS Hub — GitHub-style Decentralized Code Repository & Version Control Browser Modal

import { useState, useEffect } from 'react';
import {
  GitBranch, GitCommit, FileCode, Folder, Plus, Star, GitFork, Lock, Globe, X, Save, Rocket, Play
} from 'lucide-react';
import nexusHubService from '@/services/nexusHubService';
import nexusPagesService from '@/services/nexusPagesService';
import toast from 'react-hot-toast';

export default function NexusHubModal({ isOpen, onClose, onLaunchPages }) {
  const [repos, setRepos] = useState(nexusHubService.getRepositories());
  const [selectedRepo, setSelectedRepo] = useState(repos[0] || null);
  const [selectedFile, setSelectedFile] = useState(repos[0]?.files[0] || null);
  const [editorContent, setEditorContent] = useState(repos[0]?.files[0]?.content || '');
  const [commitMsg, setCommitMsg] = useState('');
  
  const [activeTab, setActiveTab] = useState('code'); // code | commits | branches
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDesc, setNewRepoDesc] = useState('');
  const [newRepoVis, setNewRepoVis] = useState('public');
  const [newBranchName, setNewBranchName] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const updated = nexusHubService.getRepositories();
      setRepos(updated);
      if (selectedRepo) {
        const fresh = nexusHubService.getRepositoryById(selectedRepo.id);
        setSelectedRepo(fresh);
      }
    };
    window.addEventListener('nexus_hub_updated', handleUpdate);
    return () => window.removeEventListener('nexus_hub_updated', handleUpdate);
  }, [selectedRepo]);

  if (!isOpen) return null;

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    const firstFile = repo.files[0] || null;
    setSelectedFile(firstFile);
    setEditorContent(firstFile ? firstFile.content : '');
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setEditorContent(file.content);
  };

  const handleCommit = (e) => {
    e.preventDefault();
    if (!selectedRepo || !selectedFile) return;

    const updatedRepo = nexusHubService.commitFileChanges(
      selectedRepo.id,
      selectedFile.path,
      editorContent,
      commitMsg || `Update ${selectedFile.path}`
    );

    setSelectedRepo(updatedRepo);
    setCommitMsg('');
    toast.success(`Committed changes to ${selectedFile.path} 🌿`);
  };

  const handleCreateRepo = (e) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    const created = nexusHubService.createRepository({
      name: newRepoName,
      description: newRepoDesc,
      visibility: newRepoVis,
    });

    setRepos(nexusHubService.getRepositories());
    handleSelectRepo(created);
    setNewRepoName('');
    setNewRepoDesc('');
    setShowCreateModal(false);
    toast.success(`Repository "${created.name}" initialized 🚀`);
  };

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (!newBranchName.trim() || !selectedRepo) return;

    const updated = nexusHubService.createBranch(selectedRepo.id, newBranchName);
    setSelectedRepo(updated);
    setNewBranchName('');
    toast.success(`Branch "${newBranchName}" created & checked out 🌿`);
  };

  const handleSwitchBranch = (branchName) => {
    if (!selectedRepo) return;
    const updated = nexusHubService.switchBranch(selectedRepo.id, branchName);
    setSelectedRepo(updated);
    toast.success(`Switched to branch "${branchName}"`);
  };

  const handleDeploy = () => {
    if (!selectedRepo) return;
    nexusPagesService.deployRepository(selectedRepo);
    toast.success(`Deployment pipeline triggered for "${selectedRepo.name}" 🚀`);
    if (onLaunchPages) onLaunchPages();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <GitBranch size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Hub</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Decentralized Code & Repositories
                </span>
              </div>
              <p className="text-xs text-slate-400">Client-side version control, code editing & deployment gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Plus size={14} /> New Repo
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          
          {/* Repositories Sidebar */}
          <div className="w-64 border-r border-slate-800 pe-3 space-y-2 overflow-y-auto custom-scrollbar flex-shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Repositories</h3>
            {repos.map((repo) => {
              const isSelected = selectedRepo?.id === repo.id;
              return (
                <button
                  key={repo.id}
                  onClick={() => handleSelectRepo(repo)}
                  className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{repo.name}</span>
                    {repo.visibility === 'public' ? (
                      <Globe size={12} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Lock size={12} className="text-amber-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{repo.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono pt-1">
                    <span className="flex items-center gap-0.5"><Star size={10} className="text-amber-400" /> {repo.starsCount}</span>
                    <span className="flex items-center gap-0.5"><GitFork size={10} /> {repo.forksCount}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Repo View */}
          {selectedRepo && (
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              
              {/* Repo Header & Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {selectedRepo.name}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {selectedRepo.visibility}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{selectedRepo.description}</p>
                  </div>
                </div>

                {/* Branch Switcher & Deploy Button */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedRepo.activeBranch}
                    onChange={(e) => handleSwitchBranch(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none font-mono"
                  >
                    {selectedRepo.branches.map((b) => (
                      <option key={b} value={b}>🌿 {b}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleDeploy}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Rocket size={13} /> Deploy Pages
                  </button>
                </div>
              </div>

              {/* View Mode Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'code' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode size={13} /> Code Files
                </button>
                <button
                  onClick={() => setActiveTab('commits')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'commits' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GitCommit size={13} /> Commit Log ({selectedRepo.commits.length})
                </button>
              </div>

              {/* Tab 1: Code Files & Editor */}
              {activeTab === 'code' && (
                <div className="flex-1 flex gap-3 overflow-hidden">
                  
                  {/* File Tree */}
                  <div className="w-48 bg-slate-950/60 p-2 rounded-2xl border border-slate-800 space-y-1 overflow-y-auto custom-scrollbar">
                    {selectedRepo.files.map((f) => (
                      <button
                        key={f.path}
                        onClick={() => handleSelectFile(f)}
                        className={`w-full text-start px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all font-mono ${
                          selectedFile?.path === f.path ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <FileCode size={12} className="flex-shrink-0" />
                        <span className="truncate">{f.path}</span>
                      </button>
                    ))}
                  </div>

                  {/* Editor */}
                  <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                    <form onSubmit={handleCommit} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Commit message (e.g. Update styles)"
                        value={commitMsg}
                        onChange={(e) => setCommitMsg(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1"
                      >
                        <Save size={13} /> Commit
                      </button>
                    </form>

                    <textarea
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      className="flex-1 w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-emerald-400 font-mono outline-none resize-none custom-scrollbar"
                    />
                  </div>

                </div>
              )}

              {/* Tab 2: Commit Log */}
              {activeTab === 'commits' && (
                <div className="flex-1 overflow-y-auto space-y-2 pe-1 custom-scrollbar">
                  {selectedRepo.commits.map((c) => (
                    <div key={c.id} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{c.message}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{c.author} · {new Date(c.timestamp).toLocaleString()}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-emerald-400 font-mono text-[10px] border border-slate-700">
                        {c.hash}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal: Create Repo */}
        {showCreateModal && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 animate-fade-in">
            <form onSubmit={handleCreateRepo} className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitBranch size={18} className="text-emerald-400" /> Create New Repository
                </h3>
                <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Repository Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. my-awesome-dapp"
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of your codebase..."
                    value={newRepoDesc}
                    onChange={(e) => setNewRepoDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Visibility</label>
                  <select
                    value={newRepoVis}
                    onChange={(e) => setNewRepoVis(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                  >
                    <option value="public">🌐 Public (Open Source)</option>
                    <option value="private">🔒 Private (Encrypted Local)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20">Initialize Repo</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
