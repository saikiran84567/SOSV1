export type SubjectType = 'Core' | 'Elective' | 'Language' | 'Co-curricular' | 'Vocational';

export type SubjectCategory = 'Theory' | 'Practical' | 'Both';

export type SubjectStatus = 'Active' | 'Inactive' | 'Draft';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type PeriodType = 'Teaching' | 'Break' | 'Assembly';

export type TimetableStatus = 'Draft' | 'Published';

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: SubjectType;
  category: SubjectCategory;
  credits: number;
  status: SubjectStatus;
  description: string;
}

export interface ClassSubjectMapping {
  id: string;
  classGradeId: string;
  classGradeName: string;
  subjectId: string;
  subjectName: string;
  isMandatory: boolean;
  periodsPerWeek: number;
}

export interface Period {
  id: string;
  startTime: string;
  endTime: string;
  type: PeriodType;
  subjectId?: string;
  subjectName?: string;
  teacherId?: string;
  teacherName?: string;
  roomNumber?: string;
}

export interface Timetable {
  id: string;
  classGradeId: string;
  classGradeName: string;
  sectionId: string;
  sectionName: string;
  termId: string;
  termName: string;
  status: TimetableStatus;
  schedule: Record<DayOfWeek, Period[]>;
}

export interface AcademicStats {
  totalSubjects: number;
  mappedClasses: number;
  publishedTimetables: number;
  activeTeachers: number;
}
