// src/components/notifications/NotificationCenterModal.jsx
// Notification Center modal for viewing, filtering, and testing real-time push alerts

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  MessageSquare,
  PhoneCall,
  Heart,
  ShieldAlert,
  CheckCheck,
  Trash2,
  Send,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/ui/Modal';
import { useNotifications } from '@/context/NotificationContext';
import Avatar from '@/components/ui/Avatar';

export default function NotificationCenterModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    notifications,
    markAllAsRead,
    clearAll,
    triggerTestPush,
    permissionStatus,
    requestPermission,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'message' | 'call' | 'like' | 'system'

  const filtered =
    activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={14} className="text-nexus-cyan" />;
      case 'call':
        return <PhoneCall size={14} className="text-emerald-400" />;
      case 'like':
        return <Heart size={14} className="text-rose-400" />;
      case 'system':
      default:
        return <ShieldAlert size={14} className="text-nexus-accent" />;
    }
  };

  const handleItemClick = (item) => {
    if (item.actionUrl) {
      navigate(item.actionUrl);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('topbar.notifications')} maxWidth="max-w-md">
      <div className="space-y-4">
        {/* Permission Request Header Notice */}
        {permissionStatus !== 'granted' && (
          <div className="p-3 rounded-2xl bg-nexus-primary/20 border border-nexus-secondary/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-nexus-secondary animate-pulse" />
              <span className="text-xs text-white font-medium">
                Enable Web Push for real-time background alerts
              </span>
            </div>
            <button
              onClick={requestPermission}
              className="px-3 py-1 rounded-xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus-sm"
            >
              Enable
            </button>
          </div>
        )}

        {/* Action Header & Tabs */}
        <div className="flex items-center justify-between border-b border-nexus-border/50 pb-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'message', 'call', 'like', 'system'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                    : 'text-nexus-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-nexus-muted flex-shrink-0">
            <button
              onClick={markAllAsRead}
              title="Mark all as read"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
            >
              <CheckCheck size={16} />
            </button>
            <button
              onClick={clearAll}
              title="Clear all"
              className="p-1.5 rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Test Notification Trigger Buttons */}
        <div className="p-2.5 rounded-2xl bg-nexus-card/60 border border-nexus-border/40 space-y-2">
          <p className="text-[11px] font-bold text-nexus-dim uppercase tracking-wider">
            Test Push Notification Trigger:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => triggerTestPush('message')}
              className="px-2 py-1.5 rounded-xl bg-nexus-surface border border-nexus-border hover:border-nexus-cyan text-nexus-cyan text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <MessageSquare size={12} />
              <span>Message</span>
            </button>
            <button
              onClick={() => triggerTestPush('call')}
              className="px-2 py-1.5 rounded-xl bg-nexus-surface border border-nexus-border hover:border-emerald-400 text-emerald-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <PhoneCall size={12} />
              <span>Call</span>
            </button>
            <button
              onClick={() => triggerTestPush('like')}
              className="px-2 py-1.5 rounded-xl bg-nexus-surface border border-nexus-border hover:border-rose-400 text-rose-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <Heart size={12} />
              <span>Like</span>
            </button>
            <button
              onClick={() => triggerTestPush('system')}
              className="px-2 py-1.5 rounded-xl bg-nexus-surface border border-nexus-border hover:border-nexus-accent text-nexus-accent text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <ShieldAlert size={12} />
              <span>Alert</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar pt-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                !item.read
                  ? 'bg-nexus-primary/15 border-nexus-secondary/40 shadow-nexus-sm'
                  : 'bg-nexus-surface/40 border-nexus-border/40 hover:bg-nexus-surface/80'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {item.avatar ? (
                  <Avatar src={item.avatar} name={item.title} size="md" />
                ) : (
                  <div className="w-10 h-10 rounded-2xl bg-nexus-gradient flex items-center justify-center text-white flex-shrink-0">
                    {getIcon(item.type)}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-nexus-accent" />
                    )}
                  </div>
                  <p className="text-xs text-nexus-muted truncate mt-0.5">
                    {item.body}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[10px] text-nexus-dim font-mono">
                  {item.time}
                </span>
                <span className="p-1 rounded-md bg-black/40">
                  {getIcon(item.type)}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-nexus-muted space-y-2">
              <Bell size={32} className="mx-auto text-nexus-dim animate-pulse" />
              <p className="text-xs font-semibold">No notifications in this category</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
