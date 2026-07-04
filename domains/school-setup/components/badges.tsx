import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
  CampusStatus,
  AcademicYearStatus,
  TermStatus,
  DepartmentStatus,
  ClassGradeStatus,
  SchoolStatus,
  HolidayType,
} from '@/domains/school-setup/types';

const campusStatusConfig: Record<CampusStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
  maintenance: { label: 'Maintenance', className: 'bg-warning/10 text-warning border-warning/20' },
};

export function CampusStatusBadge({ status }: { status: CampusStatus }) {
  const config = campusStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const academicYearStatusConfig: Record<AcademicYearStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border' },
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  closed: { label: 'Closed', className: 'bg-info/10 text-info border-info/20' },
  archived: { label: 'Archived', className: 'bg-muted text-muted-foreground border-border' },
};

export function AcademicYearStatusBadge({ status }: { status: AcademicYearStatus }) {
  const config = academicYearStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const termStatusConfig: Record<TermStatus, { label: string; className: string }> = {
  upcoming: { label: 'Upcoming', className: 'bg-muted text-muted-foreground border-border' },
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  completed: { label: 'Completed', className: 'bg-info/10 text-info border-info/20' },
};

export function TermStatusBadge({ status }: { status: TermStatus }) {
  const config = termStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const departmentStatusConfig: Record<DepartmentStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
};

export function DepartmentStatusBadge({ status }: { status: DepartmentStatus }) {
  const config = departmentStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const classStatusConfig: Record<ClassGradeStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
};

export function ClassStatusBadge({ status }: { status: ClassGradeStatus }) {
  const config = classStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const schoolStatusConfig: Record<SchoolStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
  maintenance: { label: 'Maintenance', className: 'bg-warning/10 text-warning border-warning/20' },
};

export function SchoolStatusBadge({ status }: { status: SchoolStatus }) {
  const config = schoolStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const holidayTypeConfig: Record<HolidayType, { label: string; className: string }> = {
  national: { label: 'National', className: 'bg-primary/10 text-primary border-primary/20' },
  religious: { label: 'Religious', className: 'bg-info/10 text-info border-info/20' },
  school: { label: 'School Event', className: 'bg-warning/10 text-warning border-warning/20' },
  seasonal: { label: 'Seasonal Break', className: 'bg-success/10 text-success border-success/20' },
  exam: { label: 'Exam Period', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function HolidayTypeBadge({ type }: { type: HolidayType }) {
  const config = holidayTypeConfig[type];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
