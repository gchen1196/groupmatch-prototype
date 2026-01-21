import './SwipeButtons.css';

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeButtons({ onPass, onLike, disabled }: SwipeButtonsProps) {
  return (
    <div className="swipe-buttons">
      <button
        className="swipe-buttons__btn swipe-buttons__btn--pass"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
      >
        ✕
      </button>
      <button
        className="swipe-buttons__btn swipe-buttons__btn--like"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        ♥
      </button>
    </div>
  );
}
