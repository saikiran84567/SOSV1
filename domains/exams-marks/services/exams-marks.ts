import type {
  ExamSession,
  ExamSchedule,
  StudentMarkRecord,
  SubjectMarkEntry,
  ClassResultSummary,
  ReportCardReadinessItem,
  GradeBand,
  ExamStatus,
  ExamType,
  MarkEntryStatus,
  ResultStatus,
  GradingScaleType,
} from '@/domains/exams-marks/types';

export function calculateMarksPercentage(marksObtained: number, maxMarks: number): number {
  if (maxMarks === 0) return 0;
  return Math.round((marksObtained / maxMarks) * 100);
}

export function calculatePassPercentage(passCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((passCount / totalCount) * 100);
}

export function calculateMarksEntryProgress(enteredCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((enteredCount / totalCount) * 100);
}

export function getExamSessionsByStatus(sessions: ExamSession[], status: ExamStatus): ExamSession[] {
  return sessions.filter((s) => s.status === status);
}

export function getExamSessionsByType(sessions: ExamSession[], examType: ExamType): ExamSession[] {
  return sessions.filter((s) => s.examType === examType);
}

export function getSchedulesBySession(schedules: ExamSchedule[], examSessionId: string): ExamSchedule[] {
  return schedules.filter((s) => s.examSessionId === examSessionId);
}

export function getMarksBySubject(records: StudentMarkRecord[], subjectId: string): StudentMarkRecord[] {
  return records.filter((r) => r.subjectId === subjectId);
}

export function getMarksByClass(records: StudentMarkRecord[], classGradeId: string, sectionId?: string): StudentMarkRecord[] {
  return records.filter((r) => {
    if (r.classGradeId !== classGradeId) return false;
    if (sectionId && r.sectionId !== sectionId) return false;
    return true;
  });
}

export function getPendingMarkEntries(records: StudentMarkRecord[]): StudentMarkRecord[] {
  return records.filter(
    (r) => r.markEntryStatus === 'Not Started' || r.markEntryStatus === 'In Progress'
  );
}

export function getVerifiedMarkEntries(records: StudentMarkRecord[]): StudentMarkRecord[] {
  return records.filter((r) => r.markEntryStatus === 'Verified' || r.markEntryStatus === 'Locked');
}

export function getSubmittedMarkEntries(records: StudentMarkRecord[]): StudentMarkRecord[] {
  return records.filter((r) => r.markEntryStatus === 'Submitted');
}

export function getClassResultSummariesBySession(summaries: ClassResultSummary[], examSessionId: string): ClassResultSummary[] {
  return summaries.filter((s) => s.examSessionId === examSessionId);
}

export function calculateReportCardReadiness(items: ReportCardReadinessItem[]): {
  percentage: number;
  ready: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
} {
  const counts = {
    ready: items.filter((i) => i.status === 'Ready').length,
    inProgress: items.filter((i) => i.status === 'In Progress').length,
    blocked: items.filter((i) => i.status === 'Blocked').length,
    notStarted: items.filter((i) => i.status === 'Not Started').length,
  };

  const percentage = items.length > 0 ? Math.round((counts.ready / items.length) * 100) : 0;

  return { percentage, ...counts };
}

export function getGradeBandForScore(score: number, gradeBands: GradeBand[]): GradeBand | null {
  return gradeBands.find((band) => score >= band.minValue && score <= band.maxValue) || null;
}

export function formatExamDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatExamDateTime(dateTime: string): string {
  return new Date(dateTime).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatExamTime(time: string): string {
  return time;
}

export function getExamStatusTone(status: ExamStatus): { className: string } {
  const map: Record<ExamStatus, { className: string }> = {
    Draft: { className: 'bg-muted text-muted-foreground border-border' },
    Scheduled: { className: 'bg-info/10 text-info border-info/20' },
    Ongoing: { className: 'bg-warning/10 text-warning border-warning/20' },
    'Marks Entry': { className: 'bg-primary/10 text-primary border-primary/20' },
    Review: { className: 'bg-warning/10 text-warning border-warning/20' },
    Published: { className: 'bg-success/10 text-success border-success/20' },
    Archived: { className: 'bg-muted text-muted-foreground border-border' },
  };
  return map[status];
}

export function getMarkEntryStatusTone(status: MarkEntryStatus): { className: string } {
  const map: Record<MarkEntryStatus, { className: string }> = {
    'Not Started': { className: 'bg-muted/50 text-muted-foreground/60 border-border' },
    'In Progress': { className: 'bg-warning/10 text-warning border-warning/20' },
    Submitted: { className: 'bg-info/10 text-info border-info/20' },
    Verified: { className: 'bg-success/10 text-success border-success/20' },
    Locked: { className: 'bg-primary/10 text-primary border-primary/20' },
  };
  return map[status];
}

export function getResultStatusTone(status: ResultStatus): { className: string } {
  const map: Record<ResultStatus, { className: string }> = {
    'Not Ready': { className: 'bg-muted text-muted-foreground border-border' },
    Processing: { className: 'bg-warning/10 text-warning border-warning/20' },
    'Ready for Review': { className: 'bg-info/10 text-info border-info/20' },
    Published: { className: 'bg-success/10 text-success border-success/20' },
    Archived: { className: 'bg-muted text-muted-foreground border-border' },
  };
  return map[status];
}

export function getReadinessStatusTone(
  status: 'Ready' | 'In Progress' | 'Blocked' | 'Not Started'
): { className: string } {
  const map: Record<'Ready' | 'In Progress' | 'Blocked' | 'Not Started', { className: string }> = {
    Ready: { className: 'bg-success/10 text-success border-success/20' },
    'In Progress': { className: 'bg-warning/10 text-warning border-warning/20' },
    Blocked: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
    'Not Started': { className: 'bg-muted text-muted-foreground border-border' },
  };
  return map[status];
}

export function getExamAlertSeverityTone(severity: 'Info' | 'Warning' | 'Critical'): { className: string } {
  const map: Record<'Info' | 'Warning' | 'Critical', { className: string }> = {
    Info: { className: 'bg-info/10 text-info border-info/20' },
    Warning: { className: 'bg-warning/10 text-warning border-warning/20' },
    Critical: { className: 'bg-destructive/10 text-destructive border-destructive/20' },
  };
  return map[severity];
}

export function calculateExamStats(
  sessions: ExamSession[],
  schedules: ExamSchedule[],
  markRecords: StudentMarkRecord[],
  subjectEntries: SubjectMarkEntry[],
  readinessItems: ReportCardReadinessItem[]
) {
  const activeSessions = sessions.filter(
    (s) => s.status !== 'Draft' && s.status !== 'Archived'
  );

  const scheduledAssessments = schedules.filter(
    (s) => s.status === 'Scheduled' || s.status === 'Ongoing'
  ).length;

  const totalMarksEntered = markRecords.filter(
    (r) => r.markEntryStatus !== 'Not Started'
  ).length;

  const marksEntryProgress = calculateMarksEntryProgress(
    totalMarksEntered,
    markRecords.length
  );

  const pendingVerification = subjectEntries.filter(
    (e) => e.status === 'Submitted'
  ).length;

  const resultReady = sessions.filter(
    (s) => s.resultStatus === 'Ready for Review' || s.resultStatus === 'Published'
  ).length;

  const readiness = calculateReportCardReadiness(readinessItems);

  return {
    totalSessions: sessions.length,
    activeSessions: activeSessions.length,
    scheduledAssessments,
    marksEntryProgress,
    pendingVerification,
    resultReady,
    reportCardReadiness: readiness.percentage,
    readinessCounts: readiness,
  };
}

export function calculateMarksSummary(records: StudentMarkRecord[]): {
  totalRecords: number;
  completedEntries: number;
  pendingEntries: number;
  verifiedEntries: number;
  averageScore: number;
  passPercentage: number;
} {
  const totalRecords = records.length;
  const completedEntries = records.filter(
    (r) => r.markEntryStatus !== 'Not Started' && r.marksObtained !== null
  ).length;
  const pendingEntries = records.filter(
    (r) => r.markEntryStatus === 'Not Started' || r.markEntryStatus === 'In Progress'
  ).length;
  const verifiedEntries = records.filter(
    (r) => r.markEntryStatus === 'Verified' || r.markEntryStatus === 'Locked'
  ).length;

  const scoresWithMarks = records.filter((r) => r.marksObtained !== null);
  const averageScore = scoresWithMarks.length > 0
    ? Math.round(
        scoresWithMarks.reduce((sum, r) => sum + (r.marksObtained || 0), 0) / scoresWithMarks.length
      )
    : 0;

  const passCount = scoresWithMarks.filter(
    (r) => (r.marksObtained || 0) >= r.passingMarks
  ).length;
  const passPercentage = calculatePassPercentage(passCount, scoresWithMarks.length);

  return {
    totalRecords,
    completedEntries,
    pendingEntries,
    verifiedEntries,
    averageScore,
    passPercentage,
  };
}
