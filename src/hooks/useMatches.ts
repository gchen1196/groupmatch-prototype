import { useState, useEffect, useCallback } from 'react';
import { matchService, type MatchWithGroup } from '../services/matchService';

interface UseMatchesReturn {
  matches: MatchWithGroup[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useMatches(currentGroupId: string): UseMatchesReturn {
  const [matches, setMatches] = useState<MatchWithGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await matchService.getMatchesForGroup(currentGroupId);
      setMatches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load matches');
    } finally {
      setIsLoading(false);
    }
  }, [currentGroupId]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return {
    matches,
    isLoading,
    error,
    refresh: loadMatches,
  };
}
