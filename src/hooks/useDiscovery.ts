import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Match } from '../types/database.types';
import { groupService } from '../services/groupService';
import { matchService } from '../services/matchService';

export function useDiscovery(currentGroupId: string) {
  const queryClient = useQueryClient();
  const [newMatch, setNewMatch] = useState<Match | null>(null);

  const {
    data: groups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['discoverable-groups', currentGroupId],
    queryFn: () => groupService.getDiscoverableGroups(currentGroupId),
  });

  const swipeMutation = useMutation({
    mutationFn: ({ receiverId, isLike }: { receiverId: string; isLike: boolean }) =>
      matchService.recordSwipe(currentGroupId, receiverId, isLike),
    onSuccess: (match) => {
      if (match) {
        setNewMatch(match);
        // Invalidate matches query so it refetches
        queryClient.invalidateQueries({ queryKey: ['matches', currentGroupId] });
      }
      // Remove swiped group from cache
      queryClient.setQueryData(
        ['discoverable-groups', currentGroupId],
        (old: typeof groups) => old?.slice(1) ?? []
      );
    },
  });

  const swipe = useCallback(
    async (isLike: boolean) => {
      const currentGroup = groups[0];
      if (!currentGroup) return;
      await swipeMutation.mutateAsync({ receiverId: currentGroup.id, isLike });
    },
    [groups, swipeMutation]
  );

  const dismissMatch = useCallback(() => {
    setNewMatch(null);
  }, []);

  return {
    groups,
    currentGroup: groups[0] || null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    newMatch,
    swipe,
    dismissMatch,
  };
}
