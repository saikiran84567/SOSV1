import type {
  FeeCategory,
  FeeStructure,
  BillingPlan,
  StudentFeeAssignment,
  StudentInvoice,
  PaymentRecord,
  ConcessionRecord,
  ScholarshipRecord,
  StudentDueSummary,
  FeeCollectionSummary,
  FinanceAlert,
  FinanceActivityEvent,
  ReceiptReadinessItem,
  FeeCategoryType,
  FeeFrequency,
  FeeStructureStatus,
  BillingPlanStatus,
  InvoiceStatus,
  PaymentStatus,
  PaymentMode,
  ConcessionType,
  ScholarshipType,
  DueSeverity,
} from '../types';

// Helper data
const campuses = [
  { id: 'camp-1', name: 'Greenfield Main Campus' },
  { id: 'camp-2', name: 'Greenfield Whitefield Campus' },
];
const classes = [
  { id: 'class-1', name: 'Grade 1' },
  { id: 'class-2', name: 'Grade 2' },
  { id: 'class-3', name: 'Grade 3' },
  { id: 'class-4', name: 'Grade 4' },
  { id: 'class-5', name: 'Grade 5' },
  { id: 'class-6', name: 'Grade 6' },
  { id: 'class-7', name: 'Grade 7' },
  { id: 'class-8', name: 'Grade 8' },
  { id: 'class-9', name: 'Grade 9' },
  { id: 'class-10', name: 'Grade 10' },
];
const sections = ['A', 'B', 'C'];
const academicYears = [{ id: 'ay-2026', name: '2026-27' }];
const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Krishna', 'Karthik', 'Rohan', 'Aryan', 'Ananya', 'Saanvi', 'Diya', 'Aadhya', 'Prisha', 'Ira', 'Myra', 'Aarya', 'Anika', 'Riya'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Patel', 'Yadav', 'Mishra', 'Chauhan'];
const feeCategoryTypes: FeeCategoryType[] = ['Tuition', 'Admission', 'Transport', 'Examination', 'Library', 'Laboratory', 'Activity', 'Hostel', 'Uniform', 'Other'];
const feeFrequencies: FeeFrequency[] = ['One Time', 'Monthly', 'Quarterly', 'Term Wise', 'Annual'];
const paymentModes: PaymentMode[] = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque', 'Wallet'];
const concessionTypes: ConcessionType[] = ['Sibling Discount', 'Merit Concession', 'Staff Ward', 'Financial Aid', 'Special Approval'];
const scholarshipTypes: ScholarshipType[] = ['Merit Scholarship', 'Sports Scholarship', 'Need Based Scholarship', 'Alumni Scholarship', 'Trust Sponsored'];

// Student pool for finance records
const studentPool: { id: string; name: string; admissionNumber: string; classGradeId: string; classGradeName: string; sectionId: string; sectionName: string; campusId: string; campusName: string }[] = [];
for (let i = 1; i <= 30; i++) {
  const firstName = firstNames[(i - 1) % firstNames.length];
  const lastName = lastNames[(i - 1) % lastNames.length];
  const cls = classes[(i - 1) % classes.length];
  const section = sections[(i - 1) % sections.length];
  const campus = campuses[(i - 1) % campuses.length];
  studentPool.push({
    id: `student-${i}`,
    name: `${firstName} ${lastName}`,
    admissionNumber: `ADM${String(2024000 + i).padStart(7, '0')}`,
    classGradeId: cls.id,
    classGradeName: cls.name,
    sectionId: `section-${section.toLowerCase()}`,
    sectionName: section,
    campusId: campus.id,
    campusName: campus.name,
  });
}

// Fee Categories (12)
export const feeCategories: FeeCategory[] = [];
for (let i = 1; i <= 12; i++) {
  const type = feeCategoryTypes[(i - 1) % feeCategoryTypes.length];
  const frequency = type === 'Admission' || type === 'Uniform' ? 'One Time' : (type === 'Transport' ? 'Monthly' : (type === 'Tuition' ? 'Annual' : (type === 'Examination' ? 'Term Wise' : 'Quarterly')));
  feeCategories.push({
    id: `fee-cat-${i}`,
    name: `${type} Fee`,
    type,
    description: `${type} fee for students`,
    frequency,
    isMandatory: i <= 8,
    status: i <= 10 ? 'Active' : 'Inactive',
    createdAt: `2025-0${1 + (i % 3)}-${String(10 + (i % 15)).padStart(2, '0')}`,
    updatedAt: `2026-0${1 + (i % 3)}-${String(5 + (i % 10)).padStart(2, '0')}`,
  });
}

// Fee Structures (10)
export const feeStructures: FeeStructure[] = [];
for (let i = 1; i <= 10; i++) {
  const cls = classes[(i - 1) % classes.length];
  const campus = campuses[(i - 1) % campuses.length];
  const totalAmount = 50000 + (i * 5000);
  const status: FeeStructureStatus = i <= 6 ? 'Active' : (i <= 8 ? 'Draft' : 'Inactive');

  feeStructures.push({
    id: `fee-str-${i}`,
    name: `${cls.name} Fee Structure ${academicYears[0].name}`,
    academicYearId: academicYears[0].id,
    academicYearName: academicYears[0].name,
    campusId: campus.id,
    campusName: campus.name,
    classGradeId: cls.id,
    classGradeName: cls.name,
    totalAmount,
    currency: 'INR',
    effectiveFrom: `2026-04-0${1 + (i % 3)}`,
    status,
    categoryIds: [`fee-cat-${i}`, `fee-cat-${((i - 1) % 12) + 1}`, `fee-cat-${((i + 2) % 12) + 1}`],
    categoryBreakdownCount: 3 + (i % 3),
    note: i % 2 === 0 ? `Standard fee structure for ${cls.name}` : null,
    createdAt: `2026-0${1 + (i % 3)}-${String(10 + (i % 15)).padStart(2, '0')}`,
    updatedAt: `2026-0${3 + (i % 4)}-${String(5 + (i % 10)).padStart(2, '0')}`,
  });
}

// Billing Plans (24) - ~2-3 installments per fee structure
export const billingPlans: BillingPlan[] = [];
let planIndex = 1;
for (let i = 1; i <= 10; i++) {
  const structure = feeStructures[i - 1];
  const installmentCount = i <= 4 ? 4 : (i <= 7 ? 2 : 3);
  const installmentAmount = Math.round(structure.totalAmount / installmentCount);

  for (let j = 1; j <= installmentCount; j++) {
    const status: BillingPlanStatus = structure.status === 'Active' ? 'Active' : (structure.status === 'Draft' ? 'Draft' : 'Archived');
    const dueMonth = 4 + ((j - 1) * Math.floor(12 / installmentCount));

    billingPlans.push({
      id: `billing-plan-${planIndex}`,
      feeStructureId: structure.id,
      feeStructureName: structure.name,
      academicYearId: structure.academicYearId,
      academicYearName: structure.academicYearName,
      installmentName: `Installment ${j}`,
      dueDate: `2026-${String(dueMonth).padStart(2, '0')}-${String(10 + (j % 15)).padStart(2, '0')}`,
      amount: installmentAmount,
      sequence: j,
      status,
      lateFeeRuleNote: j % 3 === 0 ? 'Late fee of Rs. 500/month applies after due date' : null,
    });
    planIndex++;
  }
}

// Student Fee Assignments (30)
export const studentFeeAssignments: StudentFeeAssignment[] = [];
for (let i = 1; i <= 30; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const structure = feeStructures[(i - 1) % feeStructures.length];
  const concessionAmount = i % 5 === 0 ? 5000 : 0;
  const scholarshipAmount = i % 7 === 0 ? 10000 : 0;
  const netPayable = structure.totalAmount - concessionAmount - scholarshipAmount;

  studentFeeAssignments.push({
    id: `fee-assign-${i}`,
    studentId: student.id,
    studentName: student.name,
    admissionNumber: student.admissionNumber,
    classGradeId: student.classGradeId,
    classGradeName: student.classGradeName,
    sectionId: student.sectionId,
    sectionName: student.sectionName,
    campusId: student.campusId,
    campusName: student.campusName,
    feeStructureId: structure.id,
    feeStructureName: structure.name,
    assignedOn: `2026-0${3 + (i % 3)}-${String(10 + (i % 15)).padStart(2, '0')}`,
    status: i <= 25 ? 'Active' : 'Closed',
    concessionAmount,
    scholarshipAmount,
    netPayableAmount: netPayable,
  });
}

// Student Invoices (40)
export const studentInvoices: StudentInvoice[] = [];
for (let i = 1; i <= 40; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const assignment = studentFeeAssignments.find((a) => a.studentId === student.id) || studentFeeAssignments[0];
  const plan = billingPlans[(i - 1) % billingPlans.length];
  const concessionAmount = i % 6 === 0 ? 2000 : 0;
  const scholarshipAmount = i % 8 === 0 ? 5000 : 0;
  const totalAmount = plan.amount;
  const amountPaid = i % 3 === 0 ? totalAmount : (i % 3 === 1 ? 0 : Math.round(totalAmount * 0.5));
  const dueAmount = totalAmount - concessionAmount - scholarshipAmount - amountPaid;

  let status: InvoiceStatus;
  if (amountPaid >= totalAmount) {
    status = 'Paid';
  } else if (amountPaid > 0) {
    status = 'Partially Paid';
  } else if (new Date(plan.dueDate) < new Date('2026-07-08')) {
    status = 'Overdue';
  } else if (i % 7 === 0) {
    status = 'Cancelled';
  } else {
    status = 'Issued';
  }

  studentInvoices.push({
    id: `invoice-${i}`,
    invoiceNumber: `INV${String(2026001 + i).padStart(7, '0')}`,
    studentId: student.id,
    studentName: student.name,
    admissionNumber: student.admissionNumber,
    classGradeName: student.classGradeName,
    sectionName: student.sectionName,
    campusName: student.campusName,
    billingPlanId: plan.id,
    installmentName: plan.installmentName,
    dueDate: plan.dueDate,
    totalAmount,
    concessionAmount,
    scholarshipAmount,
    amountPaid,
    dueAmount: dueAmount > 0 ? dueAmount : 0,
    status,
    issuedAt: `2026-0${4 + (i % 3)}-${String(1 + (i % 10)).padStart(2, '0')}`,
  });
}

// Payment Records (35)
export const paymentRecords: PaymentRecord[] = [];
for (let i = 1; i <= 35; i++) {
  const invoice = studentInvoices.find((inv) => inv.amountPaid > 0 && inv.status !== 'Cancelled') || studentInvoices[0];
  const mode = paymentModes[i % paymentModes.length];
  const amount = i % 3 === 0 ? invoice.totalAmount : Math.round(invoice.totalAmount * (0.25 + (i % 5) * 0.15));
  const status: PaymentStatus = i % 20 === 0 ? 'Failed' : (i % 15 === 0 ? 'Refunded' : 'Received');

  paymentRecords.push({
    id: `payment-${i}`,
    paymentReference: `PAY${String(100000 + i).padStart(6, '0')}`,
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    studentId: invoice.studentId,
    studentName: invoice.studentName,
    amount,
    paymentDate: `2026-0${5 + (i % 3)}-${String(5 + (i % 20)).padStart(2, '0')}`,
    mode,
    status,
    receivedBy: i % 2 === 0 ? 'Finance Desk' : 'Online Gateway',
    note: status === 'Failed' ? 'Transaction failed - retry needed' : (status === 'Refunded' ? 'Refund processed due to duplicate payment' : null),
  });
}

// Concession Records (12)
export const concessionRecords: ConcessionRecord[] = [];
for (let i = 1; i <= 12; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const concessionType = concessionTypes[(i - 1) % concessionTypes.length];
  const amount = 2000 + (i * 500);

  concessionRecords.push({
    id: `concession-${i}`,
    studentId: student.id,
    studentName: student.name,
    concessionType,
    amount,
    approvedBy: i % 2 === 0 ? 'Principal' : 'Finance Head',
    effectiveFrom: `2026-0${4 + (i % 3)}-01`,
    note: i % 3 === 0 ? `${concessionType} approved for academic year` : null,
    status: i <= 10 ? 'Active' : 'Closed',
  });
}

// Scholarship Records (10)
export const scholarshipRecords: ScholarshipRecord[] = [];
for (let i = 1; i <= 10; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const scholarshipType = scholarshipTypes[(i - 1) % scholarshipTypes.length];
  const amount = 10000 + (i * 2000);

  scholarshipRecords.push({
    id: `scholarship-${i}`,
    studentId: student.id,
    studentName: student.name,
    scholarshipType,
    amount,
    sponsor: i % 3 === 0 ? 'Greenfield Trust' : (i % 3 === 1 ? 'Alumni Association' : 'Education Foundation'),
    effectiveFrom: `2026-0${4 + (i % 3)}-01`,
    note: i % 2 === 0 ? `${scholarshipType} for eligible student` : null,
    status: i <= 8 ? 'Active' : 'Closed',
  });
}

// Student Due Summaries (20)
export const studentDueSummaries: StudentDueSummary[] = [];
for (let i = 1; i <= 20; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const totalBilled = 80000 + (i * 5000);
  const totalPaid = Math.round(totalBilled * (0.4 + (i % 5) * 0.1));
  const totalDue = totalBilled - totalPaid;
  const overdueAmount = i % 3 === 0 ? Math.round(totalDue * 0.5) : (i % 3 === 1 ? Math.round(totalDue * 0.2) : 0);

  let dueSeverity: DueSeverity;
  if (overdueAmount > 30000) {
    dueSeverity = 'Critical';
  } else if (overdueAmount > 15000) {
    dueSeverity = 'High';
  } else if (overdueAmount > 5000) {
    dueSeverity = 'Medium';
  } else {
    dueSeverity = 'Low';
  }

  studentDueSummaries.push({
    id: `due-sum-${i}`,
    studentId: student.id,
    studentName: student.name,
    admissionNumber: student.admissionNumber,
    classGradeName: student.classGradeName,
    sectionName: student.sectionName,
    campusName: student.campusName,
    totalBilled,
    totalPaid,
    totalDue,
    overdueAmount,
    dueSeverity,
    invoiceCount: 4,
    overdueInvoiceCount: i % 3 === 0 ? 2 : (i % 3 === 1 ? 1 : 0),
    lastPaymentDate: i % 4 === 0 ? null : `2026-0${5 + (i % 2)}-${String(10 + (i % 15)).padStart(2, '0')}`,
  });
}

// Fee Collection Summaries (8)
export const feeCollectionSummaries: FeeCollectionSummary[] = [
  {
    id: 'coll-sum-1',
    label: 'Q1 2026-27',
    totalBilled: 5000000,
    totalCollected: 4200000,
    totalOutstanding: 800000,
    collectionPercentage: 84,
    overdueAmount: 200000,
  },
  {
    id: 'coll-sum-2',
    label: 'Q2 2026-27',
    totalBilled: 4500000,
    totalCollected: 3600000,
    totalOutstanding: 900000,
    collectionPercentage: 80,
    overdueAmount: 350000,
  },
  {
    id: 'coll-sum-3',
    label: 'Transport Fee',
    totalBilled: 1500000,
    totalCollected: 1200000,
    totalOutstanding: 300000,
    collectionPercentage: 80,
    overdueAmount: 100000,
  },
  {
    id: 'coll-sum-4',
    label: 'Admission Fee',
    totalBilled: 2000000,
    totalCollected: 1900000,
    totalOutstanding: 100000,
    collectionPercentage: 95,
    overdueAmount: 50000,
  },
  {
    id: 'coll-sum-5',
    label: 'Grade 1-5',
    totalBilled: 3500000,
    totalCollected: 3000000,
    totalOutstanding: 500000,
    collectionPercentage: 86,
    overdueAmount: 150000,
  },
  {
    id: 'coll-sum-6',
    label: 'Grade 6-8',
    totalBilled: 2800000,
    totalCollected: 2200000,
    totalOutstanding: 600000,
    collectionPercentage: 79,
    overdueAmount: 200000,
  },
  {
    id: 'coll-sum-7',
    label: 'Grade 9-10',
    totalBilled: 2200000,
    totalCollected: 1800000,
    totalOutstanding: 400000,
    collectionPercentage: 82,
    overdueAmount: 120000,
  },
  {
    id: 'coll-sum-8',
    label: 'Main Campus',
    totalBilled: 6000000,
    totalCollected: 5000000,
    totalOutstanding: 1000000,
    collectionPercentage: 83,
    overdueAmount: 300000,
  },
];

// Finance Alerts (8)
export const financeAlerts: FinanceAlert[] = [
  {
    id: 'alert-1',
    title: 'Overdue Payment Alert',
    description: '15 invoices are overdue by more than 30 days',
    severity: 'Critical',
    date: '2026-07-08',
    relatedEntity: { type: 'Invoices', id: 'overdue-group', name: 'Overdue Invoices' },
    status: 'Open',
    actionRequired: 'Send reminders to parents',
  },
  {
    id: 'alert-2',
    title: 'Large Outstanding Dues',
    description: 'Student Aarav Sharma has outstanding dues of Rs. 85,000',
    severity: 'Warning',
    date: '2026-07-07',
    relatedEntity: { type: 'Student', id: 'student-1', name: 'Aarav Sharma' },
    status: 'Open',
    actionRequired: 'Follow up with parents',
  },
  {
    id: 'alert-3',
    title: 'Concession Pending Approval',
    description: '5 concession requests pending approval',
    severity: 'Info',
    date: '2026-07-06',
    relatedEntity: { type: 'Concessions', id: 'pending-group', name: 'Pending Concessions' },
    status: 'Open',
    actionRequired: 'Review and approve/reject',
  },
  {
    id: 'alert-4',
    title: 'Payment Failed',
    description: 'UPI payment of Rs. 25,000 failed for Vivaan Verma',
    severity: 'Warning',
    date: '2026-07-05',
    relatedEntity: { type: 'Payment', id: 'payment-20', name: 'PAY000020' },
    status: 'Open',
    actionRequired: 'Contact parent for retry',
  },
  {
    id: 'alert-5',
    title: 'Fee Structure Expiring',
    description: 'Grade 10 fee structure expires next month',
    severity: 'Warning',
    date: '2026-07-04',
    relatedEntity: { type: 'FeeStructure', id: 'fee-str-10', name: 'Grade 10 Fee Structure' },
    status: 'Open',
    actionRequired: 'Create new structure',
  },
  {
    id: 'alert-6',
    title: 'Scholarship Disbursement Due',
    description: 'Trust Sponsored scholarship disbursal pending for 3 students',
    severity: 'Info',
    date: '2026-07-03',
    relatedEntity: { type: 'Scholarships', id: 'scholarship-group', name: 'Trust Scholarships' },
    status: 'Pending',
    actionRequired: 'Process disbursement',
  },
  {
    id: 'alert-7',
    title: 'Collection Target at Risk',
    description: 'Q2 collection at 80%, below target of 85%',
    severity: 'Critical',
    date: '2026-07-02',
    relatedEntity: { type: 'Collection', id: 'q2-collection', name: 'Q2 2026-27' },
    status: 'Open',
    actionRequired: 'Review collection strategy',
  },
  {
    id: 'alert-8',
    title: 'New Fee Structure Draft',
    description: 'Fee structure for Grade 6 is in Draft status for 15 days',
    severity: 'Info',
    date: '2026-07-01',
    relatedEntity: { type: 'FeeStructure', id: 'fee-str-7', name: 'Grade 6 Fee Structure' },
    status: 'Open',
    actionRequired: 'Activate or revise',
  },
];

// Finance Activity Events (12)
export const financeActivityEvents: FinanceActivityEvent[] = [];
const activityEventTypes = ['Fee Structure Created', 'Fee Structure Activated', 'Billing Plan Created', 'Invoice Issued', 'Payment Recorded', 'Concession Approved', 'Scholarship Applied', 'Overdue Alert Raised', 'Payment Failed', 'Refund Processed', 'Invoice Cancelled', 'Structure Archived'];
for (let i = 1; i <= 12; i++) {
  const student = studentPool[(i - 1) % studentPool.length];
  const eventType = activityEventTypes[(i - 1) % activityEventTypes.length];
  const severity: FinanceActivityEvent['severity'] = i % 5 === 0 ? 'Warning' : (i % 6 === 0 ? 'Critical' : 'Info');
  const day = 28 + i;
  const isFuture = day > 8;

  financeActivityEvents.push({
    id: `activity-${i}`,
    eventType,
    title: `${eventType} - ${eventType.includes('Payment') || eventType.includes('Invoice') ? student.name : 'System'}`,
    description: eventType.includes('Payment')
      ? `Payment recorded for ${student.name}`
      : eventType.includes('Invoice')
      ? `Invoice issued for ${student.name}`
      : eventType.includes('Fee Structure')
      ? `Fee structure updated for ${student.classGradeName}`
      : `${eventType} event recorded`,
    actor: i % 2 === 0 ? 'Finance Admin' : 'System',
    timestamp: `2026-0${isFuture ? '0' : '7'}-${String(((day - 1) % 28) + 1).padStart(2, '0')}T${9 + (i % 8)}:${String(i * 5 % 60).padStart(2, '0')}:00`,
    severity,
    relatedEntity: { type: 'Finance', id: `ref-${i}`, name: student.name },
  });
}

// Receipt Readiness Items (8)
export const receiptReadinessItems: ReceiptReadinessItem[] = [
  {
    id: 'readiness-1',
    area: 'Fee Structures',
    description: 'All fee structures updated for 2026-27',
    status: 'Ready',
    owner: 'Finance Head',
    dueDate: '2026-03-31',
    blockers: [],
  },
  {
    id: 'readiness-2',
    area: 'Student Assignments',
    description: 'Fee assignments pending for 5 students',
    status: 'In Progress',
    owner: 'Admin Team',
    dueDate: '2026-04-15',
    blockers: ['Waiting for admission confirmation'],
  },
  {
    id: 'readiness-3',
    area: 'Billing Plans',
    description: 'Quarterly billing plans created',
    status: 'Ready',
    owner: 'Finance Head',
    dueDate: '2026-03-31',
    blockers: [],
  },
  {
    id: 'readiness-4',
    area: 'Invoice Generation',
    description: 'Q1 invoices generated for all students',
    status: 'Ready',
    owner: 'Finance Team',
    dueDate: '2026-04-10',
    blockers: [],
  },
  {
    id: 'readiness-5',
    area: 'Payment Gateway',
    description: 'Online payment gateway integration pending',
    status: 'Blocked',
    owner: 'IT Team',
    dueDate: '2026-04-30',
    blockers: ['Vendor approval pending', 'Bank integration delayed'],
  },
  {
    id: 'readiness-6',
    area: 'Concessions',
    description: 'Sibling concessions verified',
    status: 'Ready',
    owner: 'Finance Team',
    dueDate: '2026-04-15',
    blockers: [],
  },
  {
    id: 'readiness-7',
    area: 'Scholarships',
    description: 'Trust scholarship applications under review',
    status: 'In Progress',
    owner: 'Scholarship Committee',
    dueDate: '2026-05-15',
    blockers: ['Committee meeting scheduled'],
  },
  {
    id: 'readiness-8',
    area: 'Receipt Templates',
    description: 'Receipt PDF templates not configured',
    status: 'Blocked',
    owner: 'IT Team',
    dueDate: '2026-05-01',
    blockers: ['Waiting for design approval'],
  },
];
