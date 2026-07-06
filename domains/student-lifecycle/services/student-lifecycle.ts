import type {
  StudentRecord,
  Guardian,
  StudentDocument,
  AdmissionApplication,
  EnrollmentRecord,
  StudentStatus,
  AdmissionStatus,
  EnrollmentStatus,
  StudentLifecycleStats,
  DocumentType,
} from '@/domains/student-lifecycle/types';

export function getStudentFullName(student: StudentRecord): string {
  const parts = [student.firstName, student.middleName, student.lastName].filter(Boolean);
  return parts.join(' ');
}

export function calculateStudentAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function getPrimaryGuardian(student: StudentRecord): Guardian | undefined {
  return student.guardians.find((g) => g.id === student.primaryGuardianId);
}

export function getPendingDocuments(student: StudentRecord): StudentDocument[] {
  return student.documents.filter((d) => d.status === 'pending');
}

export function getVerifiedDocuments(student: StudentRecord): StudentDocument[] {
  return student.documents.filter((d) => d.status === 'verified');
}

export function getRequiredDocuments(student: StudentRecord): StudentDocument[] {
  return student.documents.filter((d) => d.required);
}

export function getDocumentCompletionPercentage(student: StudentRecord): number {
  const required = getRequiredDocuments(student);
  if (required.length === 0) return 100;
  const verified = required.filter((d) => d.status === 'verified').length;
  return Math.round((verified / required.length) * 100);
}

export function getStudentsByStatus(students: StudentRecord[], status: StudentStatus): StudentRecord[] {
  return students.filter((s) => s.status === status);
}

export function getStudentsByClass(students: StudentRecord[], classGradeId: string): StudentRecord[] {
  return students.filter((s) => s.classGradeId === classGradeId);
}

export function getStudentsByCampus(students: StudentRecord[], campusId: string): StudentRecord[] {
  return students.filter((s) => s.campusId === campusId);
}

export function getAdmissionPipelineCounts(applications: AdmissionApplication[]): Record<AdmissionStatus, number> {
  const counts = {} as Record<AdmissionStatus, number>;
  const stages: AdmissionStatus[] = [
    'Inquiry Received',
    'Application Submitted',
    'Documents Pending',
    'Assessment Scheduled',
    'Interview Scheduled',
    'Under Review',
    'Offer Issued',
    'Offer Accepted',
  ];
  for (const stage of stages) {
    counts[stage] = applications.filter((a) => a.currentStage === stage).length;
  }
  return counts;
}

export function getEnrollmentStatusCounts(enrollments: EnrollmentRecord[]): Record<EnrollmentStatus, number> {
  const counts = {} as Record<EnrollmentStatus, number>;
  const statuses: EnrollmentStatus[] = [
    'Not Enrolled',
    'Pending Assignment',
    'Assigned',
    'Active',
    'Hold',
    'Completed',
    'Cancelled',
  ];
  for (const status of statuses) {
    counts[status] = enrollments.filter((e) => e.status === status).length;
  }
  return counts;
}

export function calculateLifecycleStats(
  students: StudentRecord[],
  applications: AdmissionApplication[]
): StudentLifecycleStats {
  return {
    totalRecords: students.length,
    activeStudents: students.filter((s) => s.status === 'Active').length,
    applicants: students.filter((s) => s.status === 'Applicant' || s.status === 'Inquiry').length,
    pendingDocuments: students.reduce((sum, s) => sum + getPendingDocuments(s).length, 0),
    offersIssued: students.filter((s) => s.status === 'Offered').length,
    transfersWithdrawals: students.filter(
      (s) => s.status === 'Transferred' || s.status === 'Withdrawn'
    ).length,
  };
}

export function formatStudentDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatStudentDateTime(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDocumentTypeLabel(type: DocumentType): string {
  return type;
}
