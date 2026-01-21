import { useState, useEffect, useCallback } from 'react';
import type { Group, Match } from '../types/database.types';
import { groupService } from '../services/groupService';
import { matchService } from '../services/matchService';

interface UseDiscoveryReturn {
  groups: Group[];
  currentGroup: Group | null;
  isLoading: boolean;
  error: string | null;
  newMatch: Match | null;
  swipe: (isLike: boolean) => Promise<void>;
  dismissMatch: () => void;
}

export function useDiscovery(currentGroupId: string): UseDiscoveryReturn {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMatch, setNewMatch] = useState<Match | null>(null);

  const loadGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await groupService.getDiscoverableGroups(currentGroupId);
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load groups');
    } finally {
      setIsLoading(false);
    }
  }, [currentGroupId]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const swipe = useCallback(
    async (isLike: boolean) => {
      const currentGroup = groups[0];
      if (!currentGroup) return;

      try {
        const match = await matchService.recordSwipe(
          currentGroupId,
          currentGroup.id,
          isLike
        );

        if (match) {
          setNewMatch(match);
        }

        // Remove swiped group from stack
        setGroups((prev) => prev.slice(1));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to record swipe');
      }
    },
    [groups, currentGroupId]
  );

  const dismissMatch = useCallback(() => {
    setNewMatch(null);
  }, []);

  return {
    groups,
    currentGroup: groups[0] || null,
    isLoading,
    error,
    newMatch,
    swipe,
    dismissMatch,
  };
}
