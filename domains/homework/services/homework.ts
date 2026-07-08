import type {
  HomeworkTask,
  HomeworkSubmission,
  HomeworkReview,
  HomeworkAlert,
  HomeworkStudentProgress,
  HomeworkStats,
  HomeworkAlertSeverity,
  HomeworkStatus,
  SubmissionStatus,
  ReviewStatus,
  PriorityLevel,
} from '../types';
import { format, parseISO } from 'date-fns';

export function calculateSubmissionRate(
  submissionCount: number,
  totalStudents: number
): number {
  if (totalStudents === 0) return 0;
  return Math.round((submissionCount / totalStudents) * 100);
}

export function calculateReviewRate(
  reviewedCount: number,
  submissionCount: number
): number {
  if (submissionCount === 0) return 0;
  return Math.round((reviewedCount / submissionCount) * 100);
}

export function getTasksByStatus(
  tasks: HomeworkTask[],
  status: HomeworkStatus
): HomeworkTask[] {
  return tasks.filter((task) => task.status === status);
}

export function getTasksBySubject(
  tasks: HomeworkTask[],
  subjectId: string
): HomeworkTask[] {
  return tasks.filter((task) => task.subjectId === subjectId);
}

export function getTasksByTeacher(
  tasks: HomeworkTask[],
  teacherId: string
): HomeworkTask[] {
  return tasks.filter((task) => task.teacherId === teacherId);
}

export function getTasksByClass(
  tasks: HomeworkTask[],
  classGradeId: string
): HomeworkTask[] {
  return tasks.filter((task) => task.classGradeId === classGradeId);
}

export function getTasksBySection(
  tasks: HomeworkTask[],
  sectionId: string
): HomeworkTask[] {
  return tasks.filter((task) => task.sectionId === sectionId);
}

export function getSubmissionsByTask(
  submissions: HomeworkSubmission[],
  taskId: string
): HomeworkSubmission[] {
  return submissions.filter((sub) => sub.taskId === taskId);
}

export function getPendingReviews(submissions: HomeworkSubmission[]): HomeworkSubmission[] {
  return submissions.filter(
    (sub) => sub.status === 'Submitted' && sub.reviewStatus === 'Not Reviewed'
  );
}

export function getOverdueTasks(tasks: HomeworkTask[]): HomeworkTask[] {
  return tasks.filter((task) => task.status === 'Overdue');
}

export function getDueTodayTasks(tasks: HomeworkTask[]): HomeworkTask[] {
  return tasks.filter((task) => task.status === 'Due Today');
}

export function getHomeworkAlertsBySeverity(
  alerts: HomeworkAlert[],
  severity: HomeworkAlertSeverity
): HomeworkAlert[] {
  return alerts.filter((alert) => alert.severity === severity);
}

export function calculateHomeworkStats(data: {
  tasks: HomeworkTask[];
  submissions: HomeworkSubmission[];
  studentProgress: HomeworkStudentProgress[];
}): HomeworkStats {
  const { tasks, submissions, studentProgress } = data;

  const activeTasks = tasks.filter(
    (t) => !['Draft', 'Archived', 'Closed'].includes(t.status)
  ).length;

  const dueToday = tasks.filter((t) => t.status === 'Due Today').length;
  const overdue = tasks.filter((t) => t.status === 'Overdue').length;

  const totalSubmissions = submissions.filter(
    (s) => s.status === 'Submitted' || s.status === 'Late Submission'
  ).length;

  const pendingReviews = submissions.filter(
    (s) => s.status === 'Submitted' && s.reviewStatus === 'Not Reviewed'
  ).length;

  const avgSubmissionRate =
    tasks.length > 0
      ? Math.round(
          tasks.reduce((sum, t) => sum + calculateSubmissionRate(t.submissionCount, t.totalStudents), 0) / tasks.length
        )
      : 0;

  const avgReviewRate =
    tasks.length > 0
      ? Math.round(
          tasks.reduce((sum, t) => sum + calculateReviewRate(t.reviewedCount, t.submissionCount), 0) / tasks.length
        )
      : 0;

  const avgCompletion =
    studentProgress.length > 0
      ? Math.round(
          studentProgress.reduce((sum, sp) => sum + sp.completionPercentage, 0) / studentProgress.length
        )
      : 0;

  return {
    totalTasks: tasks.length,
    activeTasks,
    dueToday,
    overdue,
    totalSubmissions,
    pendingReviews,
    averageSubmissionRate: avgSubmissionRate,
    averageReviewRate: avgReviewRate,
    averageCompletionPercentage: avgCompletion,
  };
}

export function calculateStudentCompletionPercentage(
  progress: HomeworkStudentProgress
): number {
  if (progress.assignedTasks === 0) return 0;
  return Math.round((progress.submittedTasks / progress.assignedTasks) * 100);
}

export function formatHomeworkDate(date: string): string {
  try {
    return format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
}

export function formatHomeworkDateTime(dateTime: string): string {
  try {
    return format(parseISO(dateTime), 'MMM d, yyyy h:mm a');
  } catch {
    return dateTime;
  }
}

export function getHomeworkStatusTone(status: HomeworkStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Published':
    case 'In Progress':
      return 'default';
    case 'Due Today':
      return 'outline';
    case 'Overdue':
      return 'destructive';
    case 'Closed':
      return 'secondary';
    case 'Archived':
      return 'outline';
    case 'Draft':
      return 'default';
    case 'Scheduled':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getSubmissionStatusTone(status: SubmissionStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Submitted':
      return 'default';
    case 'Late Submission':
      return 'outline';
    case 'Not Submitted':
      return 'default';
    case 'Missing':
      return 'destructive';
    case 'Excused':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getReviewStatusTone(status: ReviewStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Reviewed':
      return 'default';
    case 'In Review':
      return 'default';
    case 'Not Reviewed':
      return 'default';
    case 'Returned':
      return 'secondary';
    case 'Rework Required':
      return 'outline';
    default:
      return 'default';
  }
}

export function getPriorityTone(priority: PriorityLevel): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (priority) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'outline';
    case 'Medium':
      return 'default';
    case 'Low':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getAlertSeverityTone(severity: HomeworkAlertSeverity): 'default' | 'secondary' | 'destructive' | 'outline' {
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

export function getTaskTypeTone(taskType: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (taskType) {
    case 'Homework':
      return 'default';
    case 'Assignment':
      return 'default';
    case 'Project':
      return 'secondary';
    case 'Worksheet':
      return 'outline';
    case 'Reading':
      return 'default';
    case 'Practice':
      return 'outline';
    case 'Revision':
      return 'secondary';
    case 'Activity':
      return 'default';
    default:
      return 'default';
  }
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getLateSubmissionLabel(lateByMinutes: number | null): string {
  if (!lateByMinutes) return '-';
  if (lateByMinutes < 60) return `${lateByMinutes} min late`;
  const hours = Math.floor(lateByMinutes / 60);
  const mins = lateByMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m late` : `${hours}h late`;
}

export function groupTasksByStatus(
  tasks: HomeworkTask[]
): Record<HomeworkStatus, HomeworkTask[]> {
  const groups: Record<string, HomeworkTask[]> = {};
  tasks.forEach((task) => {
    if (!groups[task.status]) {
      groups[task.status] = [];
    }
    groups[task.status].push(task);
  });
  return groups as Record<HomeworkStatus, HomeworkTask[]>;
}

export function groupSubmissionsByReviewStatus(
  submissions: HomeworkSubmission[]
): Record<ReviewStatus, HomeworkSubmission[]> {
  const groups: Record<string, HomeworkSubmission[]> = {};
  submissions.forEach((sub) => {
    if (!groups[sub.reviewStatus]) {
      groups[sub.reviewStatus] = [];
    }
    groups[sub.reviewStatus].push(sub);
  });
  return groups as Record<ReviewStatus, HomeworkSubmission[]>;
}
