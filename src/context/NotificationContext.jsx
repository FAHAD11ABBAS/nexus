// src/context/NotificationContext.jsx
// React Context providing real-time notification state and banner alerts

import { createContext, useContext, useState, useEffect } from 'react';
import notificationService from '@/services/notificationService';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState(
    notificationService.getPermissionStatus()
  );
  const [activeToast, setActiveToast] = useState(null);
  const [settings, setSettings] = useState(notificationService.getSettings());

  // Load initial notifications
  useEffect(() => {
    const list = notificationService.getStoredNotifications();
    setNotifications(list);
  }, []);

  // Sync permission status
  const requestPermission = async () => {
    const status = await notificationService.requestPermission();
    setPermissionStatus(status);
    return status;
  };

  // Trigger test push notification & active toast banner
  const triggerTestPush = (type = 'message') => {
    const newNotif = notificationService.triggerTestPush(type);
    setNotifications((prev) => [newNotif, ...prev]);

    // Show floating top toast banner
    setActiveToast(newNotif);

    // Auto-dismiss toast after 5 seconds
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === newNotif.id ? null : curr));
    }, 5000);

    return newNotif;
  };

  const markAllAsRead = () => {
    const updated = notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const clearAll = () => {
    notificationService.clearAll();
    setNotifications([]);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const updateSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    notificationService.saveSettings(merged);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        permissionStatus,
        activeToast,
        settings,
        requestPermission,
        triggerTestPush,
        markAllAsRead,
        clearAll,
        dismissToast,
        updateSettings,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
