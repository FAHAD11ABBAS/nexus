// src/hooks/useConversations.js
// Hook for fetching and real-time syncing conversation list

import { useState, useEffect } from 'react';
import { getConversations, getLocalStore } from '@/services/chatService';

export function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const convs = await getConversations();
      if (mounted) {
        // Read the latest message from local store for each conversation
        const store = getLocalStore();
        const updated = convs.map((conv) => {
          const msgs = store[conv.id] || [];
          const last = msgs[msgs.length - 1];
          return {
            ...conv,
            lastMessage: last ? last.text || (last.mediaUrl ? '📷 Media' : '') : conv.lastMessage,
            lastMessageTime: last ? last.createdAt : conv.lastMessageTime,
          };
        });
        setConversations(updated);
        setLoading(false);
      }
    }

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener('nexus_messages_updated', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('nexus_messages_updated', handleUpdate);
    };
  }, []);

  return { conversations, loading };
}

export default useConversations;
