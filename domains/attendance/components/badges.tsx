import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
  AttendanceStatus,
  AttendanceSessionStatus,
  AttendanceLeaveStatus,
  AttendanceAlertSeverity,
} from '@/domains/attendance/types';
import {
  getAttendanceStatusTone,
  getSessionStatusTone,
  getLeaveStatusTone,
  getAlertSeverityTone,
  getExceptionStatusTone,
} from '@/domains/attendance/services/attendance';

export function AttendanceStatusBadge({ status }: { status: AttendanceStatus }) {
  const tone = getAttendanceStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function SessionStatusBadge({ status }: { status: AttendanceSessionStatus }) {
  const tone = getSessionStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function LeaveStatusBadge({ status }: { status: AttendanceLeaveStatus }) {
  const tone = getLeaveStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function ExceptionStatusBadge({
  status,
}: {
  status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed';
}) {
  const tone = getExceptionStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function AlertSeverityBadge({ severity }: { severity: AttendanceAlertSeverity }) {
  const tone = getAlertSeverityTone(severity);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {severity}
    </Badge>
  );
}

const alertStatusConfig: Record<'Active' | 'Acknowledged' | 'Resolved', { label: string; className: string }> = {
  Active: { label: 'Active', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  Acknowledged: { label: 'Acknowledged', className: 'bg-warning/10 text-warning border-warning/20' },
  Resolved: { label: 'Resolved', className: 'bg-success/10 text-success border-success/20' },
};

export function AlertStatusBadge({ status }: { status: 'Active' | 'Acknowledged' | 'Resolved' }) {
  const config = alertStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
