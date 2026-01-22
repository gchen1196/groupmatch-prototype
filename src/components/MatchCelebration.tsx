import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface MatchCelebrationProps {
  onDismiss: () => void;
}

export function MatchCelebration({ onDismiss }: MatchCelebrationProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onDismiss}
    >
      <Card className="text-center p-8 animate-in zoom-in-95 duration-300">
        <CardContent className="p-0">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            It's a Match!
          </h1>
          <p className="text-muted-foreground mb-6">
            You both liked each other!
          </p>
          <Button onClick={onDismiss}>Keep Swiping</Button>
        </CardContent>
      </Card>
    </div>
  );
}
