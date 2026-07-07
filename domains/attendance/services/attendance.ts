import type {
  AttendanceRecord,
  StudentAttendanceRecord,
  StaffAttendanceRecord,
  AttendanceSession,
  AttendanceException,
  AttendanceLeaveRequest,
  AttendanceAlert,
  AttendanceTrendPoint,
  AttendanceStatus,
  AttendanceSessionStatus,
  AttendanceAlertSeverity,
  AttendanceLeaveStatus,
  AttendanceRegisterRow,
  AttendanceStats,
  ClassAttendanceSummary,
  StaffAttendanceSummary,
  AttendanceDaySummary,
} from '@/domains/attendance/types';

export function calculateAttendancePercentage(
  presentCount: number,
  totalCount: number
): number {
  if (totalCount === 0) return 0;
  return Math.round((presentCount / totalCount) * 100);
}

export function calculateAbsenteeCount(records: AttendanceRecord[]): number {
  return records.filter((r) => r.status === 'Absent').length;
}

export function calculateLateCount(records: AttendanceRecord[]): number {
  return records.filter((r) => r.status === 'Late').length;
}

export function calculateStatusCounts(
  records: AttendanceRecord[]
): Record<AttendanceStatus, number> {
  const counts: Record<AttendanceStatus, number> = {
    Present: 0,
    Absent: 0,
    Late: 0,
    'Half Day': 0,
    Leave: 0,
    Excused: 0,
    'Not Marked': 0,
  };
  for (const record of records) {
    counts[record.status]++;
  }
  return counts;
}

export function getStudentAttendanceByClass(
  records: StudentAttendanceRecord[],
  classGradeId: string,
  sectionId?: string
): StudentAttendanceRecord[] {
  return records.filter((r) => {
    if (r.classGradeId !== classGradeId) return false;
    if (sectionId && r.sectionId !== sectionId) return false;
    return true;
  });
}

export function getStaffAttendanceByDepartment(
  records: StaffAttendanceRecord[],
  departmentId: string
): StaffAttendanceRecord[] {
  return records.filter((r) => r.departmentId === departmentId);
}

export function getAttendanceRecordsByDate(
  records: AttendanceRecord[],
  date: string
): AttendanceRecord[] {
  return records.filter((r) => r.date === date);
}

export function getPendingAttendanceSessions(
  sessions: AttendanceSession[]
): AttendanceSession[] {
  return sessions.filter(
    (s) => s.status === 'Draft' || s.status === 'In Progress'
  );
}

export function getUnmarkedSessions(sessions: AttendanceSession[]): AttendanceSession[] {
  return sessions.filter((s) => s.notMarkedCount > 0 || s.status === 'Draft');
}

export function getAttendanceAlertsBySeverity(
  alerts: AttendanceAlert[],
  severity: AttendanceAlertSeverity
): AttendanceAlert[] {
  return alerts.filter((a) => a.severity === severity);
}

export function getPendingLeaveRequests(
  leaveRequests: AttendanceLeaveRequest[]
): AttendanceLeaveRequest[] {
  return leaveRequests.filter((l) => l.status === 'Pending');
}

export function getOpen_exceptions(
  exceptions: AttendanceException[]
): AttendanceException[] {
  return exceptions.filter(
    (e) => e.status === 'Open' || e.status === 'In Progress'
  );
}

export function calculateAttendanceStats(
  studentRecords: StudentAttendanceRecord[],
  staffRecords: StaffAttendanceRecord[],
  sessions: AttendanceSession[],
  leaveRequests: AttendanceLeaveRequest[],
  date: string
): AttendanceStats {
  const todayStudents = studentRecords.filter((r) => r.date === date);
  const todayStaff = staffRecords.filter((r) => r.date === date);

  const studentPresent = todayStudents.filter(
    (r) => r.status === 'Present' || r.status === 'Late'
  ).length;
  const staffPresent = todayStaff.filter(
    (r) => r.status === 'Present' || r.status === 'Late'
  ).length;

  const absentees =
    todayStudents.filter((r) => r.status === 'Absent').length +
    todayStaff.filter((r) => r.status === 'Absent').length;

  const lateArrivals =
    todayStudents.filter((r) => r.status === 'Late').length +
    todayStaff.filter((r) => r.status === 'Late').length;

  const pendingApprovals = leaveRequests.filter((l) => l.status === 'Pending').length;
  const unmarkedSessions = sessions.filter(
    (s) => s.status === 'Draft' || s.notMarkedCount > 0
  ).length;

  return {
    studentAttendanceToday:
      todayStudents.length > 0
        ? calculateAttendancePercentage(studentPresent, todayStudents.length)
        : 0,
    studentTotal: todayStudents.length,
    studentPresent,
    staffAttendanceToday:
      todayStaff.length > 0
        ? calculateAttendancePercentage(staffPresent, todayStaff.length)
        : 0,
    staffTotal: todayStaff.length,
    staffPresent,
    absentees,
    lateArrivals,
    pendingApprovals,
    unmarkedSessions,
  };
}

export function formatAttendanceDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatAttendanceTime(time: string | null): string {
  if (!time) return '—';
  return time;
}

export function getAttendanceStatusTone(
  status: AttendanceStatus
): { className: string } {
  const map: Record<AttendanceStatus, { className: string }> = {
    Present: { className: 'bg-success/10 text-success border-success/20' },
    Absent: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
    Late: { className: 'bg-warning/10 text-warning border-warning/20' },
    'Half Day': { className: 'bg-info/10 text-info border-info/20' },
    Leave: { className: 'bg-primary/10 text-primary border-primary/20' },
    Excused: { className: 'bg-muted text-muted-foreground border-border' },
    'Not Marked': { className: 'bg-muted/50 text-muted-foreground/60 border-border' },
  };
  return map[status];
}

export function getSessionStatusTone(
  status: AttendanceSessionStatus
): { className: string } {
  const map: Record<AttendanceSessionStatus, { className: string }> = {
    Draft: { className: 'bg-muted text-muted-foreground border-border' },
    'In Progress': { className: 'bg-info/10 text-info border-info/20' },
    Submitted: { className: 'bg-warning/10 text-warning border-warning/20' },
    Approved: { className: 'bg-success/10 text-success border-success/20' },
    Locked: { className: 'bg-primary/10 text-primary border-primary/20' },
    Reopened: { className: 'bg-warning/10 text-warning border-warning/20' },
  };
  return map[status];
}

export function getLeaveStatusTone(
  status: AttendanceLeaveStatus
): { className: string } {
  const map: Record<AttendanceLeaveStatus, { className: string }> = {
    Pending: { className: 'bg-warning/10 text-warning border-warning/20' },
    Approved: { className: 'bg-success/10 text-success border-success/20' },
    Rejected: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
    Cancelled: { className: 'bg-muted text-muted-foreground border-border' },
  };
  return map[status];
}

export function getExceptionStatusTone(
  status: 'Open' | 'In Progress' | 'Resolved' | 'Dismissed'
): { className: string } {
  const map: Record<'Open' | 'In Progress' | 'Resolved' | 'Dismissed', { className: string }> = {
    Open: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
    'In Progress': { className: 'bg-warning/10 text-warning border-warning/20' },
    Resolved: { className: 'bg-success/10 text-success border-success/20' },
    Dismissed: { className: 'bg-muted text-muted-foreground border-border' },
  };
  return map[status];
}

export function getAlertSeverityTone(
  severity: AttendanceAlertSeverity
): { className: string } {
  const map: Record<AttendanceAlertSeverity, { className: string }> = {
    Info: { className: 'bg-info/10 text-info border-info/20' },
    Warning: { className: 'bg-warning/10 text-warning border-warning/20' },
    Critical: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
  };
  return map[severity];
}

export function calculateClassAttendanceSummaries(
  records: StudentAttendanceRecord[],
  date: string
): ClassAttendanceSummary[] {
  const classMap = new Map<
    string,
    {
      classGradeId: string;
      classGradeName: string;
      sectionId: string;
      sectionName: string;
      campusId: string;
      campusName: string;
      records: StudentAttendanceRecord[];
    }
  >();

  for (const record of records.filter((r) => r.date === date)) {
    const key = `${record.classGradeId}-${record.sectionId}`;
    if (!classMap.has(key)) {
      classMap.set(key, {
        classGradeId: record.classGradeId,
        classGradeName: record.classGradeName,
        sectionId: record.sectionId,
        sectionName: record.sectionName,
        campusId: record.campusId,
        campusName: record.campusName,
        records: [],
      });
    }
    classMap.get(key)!.records.push(record);
  }

  return Array.from(classMap.values()).map((cls) => {
    const presentCount = cls.records.filter(
      (r) => r.status === 'Present' || r.status === 'Late'
    ).length;
    const absentCount = cls.records.filter((r) => r.status === 'Absent').length;
    const lateCount = cls.records.filter((r) => r.status === 'Late').length;
    const leaveCount = cls.records.filter((r) => r.status === 'Leave').length;
    const notMarkedCount = cls.records.filter((r) => r.status === 'Not Marked').length;

    return {
      classGradeId: cls.classGradeId,
      classGradeName: cls.classGradeName,
      sectionId: cls.sectionId,
      sectionName: cls.sectionName,
      campusId: cls.campusId,
      campusName: cls.campusName,
      totalCount: cls.records.length,
      presentCount,
      absentCount,
      lateCount,
      leaveCount,
      notMarkedCount,
      attendancePercentage: calculateAttendancePercentage(presentCount, cls.records.length),
    };
  });
}

export function calculateStaffAttendanceSummaries(
  records: StaffAttendanceRecord[],
  date: string
): StaffAttendanceSummary[] {
  const deptMap = new Map<
    string,
    {
      departmentId: string;
      departmentName: string;
      campusId: string;
      campusName: string;
      records: StaffAttendanceRecord[];
    }
  >();

  for (const record of records.filter((r) => r.date === date)) {
    if (!deptMap.has(record.departmentId)) {
      deptMap.set(record.departmentId, {
        departmentId: record.departmentId,
        departmentName: record.departmentName,
        campusId: record.campusId,
        campusName: record.campusName,
        records: [],
      });
    }
    deptMap.get(record.departmentId)!.records.push(record);
  }

  return Array.from(deptMap.values()).map((dept) => {
    const presentCount = dept.records.filter(
      (r) => r.status === 'Present' || r.status === 'Late'
    ).length;
    const absentCount = dept.records.filter((r) => r.status === 'Absent').length;
    const lateCount = dept.records.filter((r) => r.status === 'Late').length;
    const leaveCount = dept.records.filter((r) => r.status === 'Leave').length;
    const notMarkedCount = dept.records.filter((r) => r.status === 'Not Marked').length;

    return {
      departmentId: dept.departmentId,
      departmentName: dept.departmentName,
      campusId: dept.campusId,
      campusName: dept.campusName,
      totalCount: dept.records.length,
      presentCount,
      absentCount,
      lateCount,
      leaveCount,
      notMarkedCount,
      attendancePercentage: calculateAttendancePercentage(presentCount, dept.records.length),
    };
  });
}
