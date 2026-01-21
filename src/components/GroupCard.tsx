import type { Group } from '../types/database.types';
import './GroupCard.css';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="group-card">
      <img
        src={group.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${group.id}`}
        alt={group.name}
        className="group-card__avatar"
      />
      <div className="group-card__content">
        <h2 className="group-card__name">{group.name}</h2>
        <span className="group-card__members">{group.member_count} members</span>
        <p className="group-card__bio">{group.bio}</p>
      </div>
    </div>
  );
}
