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

export function Header({ groups, currentGroupId, onGroupChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col gap-3 py-3 sm:hidden">
          {/* Mobile header row: Logo + Group selector */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>GroupMatch</span>
            </h1>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <Select value={currentGroupId} onValueChange={onGroupChange}>
                <SelectTrigger className="w-[140px] h-9 text-sm">
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
          </div>

          {/* Mobile nav tabs - centered */}
          <nav className="flex items-center justify-center gap-1 bg-muted p-1 rounded-lg">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </NavLink>
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Heart className="w-4 h-4" />
              <span>Matches</span>
            </NavLink>
          </nav>
        </div>

        {/* Desktop: single row with centered nav */}
        <div className="hidden sm:flex items-center py-3">
          {/* Left: Logo */}
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>GroupMatch</span>
          </h1>

          {/* Center: Navigation tabs (absolute centered) */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-muted p-1 rounded-lg">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </NavLink>
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Heart className="w-4 h-4" />
              <span>Matches</span>
            </NavLink>
          </nav>

          {/* Right: Group selector with icon */}
          <div className="ml-auto flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <Select value={currentGroupId} onValueChange={onGroupChange}>
              <SelectTrigger className="w-[180px]">
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
        </div>
      </div>
    </header>
  );
}
