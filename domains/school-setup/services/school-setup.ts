import type {
  AcademicYear,
  Department,
  Section,
  ClassGrade,
  SetupCompletionItem,
  Term,
  DepartmentType,
} from '@/domains/school-setup/types';

export function calculateCapacityUtilization(
  currentStudents: number,
  capacity: number
): number {
  if (capacity <= 0) return 0;
  return Math.round((currentStudents / capacity) * 100);
}

export function getCurrentAcademicYear(
  academicYears: AcademicYear[]
): AcademicYear | undefined {
  return academicYears.find((year) => year.isCurrent);
}

export function getActiveTerms(academicYear: AcademicYear): Term[] {
  return academicYear.terms.filter((term) => term.status === 'active');
}

export function calculateSetupCompletion(
  checklist: SetupCompletionItem[]
): { completed: number; total: number; percentage: number } {
  const total = checklist.length;
  const completed = checklist.filter((item) => item.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
}

export function groupDepartmentsByType(
  departments: Department[]
): Record<DepartmentType, Department[]> {
  return departments.reduce(
    (acc, dept) => {
      if (!acc[dept.type]) acc[dept.type] = [];
      acc[dept.type].push(dept);
      return acc;
    },
    {} as Record<DepartmentType, Department[]>
  );
}

export function getSectionsForClass(
  classGradeId: string,
  classGrades: ClassGrade[]
): Section[] {
  const classGrade = classGrades.find((c) => c.id === classGradeId);
  return classGrade?.sections ?? [];
}

export function formatSchoolDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTotalCapacity(classGrades: ClassGrade[]): number {
  return classGrades.reduce((sum, c) => sum + c.capacity, 0);
}

export function getTotalCurrentStudents(classGrades: ClassGrade[]): number {
  return classGrades.reduce((sum, c) => sum + c.currentStudents, 0);
}
