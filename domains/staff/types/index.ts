export type StaffEmploymentType =
  | 'Full-Time'
  | 'Part-Time'
  | 'Contract'
  | 'Temporary'
  | 'Substitute'
  | 'Intern';

export type StaffStatus =
  | 'Active'
  | 'On Leave'
  | 'Suspended'
  | 'Terminated'
  | 'Resigned'
  | 'Retired';

export type StaffRoleCategory =
  | 'Teaching'
  | 'Non-Teaching'
  | 'Administration'
  | 'Support'
  | 'Leadership';

export type StaffGender = 'Male' | 'Female' | 'Other';

export interface StaffProfile {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: StaffGender;
  dateOfBirth: string;
  joiningDate: string;
  status: StaffStatus;
  employmentType: StaffEmploymentType;
  roleCategory: StaffRoleCategory;
  designation: string;
  departmentId: string;
  departmentName: string;
  campusId: string;
  campusName: string;
  reportingManagerId: string | null;
  reportingManagerName: string | null;
  totalExperienceYears: number;
  currentRoleExperienceYears: number;
  qualificationsCount: number;
  documentsCount: number;
  profilePhotoUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StaffDepartmentSummary {
  id: string;
  departmentId: string;
  departmentName: string;
  headOfDepartment: string;
  campusId: string;
  campusName: string;
  totalStaff: number;
  teachingStaff: number;
  nonTeachingStaff: number;
  activeStaff: number;
  onLeaveStaff: number;
  averageTenureYears: number;
  openPositions: number;
  budgetUtilizationPercentage: number;
}

export interface StaffEmploymentRecord {
  id: string;
  staffId: string;
  employeeId: string;
  staffName: string;
  employmentType: StaffEmploymentType;
  designation: string;
  departmentId: string;
  departmentName: string;
  startDate: string;
  endDate: string | null;
  status: StaffStatus;
  campusId: string;
  campusName: string;
  reportingManagerId: string | null;
  reportingManagerName: string | null;
  reasonForEnd: string | null;
  isCurrent: boolean;
}

export interface StaffQualification {
  id: string;
  staffId: string;
  staffName: string;
  degreeName: string;
  institution: string;
  yearOfPassing: number;
  grade: string | null;
  specialization: string | null;
  certificateUrl: string | null;
  isHighestQualification: boolean;
}

export interface StaffEmergencyContact {
  id: string;
  staffId: string;
  name: string;
  relationship: string;
  phone: string;
  alternatePhone: string | null;
  email: string | null;
  address: string;
  isPrimary: boolean;
}

export interface StaffAddress {
  id: string;
  staffId: string;
  addressType: 'Permanent' | 'Current' | 'Emergency';
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  landmark: string | null;
}

export interface StaffCompensationSnapshot {
  id: string;
  staffId: string;
  staffName: string;
  designation: string;
  departmentName: string;
  employmentType: StaffEmploymentType;
  effectiveDate: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  currency: string;
  payFrequency: 'Monthly' | 'Bi-Weekly' | 'Weekly';
  bankName: string | null;
  accountNumber: string | null;
}

export interface StaffWorkloadSnapshot {
  id: string;
  staffId: string;
  staffName: string;
  designation: string;
  departmentName: string;
  campusName: string;
  recordedDate: string;
  classesAssigned: number;
  subjectsTaught: number;
  weeklyHours: number;
  maxWeeklyHours: number;
  utilizationPercentage: number;
  substituteAssignments: number;
  extracurricularDuties: number;
  administrativeDuties: number;
  workloadStatus: 'Optimal' | 'High' | 'Overloaded' | 'Underutilized';
  readinessScore: number;
  certificationsCount: number;
  trainingsCompleted: number;
  certificationsExpiringSoon: number;
}

export interface StaffDocumentSummary {
  id: string;
  staffId: string;
  staffName: string;
  documentType: string;
  documentName: string;
  documentNumber: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  issuingAuthority: string | null;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected' | 'Expired';
  documentUrl: string | null;
  uploadedAt: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
}

export interface StaffLifecycleEvent {
  id: string;
  staffId: string;
  staffName: string;
  eventType: 'Joined' | 'Promoted' | 'Transferred' | 'On Leave' | 'Returned from Leave' | 'Resigned' | 'Terminated' | 'Retired' | 'Contract Ended' | 'Extended' | 'Warning Issued' | 'Appreciation';
  eventDate: string;
  details: string;
  previousState: string | null;
  newState: string | null;
  initiatedBy: string;
  approvedBy: string | null;
  remarks: string | null;
}

export interface StaffAlert {
  id: string;
  title: string;
  description: string;
  severity: StaffAlertSeverity;
  date: string;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
  status: string;
  actionRequired: string | null;
}

export type StaffAlertSeverity = 'Info' | 'Warning' | 'Critical';

export interface StaffActivityEvent {
  id: string;
  eventType: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity: StaffAlertSeverity;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
}

export interface StaffFilterState {
  searchQuery: string;
  departmentId: string | null;
  campusId: string | null;
  employmentType: StaffEmploymentType | null;
  status: StaffStatus | null;
  roleCategory: StaffRoleCategory | null;
  gender: StaffGender | null;
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  onLeaveStaff: number;
  teachingStaff: number;
  nonTeachingStaff: number;
  averageTenureYears: number;
  newHiresThisMonth: number;
  pendingVerifications: number;
  workloadWarnings: number;
  certificationsExpiring: number;
}

export interface StaffReportingLine {
  id: string;
  managerId: string;
  managerName: string;
  managerDesignation: string;
  managerDepartment: string;
  reporteeId: string;
  reporteeName: string;
  reporteeDesignation: string;
  reporteeDepartment: string;
  level: number;
  isDirect: boolean;
}

export interface StaffIdentitySummary {
  id: string;
  staffId: string;
  staffName: string;
  documentType: string;
  documentNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender: StaffGender;
  nationality: string;
  bloodGroup: string | null;
  panNumber: string | null;
  aadhaarNumber: string | null;
  passportNumber: string | null;
  drivingLicenseNumber: string | null;
}
