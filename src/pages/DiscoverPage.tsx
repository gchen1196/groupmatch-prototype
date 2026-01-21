import { useDiscovery } from '../hooks/useDiscovery';
import { GroupCard } from '../components/GroupCard';
import { SwipeButtons } from '../components/SwipeButtons';
import { MatchCelebration } from '../components/MatchCelebration';
import './DiscoverPage.css';

interface DiscoverPageProps {
  currentGroupId: string;
}

export function DiscoverPage({ currentGroupId }: DiscoverPageProps) {
  const { currentGroup, isLoading, error, newMatch, swipe, dismissMatch } =
    useDiscovery(currentGroupId);

  if (isLoading) {
    return (
      <div className="discover-page">
        <div className="discover-page__loading">Loading groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discover-page">
        <div className="discover-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="discover-page">
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
        <div className="discover-page__empty">
          <p>No more groups to discover!</p>
          <p>Check back later for new groups.</p>
        </div>
      )}
    </div>
  );
}
