import { useMatches } from '../hooks/useMatches';
import { MatchCard } from '../components/MatchCard';

interface MatchesPageProps {
  currentGroupId: string;
}

export function MatchesPage({ currentGroupId }: MatchesPageProps) {
  const { matches, isLoading, error } = useMatches(currentGroupId);

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Matches</h1>
        <div className="text-muted-foreground">Loading matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Matches</h1>
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Your Matches</h1>

      {matches.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No matches yet!</p>
          <p>Start swiping to find your matches.</p>
        </div>
      ) : (
        <ul className="space-y-4 max-w-2xl">
          {matches.map((match) => (
            <li key={match.id}>
              <MatchCard group={match.matchedGroup} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
