import { useDiscovery } from '../hooks/useDiscovery';
import { GroupCard } from '../components/GroupCard';
import { SwipeButtons } from '../components/SwipeButtons';
import { MatchCelebration } from '../components/MatchCelebration';

interface DiscoverPageProps {
  currentGroupId: string;
}

export function DiscoverPage({ currentGroupId }: DiscoverPageProps) {
  const { currentGroup, isLoading, error, newMatch, swipe, dismissMatch } =
    useDiscovery(currentGroupId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="text-muted-foreground">Loading groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      {newMatch && <MatchCelebration onDismiss={dismissMatch} />}

      {currentGroup ? (
        <>
          <GroupCard group={currentGroup} />
          <SwipeButtons
            onPass={() => swipe(false)}
            onLike={() => swipe(true)}
          />
        </>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No more groups to discover!</p>
          <p>Check back later for new groups.</p>
        </div>
      )}
    </div>
  );
}
