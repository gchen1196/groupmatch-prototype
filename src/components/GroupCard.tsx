import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import type { Group } from '../types/database.types';
import { getDefaultAvatarUrl } from '../lib/avatar';
import { Card, CardContent } from './ui/card';

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

      // Notify parent of swipe direction when past threshold
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
        className="w-full max-w-sm overflow-hidden"
        style={{
          transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <img
          src={group.avatar_url || getDefaultAvatarUrl(group.id)}
          alt={group.name}
          className="w-full h-48 object-cover pointer-events-none"
        />
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-foreground">{group.name}</h2>
          <span className="text-sm text-muted-foreground">
            {group.member_count} members
          </span>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3 min-h-15">
            {group.bio}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
