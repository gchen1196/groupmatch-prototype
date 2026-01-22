import { NavLink } from 'react-router-dom';
import { Compass, Heart, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface HeaderProps {
  groups: { id: string; name: string }[];
  currentGroupId: string;
  onGroupChange: (groupId: string) => void;
}

function Logo() {
  return (
    <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
      <Users className="w-5 h-5 text-primary" />
      <span>GroupMatch</span>
    </h1>
  );
}

function NavTabs() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
      isActive
        ? 'bg-background text-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <nav className="flex items-center gap-1 bg-muted p-1 rounded-lg">
      <NavLink to="/" end className={navLinkClass}>
        <Compass className="w-4 h-4" />
        <span>Discover</span>
      </NavLink>
      <NavLink to="/matches" className={navLinkClass}>
        <Heart className="w-4 h-4" />
        <span>Matches</span>
      </NavLink>
    </nav>
  );
}

interface GroupSelectorProps {
  groups: { id: string; name: string }[];
  currentGroupId: string;
  onGroupChange: (groupId: string) => void;
  compact?: boolean;
}

function GroupSelector({
  groups,
  currentGroupId,
  onGroupChange,
  compact = false,
}: GroupSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-muted-foreground" />
      <Select value={currentGroupId} onValueChange={onGroupChange}>
        <SelectTrigger
          className={compact ? 'w-35 h-9 text-sm' : 'w-45'}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {groups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function Header({ groups, currentGroupId, onGroupChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Mobile layout */}
        <div className="flex flex-col gap-3 py-3 sm:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <GroupSelector
              groups={groups}
              currentGroupId={currentGroupId}
              onGroupChange={onGroupChange}
              compact
            />
          </div>
          <div className="flex justify-center">
            <NavTabs />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex items-center py-3">
          <Logo />
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavTabs />
          </div>
          <div className="ml-auto">
            <GroupSelector
              groups={groups}
              currentGroupId={currentGroupId}
              onGroupChange={onGroupChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
