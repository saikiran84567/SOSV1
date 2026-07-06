import type {
  Subject,
  SubjectType,
  ClassSubjectMapping,
  Timetable,
  AcademicStats,
  Period,
  DayOfWeek,
} from '@/domains/academics/types';

export function getSubjectsByType(subjects: Subject[], type: SubjectType): Subject[] {
  return subjects.filter((s) => s.type === type);
}

export function getMappedSubjectsForClass(
  mappings: ClassSubjectMapping[],
  classGradeId: string
): ClassSubjectMapping[] {
  return mappings.filter((m) => m.classGradeId === classGradeId);
}

export function getTimetableForSection(
  timetables: Timetable[],
  sectionId: string
): Timetable | undefined {
  return timetables.find((t) => t.sectionId === sectionId);
}

export function calculateTotalTeachingPeriods(timetable: Timetable): number {
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.reduce((sum, day) => {
    const periods = timetable.schedule[day] ?? [];
    return sum + periods.filter((p) => p.type === 'Teaching').length;
  }, 0);
}

export function calculateAcademicStats(
  subjects: Subject[],
  mappings: ClassSubjectMapping[],
  timetables: Timetable[]
): AcademicStats {
  const mappedClassIds = new Set(mappings.map((m) => m.classGradeId));
  return {
    totalSubjects: subjects.filter((s) => s.status === 'Active').length,
    mappedClasses: mappedClassIds.size,
    publishedTimetables: timetables.filter((t) => t.status === 'Published').length,
    activeTeachers: 42,
  };
}

export function getPeriodDuration(period: Period): string {
  return `${period.startTime} - ${period.endTime}`;
}
