import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { StatItem } from '@/shared/types';

const accentMap: Record<StatItem['accent'], string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
  destructive: 'bg-destructive/10 text-destructive',
};

const trendMap: Record<NonNullable<StatItem['trend']>, string> = {
  up: 'text-success',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
};

export function StatCard({ stat }: { stat: StatItem }) {
  const Icon = stat.icon;
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
            {stat.change ? (
              <p
                className={cn(
                  'text-xs font-medium',
                  stat.trend ? trendMap[stat.trend] : 'text-muted-foreground'
                )}
              >
                {stat.change}
              </p>
            ) : null}
          </div>
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-lg',
              accentMap[stat.accent]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
