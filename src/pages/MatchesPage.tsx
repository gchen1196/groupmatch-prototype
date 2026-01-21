import { useMatches } from '../hooks/useMatches';
import './MatchesPage.css';

interface MatchesPageProps {
  currentGroupId: string;
}

export function MatchesPage({ currentGroupId }: MatchesPageProps) {
  const { matches, isLoading, error } = useMatches(currentGroupId);

  if (isLoading) {
    return (
      <div className="matches-page">
        <h1 className="matches-page__title">Your Matches</h1>
        <div className="matches-page__loading">Loading matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-page">
        <h1 className="matches-page__title">Your Matches</h1>
        <div className="matches-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="matches-page">
      <h1 className="matches-page__title">Your Matches</h1>

      {matches.length === 0 ? (
        <div className="matches-page__empty">
          <p>No matches yet!</p>
          <p>Start swiping to find your matches.</p>
        </div>
      ) : (
        <ul className="matches-page__list">
          {matches.map((match) => (
            <li key={match.id} className="matches-page__item">
              <img
                src={
                  match.matchedGroup.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.matchedGroup.id}`
                }
                alt={match.matchedGroup.name}
                className="matches-page__avatar"
              />
              <div className="matches-page__info">
                <h3 className="matches-page__name">{match.matchedGroup.name}</h3>
                <span className="matches-page__members">
                  {match.matchedGroup.member_count} members
                </span>
                <p className="matches-page__bio">{match.matchedGroup.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
