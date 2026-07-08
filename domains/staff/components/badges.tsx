'use client';

import { Badge } from '@/components/ui/badge';
import type {
  StaffStatus,
  StaffEmploymentType,
  StaffRoleCategory,
  StaffAlertSeverity,
  StaffGender,
} from '../types';
import {
  getStaffStatusTone,
  getEmploymentTypeTone,
  getRoleCategoryTone,
  getAlertSeverityToneSt,
  getGenderTone,
  getWorkloadStatusTone,
  getDocumentStatusTone,
} from '../services/staff';

interface StaffStatusBadgeProps {
  status: StaffStatus;
}

export function StaffStatusBadge({ status }: StaffStatusBadgeProps) {
  return <Badge variant={getStaffStatusTone(status)}>{status}</Badge>;
}

interface EmploymentTypeBadgeProps {
  type: StaffEmploymentType;
}

export function EmploymentTypeBadge({ type }: EmploymentTypeBadgeProps) {
  return <Badge variant={getEmploymentTypeTone(type)}>{type}</Badge>;
}

interface RoleCategoryBadgeProps {
  category: StaffRoleCategory;
}

export function RoleCategoryBadge({ category }: RoleCategoryBadgeProps) {
  return <Badge variant={getRoleCategoryTone(category)}>{category}</Badge>;
}

interface AlertSeverityBadgeProps {
  severity: StaffAlertSeverity;
}

export function AlertSeverityBadge({ severity }: AlertSeverityBadgeProps) {
  return <Badge variant={getAlertSeverityToneSt(severity)}>{severity}</Badge>;
}

interface GenderBadgeProps {
  gender: StaffGender;
}

export function GenderBadge({ gender }: GenderBadgeProps) {
  return <Badge variant={getGenderTone(gender)}>{gender}</Badge>;
}

interface WorkloadStatusBadgeProps {
  status: 'Optimal' | 'High' | 'Overloaded' | 'Underutilized';
}

export function WorkloadStatusBadge({ status }: WorkloadStatusBadgeProps) {
  return <Badge variant={getWorkloadStatusTone(status)}>{status}</Badge>;
}

interface DocumentStatusBadgeProps {
  status: string;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return <Badge variant={getDocumentStatusTone(status)}>{status}</Badge>;
}

interface TenureBadgeProps {
  years: number;
}

export function TenureBadge({ years }: TenureBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (years >= 10) variant = 'default';
  else if (years >= 5) variant = 'outline';
  else variant = 'secondary';

  return <Badge variant={variant}>{years} yrs</Badge>;
}

interface ReadinessScoreBadgeProps {
  score: number;
}

export function ReadinessScoreBadge({ score }: ReadinessScoreBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (score >= 80) variant = 'default';
  else if (score >= 60) variant = 'outline';
  else if (score >= 40) variant = 'secondary';
  else variant = 'destructive';

  return <Badge variant={variant}>{score}%</Badge>;
}

interface UtilizationBadgeProps {
  percentage: number;
}

export function UtilizationBadge({ percentage }: UtilizationBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (percentage <= 80) variant = 'default';
  else if (percentage <= 95) variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{percentage}%</Badge>;
}
