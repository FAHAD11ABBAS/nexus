// src/hooks/useMessages.js
// Hook for managing conversation messages and client-side self-destruct purging

import { useState, useEffect, useCallback } from 'react';
import {
  getLocalStore,
  saveLocalStore,
  sendMessage as sendChatMsg,
  deleteMessage as deleteChatMsg,
  purgeExpiredMessages,
} from '@/services/chatService';

export function useMessages(convId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync messages and purge any that have expired
  const refreshMessages = useCallback(() => {
    if (!convId) return;
    const store = getLocalStore();
    const current = store[convId] || [];
    const valid = purgeExpiredMessages(current);

    if (valid.length !== current.length) {
      store[convId] = valid;
      saveLocalStore(store);
    }

    setMessages(valid);
    setLoading(false);
  }, [convId]);

  useEffect(() => {
    refreshMessages();

    // Re-check for expired messages every 3 seconds
    const interval = setInterval(() => {
      refreshMessages();
    }, 3000);

    const handleUpdate = () => {
      refreshMessages();
    };

    window.addEventListener('nexus_messages_updated', handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('nexus_messages_updated', handleUpdate);
    };
  }, [convId, refreshMessages]);

  const send = async (msgData) => {
    return await sendChatMsg({ convId, ...msgData });
  };

  const remove = async (messageId) => {
    return await deleteChatMsg(convId, messageId);
  };

  return {
    messages,
    loading,
    sendMessage: send,
    deleteMessage: remove,
    refreshMessages,
  };
}

export default useMessages;
