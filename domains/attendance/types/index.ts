export type AttendancePersonType = 'Student' | 'Staff';

export type AttendanceStatus =
  | 'Present'
  | 'Absent'
  | 'Late'
  | 'Half Day'
  | 'Leave'
  | 'Excused'
  | 'Not Marked';

export type AttendanceSessionStatus =
  | 'Draft'
  | 'In Progress'
  | 'Submitted'
  | 'Approved'
  | 'Locked'
  | 'Reopened';

export type AttendanceMode =
  | 'Daily'
  | 'Period-wise'
  | 'Morning/Evening'
  | 'Staff Shift';

export type AttendanceSource =
  | 'Manual'
  | 'Import'
  | 'Biometric'
  | 'RFID'
  | 'Mobile App'
  | 'System';

export type AttendanceExceptionType =
  | 'Late Arrival'
  | 'Early Departure'
  | 'Missing Check-in'
  | 'Missing Check-out'
  | 'Attendance Correction'
  | 'Medical Exception'
  | 'Transport Delay'
  | 'Other';

export type AttendanceLeaveStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

export type AttendanceAlertSeverity = 'Info' | 'Warning' | 'Critical';

export interface AttendanceRecord {
  id: string;
  date: string;
  academicYearId: string;
  academicYearName: string;
  campusId: string;
  campusName: string;
  personType: AttendancePersonType;
  personId: string;
  personName: string;
  status: AttendanceStatus;
  sessionId: string;
  sessionName: string;
  markedById: string;
  markedByName: string;
  markedAt: string;
  source: AttendanceSource;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentAttendanceRecord extends AttendanceRecord {
  studentId: string;
  admissionNumber: string;
  rollNumber: string | null;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  guardianName: string;
  guardianPhone: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

export interface StaffAttendanceRecord extends AttendanceRecord {
  staffId: string;
  employeeCode: string;
  departmentId: string;
  departmentName: string;
  roleName: string;
  shiftName: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  expectedCheckInTime: string;
  expectedCheckOutTime: string;
}

export interface AttendanceSession {
  id: string;
  date: string;
  sessionName: string;
  personType: AttendancePersonType;
  mode: AttendanceMode;
  campusId: string;
  campusName: string;
  classGradeId: string | null;
  classGradeName: string | null;
  sectionId: string | null;
  sectionName: string | null;
  departmentId: string | null;
  departmentName: string | null;
  status: AttendanceSessionStatus;
  markedById: string;
  markedByName: string;
  submittedAt: string | null;
  approvedById: string | null;
  approvedByName: string | null;
  approvedAt: string | null;
  totalCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  leaveCount: number;
  notMarkedCount: number;
  remarks: string | null;
}

export interface AttendanceDaySummary {
  date: string;
  campusId: string;
  campusName: string;
  studentTotal: number;
  studentPresent: number;
  studentAbsent: number;
  studentLate: number;
  studentLeave: number;
  studentPercentage: number;
  staffTotal: number;
  staffPresent: number;
  staffAbsent: number;
  staffLate: number;
  staffLeave: number;
  staffPercentage: number;
}

export interface ClassAttendanceSummary {
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  campusId: string;
  campusName: string;
  totalCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  leaveCount: number;
  notMarkedCount: number;
  attendancePercentage: number;
}

export interface StaffAttendanceSummary {
  departmentId: string;
  departmentName: string;
  campusId: string;
  campusName: string;
  totalCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  leaveCount: number;
  notMarkedCount: number;
  attendancePercentage: number;
}

export interface AttendanceMarker {
  id: string;
  name: string;
  role: string;
}

export interface AttendanceException {
  id: string;
  personType: AttendancePersonType;
  personId: string;
  personName: string;
  date: string;
  type: AttendanceExceptionType;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed';
  reason: string;
  reportedBy: string;
  reportedAt: string;
  resolvedBy: string | null;
  resolvedAt: string | null;
  notes: string | null;
}

export interface AttendanceLeaveRequest {
  id: string;
  personType: AttendancePersonType;
  personId: string;
  personName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: AttendanceLeaveStatus;
  requestedBy: string;
  requestedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  attachmentRequired: boolean;
  notes: string | null;
}

export interface AttendanceTrendPoint {
  date: string;
  studentPercentage: number;
  staffPercentage: number;
  absenteeCount: number;
  lateCount: number;
}

export interface AttendanceAlert {
  id: string;
  title: string;
  description: string;
  severity: AttendanceAlertSeverity;
  personType: AttendancePersonType;
  personName: string;
  date: string;
  status: 'Active' | 'Acknowledged' | 'Resolved';
  actionRequired: string;
}

export interface AttendanceActivityEvent {
  id: string;
  eventType:
    | 'Student Attendance Submitted'
    | 'Staff Attendance Submitted'
    | 'Late Arrival Flagged'
    | 'Leave Request Approved'
    | 'Leave Request Rejected'
    | 'Attendance Correction Requested'
    | 'Session Locked'
    | 'Session Approved'
    | 'Exception Resolved'
    | 'Guardian Notification Queued';
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
  relatedEntity: {
    type: 'student' | 'staff' | 'session' | 'exception' | 'leave';
    id: string;
    name: string;
  };
}

export interface AttendanceFilterState {
  search: string;
  classGradeId: string | 'all';
  sectionId: string | 'all';
  campusId: string | 'all';
  departmentId: string | 'all';
  status: AttendanceStatus | 'all';
  personType: AttendancePersonType | 'all';
  date: string;
}

export interface AttendanceStats {
  studentAttendanceToday: number;
  studentTotal: number;
  studentPresent: number;
  staffAttendanceToday: number;
  staffTotal: number;
  staffPresent: number;
  absentees: number;
  lateArrivals: number;
  pendingApprovals: number;
  unmarkedSessions: number;
}

export interface AttendanceRegisterRow {
  id: string;
  personType: AttendancePersonType;
  personId: string;
  personName: string;
  admissionNumber: string | null;
  rollNumber: string | null;
  employeeCode: string | null;
  classGradeId: string | null;
  classGradeName: string | null;
  sectionId: string | null;
  sectionName: string | null;
  departmentName: string | null;
  roleName: string | null;
  shiftName: string | null;
  guardianPhone: string | null;
  expectedCheckInTime: string | null;
  currentStatus: AttendanceStatus;
  remarks: string | null;
}
