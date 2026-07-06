import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
  StudentStatus,
  AdmissionStatus,
  EnrollmentStatus,
  DocumentStatus,
  GuardianRelation,
  ApplicationSource,
  StudentTag,
} from '@/domains/student-lifecycle/types';

const studentStatusConfig: Record<StudentStatus, { label: string; className: string }> = {
  Inquiry: { label: 'Inquiry', className: 'bg-muted text-muted-foreground border-border' },
  Applicant: { label: 'Applicant', className: 'bg-info/10 text-info border-info/20' },
  Offered: { label: 'Offered', className: 'bg-warning/10 text-warning border-warning/20' },
  Enrolled: { label: 'Enrolled', className: 'bg-primary/10 text-primary border-primary/20' },
  Active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  'On Hold': { label: 'On Hold', className: 'bg-warning/10 text-warning border-warning/20' },
  Transferred: { label: 'Transferred', className: 'bg-info/10 text-info border-info/20' },
  Withdrawn: { label: 'Withdrawn', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  Alumni: { label: 'Alumni', className: 'bg-primary/10 text-primary border-primary/20' },
  Archived: { label: 'Archived', className: 'bg-muted text-muted-foreground border-border' },
};

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const config = studentStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const admissionStatusConfig: Record<AdmissionStatus, { label: string; className: string }> = {
  'Not Started': { label: 'Not Started', className: 'bg-muted text-muted-foreground border-border' },
  'Inquiry Received': { label: 'Inquiry', className: 'bg-muted text-muted-foreground border-border' },
  'Application Submitted': { label: 'Submitted', className: 'bg-info/10 text-info border-info/20' },
  'Documents Pending': { label: 'Docs Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  'Assessment Scheduled': { label: 'Assessment', className: 'bg-info/10 text-info border-info/20' },
  'Interview Scheduled': { label: 'Interview', className: 'bg-info/10 text-info border-info/20' },
  'Under Review': { label: 'Under Review', className: 'bg-warning/10 text-warning border-warning/20' },
  'Offer Issued': { label: 'Offer Issued', className: 'bg-warning/10 text-warning border-warning/20' },
  'Offer Accepted': { label: 'Accepted', className: 'bg-success/10 text-success border-success/20' },
  Rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  Waitlisted: { label: 'Waitlisted', className: 'bg-warning/10 text-warning border-warning/20' },
  Cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function AdmissionStatusBadge({ status }: { status: AdmissionStatus }) {
  const config = admissionStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const enrollmentStatusConfig: Record<EnrollmentStatus, { label: string; className: string }> = {
  'Not Enrolled': { label: 'Not Enrolled', className: 'bg-muted text-muted-foreground border-border' },
  'Pending Assignment': { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  Assigned: { label: 'Assigned', className: 'bg-info/10 text-info border-info/20' },
  Active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  Hold: { label: 'Hold', className: 'bg-warning/10 text-warning border-warning/20' },
  Completed: { label: 'Completed', className: 'bg-info/10 text-info border-info/20' },
  Cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function EnrollmentStatusBadge({ status }: { status: EnrollmentStatus }) {
  const config = enrollmentStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const documentStatusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground border-border' },
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info border-info/20' },
  verified: { label: 'Verified', className: 'bg-success/10 text-success border-success/20' },
  expired: { label: 'Expired', className: 'bg-warning/10 text-warning border-warning/20' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  const config = documentStatusConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}

const tagConfig: Record<StudentTag, string> = {
  Scholarship: 'bg-primary/10 text-primary border-primary/20',
  'Sports Quota': 'bg-success/10 text-success border-success/20',
  'Special Needs': 'bg-warning/10 text-warning border-warning/20',
  'Transport Required': 'bg-info/10 text-info border-info/20',
  Hostel: 'bg-primary/10 text-primary border-primary/20',
  'Sibling Discount': 'bg-info/10 text-info border-info/20',
  'Staff Child': 'bg-primary/10 text-primary border-primary/20',
  'New Admission': 'bg-success/10 text-success border-success/20',
  'Transfer Student': 'bg-warning/10 text-warning border-warning/20',
};

export function StudentTagBadge({ tag }: { tag: StudentTag }) {
  return (
    <Badge variant="outline" className={cn('text-xs', tagConfig[tag])}>
      {tag}
    </Badge>
  );
}

export function GuardianRelationBadge({ relation }: { relation: GuardianRelation }) {
  return (
    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-border">
      {relation}
    </Badge>
  );
}

export function ApplicationSourceBadge({ source }: { source: ApplicationSource }) {
  return (
    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-border">
      {source}
    </Badge>
  );
}
