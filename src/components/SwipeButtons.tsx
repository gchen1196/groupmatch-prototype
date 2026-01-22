import { X, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeButtons({ onPass, onLike, disabled }: SwipeButtonsProps) {
  return (
    <div className="flex gap-6 justify-center mt-6">
      <Button
        variant="outline"
        size="icon"
        className="w-16 h-16 rounded-full bg-red-50 border-red-200 text-red-500 shadow-lg hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 active:scale-95 transition-all duration-200"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
      >
        <X className="w-8 h-8" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-16 h-16 rounded-full bg-green-50 border-green-200 text-green-500 shadow-lg hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 active:scale-95 transition-all duration-200"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        <Heart className="w-8 h-8" />
      </Button>
    </div>
  );
}
