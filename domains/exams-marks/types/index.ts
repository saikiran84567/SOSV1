export type ExamTerm = 'Term 1' | 'Term 2' | 'Term 3' | 'Annual';

export type ExamType =
  | 'Unit Test'
  | 'Weekly Test'
  | 'Monthly Test'
  | 'Mid Term'
  | 'Term End'
  | 'Final Exam'
  | 'Practical Exam'
  | 'Oral Assessment'
  | 'Internal Assessment';

export type ExamStatus =
  | 'Draft'
  | 'Scheduled'
  | 'Ongoing'
  | 'Marks Entry'
  | 'Review'
  | 'Published'
  | 'Archived';

export type AssessmentType =
  | 'Theory'
  | 'Practical'
  | 'Oral'
  | 'Project'
  | 'Assignment'
  | 'Internal';

export type GradingScaleType =
  | 'Percentage'
  | 'GPA'
  | 'Letter Grade'
  | 'Custom Band';

export type MarkEntryStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Submitted'
  | 'Verified'
  | 'Locked';

export type ResultStatus =
  | 'Not Ready'
  | 'Processing'
  | 'Ready for Review'
  | 'Published'
  | 'Archived';

export type ReportCardReadinessStatus =
  | 'Ready'
  | 'In Progress'
  | 'Blocked'
  | 'Not Started';

export type ExamAlertSeverity = 'Info' | 'Warning' | 'Critical';

export interface ExamSession {
  id: string;
  name: string;
  examType: ExamType;
  academicYearId: string;
  academicYearName: string;
  termId: string;
  termName: string;
  campusId: string;
  campusName: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  startDate: string;
  endDate: string;
  status: ExamStatus;
  gradingScaleType: GradingScaleType;
  totalSubjects: number;
  marksEntryProgress: number;
  resultStatus: ResultStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamSchedule {
  id: string;
  examSessionId: string;
  sessionName: string;
  date: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  assessmentType: AssessmentType;
  startTime: string;
  endTime: string;
  room: string | null;
  invigilator: string | null;
  maxMarks: number;
  passingMarks: number;
  status: ExamStatus;
}

export interface ExamSubjectComponent {
  id: string;
  subjectId: string;
  subjectName: string;
  componentName: string;
  assessmentType: AssessmentType;
  maxMarks: number;
  passingMarks: number;
  weightage: number;
  status: 'Active' | 'Inactive';
}

export interface ExamConfiguration {
  id: string;
  academicYearId: string;
  academicYearName: string;
  campusId: string;
  campusName: string;
  classGradeId: string;
  classGradeName: string;
  gradingScaleType: GradingScaleType;
  roundingRule: 'Round Up' | 'Round Down' | 'Nearest';
  passCriteria: 'Percentage' | 'Subject Wise' | 'Aggregate';
  allowGraceMarks: boolean;
  includeAttendance: boolean;
  includeCoScholastic: boolean;
  resultComputationNote: string | null;
  status: 'Active' | 'Draft';
}

export interface ClassExamPlan {
  id: string;
  examSessionId: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  subjectCount: number;
  studentCount: number;
  examDays: number;
  status: ExamStatus;
  coordinator: string;
}

export interface StudentMarkRecord {
  id: string;
  examSessionId: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  rollNumber: string | null;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  subjectId: string;
  subjectName: string;
  assessmentType: AssessmentType;
  marksObtained: number | null;
  maxMarks: number;
  passingMarks: number;
  grade: string | null;
  remarks: string | null;
  enteredBy: string | null;
  enteredAt: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  markEntryStatus: MarkEntryStatus;
}

export interface SubjectMarkEntry {
  id: string;
  examSessionId: string;
  subjectId: string;
  subjectName: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  teacherId: string;
  teacherName: string;
  totalStudents: number;
  marksEnteredCount: number;
  marksPendingCount: number;
  status: MarkEntryStatus;
  dueDate: string;
}

export interface GradeBand {
  id: string;
  scaleType: GradingScaleType;
  label: string;
  minValue: number;
  maxValue: number;
  result: 'Pass' | 'Fail' | 'Compartment';
  colorToken: string;
}

export interface ReportCardReadinessItem {
  id: string;
  area: string;
  description: string;
  status: ReportCardReadinessStatus;
  owner: string;
  dueDate: string;
  blockers: string | null;
}

export interface MarksSummary {
  totalRecords: number;
  completedEntries: number;
  pendingEntries: number;
  verifiedEntries: number;
  averageScore: number;
  passPercentage: number;
}

export interface ClassResultSummary {
  id: string;
  examSessionId: string;
  classGradeName: string;
  sectionName: string;
  studentsAppeared: number;
  passCount: number;
  failCount: number;
  highestAverage: number;
  classAverage: number;
  resultStatus: ResultStatus;
}

export interface StudentResultSnapshot {
  id: string;
  studentId: string;
  studentName: string;
  classGradeName: string;
  sectionName: string;
  examSessionName: string;
  subjectsAppeared: number;
  totalMarksObtained: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
  resultStatus: 'Pass' | 'Fail' | 'Compartment';
}

export interface MarksheetRow {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  rollNumber: string | null;
  marksObtained: number | null;
  maxMarks: number;
  grade: string | null;
  status: MarkEntryStatus;
}

export interface ExamAlert {
  id: string;
  title: string;
  description: string;
  severity: ExamAlertSeverity;
  date: string;
  relatedEntity: {
    type: 'session' | 'schedule' | 'marks' | 'result';
    id: string;
    name: string;
  };
  status: 'Active' | 'Acknowledged' | 'Resolved';
  actionRequired: string;
}

export interface ExamActivityEvent {
  id: string;
  eventType:
    | 'Exam Session Created'
    | 'Schedule Published'
    | 'Marks Entry Opened'
    | 'Marks Submitted'
    | 'Marks Verified'
    | 'Result Review Started'
    | 'Report Card Blocker Added'
    | 'Session Archived';
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
  relatedEntity: {
    type: 'session' | 'schedule' | 'marks' | 'result';
    id: string;
    name: string;
  };
}

export interface ExamFilterState {
  search: string;
  examType: ExamType | 'all';
  campusId: string | 'all';
  classGradeId: string | 'all';
  status: ExamStatus | 'all';
  resultStatus: ResultStatus | 'all';
}
