export type StudentStatus =
  | 'Inquiry'
  | 'Applicant'
  | 'Offered'
  | 'Enrolled'
  | 'Active'
  | 'On Hold'
  | 'Transferred'
  | 'Withdrawn'
  | 'Alumni'
  | 'Archived';

export type AdmissionStatus =
  | 'Not Started'
  | 'Inquiry Received'
  | 'Application Submitted'
  | 'Documents Pending'
  | 'Assessment Scheduled'
  | 'Interview Scheduled'
  | 'Under Review'
  | 'Offer Issued'
  | 'Offer Accepted'
  | 'Rejected'
  | 'Waitlisted'
  | 'Cancelled';

export type EnrollmentStatus =
  | 'Not Enrolled'
  | 'Pending Assignment'
  | 'Assigned'
  | 'Active'
  | 'Hold'
  | 'Completed'
  | 'Cancelled';

export type StudentGender = 'Male' | 'Female' | 'Other';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type GuardianRelation =
  | 'Father'
  | 'Mother'
  | 'Grandfather'
  | 'Grandmother'
  | 'Uncle'
  | 'Aunt'
  | 'Brother'
  | 'Sister'
  | 'Legal Guardian';

export type DocumentType =
  | 'Birth Certificate'
  | 'Aadhaar Card'
  | 'Transfer Certificate'
  | 'Previous Marksheet'
  | 'Passport Photo'
  | 'Medical Certificate'
  | 'Address Proof'
  | 'Parent ID Proof'
  | 'Caste Certificate'
  | 'Other';

export type DocumentStatus = 'pending' | 'submitted' | 'verified' | 'expired' | 'rejected';

export type ApplicationSource =
  | 'Website'
  | 'Walk-in'
  | 'Referral'
  | 'Social Media'
  | 'Newspaper Ad'
  | 'Education Fair'
  | 'Transfer';

export type ApplicationStage = AdmissionStatus;

export type StudentTag =
  | 'Scholarship'
  | 'Sports Quota'
  | 'Special Needs'
  | 'Transport Required'
  | 'Hostel'
  | 'Sibling Discount'
  | 'Staff Child'
  | 'New Admission'
  | 'Transfer Student';

export interface Guardian {
  id: string;
  name: string;
  relation: GuardianRelation;
  phone: string;
  email: string;
  occupation: string;
  isPrimary: boolean;
  isEmergencyContact: boolean;
  addressSameAsStudent: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface StudentDocument {
  id: string;
  type: DocumentType;
  name: string;
  status: DocumentStatus;
  uploadedAt: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  expiryDate: string | null;
  required: boolean;
}

export interface StudentHealthInfo {
  bloodGroup: BloodGroup;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  emergencyNotes: string;
  height?: string;
  weight?: string;
}

export interface StudentPreviousSchool {
  schoolName: string;
  lastClassAttended: string;
  yearOfLeaving: number;
  transferCertificateNumber: string | null;
  reasonForLeaving: string;
  city: string;
}

export interface StudentAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface StudentTimelineEvent {
  id: string;
  studentId: string;
  studentName: string;
  eventType:
    | 'Inquiry Received'
    | 'Application Submitted'
    | 'Document Uploaded'
    | 'Document Verified'
    | 'Assessment Scheduled'
    | 'Offer Issued'
    | 'Enrollment Assigned'
    | 'Student Activated'
    | 'Transfer Requested'
    | 'Withdrawal Completed';
  timestamp: string;
  actor: string;
  description: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
}

export interface AdmissionApplication {
  id: string;
  studentId: string;
  studentName: string;
  applyingForClassId: string;
  applyingForClassName: string;
  guardianName: string;
  source: ApplicationSource;
  submittedDate: string;
  currentStage: ApplicationStage;
  pendingAction: string;
  campusId: string;
  campusName: string;
  academicYearId: string;
  academicYearName: string;
}

export interface EnrollmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  academicYearId: string;
  academicYearName: string;
  campusId: string;
  campusName: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  status: EnrollmentStatus;
  assignedDate: string | null;
  rollNumber: string | null;
}

export interface StudentRecord {
  id: string;
  admissionNumber: string;
  rollNumber: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  displayName: string;
  dateOfBirth: string;
  gender: StudentGender;
  bloodGroup: BloodGroup;
  photoInitials: string;
  status: StudentStatus;
  admissionStatus: AdmissionStatus;
  enrollmentStatus: EnrollmentStatus;
  academicYearId: string;
  academicYearName: string;
  campusId: string;
  campusName: string;
  classGradeId: string | null;
  classGradeName: string | null;
  sectionId: string | null;
  sectionName: string | null;
  admissionDate: string | null;
  joinedDate: string | null;
  primaryGuardianId: string;
  guardians: Guardian[];
  emergencyContacts: EmergencyContact[];
  documents: StudentDocument[];
  healthInfo: StudentHealthInfo;
  previousSchool: StudentPreviousSchool | null;
  address: StudentAddress;
  tags: StudentTag[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentLifecycleStats {
  totalRecords: number;
  activeStudents: number;
  applicants: number;
  pendingDocuments: number;
  offersIssued: number;
  transfersWithdrawals: number;
}

export interface StudentFilterState {
  search: string;
  status: StudentStatus | 'all';
  classGradeId: string | 'all';
  campusId: string | 'all';
  admissionStatus: AdmissionStatus | 'all';
  enrollmentStatus: EnrollmentStatus | 'all';
}
