// src/components/privacy/PrivacySovereigntyPanel.jsx
// Absolute Privacy Sovereignty & Granular Control Suite

import { useState } from 'react';
import {
  Shield, Eye, EyeOff, Trash2, Clock, UserX, Archive,
  Check, X, AlertTriangle, Lock, Fingerprint,
} from 'lucide-react';
import moderationService from '@/services/moderationService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TIMER_OPTIONS = [
  { key: 'off', label: '∞ Keep Forever' },
  { key: '1h', label: '1 Hour' },
  { key: '24h', label: '24 Hours' },
  { key: '7d', label: '7 Days' },
];

export default function PrivacySovereigntyPanel({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(moderationService.getSettings());
  const [activeTab, setActiveTab] = useState('receipts'); // receipts | wipe | blocked | lifecycle
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [readReceiptsGlobal, setReadReceiptsGlobal] = useState(
    JSON.parse(localStorage.getItem('nexus_read_receipts') ?? 'true')
  );

  if (!isOpen) return null;

  const handleToggleReadReceipts = () => {
    const next = !readReceiptsGlobal;
    setReadReceiptsGlobal(next);
    localStorage.setItem('nexus_read_receipts', JSON.stringify(next));
    toast.success(next ? 'Read receipts enabled ✓' : 'Read receipts disabled — you read in stealth mode 👁️');
  };

  const handleZeroTraceWipe = () => {
    // Wipe all chat keys from localStorage
    const keysToWipe = Object.keys(localStorage).filter((k) =>
      k.startsWith('nexus_mock') || k.startsWith('nexus_chat') || k.startsWith('nexus_anon')
    );
    keysToWipe.forEach((k) => localStorage.removeItem(k));
    toast.success(`Zero-Trace Wipe complete — ${keysToWipe.length} data shards vaporized 🔥`);
    setConfirmWipe(false);
  };

  const handleSetTimer = (timer) => {
    const updated = moderationService.setSelfDestructDefault(timer);
    setSettings(updated);
    toast.success(`Self-destruct default: ${timer}`);
  };

  const handleUnblock = (userId) => {
    const updatedBlocked = moderationService.unblockUser(userId);
    setSettings((prev) => ({ ...prev, blockedUsers: updatedBlocked }));
    toast.success('User unblocked');
  };

  const handleDeactivate = () => {
    moderationService.deactivateAccount();
    toast.success('Account deactivated. Logging out...');
    setTimeout(() => { onClose(); navigate('/auth'); }, 1500);
  };

  const handleDeletePermanently = () => {
    moderationService.deleteAccountPermanently();
    toast.success('Account permanently deleted. All local data cleared.');
    setTimeout(() => { window.location.href = '/auth'; }, 1500);
  };

  const tabs = [
    { id: 'receipts', label: '👁️ Read Receipts' },
    { id: 'wipe', label: '🔥 Zero-Trace Wipe' },
    { id: 'blocked', label: '🚫 Blocked List' },
    { id: 'lifecycle', label: '⚠️ Account Control' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Fingerprint size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Privacy Sovereignty Suite</h2>
              <p className="text-xs text-slate-400">Granular zero-trace privacy controls</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
          
          {/* Read Receipts */}
          {activeTab === 'receipts' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Control who can see when you've read their messages.</p>
              
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {readReceiptsGlobal ? <Eye size={18} className="text-indigo-400" /> : <EyeOff size={18} className="text-purple-400" />}
                  <div>
                    <p className="text-sm font-bold text-white">Global Read Receipts</p>
                    <p className="text-xs text-slate-400">
                      {readReceiptsGlobal ? 'Others see when you read their messages' : 'You read in stealth — no "Seen" indicators sent'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleReadReceipts}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    readReceiptsGlobal
                      ? 'bg-indigo-600 text-white'
                      : 'bg-purple-600/30 border border-purple-500/40 text-purple-300'
                  }`}
                >
                  {readReceiptsGlobal ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200/80 flex items-start gap-2">
                <Lock size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Disabling read receipts also prevents others from knowing when you're online. Mutual privacy applies — you won't see their read receipts either.</span>
              </div>
            </div>
          )}

          {/* Zero-Trace Wipe */}
          {activeTab === 'wipe' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">One-tap instant erasure of all conversation history from local and cache storage.</p>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Trash2 size={16} />
                  <span>Zero-Trace Total Chat Wipe</span>
                </div>
                <p className="text-xs text-rose-200/80">
                  Instantly vaporizes ALL chat logs, media cache, notification placeholders, and anonymous comment history from this device. No "message deleted" markers — absolute clean slate.
                </p>
                
                {!confirmWipe ? (
                  <button
                    onClick={() => setConfirmWipe(true)}
                    className="w-full py-2.5 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-sm transition-all"
                  >
                    🔥 Initiate Zero-Trace Wipe
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-rose-300 font-bold text-center uppercase tracking-wider">Confirm — This Cannot Be Undone</p>
                    <div className="flex gap-2">
                      <button onClick={() => setConfirmWipe(false)} className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold">Cancel</button>
                      <button onClick={handleZeroTraceWipe} className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1">
                        <Trash2 size={14} /> Wipe All Data
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Self-destruct timers */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-white flex items-center gap-1.5"><Clock size={14} className="text-indigo-400" /> Default Self-Destruct Timer</p>
                <div className="grid grid-cols-2 gap-2">
                  {TIMER_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleSetTimer(option.key)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                        settings.defaultSelfDestructTimer === option.key
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{option.label}</span>
                      {settings.defaultSelfDestructTimer === option.key && <Check size={14} className="text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Blocked List */}
          {activeTab === 'blocked' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Blocked Accounts ({settings.blockedUsers.length})</span>
                <span className="text-[10px] font-mono text-slate-500">Encrypted Exclusion Layer</span>
              </div>

              {settings.blockedUsers.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-800/30 rounded-2xl border border-slate-800">
                  No blocked accounts. Your feed is open.
                </div>
              ) : (
                settings.blockedUsers.map((user) => (
                  <div key={user.id} className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{user.handle}</p>
                      <p className="text-[10px] text-slate-500">{user.type === 'permanent' ? 'Permanent block' : 'Temporary block'} · {user.date}</p>
                    </div>
                    <button onClick={() => handleUnblock(user.id)} className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-white font-semibold transition-all">
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Account Lifecycle */}
          {activeTab === 'lifecycle' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <UserX size={16} /> Temporary Account Deactivation
                </div>
                <p className="text-xs text-amber-200/80">Freeze your profile, feed, and active status. Reactivate by logging back in.</p>
                <button onClick={handleDeactivate} className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all">Deactivate Account</button>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle size={16} /> Permanent Account Deletion
                </div>
                <p className="text-xs text-rose-200/80">Permanently purge all metadata, wallet keys, feed media, and encrypted message records. This action is irreversible.</p>
                {!confirmDelete ? (
                  <button onClick={() => setConfirmDelete(true)} className="w-full py-2 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all">
                    Initiate Deletion...
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider text-center">Are you absolutely certain?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setConfirmDelete(false)} className="flex-1 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-white font-bold">Cancel</button>
                      <button onClick={handleDeletePermanently} className="flex-1 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs text-white font-bold flex items-center justify-center gap-1">
                        <Trash2 size={14} /> Delete Everything
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
