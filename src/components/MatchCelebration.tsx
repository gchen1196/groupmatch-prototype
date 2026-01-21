import './MatchCelebration.css';

interface MatchCelebrationProps {
  onDismiss: () => void;
}

export function MatchCelebration({ onDismiss }: MatchCelebrationProps) {
  return (
    <div className="match-celebration" onClick={onDismiss}>
      <div className="match-celebration__content">
        <div className="match-celebration__emoji">🎉</div>
        <h1 className="match-celebration__title">It's a Match!</h1>
        <p className="match-celebration__subtitle">
          You both liked each other!
        </p>
        <button className="match-celebration__btn" onClick={onDismiss}>
          Keep Swiping
        </button>
      </div>
    </div>
  );
}
