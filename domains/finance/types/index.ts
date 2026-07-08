export type FeeCategoryType =
  | 'Tuition'
  | 'Admission'
  | 'Transport'
  | 'Examination'
  | 'Library'
  | 'Laboratory'
  | 'Activity'
  | 'Hostel'
  | 'Uniform'
  | 'Other';

export type FeeFrequency =
  | 'One Time'
  | 'Monthly'
  | 'Quarterly'
  | 'Term Wise'
  | 'Annual';

export type FeeStructureStatus =
  | 'Draft'
  | 'Active'
  | 'Inactive'
  | 'Archived';

export type BillingPlanStatus =
  | 'Draft'
  | 'Active'
  | 'Closed'
  | 'Archived';

export type InvoiceStatus =
  | 'Draft'
  | 'Issued'
  | 'Partially Paid'
  | 'Paid'
  | 'Overdue'
  | 'Cancelled';

export type PaymentStatus =
  | 'Pending'
  | 'Received'
  | 'Failed'
  | 'Refunded'
  | 'Adjusted';

export type PaymentMode =
  | 'Cash'
  | 'UPI'
  | 'Card'
  | 'Bank Transfer'
  | 'Cheque'
  | 'Wallet'
  | 'Scholarship Adjustment'
  | 'Concession Adjustment';

export type ConcessionType =
  | 'Sibling Discount'
  | 'Merit Concession'
  | 'Staff Ward'
  | 'Financial Aid'
  | 'Special Approval'
  | 'Other';

export type ScholarshipType =
  | 'Merit Scholarship'
  | 'Sports Scholarship'
  | 'Need Based Scholarship'
  | 'Alumni Scholarship'
  | 'Trust Sponsored'
  | 'Other';

export type DueSeverity =
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Critical';

export type FinanceAlertSeverity = 'Info' | 'Warning' | 'Critical';

export interface FeeCategory {
  id: string;
  name: string;
  type: FeeCategoryType;
  description: string;
  frequency: FeeFrequency;
  isMandatory: boolean;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  academicYearId: string;
  academicYearName: string;
  campusId: string;
  campusName: string;
  classGradeId: string;
  classGradeName: string;
  totalAmount: number;
  currency: string;
  effectiveFrom: string;
  status: FeeStructureStatus;
  categoryIds: string[];
  categoryBreakdownCount: number;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BillingPlan {
  id: string;
  feeStructureId: string;
  feeStructureName: string;
  academicYearId: string;
  academicYearName: string;
  installmentName: string;
  dueDate: string;
  amount: number;
  sequence: number;
  status: BillingPlanStatus;
  lateFeeRuleNote: string | null;
}

export interface StudentFeeAssignment {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  campusId: string;
  campusName: string;
  feeStructureId: string;
  feeStructureName: string;
  assignedOn: string;
  status: 'Active' | 'Closed';
  concessionAmount: number;
  scholarshipAmount: number;
  netPayableAmount: number;
}

export interface StudentInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  classGradeName: string;
  sectionName: string;
  campusName: string;
  billingPlanId: string;
  installmentName: string;
  dueDate: string;
  totalAmount: number;
  concessionAmount: number;
  scholarshipAmount: number;
  amountPaid: number;
  dueAmount: number;
  status: InvoiceStatus;
  issuedAt: string;
}

export interface PaymentRecord {
  id: string;
  paymentReference: string;
  invoiceId: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  mode: PaymentMode;
  status: PaymentStatus;
  receivedBy: string;
  note: string | null;
}

export interface ConcessionRecord {
  id: string;
  studentId: string;
  studentName: string;
  concessionType: ConcessionType;
  amount: number;
  approvedBy: string;
  effectiveFrom: string;
  note: string | null;
  status: 'Active' | 'Closed';
}

export interface ScholarshipRecord {
  id: string;
  studentId: string;
  studentName: string;
  scholarshipType: ScholarshipType;
  amount: number;
  sponsor: string;
  effectiveFrom: string;
  note: string | null;
  status: 'Active' | 'Closed';
}

export interface StudentDueSummary {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  classGradeName: string;
  sectionName: string;
  campusName: string;
  totalBilled: number;
  totalPaid: number;
  totalDue: number;
  overdueAmount: number;
  dueSeverity: DueSeverity;
  invoiceCount: number;
  overdueInvoiceCount: number;
  lastPaymentDate: string | null;
}

export interface FeeCollectionSummary {
  id: string;
  label: string;
  totalBilled: number;
  totalCollected: number;
  totalOutstanding: number;
  collectionPercentage: number;
  overdueAmount: number;
}

export interface FinanceAlert {
  id: string;
  title: string;
  description: string;
  severity: FinanceAlertSeverity;
  date: string;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
  status: string;
  actionRequired: string | null;
}

export interface FinanceActivityEvent {
  id: string;
  eventType: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity: FinanceAlertSeverity;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
}

export interface ReceiptReadinessItem {
  id: string;
  area: string;
  description: string;
  status: 'Ready' | 'In Progress' | 'Blocked';
  owner: string;
  dueDate: string | null;
  blockers: string[];
}

export interface FinanceFilterState {
  searchQuery: string;
  campusId: string | null;
  classGradeId: string | null;
  academicYearId: string | null;
  feeStructureStatus: FeeStructureStatus | null;
  invoiceStatus: InvoiceStatus | null;
  paymentStatus: PaymentStatus | null;
  paymentMode: PaymentMode | null;
}

export interface FinanceStats {
  activeFeeStructures: number;
  invoicesIssued: number;
  totalAmountCollected: number;
  totalOutstandingDues: number;
  overdueInvoices: number;
  collectionRate: number;
  totalConcessions: number;
  totalScholarships: number;
}
