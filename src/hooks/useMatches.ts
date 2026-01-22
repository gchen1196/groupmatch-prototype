import { useQuery } from '@tanstack/react-query';
import { matchService } from '../services/matchService';

export function useMatches(currentGroupId: string) {
  const {
    data: matches = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['matches', currentGroupId],
    queryFn: () => matchService.getMatchesForGroup(currentGroupId),
  });

  return {
    matches,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: refetch,
  };
}
