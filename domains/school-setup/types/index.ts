export type SchoolBoard =
  | 'CBSE'
  | 'ICSE'
  | 'State Board'
  | 'IB'
  | 'Cambridge'
  | 'Other';

export type SchoolLevel =
  | 'Pre Primary'
  | 'Primary'
  | 'Middle School'
  | 'Secondary'
  | 'Senior Secondary';

export type SchoolStatus = 'active' | 'inactive' | 'maintenance';

export interface SchoolProfile {
  id: string;
  name: string;
  code: string;
  logoInitials: string;
  board: SchoolBoard;
  registrationNumber: string;
  affiliationNumber: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  principalName: string;
  establishedYear: number;
  timezone: string;
  currency: string;
  language: string;
  status: SchoolStatus;
}

export type CampusType = 'main' | 'branch' | 'satellite';
export type CampusStatus = 'active' | 'inactive' | 'maintenance';

export interface Campus {
  id: string;
  name: string;
  code: string;
  type: CampusType;
  status: CampusStatus;
  address: string;
  city: string;
  phone: string;
  email: string;
  capacity: number;
  currentStudents: number;
  principalOrHead: string;
  establishedYear: number;
}

export type AcademicYearStatus = 'draft' | 'active' | 'closed' | 'archived';
export type TermStatus = 'upcoming' | 'active' | 'completed';

export interface Term {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TermStatus;
  instructionalDays: number;
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: AcademicYearStatus;
  terms: Term[];
  isCurrent: boolean;
  totalInstructionalDays: number;
}

export type DepartmentType =
  | 'Academic'
  | 'Administrative'
  | 'Finance'
  | 'Operations'
  | 'Support';

export type DepartmentStatus = 'active' | 'inactive';

export interface Department {
  id: string;
  name: string;
  code: string;
  type: DepartmentType;
  headOfDepartment: string;
  staffCount: number;
  description: string;
  status: DepartmentStatus;
}

export type ClassGradeStatus = 'active' | 'inactive';

export interface Section {
  id: string;
  name: string;
  classGradeId: string;
  roomNumber: string;
  capacity: number;
  currentStudents: number;
  classTeacher: string;
  status: 'active' | 'inactive';
}

export interface ClassGrade {
  id: string;
  name: string;
  level: SchoolLevel;
  order: number;
  sections: Section[];
  capacity: number;
  currentStudents: number;
  classTeacher: string | null;
  status: ClassGradeStatus;
}

export type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface WorkingDay {
  day: WeekDay;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export type HolidayType =
  | 'national'
  | 'religious'
  | 'school'
  | 'seasonal'
  | 'exam';

export interface Holiday {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  type: HolidayType;
  appliesTo: 'all' | string;
  appliesToName: string;
}

export interface SchoolConfiguration {
  timezone: string;
  currency: string;
  defaultLanguage: string;
  weekStartDay: WeekDay;
  attendanceMode: string;
  gradingSystem: string;
  feeCycle: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    parentPortal: boolean;
  };
}

export interface SetupCompletionItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  category: string;
}
