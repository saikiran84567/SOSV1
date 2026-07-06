import type {
  Subject,
  ClassSubjectMapping,
  Timetable,
  Period,
  DayOfWeek,
} from '@/domains/academics/types';

export const subjects: Subject[] = [
  { id: 'sub-math', name: 'Mathematics', code: 'MATH', type: 'Core', category: 'Theory', credits: 4, status: 'Active', description: 'Algebra, geometry, trigonometry, and calculus fundamentals.' },
  { id: 'sub-sci', name: 'Science', code: 'SCI', type: 'Core', category: 'Both', credits: 4, status: 'Active', description: 'Physics, chemistry, and biology integrated.' },
  { id: 'sub-eng', name: 'English', code: 'ENG', type: 'Core', category: 'Theory', credits: 3, status: 'Active', description: 'English language and literature.' },
  { id: 'sub-hindi', name: 'Hindi', code: 'HIN', type: 'Language', category: 'Theory', credits: 2, status: 'Active', description: 'Hindi language and literature.' },
  { id: 'sub-kannada', name: 'Kannada', code: 'KAN', type: 'Language', category: 'Theory', credits: 2, status: 'Active', description: 'Kannada language and literature.' },
  { id: 'sub-sanskrit', name: 'Sanskrit', code: 'SNS', type: 'Language', category: 'Theory', credits: 2, status: 'Active', description: 'Sanskrit language fundamentals.' },
  { id: 'sub-ss', name: 'Social Science', code: 'SST', type: 'Core', category: 'Theory', credits: 3, status: 'Active', description: 'History, geography, civics, and economics.' },
  { id: 'sub-cs', name: 'Computer Science', code: 'CS', type: 'Elective', category: 'Practical', credits: 3, status: 'Active', description: 'Programming, data structures, and algorithms.' },
  { id: 'sub-pe', name: 'Physical Education', code: 'PE', type: 'Co-curricular', category: 'Practical', credits: 1, status: 'Active', description: 'Sports, fitness, and physical well-being.' },
  { id: 'sub-art', name: 'Art & Craft', code: 'ART', type: 'Co-curricular', category: 'Practical', credits: 1, status: 'Active', description: 'Drawing, painting, and craft work.' },
  { id: 'sub-music', name: 'Music', code: 'MUS', type: 'Co-curricular', category: 'Practical', credits: 1, status: 'Active', description: 'Vocal and instrumental music.' },
  { id: 'sub-bio', name: 'Biology', code: 'BIO', type: 'Elective', category: 'Both', credits: 3, status: 'Active', description: 'Botany, zoology, and human biology.' },
  { id: 'sub-chem', name: 'Chemistry', code: 'CHEM', type: 'Elective', category: 'Both', credits: 3, status: 'Active', description: 'Organic, inorganic, and physical chemistry.' },
  { id: 'sub-phy', name: 'Physics', code: 'PHY', type: 'Elective', category: 'Both', credits: 3, status: 'Active', description: 'Mechanics, optics, electricity, and modern physics.' },
  { id: 'sub-acc', name: 'Accountancy', code: 'ACC', type: 'Elective', category: 'Theory', credits: 3, status: 'Active', description: 'Financial accounting principles and practices.' },
  { id: 'sub-bus', name: 'Business Studies', code: 'BIZ', type: 'Elective', category: 'Theory', credits: 3, status: 'Active', description: 'Business management and organization.' },
  { id: 'sub-eco', name: 'Economics', code: 'ECO', type: 'Elective', category: 'Theory', credits: 3, status: 'Active', description: 'Microeconomics and macroeconomics.' },
  { id: 'sub-psy', name: 'Psychology', code: 'PSY', type: 'Elective', category: 'Theory', credits: 2, status: 'Draft', description: 'Introduction to human behavior and mental processes.' },
  { id: 'sub-robotics', name: 'Robotics', code: 'RBT', type: 'Vocational', category: 'Practical', credits: 2, status: 'Draft', description: 'Robotics fundamentals and automation.' },
  { id: 'sub-entre', name: 'Entrepreneurship', code: 'ENT', type: 'Vocational', category: 'Theory', credits: 2, status: 'Inactive', description: 'Business creation and startup fundamentals.' },
];

export const classSubjectMappings: ClassSubjectMapping[] = [
  // Grade 5
  { id: 'csm-5-math', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-math', subjectName: 'Mathematics', isMandatory: true, periodsPerWeek: 6 },
  { id: 'csm-5-sci', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-sci', subjectName: 'Science', isMandatory: true, periodsPerWeek: 5 },
  { id: 'csm-5-eng', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-eng', subjectName: 'English', isMandatory: true, periodsPerWeek: 5 },
  { id: 'csm-5-hindi', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-hindi', subjectName: 'Hindi', isMandatory: true, periodsPerWeek: 4 },
  { id: 'csm-5-kannada', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-kannada', subjectName: 'Kannada', isMandatory: true, periodsPerWeek: 3 },
  { id: 'csm-5-ss', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-ss', subjectName: 'Social Science', isMandatory: true, periodsPerWeek: 4 },
  { id: 'csm-5-cs', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-cs', subjectName: 'Computer Science', isMandatory: false, periodsPerWeek: 2 },
  { id: 'csm-5-pe', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-pe', subjectName: 'Physical Education', isMandatory: true, periodsPerWeek: 2 },
  { id: 'csm-5-art', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-art', subjectName: 'Art & Craft', isMandatory: false, periodsPerWeek: 1 },
  { id: 'csm-5-music', classGradeId: 'cls-5', classGradeName: 'Grade 5', subjectId: 'sub-music', subjectName: 'Music', isMandatory: false, periodsPerWeek: 1 },

  // Grade 10
  { id: 'csm-10-math', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-math', subjectName: 'Mathematics', isMandatory: true, periodsPerWeek: 7 },
  { id: 'csm-10-sci', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-sci', subjectName: 'Science', isMandatory: true, periodsPerWeek: 7 },
  { id: 'csm-10-eng', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-eng', subjectName: 'English', isMandatory: true, periodsPerWeek: 5 },
  { id: 'csm-10-hindi', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-hindi', subjectName: 'Hindi', isMandatory: true, periodsPerWeek: 4 },
  { id: 'csm-10-kannada', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-kannada', subjectName: 'Kannada', isMandatory: false, periodsPerWeek: 3 },
  { id: 'csm-10-sanskrit', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-sanskrit', subjectName: 'Sanskrit', isMandatory: false, periodsPerWeek: 3 },
  { id: 'csm-10-ss', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-ss', subjectName: 'Social Science', isMandatory: true, periodsPerWeek: 5 },
  { id: 'csm-10-cs', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-cs', subjectName: 'Computer Science', isMandatory: false, periodsPerWeek: 3 },
  { id: 'csm-10-pe', classGradeId: 'cls-10', classGradeName: 'Grade 10', subjectId: 'sub-pe', subjectName: 'Physical Education', isMandatory: true, periodsPerWeek: 2 },

  // Grade 12 Science
  { id: 'csm-12-phy', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-phy', subjectName: 'Physics', isMandatory: true, periodsPerWeek: 7 },
  { id: 'csm-12-chem', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-chem', subjectName: 'Chemistry', isMandatory: true, periodsPerWeek: 7 },
  { id: 'csm-12-bio', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-bio', subjectName: 'Biology', isMandatory: false, periodsPerWeek: 5 },
  { id: 'csm-12-math', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-math', subjectName: 'Mathematics', isMandatory: true, periodsPerWeek: 7 },
  { id: 'csm-12-eng', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-eng', subjectName: 'English', isMandatory: true, periodsPerWeek: 4 },
  { id: 'csm-12-pe', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-pe', subjectName: 'Physical Education', isMandatory: true, periodsPerWeek: 2 },

  // Grade 12 Commerce
  { id: 'csm-12-acc', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-acc', subjectName: 'Accountancy', isMandatory: true, periodsPerWeek: 6 },
  { id: 'csm-12-bus', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-bus', subjectName: 'Business Studies', isMandatory: true, periodsPerWeek: 6 },
  { id: 'csm-12-eco', classGradeId: 'cls-12', classGradeName: 'Grade 12', subjectId: 'sub-eco', subjectName: 'Economics', isMandatory: true, periodsPerWeek: 6 },
];

const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function makePeriod(
  id: string,
  startTime: string,
  endTime: string,
  type: Period['type'],
  opts?: { subjectId?: string; subjectName?: string; teacherName?: string; roomNumber?: string }
): Period {
  return {
    id,
    startTime,
    endTime,
    type,
    subjectId: opts?.subjectId,
    subjectName: opts?.subjectName,
    teacherName: opts?.teacherName,
    roomNumber: opts?.roomNumber,
  };
}

const teacherPool = [
  'Rebecca Thomas',
  'Arjun Mehta',
  'Ananya Reddy',
  'Lakshmi Iyer',
  'Priya Sharma',
  'Vikram Rao',
  'Meera Krishnan',
];

const roomPool = ['D-405', 'D-406', 'D-407', 'Lab-1', 'Lab-2', 'Ground'];

const grade10Subjects = [
  { subjectId: 'sub-math', subjectName: 'Mathematics', teacher: 'Arjun Mehta', room: 'D-405' },
  { subjectId: 'sub-sci', subjectName: 'Science', teacher: 'Rebecca Thomas', room: 'Lab-1' },
  { subjectId: 'sub-eng', subjectName: 'English', teacher: 'Ananya Reddy', room: 'D-406' },
  { subjectId: 'sub-hindi', subjectName: 'Hindi', teacher: 'Lakshmi Iyer', room: 'D-407' },
  { subjectId: 'sub-ss', subjectName: 'Social Science', teacher: 'Priya Sharma', room: 'D-405' },
  { subjectId: 'sub-cs', subjectName: 'Computer Science', teacher: 'Vikram Rao', room: 'Lab-2' },
  { subjectId: 'sub-pe', subjectName: 'Physical Education', teacher: 'Meera Krishnan', room: 'Ground' },
  { subjectId: 'sub-kannada', subjectName: 'Kannada', teacher: 'Lakshmi Iyer', room: 'D-407' },
];

const periodTimes = [
  { start: '08:00', end: '08:45' },
  { start: '08:45', end: '09:30' },
  { start: '09:30', end: '10:15' },
  { start: '10:15', end: '11:00' },
  { start: '11:15', end: '12:00' },
  { start: '12:00', end: '12:45' },
  { start: '13:30', end: '14:15' },
  { start: '14:15', end: '15:00' },
];

function buildSchedule(): Record<DayOfWeek, Period[]> {
  const schedule = {} as Record<DayOfWeek, Period[]>;

  for (const day of days) {
    const periods: Period[] = [];
    let periodIdx = 0;

    periods.push(
      makePeriod(`p-${day}-asm`, '07:45', '08:00', 'Assembly', { teacherName: 'Class Teacher' })
    );

    for (let i = 0; i < 4; i++) {
      const subj = grade10Subjects[(periodIdx + (day === 'Monday' ? 0 : day === 'Tuesday' ? 1 : day === 'Wednesday' ? 2 : day === 'Thursday' ? 3 : day === 'Friday' ? 4 : 5) + i) % grade10Subjects.length];
      const time = periodTimes[i];
      periods.push(
        makePeriod(`p-${day}-${i}`, time.start, time.end, 'Teaching', {
          subjectId: subj.subjectId,
          subjectName: subj.subjectName,
          teacherName: subj.teacher,
          roomNumber: subj.room,
        })
      );
      periodIdx++;
    }

    periods.push(
      makePeriod(`p-${day}-lunch`, '11:00', '11:15', 'Break')
    );

    for (let i = 4; i < 8; i++) {
      const subj = grade10Subjects[(periodIdx + (day === 'Monday' ? 0 : day === 'Tuesday' ? 1 : day === 'Wednesday' ? 2 : day === 'Thursday' ? 3 : day === 'Friday' ? 4 : 5) + i) % grade10Subjects.length];
      const time = periodTimes[i];
      periods.push(
        makePeriod(`p-${day}-${i}`, time.start, time.end, 'Teaching', {
          subjectId: subj.subjectId,
          subjectName: subj.subjectName,
          teacherName: subj.teacher,
          roomNumber: subj.room,
        })
      );
      periodIdx++;
    }

    periods.push(
      makePeriod(`p-${day}-lunch2`, '12:45', '13:30', 'Break')
    );

    schedule[day] = periods;
  }

  return schedule;
}

export const timetables: Timetable[] = [
  {
    id: 'tt-10-a',
    classGradeId: 'cls-10',
    classGradeName: 'Grade 10',
    sectionId: 'sec-10-a',
    sectionName: 'A',
    termId: 'term-001',
    termName: 'Term 1 — April to September',
    status: 'Published',
    schedule: buildSchedule(),
  },
];

export const classOptions = [
  { id: 'cls-5', name: 'Grade 5' },
  { id: 'cls-10', name: 'Grade 10' },
  { id: 'cls-12', name: 'Grade 12' },
];

export const sectionOptions = [
  { classGradeId: 'cls-5', id: 'sec-5-a', name: 'A' },
  { classGradeId: 'cls-5', id: 'sec-5-b', name: 'B' },
  { classGradeId: 'cls-5', id: 'sec-5-c', name: 'C' },
  { classGradeId: 'cls-10', id: 'sec-10-a', name: 'A' },
  { classGradeId: 'cls-10', id: 'sec-10-b', name: 'B' },
  { classGradeId: 'cls-10', id: 'sec-10-c', name: 'C' },
  { classGradeId: 'cls-12', id: 'sec-12-a', name: 'Science' },
  { classGradeId: 'cls-12', id: 'sec-12-b', name: 'Commerce' },
  { classGradeId: 'cls-12', id: 'sec-12-c', name: 'Humanities' },
];
