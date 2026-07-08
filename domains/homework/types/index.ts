export type HomeworkTaskType =
  | 'Homework'
  | 'Assignment'
  | 'Project'
  | 'Worksheet'
  | 'Reading'
  | 'Practice'
  | 'Revision'
  | 'Activity';

export type HomeworkStatus =
  | 'Draft'
  | 'Scheduled'
  | 'Published'
  | 'In Progress'
  | 'Due Today'
  | 'Overdue'
  | 'Closed'
  | 'Archived';

export type SubmissionStatus =
  | 'Not Submitted'
  | 'Submitted'
  | 'Late Submission'
  | 'Missing'
  | 'Excused';

export type ReviewStatus =
  | 'Not Reviewed'
  | 'In Review'
  | 'Reviewed'
  | 'Returned'
  | 'Rework Required';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type AttachmentType =
  | 'Document'
  | 'Image'
  | 'Worksheet'
  | 'Link'
  | 'Reference'
  | 'Other';

export type HomeworkAlertSeverity = 'Info' | 'Warning' | 'Critical';

export interface HomeworkTask {
  id: string;
  title: string;
  description: string;
  taskType: HomeworkTaskType;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  campusId: string;
  campusName: string;
  academicYearId: string;
  academicYearName: string;
  assignedDate: string;
  dueDate: string;
  status: HomeworkStatus;
  priority: PriorityLevel;
  estimatedDurationMinutes: number;
  totalStudents: number;
  submissionCount: number;
  reviewedCount: number;
  attachmentCount: number;
  tags: string[];
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeworkAttachment {
  id: string;
  taskId: string;
  name: string;
  type: AttachmentType;
  url: string;
  sizeLabel: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface HomeworkAudience {
  id: string;
  taskId: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  totalStudents: number;
  activeStudents: number;
}

export interface HomeworkSubmission {
  id: string;
  taskId: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  rollNumber: string;
  submittedAt: string | null;
  status: SubmissionStatus;
  reviewStatus: ReviewStatus;
  submissionText: string | null;
  attachmentCount: number;
  lateByMinutes: number | null;
  marksAwarded: number | null;
  feedbackSnippet: string | null;
}

export interface HomeworkReview {
  id: string;
  submissionId: string;
  reviewedBy: string;
  reviewedAt: string | null;
  reviewStatus: ReviewStatus;
  feedback: string | null;
  actionRequired: string | null;
}

export interface HomeworkClassSummary {
  id: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  activeTasks: number;
  dueToday: number;
  overdue: number;
  submissionRate: number;
  reviewRate: number;
}

export interface HomeworkSubjectSummary {
  id: string;
  subjectId: string;
  subjectName: string;
  activeTasks: number;
  totalSubmissions: number;
  pendingReviews: number;
  completionRate: number;
}

export interface HomeworkStudentProgress {
  id: string;
  studentId: string;
  studentName: string;
  classGradeName: string;
  sectionName: string;
  assignedTasks: number;
  submittedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  reviewedTasks: number;
  completionPercentage: number;
}

export interface HomeworkAlert {
  id: string;
  title: string;
  description: string;
  severity: HomeworkAlertSeverity;
  date: string;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
  status: string;
  actionRequired: string | null;
}

export interface HomeworkActivityEvent {
  id: string;
  eventType: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity: HomeworkAlertSeverity;
  relatedEntity: {
    type: string;
    id: string;
    name: string;
  };
}

export interface TaskChecklistItem {
  id: string;
  taskId: string;
  label: string;
  completed: boolean;
  owner: string;
  dueDate: string | null;
}

export interface LearningTaskTemplate {
  id: string;
  name: string;
  taskType: HomeworkTaskType;
  subjectName: string;
  suggestedDurationMinutes: number;
  recommendedForLevels: string[];
  instructionsTemplate: string;
  status: 'Active' | 'Draft' | 'Archived';
}

export interface HomeworkFilterState {
  searchQuery: string;
  subjectId: string | null;
  teacherId: string | null;
  classGradeId: string | null;
  sectionId: string | null;
  taskType: HomeworkTaskType | null;
  status: HomeworkStatus | null;
  priority: PriorityLevel | null;
  submissionStatus: SubmissionStatus | null;
  reviewStatus: ReviewStatus | null;
}

export interface HomeworkStats {
  totalTasks: number;
  activeTasks: number;
  dueToday: number;
  overdue: number;
  totalSubmissions: number;
  pendingReviews: number;
  averageSubmissionRate: number;
  averageReviewRate: number;
  averageCompletionPercentage: number;
}
