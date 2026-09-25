// src/hooks/useStories.js
// Hook for managing 24-hour ephemeral stories with automatic expiration purging

import { useState, useEffect, useCallback } from 'react';
import {
  getActiveStories,
  createStory as addStory,
  markStorySeen,
  likeStorySlide,
} from '@/services/storyService';

export function useStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStories = useCallback(async () => {
    const active = await getActiveStories();
    setStories(active);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStories();

    // Check for 24h expiration every 30 seconds
    const interval = setInterval(() => {
      loadStories();
    }, 30000);

    const handleUpdate = () => {
      loadStories();
    };

    window.addEventListener('nexus_stories_updated', handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('nexus_stories_updated', handleUpdate);
    };
  }, [loadStories]);

  const create = async (storyData) => {
    return await addStory(storyData);
  };

  const markSeen = (userId) => {
    markStorySeen(userId);
  };

  const likeSlide = (userId, slideId) => {
    likeStorySlide(userId, slideId);
  };

  return {
    stories,
    loading,
    createStory: create,
    markSeen,
    likeSlide,
    refreshStories: loadStories,
  };
}

export default useStories;
