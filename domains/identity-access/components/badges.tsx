import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { UserStatus, UserRole, AccessLevel, SecuritySeverity } from '@/domains/identity-access/types';

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  invited: { label: 'Invited', className: 'bg-info/10 text-info border-info/20' },
  suspended: { label: 'Suspended', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const roleLabels: Record<UserRole, string> = {
  'super-admin': 'Super Admin',
  'school-admin': 'School Admin',
  principal: 'Principal',
  'academic-coordinator': 'Academic Coordinator',
  teacher: 'Teacher',
  accountant: 'Accountant',
  'admissions-officer': 'Admissions Officer',
  staff: 'Staff',
  parent: 'Parent',
  student: 'Student',
};

export function roleLabel(role: UserRole): string {
  return roleLabels[role] ?? role;
}

const accessLevelConfig: Record<AccessLevel, { label: string; className: string }> = {
  full: { label: 'Full', className: 'bg-primary/10 text-primary border-primary/20' },
  manage: { label: 'Manage', className: 'bg-info/10 text-info border-info/20' },
  view: { label: 'View', className: 'bg-muted text-muted-foreground border-border' },
  limited: { label: 'Limited', className: 'bg-warning/10 text-warning border-warning/20' },
  none: { label: 'None', className: 'bg-muted/50 text-muted-foreground/60 border-transparent' },
};

export function AccessLevelBadge({ level }: { level: AccessLevel }) {
  const config = accessLevelConfig[level];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const severityConfig: Record<SecuritySeverity, { label: string; className: string }> = {
  info: { label: 'Info', className: 'bg-info/10 text-info border-info/20' },
  warning: { label: 'Warning', className: 'bg-warning/10 text-warning border-warning/20' },
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function SeverityBadge({ severity }: { severity: SecuritySeverity }) {
  const config = severityConfig[severity];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
