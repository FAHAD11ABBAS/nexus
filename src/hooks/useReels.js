// src/hooks/useReels.js
// Hook for managing Reels feed state, reactive counters and interactions

import { useState, useEffect, useCallback } from 'react';
import {
  fetchReels,
  toggleLike,
  toggleSave,
  toggleFollow,
  addComment,
} from '@/services/reelsService';

export function useReels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReels = useCallback(async () => {
    const data = await fetchReels();
    setReels([...data]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReels();

    const handleUpdate = () => {
      loadReels();
    };

    window.addEventListener('nexus_reels_updated', handleUpdate);
    return () => {
      window.removeEventListener('nexus_reels_updated', handleUpdate);
    };
  }, [loadReels]);

  const onToggleLike = (reelId) => {
    toggleLike(reelId);
  };

  const onToggleSave = (reelId) => {
    toggleSave(reelId);
  };

  const onToggleFollow = (creatorId) => {
    toggleFollow(creatorId);
  };

  const onAddComment = (reelId, commentData) => {
    return addComment(reelId, commentData);
  };

  return {
    reels,
    loading,
    toggleLike: onToggleLike,
    toggleSave: onToggleSave,
    toggleFollow: onToggleFollow,
    addComment: onAddComment,
    refreshReels: loadReels,
  };
}

export default useReels;
