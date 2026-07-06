import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SubjectType, SubjectStatus, TimetableStatus, PeriodType } from '@/domains/academics/types';

const subjectTypeConfig: Record<SubjectType, { label: string; className: string }> = {
  Core: { label: 'Core', className: 'bg-primary/10 text-primary border-primary/20' },
  Elective: { label: 'Elective', className: 'bg-info/10 text-info border-info/20' },
  Language: { label: 'Language', className: 'bg-success/10 text-success border-success/20' },
  'Co-curricular': { label: 'Co-curricular', className: 'bg-warning/10 text-warning border-warning/20' },
  Vocational: { label: 'Vocational', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function SubjectTypeBadge({ type }: { type: SubjectType }) {
  const config = subjectTypeConfig[type];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const subjectStatusConfig: Record<SubjectStatus, { label: string; className: string }> = {
  Active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  Inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
  Draft: { label: 'Draft', className: 'bg-warning/10 text-warning border-warning/20' },
};

export function SubjectStatusBadge({ status }: { status: SubjectStatus }) {
  const config = subjectStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const timetableStatusConfig: Record<TimetableStatus, { label: string; className: string }> = {
  Draft: { label: 'Draft', className: 'bg-warning/10 text-warning border-warning/20' },
  Published: { label: 'Published', className: 'bg-success/10 text-success border-success/20' },
};

export function TimetableStatusBadge({ status }: { status: TimetableStatus }) {
  const config = timetableStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

export function getPeriodTypeStyle(type: PeriodType): string {
  switch (type) {
    case 'Teaching':
      return 'bg-primary/5 border-primary/20';
    case 'Break':
      return 'bg-warning/5 border-warning/20';
    case 'Assembly':
      return 'bg-info/5 border-info/20';
  }
}
