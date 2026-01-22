import type { Group } from '../types/database.types';
import { getDefaultAvatarUrl } from '../lib/avatar';
import { Card, CardContent } from './ui/card';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <img
        src={group.avatar_url || getDefaultAvatarUrl(group.id)}
        alt={group.name}
        className="w-full h-48 object-cover"
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
  );
}
