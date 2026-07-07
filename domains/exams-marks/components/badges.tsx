import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
  ExamStatus,
  MarkEntryStatus,
  ResultStatus,
  ReportCardReadinessStatus,
  ExamAlertSeverity,
} from '@/domains/exams-marks/types';
import {
  getExamStatusTone,
  getMarkEntryStatusTone,
  getResultStatusTone,
  getReadinessStatusTone,
  getExamAlertSeverityTone,
} from '@/domains/exams-marks/services/exams-marks';

export function ExamStatusBadge({ status }: { status: ExamStatus }) {
  const tone = getExamStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function MarkEntryStatusBadge({ status }: { status: MarkEntryStatus }) {
  const tone = getMarkEntryStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function ResultStatusBadge({ status }: { status: ResultStatus }) {
  const tone = getResultStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function ReadinessStatusBadge({ status }: { status: ReportCardReadinessStatus }) {
  const tone = getReadinessStatusTone(status);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {status}
    </Badge>
  );
}

export function ExamAlertSeverityBadge({ severity }: { severity: ExamAlertSeverity }) {
  const tone = getExamAlertSeverityTone(severity);
  return (
    <Badge variant="outline" className={cn('text-xs', tone.className)}>
      {severity}
    </Badge>
  );
}

const examTypeConfig: Record<string, { className: string }> = {
  'Unit Test': { className: 'bg-info/10 text-info border-info/20' },
  'Weekly Test': { className: 'bg-primary/10 text-primary border-primary/20' },
  'Monthly Test': { className: 'bg-warning/10 text-warning border-warning/20' },
  'Mid Term': { className: 'bg-success/10 text-success border-success/20' },
  'Term End': { className: 'bg-success/10 text-success border-success/20' },
  'Final Exam': { className: 'bg-destructive/10 text-destructive border-destructive/20' },
  'Practical Exam': { className: 'bg-info/10 text-info border-info/20' },
  'Oral Assessment': { className: 'bg-primary/10 text-primary border-primary/20' },
  'Internal Assessment': { className: 'bg-muted text-muted-foreground border-border' },
};

export function ExamTypeBadge({ type }: { type: string }) {
  const config = examTypeConfig[type] || { className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {type}
    </Badge>
  );
}

const assessmentTypeConfig: Record<string, { className: string }> = {
  Theory: { className: 'bg-primary/10 text-primary border-primary/20' },
  Practical: { className: 'bg-success/10 text-success border-success/20' },
  Oral: { className: 'bg-info/10 text-info border-info/20' },
  Project: { className: 'bg-warning/10 text-warning border-warning/20' },
  Assignment: { className: 'bg-muted text-muted-foreground border-border' },
  Internal: { className: 'bg-muted/50 text-muted-foreground border-border' },
};

export function AssessmentTypeBadge({ type }: { type: string }) {
  const config = assessmentTypeConfig[type] || { className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {type}
    </Badge>
  );
}

const gradingScaleConfig: Record<string, { className: string }> = {
  Percentage: { className: 'bg-primary/10 text-primary border-primary/20' },
  GPA: { className: 'bg-success/10 text-success border-success/20' },
  'Letter Grade': { className: 'bg-info/10 text-info border-info/20' },
  'Custom Band': { className: 'bg-warning/10 text-warning border-warning/20' },
};

export function GradingScaleBadge({ type }: { type: string }) {
  const config = gradingScaleConfig[type] || { className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {type}
    </Badge>
  );
}

const passFailConfig: Record<'Pass' | 'Fail' | 'Compartment', { className: string }> = {
  Pass: { className: 'bg-success/10 text-success border-success/20' },
  Fail: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
  Compartment: { className: 'bg-warning/10 text-warning border-warning/20' },
};

export function PassFailBadge({ status }: { status: 'Pass' | 'Fail' | 'Compartment' }) {
  const config = passFailConfig[status];
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {status}
    </Badge>
  );
}

const gradeConfig: Record<string, { className: string }> = {
  'A+': { className: 'bg-success/10 text-success border-success/20' },
  A: { className: 'bg-success/10 text-success border-success/20' },
  'B+': { className: 'bg-primary/10 text-primary border-primary/20' },
  B: { className: 'bg-info/10 text-info border-info/20' },
  C: { className: 'bg-warning/10 text-warning border-warning/20' },
  D: { className: 'bg-warning/10 text-warning border-warning/20' },
  F: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function GradeBadge({ grade }: { grade: string }) {
  const config = gradeConfig[grade] || { className: 'bg-muted text-muted-foreground border-border' };
  return (
    <Badge variant="outline" className={cn('text-xs', config.className)}>
      {grade}
    </Badge>
  );
}
