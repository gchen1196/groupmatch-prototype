import { X, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
  highlightDirection?: 'left' | 'right' | null;
}

export function SwipeButtons({
  onPass,
  onLike,
  disabled,
  highlightDirection,
}: SwipeButtonsProps) {
  const isPassHighlighted = highlightDirection === 'left';
  const isLikeHighlighted = highlightDirection === 'right';

  return (
    <div className="flex gap-6 justify-center mt-6">
      <Button
        variant="outline"
        size="icon"
        className={`w-16 h-16 rounded-full shadow-lg transition-all duration-200 ${
          isPassHighlighted
            ? 'bg-red-500 text-white border-red-500 scale-110'
            : isLikeHighlighted
              ? 'opacity-0 scale-75'
              : 'bg-red-50 border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 active:scale-95'
        }`}
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
      >
        <X className="w-8 h-8" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`w-16 h-16 rounded-full shadow-lg transition-all duration-200 ${
          isLikeHighlighted
            ? 'bg-green-500 text-white border-green-500 scale-110'
            : isPassHighlighted
              ? 'opacity-0 scale-75'
              : 'bg-green-50 border-green-200 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 active:scale-95'
        }`}
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        <Heart className="w-8 h-8" />
      </Button>
    </div>
  );
}
