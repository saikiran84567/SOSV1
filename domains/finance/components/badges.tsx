'use client';

import { Badge } from '@/components/ui/badge';
import type {
  FeeStructureStatus,
  BillingPlanStatus,
  InvoiceStatus,
  PaymentStatus,
  PaymentMode,
  ConcessionType,
  ScholarshipType,
  DueSeverity,
  FinanceAlertSeverity,
} from '../types';
import {
  getFeeStructureStatusTone,
  getBillingPlanStatusTone,
  getInvoiceStatusTone,
  getPaymentStatusTone,
  getPaymentModeTone,
  getDueSeverityTone,
  getFinanceAlertSeverityTone,
  getConcessionTypeTone,
  getScholarshipTypeTone,
} from '../services/finance';

interface FeeStructureStatusBadgeProps {
  status: FeeStructureStatus;
}

export function FeeStructureStatusBadge({ status }: FeeStructureStatusBadgeProps) {
  return <Badge variant={getFeeStructureStatusTone(status)}>{status}</Badge>;
}

interface BillingPlanStatusBadgeProps {
  status: BillingPlanStatus;
}

export function BillingPlanStatusBadge({ status }: BillingPlanStatusBadgeProps) {
  return <Badge variant={getBillingPlanStatusTone(status)}>{status}</Badge>;
}

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return <Badge variant={getInvoiceStatusTone(status)}>{status}</Badge>;
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return <Badge variant={getPaymentStatusTone(status)}>{status}</Badge>;
}

interface PaymentModeBadgeProps {
  mode: PaymentMode;
}

export function PaymentModeBadge({ mode }: PaymentModeBadgeProps) {
  return <Badge variant={getPaymentModeTone(mode)}>{mode}</Badge>;
}

interface DueSeverityBadgeProps {
  severity: DueSeverity;
}

export function DueSeverityBadge({ severity }: DueSeverityBadgeProps) {
  return <Badge variant={getDueSeverityTone(severity)}>{severity}</Badge>;
}

interface FinanceAlertSeverityBadgeProps {
  severity: FinanceAlertSeverity;
}

export function FinanceAlertSeverityBadge({ severity }: FinanceAlertSeverityBadgeProps) {
  return <Badge variant={getFinanceAlertSeverityTone(severity)}>{severity}</Badge>;
}

interface ConcessionTypeBadgeProps {
  type: ConcessionType;
}

export function ConcessionTypeBadge({ type }: ConcessionTypeBadgeProps) {
  return <Badge variant={getConcessionTypeTone(type)}>{type}</Badge>;
}

interface ScholarshipTypeBadgeProps {
  type: ScholarshipType;
}

export function ScholarshipTypeBadge({ type }: ScholarshipTypeBadgeProps) {
  return <Badge variant={getScholarshipTypeTone(type)}>{type}</Badge>;
}

interface CollectionRateBadgeProps {
  rate: number;
}

export function CollectionRateBadge({ rate }: CollectionRateBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (rate >= 85) variant = 'default';
  else if (rate >= 70) variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{rate}%</Badge>;
}

interface ReadinessBadgeProps {
  status: 'Ready' | 'In Progress' | 'Blocked';
}

export function ReadinessBadge({ status }: ReadinessBadgeProps) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (status === 'Ready') variant = 'default';
  else if (status === 'In Progress') variant = 'outline';
  else variant = 'destructive';

  return <Badge variant={variant}>{status}</Badge>;
}
