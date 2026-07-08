'use client';

import { Badge } from '@/components/ui/badge';
import type {
  HomeworkStatus,
  SubmissionStatus,
  ReviewStatus,
  PriorityLevel,
  HomeworkAlertSeverity,
  HomeworkTaskType,
} from '../types';
import {
  getHomeworkStatusTone,
  getSubmissionStatusTone,
  getReviewStatusTone,
  getPriorityTone,
  getAlertSeverityTone,
  getTaskTypeTone,
} from '../services/homework';

interface HomeworkStatusBadgeProps {
  status: HomeworkStatus;
}

export function HomeworkStatusBadge({ status }: HomeworkStatusBadgeProps) {
  return <Badge variant={getHomeworkStatusTone(status)}>{status}</Badge>;
}

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus;
}

export function SubmissionStatusBadge({ status }: SubmissionStatusBadgeProps) {
  return <Badge variant={getSubmissionStatusTone(status)}>{status}</Badge>;
}

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  return <Badge variant={getReviewStatusTone(status)}>{status}</Badge>;
}

interface PriorityBadgeProps {
  priority: PriorityLevel;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <Badge variant={getPriorityTone(priority)}>{priority}</Badge>;
}

interface AlertSeverityBadgeProps {
  severity: HomeworkAlertSeverity;
}

export function AlertSeverityBadge({ severity }: AlertSeverityBadgeProps) {
  return <Badge variant={getAlertSeverityTone(severity)}>{severity}</Badge>;
}

interface TaskTypeBadgeProps {
  taskType: HomeworkTaskType;
}

export function TaskTypeBadge({ taskType }: TaskTypeBadgeProps) {
  return <Badge variant={getTaskTypeTone(taskType)}>{taskType}</Badge>;
}

interface CompletionBadgeProps {
  percentage: number;
}

export function CompletionBadge({ percentage }: CompletionBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (percentage >= 80) variant = 'default';
  else if (percentage >= 50) variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{percentage}%</Badge>;
}

interface SubmissionRateBadgeProps {
  rate: number;
}

export function SubmissionRateBadge({ rate }: SubmissionRateBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (rate >= 80) variant = 'default';
  else if (rate >= 50) variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{rate}% submitted</Badge>;
}

interface ReviewRateBadgeProps {
  rate: number;
}

export function ReviewRateBadge({ rate }: ReviewRateBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (rate >= 80) variant = 'default';
  else if (rate >= 50) variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{rate}% reviewed</Badge>;
}
