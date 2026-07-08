import type {
  FeeStructure,
  StudentInvoice,
  PaymentRecord,
  StudentDueSummary,
  FeeStructureStatus,
  InvoiceStatus,
  PaymentStatus,
  PaymentMode,
  DueSeverity,
  FinanceAlertSeverity,
  FinanceStats,
} from '../types';
import { format, parseISO } from 'date-fns';

export function calculateCollectionRate(totalCollected: number, totalBilled: number): number {
  if (totalBilled === 0) return 0;
  return Math.round((totalCollected / totalBilled) * 100);
}

export function calculateOutstandingAmount(totalBilled: number, totalCollected: number): number {
  return totalBilled - totalCollected;
}

export function getFeeStructuresByStatus(
  feeStructures: FeeStructure[],
  status: FeeStructureStatus
): FeeStructure[] {
  return feeStructures.filter((fs) => fs.status === status);
}

export function getInvoicesByStatus(
  invoices: StudentInvoice[],
  status: InvoiceStatus
): StudentInvoice[] {
  return invoices.filter((inv) => inv.status === status);
}

export function getPaymentsByStatus(
  payments: PaymentRecord[],
  status: PaymentStatus
): PaymentRecord[] {
  return payments.filter((p) => p.status === status);
}

export function getPaymentsByMode(
  payments: PaymentRecord[],
  mode: PaymentMode
): PaymentRecord[] {
  return payments.filter((p) => p.mode === mode);
}

export function getStudentDuesBySeverity(
  dueSummaries: StudentDueSummary[],
  severity: DueSeverity
): StudentDueSummary[] {
  return dueSummaries.filter((ds) => ds.dueSeverity === severity);
}

export function getOverdueInvoices(invoices: StudentInvoice[]): StudentInvoice[] {
  return invoices.filter(
    (inv) => inv.status === 'Overdue' || (inv.dueAmount > 0 && new Date(inv.dueDate) < new Date())
  );
}

export function getPendingPayments(payments: PaymentRecord[]): PaymentRecord[] {
  return payments.filter((p) => p.status === 'Pending');
}

export function calculateFinanceStats(data: {
  feeStructures: FeeStructure[];
  invoices: StudentInvoice[];
  payments: PaymentRecord[];
  concessions: { amount: number }[];
  scholarships: { amount: number }[];
}): FinanceStats {
  const { feeStructures, invoices, payments, concessions, scholarships } = data;

  const activeFeeStructures = feeStructures.filter(
    (fs) => fs.status === 'Active'
  ).length;

  const invoicesIssued = invoices.filter(
    (inv) => inv.status !== 'Draft' && inv.status !== 'Cancelled'
  ).length;

  const totalAmountCollected = payments
    .filter((p) => p.status === 'Received')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalBilled = invoices
    .filter((inv) => inv.status !== 'Cancelled')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const totalOutstandingDues = invoices
    .filter((inv) => inv.status !== 'Cancelled' && inv.status !== 'Paid')
    .reduce((sum, inv) => sum + inv.dueAmount, 0);

  const overdueInvoices = invoices.filter(
    (inv) => inv.status === 'Overdue'
  ).length;

  const collectionRate = totalBilled > 0
    ? calculateCollectionRate(totalAmountCollected, totalBilled)
    : 0;

  const totalConcessions = concessions.reduce((sum, c) => sum + c.amount, 0);
  const totalScholarships = scholarships.reduce((sum, s) => sum + s.amount, 0);

  return {
    activeFeeStructures,
    invoicesIssued,
    totalAmountCollected,
    totalOutstandingDues,
    overdueInvoices,
    collectionRate,
    totalConcessions,
    totalScholarships,
  };
}

export function calculateNetPayable(
  totalAmount: number,
  concessionAmount: number,
  scholarshipAmount: number
): number {
  return Math.max(0, totalAmount - concessionAmount - scholarshipAmount);
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFinanceDate(date: string): string {
  try {
    return format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
}

export function formatFinanceDateTime(dateTime: string): string {
  try {
    return format(parseISO(dateTime), 'MMM d, yyyy h:mm a');
  } catch {
    return dateTime;
  }
}

export function getInvoiceStatusTone(status: InvoiceStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Paid':
      return 'default';
    case 'Issued':
      return 'outline';
    case 'Partially Paid':
      return 'secondary';
    case 'Overdue':
      return 'destructive';
    case 'Cancelled':
      return 'secondary';
    case 'Draft':
      return 'outline';
    default:
      return 'default';
  }
}

export function getPaymentStatusTone(status: PaymentStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Received':
      return 'default';
    case 'Pending':
      return 'outline';
    case 'Failed':
      return 'destructive';
    case 'Refunded':
      return 'secondary';
    case 'Adjusted':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getFeeStructureStatusTone(status: FeeStructureStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Draft':
      return 'outline';
    case 'Inactive':
      return 'secondary';
    case 'Archived':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getBillingPlanStatusTone(status: 'Draft' | 'Active' | 'Closed' | 'Archived'): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Draft':
      return 'outline';
    case 'Closed':
      return 'secondary';
    case 'Archived':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getDueSeverityTone(severity: DueSeverity): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (severity) {
    case 'Low':
      return 'default';
    case 'Medium':
      return 'outline';
    case 'High':
      return 'outline';
    case 'Critical':
      return 'destructive';
    default:
      return 'default';
  }
}

export function getFinanceAlertSeverityTone(severity: FinanceAlertSeverity): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'Warning':
      return 'outline';
    case 'Info':
      return 'default';
    default:
      return 'default';
  }
}

export function getPaymentModeTone(mode: PaymentMode): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (mode) {
    case 'UPI':
    case 'Bank Transfer':
      return 'default';
    case 'Cash':
    case 'Card':
    case 'Wallet':
    case 'Cheque':
      return 'outline';
    case 'Scholarship Adjustment':
    case 'Concession Adjustment':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getConcessionTypeTone(type: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'Sibling Discount':
    case 'Merit Concession':
      return 'default';
    case 'Staff Ward':
    case 'Financial Aid':
      return 'outline';
    case 'Special Approval':
    case 'Other':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getScholarshipTypeTone(type: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'Merit Scholarship':
    case 'Sports Scholarship':
      return 'default';
    case 'Need Based Scholarship':
    case 'Alumni Scholarship':
      return 'outline';
    case 'Trust Sponsored':
    case 'Other':
      return 'secondary';
    default:
      return 'default';
  }
}

export function groupInvoicesByStatus(
  invoices: StudentInvoice[]
): Record<InvoiceStatus, StudentInvoice[]> {
  const groups: Record<string, StudentInvoice[]> = {};
  invoices.forEach((inv) => {
    if (!groups[inv.status]) {
      groups[inv.status] = [];
    }
    groups[inv.status].push(inv);
  });
  return groups as Record<InvoiceStatus, StudentInvoice[]>;
}

export function groupPaymentsByMode(
  payments: PaymentRecord[]
): Record<PaymentMode, PaymentRecord[]> {
  const groups: Record<string, PaymentRecord[]> = {};
  payments.forEach((p) => {
    if (!groups[p.mode]) {
      groups[p.mode] = [];
    }
    groups[p.mode].push(p);
  });
  return groups as Record<PaymentMode, PaymentRecord[]>;
}
