import type { Group } from '../types/database.types';
import { getDefaultAvatarUrl } from '../lib/avatar';
import { Card, CardContent } from './ui/card';

interface MatchCardProps {
  group: Group;
}

export function MatchCard({ group }: MatchCardProps) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <img
          src={group.avatar_url || getDefaultAvatarUrl(group.id)}
          alt={group.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{group.name}</h3>
          <span className="text-sm text-muted-foreground">
            {group.member_count} members
          </span>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {group.bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
