import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Users } from 'lucide-react';
import type { Group } from '../types/database.types';
import { getDefaultAvatarUrl } from '../lib/avatar';
import { Card } from './ui/card';

interface GroupCardProps {
  group: Group;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDirectionChange?: (direction: 'left' | 'right' | null) => void;
}

export function GroupCard({
  group,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDirectionChange,
}: GroupCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const swipeThreshold = 100;

  const handlers = useSwipeable({
    onSwiping: (e) => {
      setIsDragging(true);
      setOffsetX(e.deltaX);

      if (onSwipeDirectionChange) {
        if (e.deltaX > swipeThreshold) {
          onSwipeDirectionChange('right');
        } else if (e.deltaX < -swipeThreshold) {
          onSwipeDirectionChange('left');
        } else {
          onSwipeDirectionChange(null);
        }
      }
    },
    onSwipedLeft: () => {
      if (Math.abs(offsetX) > swipeThreshold && onSwipeLeft) {
        onSwipeLeft();
      }
      setOffsetX(0);
      setIsDragging(false);
      onSwipeDirectionChange?.(null);
    },
    onSwipedRight: () => {
      if (Math.abs(offsetX) > swipeThreshold && onSwipeRight) {
        onSwipeRight();
      }
      setOffsetX(0);
      setIsDragging(false);
      onSwipeDirectionChange?.(null);
    },
    onTouchEndOrOnMouseUp: () => {
      setOffsetX(0);
      setIsDragging(false);
      onSwipeDirectionChange?.(null);
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const rotation = offsetX / 20;

  return (
    <div {...handlers} className="touch-none select-none">
      <Card
        className="w-full max-w-sm overflow-hidden shadow-xl"
        style={{
          transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {/* Image container with overlay */}
        <div className="relative h-80">
          <img
            src={group.avatar_url || getDefaultAvatarUrl(group.id)}
            alt={group.name}
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Member count badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {group.member_count}
            </span>
          </div>

          {/* Content overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-2xl font-bold text-white drop-shadow-md">
              {group.name}
            </h2>
          </div>
        </div>

        {/* Bio section with glassmorphism */}
        <div className="relative -mt-4 mx-3 mb-3">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-sm border border-white/50">
            <p className="text-sm text-muted-foreground line-clamp-3 min-h-15 leading-relaxed">
              {group.bio}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
