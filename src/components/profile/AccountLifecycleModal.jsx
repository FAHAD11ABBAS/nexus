// src/components/profile/AccountLifecycleModal.jsx
// Advanced Privacy, Moderation & Account Lifecycle Control Modal

import { useState } from 'react';
import { Shield, Lock, UserX, Clock, AlertTriangle, Trash2, X, Check, EyeOff } from 'lucide-react';
import moderationService from '@/services/moderationService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AccountLifecycleModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(moderationService.getSettings());
  const [activeTab, setActiveTab] = useState('blocked'); // 'blocked' | 'privacy' | 'lifecycle'
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isOpen) return null;

  const handleUnblock = (userId) => {
    const updatedBlocked = moderationService.unblockUser(userId);
    setSettings((prev) => ({ ...prev, blockedUsers: updatedBlocked }));
    toast.success('User unblocked successfully');
  };

  const handleSetTimer = (timer) => {
    const updated = moderationService.setSelfDestructDefault(timer);
    setSettings(updated);
    toast.success(`Default self-destruct set to ${timer}`);
  };

  const handleDeactivate = () => {
    moderationService.deactivateAccount();
    toast.success('Account deactivated (frozen). Redirecting...');
    setTimeout(() => {
      onClose();
      navigate('/auth');
    }, 1500);
  };

  const handleDeletePermanently = () => {
    moderationService.deleteAccountPermanently();
    toast.success('Account permanently deleted. All local data cleared.');
    setTimeout(() => {
      onClose();
      window.location.href = '/auth';
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Privacy & Account Lifecycle</h2>
              <p className="text-xs text-slate-400">Moderation, self-destruct timers & account status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setActiveTab('blocked')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'blocked' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Blocked Nodes
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Self-Destruct Presets
          </button>
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'lifecycle' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Account Control
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
          {activeTab === 'blocked' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Blocked Accounts ({settings.blockedUsers.length})</span>
                <span className="text-[10px] font-mono text-slate-500">Encrypted Exclusion</span>
              </div>

              {settings.blockedUsers.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-800/30 rounded-2xl border border-slate-800">
                  No blocked users on your account.
                </div>
              ) : (
                settings.blockedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{user.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{user.handle}</p>
                    </div>

                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-white font-semibold transition-all"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-400" />
                  Default Self-Destruct Message Timer
                </h4>
                <p className="text-xs text-slate-400">Automatically disappear new chat messages after expiry</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'off', label: 'Off (Keep Forever)' },
                  { key: '1h', label: '1 Hour' },
                  { key: '24h', label: '24 Hours' },
                  { key: '7d', label: '7 Days' },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSetTimer(option.key)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                      settings.defaultSelfDestructTimer === option.key
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-md'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{option.label}</span>
                    {settings.defaultSelfDestructTimer === option.key && <Check size={14} className="text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lifecycle' && (
            <div className="space-y-4">
              {/* Deactivate Option */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <UserX size={16} />
                  <span>Deactivate Account (Temporary Freeze)</span>
                </div>
                <p className="text-xs text-amber-200/80">
                  Temporarily hide your profile, feed posts, and active status. You can reactivate anytime by logging back in.
                </p>
                <button
                  onClick={handleDeactivate}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow"
                >
                  Deactivate Account
                </button>
              </div>

              {/* Permanent Delete Option */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle size={16} />
                  <span>Delete Account Permanently</span>
                </div>
                <p className="text-xs text-rose-200/80">
                  Permanently purge all user metadata, encrypted message keys, wallet balances, and feed media. This action cannot be undone.
                </p>

                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full py-2 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all"
                  >
                    Initiate Account Deletion...
                  </button>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-rose-800/40">
                    <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider text-center">
                      Confirm Permanent Deletion?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-white font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeletePermanently}
                        className="flex-1 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs text-white font-bold flex items-center justify-center gap-1 shadow-lg"
                      >
                        <Trash2 size={14} /> Yes, Delete All Data
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
