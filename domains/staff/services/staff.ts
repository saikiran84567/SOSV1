import type {
  StaffProfile,
  StaffDepartmentSummary,
  StaffWorkloadSnapshot,
  StaffDocumentSummary,
  StaffAlert,
  StaffStats,
  StaffEmploymentType,
  StaffStatus,
  StaffRoleCategory,
  StaffGender,
  StaffAlertSeverity,
} from '../types';

export type StaffWorkloadStatus = 'Optimal' | 'High' | 'Overloaded' | 'Underutilized';
import { format, parseISO } from 'date-fns';

export function getStaffByDepartment(
  staff: StaffProfile[],
  departmentId: string
): StaffProfile[] {
  return staff.filter((s) => s.departmentId === departmentId);
}

export function getStaffByCampus(
  staff: StaffProfile[],
  campusId: string
): StaffProfile[] {
  return staff.filter((s) => s.campusId === campusId);
}

export function getStaffByStatus(
  staff: StaffProfile[],
  status: StaffStatus
): StaffProfile[] {
  return staff.filter((s) => s.status === status);
}

export function getStaffByEmploymentType(
  staff: StaffProfile[],
  employmentType: StaffEmploymentType
): StaffProfile[] {
  return staff.filter((s) => s.employmentType === employmentType);
}

export function getActiveStaff(staff: StaffProfile[]): StaffProfile[] {
  return staff.filter((s) => s.status === 'Active');
}

export function getStaffOnLeave(staff: StaffProfile[]): StaffProfile[] {
  return staff.filter((s) => s.status === 'On Leave');
}

export function getTeachingStaff(staff: StaffProfile[]): StaffProfile[] {
  return staff.filter((s) => s.roleCategory === 'Teaching');
}

export function getNonTeachingStaff(staff: StaffProfile[]): StaffProfile[] {
  return staff.filter((s) => s.roleCategory !== 'Teaching');
}

export function getStaffByRoleCategory(
  staff: StaffProfile[],
  roleCategory: StaffRoleCategory
): StaffProfile[] {
  return staff.filter((s) => s.roleCategory === roleCategory);
}

export function getOverloadedStaff(workloads: StaffWorkloadSnapshot[]): StaffWorkloadSnapshot[] {
  return workloads.filter((w) => w.workloadStatus === 'Overloaded');
}

export function getPendingDocuments(documents: StaffDocumentSummary[]): StaffDocumentSummary[] {
  return documents.filter((d) => d.verificationStatus === 'Pending');
}

export function getExpiringCertifications(workloads: StaffWorkloadSnapshot[]): StaffWorkloadSnapshot[] {
  return workloads.filter((w) => w.certificationsExpiringSoon > 0);
}

export function getAlertsBySeverity(
  alerts: StaffAlert[],
  severity: StaffAlertSeverity
): StaffAlert[] {
  return alerts.filter((a) => a.severity === severity);
}

export function calculateStaffStats(
  profiles: StaffProfile[],
  workloads: StaffWorkloadSnapshot[],
  documents: StaffDocumentSummary[]
): StaffStats {
  const activeStaff = profiles.filter((p) => p.status === 'Active').length;
  const onLeaveStaff = profiles.filter((p) => p.status === 'On Leave').length;
  const teachingStaff = profiles.filter((p) => p.roleCategory === 'Teaching').length;
  const nonTeachingStaff = profiles.length - teachingStaff;

  const totalTenure = profiles.reduce((sum, p) => sum + p.totalExperienceYears, 0);
  const averageTenureYears = profiles.length > 0 ? Math.round((totalTenure / profiles.length) * 10) / 10 : 0;

  const newHires = profiles.filter((p) => {
    const joinedDate = new Date(p.joiningDate);
    const now = new Date();
    const monthDiff = (now.getFullYear() - joinedDate.getFullYear()) * 12 + (now.getMonth() - joinedDate.getMonth());
    return monthDiff <= 1;
  }).length;

  const pendingVerifications = documents.filter((d) => d.verificationStatus === 'Pending').length;
  const workloadWarnings = workloads.filter((w) => w.workloadStatus === 'Overloaded' || w.workloadStatus === 'High').length;
  const certificationsExpiring = workloads.reduce((sum, w) => sum + w.certificationsExpiringSoon, 0);

  return {
    totalStaff: profiles.length,
    activeStaff,
    onLeaveStaff,
    teachingStaff,
    nonTeachingStaff,
    averageTenureYears,
    newHiresThisMonth: newHires,
    pendingVerifications,
    workloadWarnings,
    certificationsExpiring,
  };
}

export function calculateDepartmentUtilization(dept: StaffDepartmentSummary): number {
  if (dept.totalStaff === 0) return 0;
  return Math.round((dept.activeStaff / dept.totalStaff) * 100);
}

export function calculateWorkloadPercentage(workload: StaffWorkloadSnapshot): number {
  return workload.utilizationPercentage;
}

export function formatStaffDate(date: string): string {
  try {
    return format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
}

export function formatStaffDateTime(dateTime: string): string {
  try {
    return format(parseISO(dateTime), 'MMM d, yyyy h:mm a');
  } catch {
    return dateTime;
  }
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStaffStatusTone(status: StaffStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Active':
      return 'default';
    case 'On Leave':
      return 'outline';
    case 'Suspended':
      return 'destructive';
    case 'Terminated':
      return 'destructive';
    case 'Resigned':
      return 'secondary';
    case 'Retired':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getEmploymentTypeTone(type: StaffEmploymentType): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'Full-Time':
      return 'default';
    case 'Part-Time':
      return 'outline';
    case 'Contract':
      return 'secondary';
    case 'Temporary':
      return 'outline';
    case 'Substitute':
      return 'outline';
    case 'Intern':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getRoleCategoryTone(category: StaffRoleCategory): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (category) {
    case 'Teaching':
      return 'default';
    case 'Administration':
      return 'secondary';
    case 'Non-Teaching':
      return 'outline';
    case 'Support':
      return 'outline';
    case 'Leadership':
      return 'default';
    default:
      return 'default';
  }
}

export function getWorkloadStatusTone(status: StaffWorkloadStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Optimal':
      return 'default';
    case 'Underutilized':
      return 'outline';
    case 'High':
      return 'outline';
    case 'Overloaded':
      return 'destructive';
    default:
      return 'default';
  }
}

export function getDocumentStatusTone(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Verified':
      return 'default';
    case 'Pending':
      return 'outline';
    case 'Rejected':
      return 'destructive';
    case 'Expired':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getAlertSeverityToneSt(severity: StaffAlertSeverity): 'default' | 'secondary' | 'destructive' | 'outline' {
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

export function getGenderTone(gender: StaffGender): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (gender) {
    case 'Male':
      return 'default';
    case 'Female':
      return 'secondary';
    case 'Other':
      return 'outline';
    default:
      return 'default';
  }
}

export function getReadinessScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Average';
  if (score >= 40) return 'Needs Improvement';
  return 'Critical';
}

export function groupStaffByDepartment(
  staff: StaffProfile[]
): Record<string, StaffProfile[]> {
  const groups: Record<string, StaffProfile[]> = {};
  staff.forEach((s) => {
    if (!groups[s.departmentId]) {
      groups[s.departmentId] = [];
    }
    groups[s.departmentId].push(s);
  });
  return groups;
}

export function groupStaffByStatus(
  staff: StaffProfile[]
): Record<StaffStatus, StaffProfile[]> {
  const groups: Record<string, StaffProfile[]> = {};
  staff.forEach((s) => {
    if (!groups[s.status]) {
      groups[s.status] = [];
    }
    groups[s.status].push(s);
  });
  return groups as Record<StaffStatus, StaffProfile[]>;
}

export function groupWorkloadByStatus(
  workloads: StaffWorkloadSnapshot[]
): Record<string, StaffWorkloadSnapshot[]> {
  const groups: Record<string, StaffWorkloadSnapshot[]> = {};
  workloads.forEach((w) => {
    if (!groups[w.workloadStatus]) {
      groups[w.workloadStatus] = [];
    }
    groups[w.workloadStatus].push(w);
  });
  return groups;
}
