// src/services/notificationService.js
// Firebase Cloud Messaging (FCM) & Web Push Notifications Service

const STORAGE_KEY = 'nexus_notifications_v1';
const SETTINGS_KEY = 'nexus_notification_settings_v1';

const INITIAL_MOCK_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'message',
    title: 'Aria Chen',
    body: 'Sent an encrypted message with a 24h self-destruct timer 🔥',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    time: '5m ago',
    read: false,
    actionUrl: '/chat',
  },
  {
    id: 'notif_2',
    type: 'call',
    title: 'Layla Al-Mansoor',
    body: 'Incoming WebRTC Voice Call (P2P Secured) 📞',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    time: '25m ago',
    read: false,
    actionUrl: '/chat',
  },
  {
    id: 'notif_3',
    type: 'like',
    title: 'NeoTokyo Nomad',
    body: 'Liked your 24h story: "Quantum Node Active" ❤️',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    time: '1h ago',
    read: true,
    actionUrl: '/',
  },
  {
    id: 'notif_4',
    type: 'system',
    title: 'NEXUS Quantum Mesh',
    body: 'Edge server node synchronization completed successfully ⚡',
    avatar: null,
    time: '2h ago',
    read: true,
    actionUrl: '/settings',
  },
];

class NotificationService {
  constructor() {
    this.swRegistration = null;
    this.initServiceWorker();
  }

  // Register service worker if supported
  async initServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        this.swRegistration = reg;
      } catch (err) {
        console.warn('NEXUS Service Worker registration skipped or failed:', err);
      }
    }
  }

  // Check current browser permission status
  getPermissionStatus() {
    if (!('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission;
  }

  // Request browser notification permission
  async requestPermission() {
    if (!('Notification' in window)) {
      return 'unsupported';
    }
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (err) {
      console.error('Permission request error:', err);
      return 'denied';
    }
  }

  // Trigger native Web Notification popup if allowed
  sendNativeNotification({ title, body, icon, tag, data }) {
    if (this.getPermissionStatus() !== 'granted') return null;

    try {
      if (this.swRegistration && this.swRegistration.showNotification) {
        this.swRegistration.showNotification(title, {
          body,
          icon: icon || '/favicon.ico',
          tag: tag || 'nexus-alert',
          data,
        });
      } else {
        new Notification(title, {
          body,
          icon: icon || '/favicon.ico',
          tag: tag || 'nexus-alert',
        });
      }
    } catch (e) {
      console.warn('Native notification trigger failed:', e);
    }
  }

  // Stored Notifications API
  getStoredNotifications() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_NOTIFICATIONS));
        return INITIAL_MOCK_NOTIFICATIONS;
      }
      return JSON.parse(raw);
    } catch (e) {
      return INITIAL_MOCK_NOTIFICATIONS;
    }
  }

  saveNotifications(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save notifications:', e);
    }
  }

  addNotification(notif) {
    const list = this.getStoredNotifications();
    const newNotif = {
      id: `notif_${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif,
    };
    const updated = [newNotif, ...list];
    this.saveNotifications(updated);

    // Send native system notification
    this.sendNativeNotification({
      title: newNotif.title,
      body: newNotif.body,
      icon: newNotif.avatar,
    });

    return newNotif;
  }

  markAllAsRead() {
    const list = this.getStoredNotifications().map((n) => ({ ...n, read: true }));
    this.saveNotifications(list);
    return list;
  }

  clearAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  // Notification Settings Preferences
  getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) {
        const defaults = {
          messages: true,
          calls: true,
          likes: true,
          system: true,
          sound: true,
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaults));
        return defaults;
      }
      return JSON.parse(raw);
    } catch (e) {
      return { messages: true, calls: true, likes: true, system: true, sound: true };
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save notification settings:', e);
    }
  }

  // Trigger simulated push notification for demo
  triggerTestPush(type = 'message') {
    const mockTemplates = {
      message: {
        type: 'message',
        title: 'Kaelen Vance',
        body: '🔑 Sent an encrypted payload to your node: "Decentralized mesh operational."',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        actionUrl: '/chat',
      },
      call: {
        type: 'call',
        title: 'Aria Chen',
        body: '📹 Incoming P2P WebRTC Video Call',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        actionUrl: '/chat',
      },
      like: {
        type: 'like',
        title: 'CyberAura',
        body: '❤️ Liked your reel: "Quantum Node Latency Test"',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        actionUrl: '/reels',
      },
      system: {
        type: 'system',
        title: 'NEXUS Security Sentinel',
        body: '⚡ WebRTC end-to-end encryption handshake verified',
        avatar: null,
        actionUrl: '/settings',
      },
    };

    const template = mockTemplates[type] || mockTemplates.message;
    return this.addNotification(template);
  }
}

export const notificationService = new NotificationService();
export default notificationService;
