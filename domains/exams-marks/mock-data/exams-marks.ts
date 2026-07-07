import type {
  ExamSession,
  ExamSchedule,
  ExamSubjectComponent,
  ExamConfiguration,
  ClassExamPlan,
  StudentMarkRecord,
  SubjectMarkEntry,
  GradeBand,
  ReportCardReadinessItem,
  ClassResultSummary,
  StudentResultSnapshot,
  ExamAlert,
  ExamActivityEvent,
  AssessmentType,
} from '@/domains/exams-marks/types';

const CURRENT_DATE = '2026-07-07';

// Exam Sessions (8)
export const examSessions: ExamSession[] = [
  {
    id: 'exam-sess-001',
    name: 'Unit Test 1 - Grade 10A',
    examType: 'Unit Test',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-10',
    classGradeName: 'Grade 10',
    sectionId: 'sec-10-a',
    sectionName: 'A',
    startDate: '2026-06-15',
    endDate: '2026-06-20',
    status: 'Published',
    gradingScaleType: 'Percentage',
    totalSubjects: 6,
    marksEntryProgress: 100,
    resultStatus: 'Published',
    createdBy: 'Arjun Mehta',
    createdAt: '2026-06-01T10:00:00Z',
    updatedAt: '2026-06-25T14:00:00Z',
  },
  {
    id: 'exam-sess-002',
    name: 'Mid Term Examination - Grade 10',
    examType: 'Mid Term',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-10',
    classGradeName: 'Grade 10',
    sectionId: 'sec-10-a',
    sectionName: 'A',
    startDate: '2026-07-15',
    endDate: '2026-07-25',
    status: 'Scheduled',
    gradingScaleType: 'Percentage',
    totalSubjects: 6,
    marksEntryProgress: 0,
    resultStatus: 'Not Ready',
    createdBy: 'Arjun Mehta',
    createdAt: '2026-07-01T09:00:00Z',
    updatedAt: '2026-07-05T11:00:00Z',
  },
  {
    id: 'exam-sess-003',
    name: 'Weekly Test - Mathematics Grade 9A',
    examType: 'Weekly Test',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-9',
    classGradeName: 'Grade 9',
    sectionId: 'sec-9-a',
    sectionName: 'A',
    startDate: '2026-07-05',
    endDate: '2026-07-05',
    status: 'Marks Entry',
    gradingScaleType: 'Percentage',
    totalSubjects: 1,
    marksEntryProgress: 65,
    resultStatus: 'Not Ready',
    createdBy: 'Lakshmi Iyer',
    createdAt: '2026-07-03T08:00:00Z',
    updatedAt: '2026-07-07T10:00:00Z',
  },
  {
    id: 'exam-sess-004',
    name: 'Practical Assessment - Science Grade 10',
    examType: 'Practical Exam',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-10',
    classGradeName: 'Grade 10',
    sectionId: 'sec-10-b',
    sectionName: 'B',
    startDate: '2026-07-01',
    endDate: '2026-07-10',
    status: 'Ongoing',
    gradingScaleType: 'Percentage',
    totalSubjects: 3,
    marksEntryProgress: 45,
    resultStatus: 'Not Ready',
    createdBy: 'Arjun Mehta',
    createdAt: '2026-06-20T09:00:00Z',
    updatedAt: '2026-07-07T08:00:00Z',
  },
  {
    id: 'exam-sess-005',
    name: 'Monthly Test - Grade 8A',
    examType: 'Monthly Test',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-8',
    classGradeName: 'Grade 8',
    sectionId: 'sec-8-a',
    sectionName: 'A',
    startDate: '2026-06-25',
    endDate: '2026-06-28',
    status: 'Review',
    gradingScaleType: 'GPA',
    totalSubjects: 5,
    marksEntryProgress: 100,
    resultStatus: 'Ready for Review',
    createdBy: 'Ananya Reddy',
    createdAt: '2026-06-15T10:00:00Z',
    updatedAt: '2026-07-02T16:00:00Z',
  },
  {
    id: 'exam-sess-006',
    name: 'Internal Assessment - English Grade 9',
    examType: 'Internal Assessment',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-9',
    classGradeName: 'Grade 9',
    sectionId: 'sec-9-a',
    sectionName: 'A',
    startDate: '2026-07-08',
    endDate: '2026-07-12',
    status: 'Scheduled',
    gradingScaleType: 'Letter Grade',
    totalSubjects: 1,
    marksEntryProgress: 0,
    resultStatus: 'Not Ready',
    createdBy: 'Lakshmi Iyer',
    createdAt: '2026-07-05T11:00:00Z',
    updatedAt: '2026-07-05T11:00:00Z',
  },
  {
    id: 'exam-sess-007',
    name: 'Term End Exam - Grade 7A',
    examType: 'Term End',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-001',
    campusName: 'Greenfield Main Campus',
    classGradeId: 'cls-7',
    classGradeName: 'Grade 7',
    sectionId: 'sec-7-a',
    sectionName: 'A',
    startDate: '2026-09-10',
    endDate: '2026-09-20',
    status: 'Draft',
    gradingScaleType: 'Percentage',
    totalSubjects: 5,
    marksEntryProgress: 0,
    resultStatus: 'Not Ready',
    createdBy: 'Priya Sharma',
    createdAt: '2026-07-03T09:00:00Z',
    updatedAt: '2026-07-03T09:00:00Z',
  },
  {
    id: 'exam-sess-008',
    name: 'Oral Assessment - Hindi Grade 10',
    examType: 'Oral Assessment',
    academicYearId: 'ay-2026-27',
    academicYearName: 'Academic Year 2026-27',
    termId: 'term-1',
    termName: 'Term 1',
    campusId: 'camp-002',
    campusName: 'Greenfield Whitefield Campus',
    classGradeId: 'cls-10',
    classGradeName: 'Grade 10',
    sectionId: 'sec-10-a',
    sectionName: 'A',
    startDate: '2026-07-10',
    endDate: '2026-07-10',
    status: 'Scheduled',
    gradingScaleType: 'Percentage',
    totalSubjects: 1,
    marksEntryProgress: 0,
    resultStatus: 'Not Ready',
    createdBy: 'Deepa Venkatesh',
    createdAt: '2026-07-04T10:00:00Z',
    updatedAt: '2026-07-04T10:00:00Z',
  },
];

// Exam Schedules (24)
export const examSchedules: ExamSchedule[] = [
  // Unit Test 1 - Grade 10A
  { id: 'sched-001', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-15', subjectId: 'sub-math', subjectName: 'Mathematics', subjectCode: 'MATH101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 101', invigilator: 'Rebecca Thomas', maxMarks: 50, passingMarks: 18, status: 'Published' },
  { id: 'sched-002', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-16', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 101', invigilator: 'Arjun Mehta', maxMarks: 50, passingMarks: 18, status: 'Published' },
  { id: 'sched-003', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-17', subjectId: 'sub-eng', subjectName: 'English', subjectCode: 'ENG101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 101', invigilator: 'Lakshmi Iyer', maxMarks: 50, passingMarks: 18, status: 'Published' },
  { id: 'sched-004', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-18', subjectId: 'sub-hindi', subjectName: 'Hindi', subjectCode: 'HIN101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 101', invigilator: 'Deepa Venkatesh', maxMarks: 50, passingMarks: 18, status: 'Published' },
  { id: 'sched-005', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-19', subjectId: 'sub-ss', subjectName: 'Social Studies', subjectCode: 'SS101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 101', invigilator: 'Ananya Reddy', maxMarks: 50, passingMarks: 18, status: 'Published' },
  { id: 'sched-006', examSessionId: 'exam-sess-001', sessionName: 'Unit Test 1 - Grade 10A', date: '2026-06-20', subjectId: 'sub-cs', subjectName: 'Computer Science', subjectCode: 'CS101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Lab 201', invigilator: 'Rajesh Nair', maxMarks: 50, passingMarks: 18, status: 'Published' },
  // Mid Term - Grade 10A
  { id: 'sched-007', examSessionId: 'exam-sess-002', sessionName: 'Mid Term Examination - Grade 10', date: '2026-07-15', subjectId: 'sub-math', subjectName: 'Mathematics', subjectCode: 'MATH101', assessmentType: 'Theory', startTime: '09:00', endTime: '12:00', room: 'Hall A', invigilator: 'Rebecca Thomas', maxMarks: 80, passingMarks: 27, status: 'Scheduled' },
  { id: 'sched-008', examSessionId: 'exam-sess-002', sessionName: 'Mid Term Examination - Grade 10', date: '2026-07-16', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Theory', startTime: '09:00', endTime: '12:00', room: 'Hall A', invigilator: 'Arjun Mehta', maxMarks: 80, passingMarks: 27, status: 'Scheduled' },
  { id: 'sched-009', examSessionId: 'exam-sess-002', sessionName: 'Mid Term Examination - Grade 10', date: '2026-07-17', subjectId: 'sub-eng', subjectName: 'English', subjectCode: 'ENG101', assessmentType: 'Theory', startTime: '09:00', endTime: '12:00', room: 'Hall A', invigilator: 'Lakshmi Iyer', maxMarks: 80, passingMarks: 27, status: 'Scheduled' },
  { id: 'sched-010', examSessionId: 'exam-sess-002', sessionName: 'Mid Term Examination - Grade 10', date: '2026-07-18', subjectId: 'sub-hindi', subjectName: 'Hindi', subjectCode: 'HIN101', assessmentType: 'Theory', startTime: '09:00', endTime: '11:00', room: 'Hall A', invigilator: 'Deepa Venkatesh', maxMarks: 60, passingMarks: 20, status: 'Scheduled' },
  // Weekly Test - Math Grade 9A
  { id: 'sched-011', examSessionId: 'exam-sess-003', sessionName: 'Weekly Test - Mathematics Grade 9A', date: '2026-07-05', subjectId: 'sub-math', subjectName: 'Mathematics', subjectCode: 'MATH101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:00', room: 'Room 102', invigilator: 'Rebecca Thomas', maxMarks: 25, passingMarks: 9, status: 'Ongoing' },
  // Practical Assessment - Science Grade 10B
  { id: 'sched-012', examSessionId: 'exam-sess-004', sessionName: 'Practical Assessment - Science Grade 10', date: '2026-07-01', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Practical', startTime: '09:00', endTime: '12:00', room: 'Science Lab', invigilator: 'Arjun Mehta', maxMarks: 40, passingMarks: 14, status: 'Ongoing' },
  { id: 'sched-013', examSessionId: 'exam-sess-004', sessionName: 'Practical Assessment - Science Grade 10', date: '2026-07-02', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Practical', startTime: '09:00', endTime: '12:00', room: 'Science Lab', invigilator: 'Arjun Mehta', maxMarks: 40, passingMarks: 14, status: 'Ongoing' },
  { id: 'sched-014', examSessionId: 'exam-sess-004', sessionName: 'Practical Assessment - Science Grade 10', date: '2026-07-03', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Practical', startTime: '09:00', endTime: '12:00', room: 'Science Lab', invigilator: 'Arjun Mehta', maxMarks: 40, passingMarks: 14, status: 'Ongoing' },
  // Monthly Test - Grade 8A
  { id: 'sched-015', examSessionId: 'exam-sess-005', sessionName: 'Monthly Test - Grade 8A', date: '2026-06-25', subjectId: 'sub-math', subjectName: 'Mathematics', subjectCode: 'MATH101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 103', invigilator: 'Vikram Rao', maxMarks: 50, passingMarks: 18, status: 'Review' },
  { id: 'sched-016', examSessionId: 'exam-sess-005', sessionName: 'Monthly Test - Grade 8A', date: '2026-06-26', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 103', invigilator: 'Arjun Mehta', maxMarks: 50, passingMarks: 18, status: 'Review' },
  { id: 'sched-017', examSessionId: 'exam-sess-005', sessionName: 'Monthly Test - Grade 8A', date: '2026-06-27', subjectId: 'sub-eng', subjectName: 'English', subjectCode: 'ENG101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 103', invigilator: 'Lakshmi Iyer', maxMarks: 50, passingMarks: 18, status: 'Review' },
  { id: 'sched-018', examSessionId: 'exam-sess-005', sessionName: 'Monthly Test - Grade 8A', date: '2026-06-28', subjectId: 'sub-ss', subjectName: 'Social Studies', subjectCode: 'SS101', assessmentType: 'Theory', startTime: '09:00', endTime: '10:30', room: 'Room 103', invigilator: 'Ananya Reddy', maxMarks: 50, passingMarks: 18, status: 'Review' },
  { id: 'sched-019', examSessionId: 'exam-sess-005', sessionName: 'Monthly Test - Grade 8A', date: '2026-06-28', subjectId: 'sub-hindi', subjectName: 'Hindi', subjectCode: 'HIN101', assessmentType: 'Theory', startTime: '11:00', endTime: '12:30', room: 'Room 103', invigilator: 'Deepa Venkatesh', maxMarks: 50, passingMarks: 18, status: 'Review' },
  // Internal Assessment - English Grade 9A
  { id: 'sched-020', examSessionId: 'exam-sess-006', sessionName: 'Internal Assessment - English Grade 9', date: '2026-07-08', subjectId: 'sub-eng', subjectName: 'English', subjectCode: 'ENG101', assessmentType: 'Oral', startTime: '09:00', endTime: '11:00', room: 'Room 104', invigilator: 'Lakshmi Iyer', maxMarks: 20, passingMarks: 7, status: 'Scheduled' },
  { id: 'sched-021', examSessionId: 'exam-sess-006', sessionName: 'Internal Assessment - English Grade 9', date: '2026-07-09', subjectId: 'sub-eng', subjectName: 'English', subjectCode: 'ENG101', assessmentType: 'Assignment', startTime: '09:00', endTime: '10:00', room: 'Room 104', invigilator: 'Lakshmi Iyer', maxMarks: 10, passingMarks: 4, status: 'Scheduled' },
  // Oral Assessment - Hindi Grade 10 (Whitefield)
  { id: 'sched-022', examSessionId: 'exam-sess-008', sessionName: 'Oral Assessment - Hindi Grade 10', date: '2026-07-10', subjectId: 'sub-hindi', subjectName: 'Hindi', subjectCode: 'HIN101', assessmentType: 'Oral', startTime: '09:00', endTime: '12:00', room: 'Room 201', invigilator: 'Deepa Venkatesh', maxMarks: 30, passingMarks: 10, status: 'Scheduled' },
  // Term End - Grade 7A (Draft)
  { id: 'sched-023', examSessionId: 'exam-sess-007', sessionName: 'Term End Exam - Grade 7A', date: '2026-09-10', subjectId: 'sub-math', subjectName: 'Mathematics', subjectCode: 'MATH101', assessmentType: 'Theory', startTime: '09:00', endTime: '12:00', room: null, invigilator: null, maxMarks: 80, passingMarks: 27, status: 'Draft' },
  { id: 'sched-024', examSessionId: 'exam-sess-007', sessionName: 'Term End Exam - Grade 7A', date: '2026-09-11', subjectId: 'sub-sci', subjectName: 'Science', subjectCode: 'SCI101', assessmentType: 'Theory', startTime: '09:00', endTime: '12:00', room: null, invigilator: null, maxMarks: 80, passingMarks: 27, status: 'Draft' },
];

// Exam Subject Components (20)
export const examSubjectComponents: ExamSubjectComponent[] = [
  { id: 'comp-001', subjectId: 'sub-math', subjectName: 'Mathematics', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 80, passingMarks: 27, weightage: 100, status: 'Active' },
  { id: 'comp-002', subjectId: 'sub-sci', subjectName: 'Science', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 60, passingMarks: 20, weightage: 70, status: 'Active' },
  { id: 'comp-003', subjectId: 'sub-sci', subjectName: 'Science', componentName: 'Practical', assessmentType: 'Practical', maxMarks: 40, passingMarks: 14, weightage: 30, status: 'Active' },
  { id: 'comp-004', subjectId: 'sub-eng', subjectName: 'English', componentName: 'Written', assessmentType: 'Theory', maxMarks: 70, passingMarks: 23, weightage: 80, status: 'Active' },
  { id: 'comp-005', subjectId: 'sub-eng', subjectName: 'English', componentName: 'Oral', assessmentType: 'Oral', maxMarks: 30, passingMarks: 10, weightage: 20, status: 'Active' },
  { id: 'comp-006', subjectId: 'sub-hindi', subjectName: 'Hindi', componentName: 'Written', assessmentType: 'Theory', maxMarks: 70, passingMarks: 23, weightage: 80, status: 'Active' },
  { id: 'comp-007', subjectId: 'sub-hindi', subjectName: 'Hindi', componentName: 'Oral', assessmentType: 'Oral', maxMarks: 30, passingMarks: 10, weightage: 20, status: 'Active' },
  { id: 'comp-008', subjectId: 'sub-ss', subjectName: 'Social Studies', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 80, passingMarks: 27, weightage: 100, status: 'Active' },
  { id: 'comp-009', subjectId: 'sub-cs', subjectName: 'Computer Science', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 50, passingMarks: 17, weightage: 60, status: 'Active' },
  { id: 'comp-010', subjectId: 'sub-cs', subjectName: 'Computer Science', componentName: 'Practical', assessmentType: 'Practical', maxMarks: 50, passingMarks: 17, weightage: 40, status: 'Active' },
  { id: 'comp-011', subjectId: 'sub-pe', subjectName: 'Physical Education', componentName: 'Practical', assessmentType: 'Practical', maxMarks: 60, passingMarks: 20, weightage: 70, status: 'Active' },
  { id: 'comp-012', subjectId: 'sub-pe', subjectName: 'Physical Education', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 40, passingMarks: 14, weightage: 30, status: 'Active' },
  { id: 'comp-013', subjectId: 'sub-art', subjectName: 'Art', componentName: 'Project', assessmentType: 'Project', maxMarks: 50, passingMarks: 18, weightage: 100, status: 'Active' },
  { id: 'comp-014', subjectId: 'sub-music', subjectName: 'Music', componentName: 'Practical', assessmentType: 'Practical', maxMarks: 50, passingMarks: 18, weightage: 70, status: 'Active' },
  { id: 'comp-015', subjectId: 'sub-music', subjectName: 'Music', componentName: 'Theory', assessmentType: 'Theory', maxMarks: 30, passingMarks: 10, weightage: 30, status: 'Active' },
  { id: 'comp-016', subjectId: 'sub-math', subjectName: 'Mathematics', componentName: 'Internal', assessmentType: 'Internal', maxMarks: 20, passingMarks: 7, weightage: 20, status: 'Active' },
  { id: 'comp-017', subjectId: 'sub-sci', subjectName: 'Science', componentName: 'Lab Work', assessmentType: 'Practical', maxMarks: 20, passingMarks: 7, weightage: 20, status: 'Active' },
  { id: 'comp-018', subjectId: 'sub-eng', subjectName: 'English', componentName: 'Assignment', assessmentType: 'Assignment', maxMarks: 10, passingMarks: 4, weightage: 10, status: 'Active' },
  { id: 'comp-019', subjectId: 'sub-hindi', subjectName: 'Hindi', componentName: 'Assignment', assessmentType: 'Assignment', maxMarks: 10, passingMarks: 4, weightage: 10, status: 'Active' },
  { id: 'comp-020', subjectId: 'sub-ss', subjectName: 'Social Studies', componentName: 'Project', assessmentType: 'Project', maxMarks: 20, passingMarks: 7, weightage: 25, status: 'Active' },
];

// Exam Configurations (8)
export const examConfigurations: ExamConfiguration[] = [
  { id: 'config-001', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-10', classGradeName: 'Grade 10', gradingScaleType: 'Percentage', roundingRule: 'Nearest', passCriteria: 'Percentage', allowGraceMarks: true, includeAttendance: true, includeCoScholastic: true, resultComputationNote: 'Best of 5 subjects considered for final percentage', status: 'Active' },
  { id: 'config-002', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-9', classGradeName: 'Grade 9', gradingScaleType: 'Percentage', roundingRule: 'Nearest', passCriteria: 'Subject Wise', allowGraceMarks: true, includeAttendance: false, includeCoScholastic: true, resultComputationNote: 'All subjects mandatory', status: 'Active' },
  { id: 'config-003', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-8', classGradeName: 'Grade 8', gradingScaleType: 'GPA', roundingRule: 'Round Up', passCriteria: 'Aggregate', allowGraceMarks: true, includeAttendance: true, includeCoScholastic: true, resultComputationNote: 'GPA calculated on 10-point scale', status: 'Active' },
  { id: 'config-004', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-7', classGradeName: 'Grade 7', gradingScaleType: 'Percentage', roundingRule: 'Nearest', passCriteria: 'Percentage', allowGraceMarks: false, includeAttendance: false, includeCoScholastic: true, resultComputationNote: null, status: 'Active' },
  { id: 'config-005', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-002', campusName: 'Greenfield Whitefield Campus', classGradeId: 'cls-10', classGradeName: 'Grade 10', gradingScaleType: 'Percentage', roundingRule: 'Nearest', passCriteria: 'Percentage', allowGraceMarks: true, includeAttendance: true, includeCoScholastic: true, resultComputationNote: 'Best of 5 subjects considered for final percentage', status: 'Active' },
  { id: 'config-006', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-6', classGradeName: 'Grade 6', gradingScaleType: 'Letter Grade', roundingRule: 'Round Up', passCriteria: 'Subject Wise', allowGraceMarks: true, includeAttendance: false, includeCoScholastic: true, resultComputationNote: 'Comprehensive evaluation pattern', status: 'Draft' },
  { id: 'config-007', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-001', campusName: 'Greenfield Main Campus', classGradeId: 'cls-5', classGradeName: 'Grade 5', gradingScaleType: 'Custom Band', roundingRule: 'Round Up', passCriteria: 'Aggregate', allowGraceMarks: true, includeAttendance: false, includeCoScholastic: true, resultComputationNote: 'Grade bands: A+, A, B+, B, C, D', status: 'Active' },
  { id: 'config-008', academicYearId: 'ay-2026-27', academicYearName: 'Academic Year 2026-27', campusId: 'camp-002', campusName: 'Greenfield Whitefield Campus', classGradeId: 'cls-9', classGradeName: 'Grade 9', gradingScaleType: 'Percentage', roundingRule: 'Nearest', passCriteria: 'Subject Wise', allowGraceMarks: false, includeAttendance: true, includeCoScholastic: false, resultComputationNote: null, status: 'Draft' },
];

// Class Exam Plans (12)
export const classExamPlans: ClassExamPlan[] = [
  { id: 'plan-001', examSessionId: 'exam-sess-001', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', subjectCount: 6, studentCount: 10, examDays: 6, status: 'Published', coordinator: 'Arjun Mehta' },
  { id: 'plan-002', examSessionId: 'exam-sess-002', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', subjectCount: 6, studentCount: 10, examDays: 10, status: 'Scheduled', coordinator: 'Arjun Mehta' },
  { id: 'plan-003', examSessionId: 'exam-sess-003', classGradeId: 'cls-9', classGradeName: 'Grade 9', sectionId: 'sec-9-a', sectionName: 'A', subjectCount: 1, studentCount: 5, examDays: 1, status: 'Ongoing', coordinator: 'Rebecca Thomas' },
  { id: 'plan-004', examSessionId: 'exam-sess-004', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-b', sectionName: 'B', subjectCount: 3, studentCount: 5, examDays: 3, status: 'Ongoing', coordinator: 'Arjun Mehta' },
  { id: 'plan-005', examSessionId: 'exam-sess-005', classGradeId: 'cls-8', classGradeName: 'Grade 8', sectionId: 'sec-8-a', sectionName: 'A', subjectCount: 5, studentCount: 5, examDays: 4, status: 'Review', coordinator: 'Ananya Reddy' },
  { id: 'plan-006', examSessionId: 'exam-sess-006', classGradeId: 'cls-9', classGradeName: 'Grade 9', sectionId: 'sec-9-a', sectionName: 'A', subjectCount: 1, studentCount: 5, examDays: 2, status: 'Scheduled', coordinator: 'Lakshmi Iyer' },
  { id: 'plan-007', examSessionId: 'exam-sess-007', classGradeId: 'cls-7', classGradeName: 'Grade 7', sectionId: 'sec-7-a', sectionName: 'A', subjectCount: 5, studentCount: 5, examDays: 10, status: 'Draft', coordinator: 'Priya Sharma' },
  { id: 'plan-008', examSessionId: 'exam-sess-008', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', subjectCount: 1, studentCount: 5, examDays: 1, status: 'Scheduled', coordinator: 'Deepa Venkatesh' },
  { id: 'plan-009', examSessionId: 'exam-sess-002', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-b', sectionName: 'B', subjectCount: 6, studentCount: 5, examDays: 10, status: 'Scheduled', coordinator: 'Arjun Mehta' },
  { id: 'plan-010', examSessionId: 'exam-sess-001', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-b', sectionName: 'B', subjectCount: 6, studentCount: 5, examDays: 6, status: 'Published', coordinator: 'Arjun Mehta' },
  { id: 'plan-011', examSessionId: 'exam-sess-005', classGradeId: 'cls-8', classGradeName: 'Grade 8', sectionId: 'sec-8-b', sectionName: 'B', subjectCount: 5, studentCount: 5, examDays: 4, status: 'Review', coordinator: 'Ananya Reddy' },
  { id: 'plan-012', examSessionId: 'exam-sess-003', classGradeId: 'cls-9', classGradeName: 'Grade 9', sectionId: 'sec-9-b', sectionName: 'B', subjectCount: 1, studentCount: 5, examDays: 1, status: 'Ongoing', coordinator: 'Rebecca Thomas' },
];

// Helper for generating student marks
const studentPool = [
  { id: 'stu-001', name: 'Aarav Sharma', admissionNumber: 'GIS2024001', rollNumber: '01' },
  { id: 'stu-002', name: 'Ananya Iyer', admissionNumber: 'GIS2024002', rollNumber: '02' },
  { id: 'stu-003', name: 'Karthik Menon', admissionNumber: 'GIS2024003', rollNumber: '03' },
  { id: 'stu-004', name: 'Priya Nair', admissionNumber: 'GIS2024004', rollNumber: '04' },
  { id: 'stu-005', name: 'Rohan Gupta', admissionNumber: 'GIS2024005', rollNumber: '05' },
  { id: 'stu-006', name: 'Sneha Patil', admissionNumber: 'GIS2024006', rollNumber: '06' },
  { id: 'stu-007', name: 'Aditya Verma', admissionNumber: 'GIS2024007', rollNumber: '07' },
  { id: 'stu-008', name: 'Ishita Joshi', admissionNumber: 'GIS2024008', rollNumber: '08' },
  { id: 'stu-009', name: 'Vikram Reddy', admissionNumber: 'GIS2024009', rollNumber: '09' },
  { id: 'stu-010', name: 'Meera Krishnan', admissionNumber: 'GIS2024010', rollNumber: '10' },
  { id: 'stu-011', name: 'Arjun Mehta', admissionNumber: 'GIS2024011', rollNumber: '01' },
  { id: 'stu-012', name: 'Divya Rao', admissionNumber: 'GIS2024012', rollNumber: '02' },
  { id: 'stu-013', name: 'Rahul Singh', admissionNumber: 'GIS2024013', rollNumber: '03' },
  { id: 'stu-014', name: 'Kavita Sharma', admissionNumber: 'GIS2024014', rollNumber: '04' },
  { id: 'stu-015', name: 'Siddharth Jha', admissionNumber: 'GIS2024015', rollNumber: '05' },
  { id: 'stu-016', name: 'Pooja Desai', admissionNumber: 'GIS2024016', rollNumber: '01' },
  { id: 'stu-017', name: 'Nikhil Kulkarni', admissionNumber: 'GIS2024017', rollNumber: '02' },
  { id: 'stu-018', name: 'Ritu Agarwal', admissionNumber: 'GIS2024018', rollNumber: '03' },
  { id: 'stu-019', name: 'Amit Trivedi', admissionNumber: 'GIS2024019', rollNumber: '04' },
  { id: 'stu-020', name: 'Shreya Bhat', admissionNumber: 'GIS2024020', rollNumber: '05' },
];

const subjectPool = [
  { id: 'sub-math', name: 'Mathematics', code: 'MATH101' },
  { id: 'sub-sci', name: 'Science', code: 'SCI101' },
  { id: 'sub-eng', name: 'English', code: 'ENG101' },
  { id: 'sub-hindi', name: 'Hindi', code: 'HIN101' },
  { id: 'sub-ss', name: 'Social Studies', code: 'SS101' },
  { id: 'sub-cs', name: 'Computer Science', code: 'CS101' },
];

const assessmentTypes: AssessmentType[] = ['Theory', 'Practical', 'Oral', 'Project', 'Assignment', 'Internal'];

function randomMarks(maxMarks: number, passingMarks: number): number {
  const min = Math.floor(passingMarks * 0.6);
  const max = maxMarks;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGradeForScore(score: number, maxMarks: number): string {
  const percentage = (score / maxMarks) * 100;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}

function getMarkEntryStatus(idx: number): 'Not Started' | 'In Progress' | 'Submitted' | 'Verified' | 'Locked' {
  const statuses: ('Not Started' | 'In Progress' | 'Submitted' | 'Verified' | 'Locked')[] = ['Not Started', 'In Progress', 'Submitted', 'Verified', 'Locked'];
  // Weighted distribution
  if (idx < 40) return 'Verified';
  if (idx < 55) return 'Submitted';
  if (idx < 70) return 'In Progress';
  return 'Not Started';
}

// Student Mark Records (80)
export const studentMarkRecords: StudentMarkRecord[] = [];
let markRecordId = 1;

for (let sIdx = 0; sIdx < 20; sIdx++) {
  for (let subIdx = 0; subIdx < 4; subIdx++) {
    const student = studentPool[sIdx];
    const subject = subjectPool[subIdx];
    const classGradeId = sIdx < 10 ? 'cls-10' : 'cls-9';
    const classGradeName = sIdx < 10 ? 'Grade 10' : 'Grade 9';
    const sectionId = sIdx < 10 ? (sIdx < 5 ? 'sec-10-a' : 'sec-10-b') : (sIdx < 15 ? 'sec-9-a' : 'sec-9-b');
    const sectionName = sectionId.includes('-a') ? 'A' : 'B';
    const maxMarks = 50;
    const passingMarks = 18;
    const status = getMarkEntryStatus(markRecordId);
    const marksObtained = status === 'Not Started' ? null : randomMarks(maxMarks, passingMarks);

    studentMarkRecords.push({
      id: `mark-${markRecordId}`,
      examSessionId: 'exam-sess-001',
      studentId: student.id,
      studentName: student.name,
      admissionNumber: student.admissionNumber,
      rollNumber: student.rollNumber,
      classGradeId,
      classGradeName,
      sectionId,
      sectionName,
      subjectId: subject.id,
      subjectName: subject.name,
      assessmentType: 'Theory',
      marksObtained,
      maxMarks,
      passingMarks,
      grade: marksObtained ? getGradeForScore(marksObtained, maxMarks) : null,
      remarks: marksObtained && marksObtained < passingMarks ? 'Needs improvement' : null,
      enteredBy: status === 'Not Started' ? null : 'Rebecca Thomas',
      enteredAt: status === 'Not Started' ? null : `2026-06-${15 + subIdx}T10:00:00Z`,
      verifiedBy: status === 'Verified' || status === 'Locked' ? 'Arjun Mehta' : null,
      verifiedAt: status === 'Verified' || status === 'Locked' ? `2026-06-${18 + subIdx}T15:00:00Z` : null,
      markEntryStatus: status,
    });
    markRecordId++;
  }
}

// Subject Mark Entry Rows (16)
export const subjectMarkEntries: SubjectMarkEntry[] = [
  { id: 'sme-001', examSessionId: 'exam-sess-001', subjectId: 'sub-math', subjectName: 'Mathematics', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-001', teacherName: 'Rebecca Thomas', totalStudents: 10, marksEnteredCount: 10, marksPendingCount: 0, status: 'Verified', dueDate: '2026-06-25' },
  { id: 'sme-002', examSessionId: 'exam-sess-001', subjectId: 'sub-sci', subjectName: 'Science', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-002', teacherName: 'Arjun Mehta', totalStudents: 10, marksEnteredCount: 10, marksPendingCount: 0, status: 'Verified', dueDate: '2026-06-25' },
  { id: 'sme-003', examSessionId: 'exam-sess-001', subjectId: 'sub-eng', subjectName: 'English', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-003', teacherName: 'Lakshmi Iyer', totalStudents: 10, marksEnteredCount: 8, marksPendingCount: 2, status: 'In Progress', dueDate: '2026-06-25' },
  { id: 'sme-004', examSessionId: 'exam-sess-001', subjectId: 'sub-hindi', subjectName: 'Hindi', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-012', teacherName: 'Deepa Venkatesh', totalStudents: 10, marksEnteredCount: 10, marksPendingCount: 0, status: 'Submitted', dueDate: '2026-06-25' },
  { id: 'sme-005', examSessionId: 'exam-sess-001', subjectId: 'sub-ss', subjectName: 'Social Studies', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-004', teacherName: 'Ananya Reddy', totalStudents: 10, marksEnteredCount: 10, marksPendingCount: 0, status: 'Locked', dueDate: '2026-06-25' },
  { id: 'sme-006', examSessionId: 'exam-sess-001', subjectId: 'sub-cs', subjectName: 'Computer Science', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-008', teacherName: 'Rajesh Nair', totalStudents: 10, marksEnteredCount: 6, marksPendingCount: 4, status: 'In Progress', dueDate: '2026-06-25' },
  { id: 'sme-007', examSessionId: 'exam-sess-002', subjectId: 'sub-math', subjectName: 'Mathematics', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-001', teacherName: 'Rebecca Thomas', totalStudents: 10, marksEnteredCount: 0, marksPendingCount: 10, status: 'Not Started', dueDate: '2026-07-30' },
  { id: 'sme-008', examSessionId: 'exam-sess-002', subjectId: 'sub-sci', subjectName: 'Science', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-002', teacherName: 'Arjun Mehta', totalStudents: 10, marksEnteredCount: 0, marksPendingCount: 10, status: 'Not Started', dueDate: '2026-07-30' },
  { id: 'sme-009', examSessionId: 'exam-sess-003', subjectId: 'sub-math', subjectName: 'Mathematics', classGradeId: 'cls-9', classGradeName: 'Grade 9', sectionId: 'sec-9-a', sectionName: 'A', teacherId: 'stf-001', teacherName: 'Rebecca Thomas', totalStudents: 5, marksEnteredCount: 3, marksPendingCount: 2, status: 'In Progress', dueDate: '2026-07-08' },
  { id: 'sme-010', examSessionId: 'exam-sess-004', subjectId: 'sub-sci', subjectName: 'Science', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-b', sectionName: 'B', teacherId: 'stf-002', teacherName: 'Arjun Mehta', totalStudents: 5, marksEnteredCount: 2, marksPendingCount: 3, status: 'In Progress', dueDate: '2026-07-15' },
  { id: 'sme-011', examSessionId: 'exam-sess-005', subjectId: 'sub-math', subjectName: 'Mathematics', classGradeId: 'cls-8', classGradeName: 'Grade 8', sectionId: 'sec-8-a', sectionName: 'A', teacherId: 'stf-011', teacherName: 'Vikram Rao', totalStudents: 5, marksEnteredCount: 5, marksPendingCount: 0, status: 'Submitted', dueDate: '2026-07-05' },
  { id: 'sme-012', examSessionId: 'exam-sess-005', subjectId: 'sub-sci', subjectName: 'Science', classGradeId: 'cls-8', classGradeName: 'Grade 8', sectionId: 'sec-8-a', sectionName: 'A', teacherId: 'stf-002', teacherName: 'Arjun Mehta', totalStudents: 5, marksEnteredCount: 5, marksPendingCount: 0, status: 'Verified', dueDate: '2026-07-05' },
  { id: 'sme-013', examSessionId: 'exam-sess-005', subjectId: 'sub-eng', subjectName: 'English', classGradeId: 'cls-8', classGradeName: 'Grade 8', sectionId: 'sec-8-a', sectionName: 'A', teacherId: 'stf-003', teacherName: 'Lakshmi Iyer', totalStudents: 5, marksEnteredCount: 5, marksPendingCount: 0, status: 'Submitted', dueDate: '2026-07-05' },
  { id: 'sme-014', examSessionId: 'exam-sess-006', subjectId: 'sub-eng', subjectName: 'English', classGradeId: 'cls-9', classGradeName: 'Grade 9', sectionId: 'sec-9-a', sectionName: 'A', teacherId: 'stf-003', teacherName: 'Lakshmi Iyer', totalStudents: 5, marksEnteredCount: 0, marksPendingCount: 5, status: 'Not Started', dueDate: '2026-07-15' },
  { id: 'sme-015', examSessionId: 'exam-sess-001', subjectId: 'sub-math', subjectName: 'Mathematics', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-b', sectionName: 'B', teacherId: 'stf-001', teacherName: 'Rebecca Thomas', totalStudents: 5, marksEnteredCount: 5, marksPendingCount: 0, status: 'Verified', dueDate: '2026-06-25' },
  { id: 'sme-016', examSessionId: 'exam-sess-008', subjectId: 'sub-hindi', subjectName: 'Hindi', classGradeId: 'cls-10', classGradeName: 'Grade 10', sectionId: 'sec-10-a', sectionName: 'A', teacherId: 'stf-012', teacherName: 'Deepa Venkatesh', totalStudents: 5, marksEnteredCount: 0, marksPendingCount: 5, status: 'Not Started', dueDate: '2026-07-15' },
];

// Grade Bands (8)
export const gradeBands: GradeBand[] = [
  { id: 'gb-001', scaleType: 'Percentage', label: 'A+', minValue: 90, maxValue: 100, result: 'Pass', colorToken: 'success' },
  { id: 'gb-002', scaleType: 'Percentage', label: 'A', minValue: 80, maxValue: 89, result: 'Pass', colorToken: 'success' },
  { id: 'gb-003', scaleType: 'Percentage', label: 'B+', minValue: 70, maxValue: 79, result: 'Pass', colorToken: 'primary' },
  { id: 'gb-004', scaleType: 'Percentage', label: 'B', minValue: 60, maxValue: 69, result: 'Pass', colorToken: 'info' },
  { id: 'gb-005', scaleType: 'Percentage', label: 'C', minValue: 50, maxValue: 59, result: 'Pass', colorToken: 'warning' },
  { id: 'gb-006', scaleType: 'Percentage', label: 'D', minValue: 40, maxValue: 49, result: 'Pass', colorToken: 'warning' },
  { id: 'gb-007', scaleType: 'Percentage', label: 'F', minValue: 0, maxValue: 39, result: 'Fail', colorToken: 'destructive' },
  { id: 'gb-008', scaleType: 'GPA', label: 'Excellent', minValue: 9, maxValue: 10, result: 'Pass', colorToken: 'success' },
];

// Report Card Readiness Items (8)
export const reportCardReadinessItems: ReportCardReadinessItem[] = [
  { id: 'rcr-001', area: 'Exam Session Configuration', description: 'All exam sessions properly configured for Term 1', status: 'Ready', owner: 'Arjun Mehta', dueDate: '2026-06-30', blockers: null },
  { id: 'rcr-002', area: 'Schedule Completion', description: 'Mid Term Examination schedule finalized', status: 'Ready', owner: 'Arjun Mehta', dueDate: '2026-07-10', blockers: null },
  { id: 'rcr-003', area: 'Marks Entry Completion', description: 'Unit Test 1 marks entry completed', status: 'Ready', owner: 'All Teachers', dueDate: '2026-06-25', blockers: null },
  { id: 'rcr-004', area: 'Marks Verification', description: 'All marks verified by HODs', status: 'In Progress', owner: 'Department HODs', dueDate: '2026-07-05', blockers: null },
  { id: 'rcr-005', area: 'Grading Rules Setup', description: 'Grading scale and pass criteria configured', status: 'Ready', owner: 'Admin', dueDate: '2026-06-15', blockers: null },
  { id: 'rcr-006', area: 'Co-Scholastic Data', description: 'Attendance and co-scholastic marks imported', status: 'Blocked', owner: 'Data Entry Team', dueDate: '2026-07-15', blockers: 'Waiting for PE and Arts department submission' },
  { id: 'rcr-007', area: 'Result Review', description: 'Grade 10 Monthly Test results reviewed', status: 'In Progress', owner: 'Arjun Mehta', dueDate: '2026-07-10', blockers: null },
  { id: 'rcr-008', area: 'Report Format', description: 'Report card template approved', status: 'Ready', owner: 'Principal', dueDate: '2026-06-01', blockers: null },
];

// Class Result Summaries (10)
export const classResultSummaries: ClassResultSummary[] = [
  { id: 'crs-001', examSessionId: 'exam-sess-001', classGradeName: 'Grade 10', sectionName: 'A', studentsAppeared: 10, passCount: 9, failCount: 1, highestAverage: 92, classAverage: 75, resultStatus: 'Published' },
  { id: 'crs-002', examSessionId: 'exam-sess-001', classGradeName: 'Grade 10', sectionName: 'B', studentsAppeared: 5, passCount: 5, failCount: 0, highestAverage: 88, classAverage: 78, resultStatus: 'Published' },
  { id: 'crs-003', examSessionId: 'exam-sess-005', classGradeName: 'Grade 8', sectionName: 'A', studentsAppeared: 5, passCount: 4, failCount: 1, highestAverage: 85, classAverage: 72, resultStatus: 'Ready for Review' },
  { id: 'crs-004', examSessionId: 'exam-sess-005', classGradeName: 'Grade 8', sectionName: 'B', studentsAppeared: 5, passCount: 5, failCount: 0, highestAverage: 82, classAverage: 76, resultStatus: 'Ready for Review' },
  { id: 'crs-005', examSessionId: 'exam-sess-002', classGradeName: 'Grade 10', sectionName: 'A', studentsAppeared: 10, passCount: 0, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Not Ready' },
  { id: 'crs-006', examSessionId: 'exam-sess-003', classGradeName: 'Grade 9', sectionName: 'A', studentsAppeared: 5, passCount: 3, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Processing' },
  { id: 'crs-007', examSessionId: 'exam-sess-004', classGradeName: 'Grade 10', sectionName: 'B', studentsAppeared: 5, passCount: 0, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Not Ready' },
  { id: 'crs-008', examSessionId: 'exam-sess-006', classGradeName: 'Grade 9', sectionName: 'A', studentsAppeared: 5, passCount: 0, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Not Ready' },
  { id: 'crs-009', examSessionId: 'exam-sess-007', classGradeName: 'Grade 7', sectionName: 'A', studentsAppeared: 5, passCount: 0, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Not Ready' },
  { id: 'crs-010', examSessionId: 'exam-sess-008', classGradeName: 'Grade 10', sectionName: 'A', studentsAppeared: 5, passCount: 0, failCount: 0, highestAverage: 0, classAverage: 0, resultStatus: 'Not Ready' },
];

// Student Result Snapshots (12)
export const studentResultSnapshots: StudentResultSnapshot[] = [
  { id: 'srs-001', studentId: 'stu-001', studentName: 'Aarav Sharma', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 268, totalMaxMarks: 300, percentage: 89, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-002', studentId: 'stu-002', studentName: 'Ananya Iyer', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 276, totalMaxMarks: 300, percentage: 92, grade: 'A+', resultStatus: 'Pass' },
  { id: 'srs-003', studentId: 'stu-003', studentName: 'Karthik Menon', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 248, totalMaxMarks: 300, percentage: 83, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-004', studentId: 'stu-004', studentName: 'Priya Nair', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 198, totalMaxMarks: 300, percentage: 66, grade: 'B', resultStatus: 'Pass' },
  { id: 'srs-005', studentId: 'stu-005', studentName: 'Rohan Gupta', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 225, totalMaxMarks: 300, percentage: 75, grade: 'B+', resultStatus: 'Pass' },
  { id: 'srs-006', studentId: 'stu-006', studentName: 'Sneha Patil', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 112, totalMaxMarks: 300, percentage: 37, grade: 'F', resultStatus: 'Fail' },
  { id: 'srs-007', studentId: 'stu-007', studentName: 'Aditya Verma', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 255, totalMaxMarks: 300, percentage: 85, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-008', studentId: 'stu-001', studentName: 'Aarav Sharma', classGradeName: 'Grade 10', sectionName: 'A', examSessionName: 'Monthly Test - Grade 8A', subjectsAppeared: 5, totalMarksObtained: 220, totalMaxMarks: 250, percentage: 88, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-009', studentId: 'stu-011', studentName: 'Arjun Mehta', classGradeName: 'Grade 10', sectionName: 'B', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 264, totalMaxMarks: 300, percentage: 88, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-010', studentId: 'stu-012', studentName: 'Divya Rao', classGradeName: 'Grade 10', sectionName: 'B', examSessionName: 'Unit Test 1 - Grade 10A', subjectsAppeared: 6, totalMarksObtained: 252, totalMaxMarks: 300, percentage: 84, grade: 'A', resultStatus: 'Pass' },
  { id: 'srs-011', studentId: 'stu-016', studentName: 'Pooja Desai', classGradeName: 'Grade 9', sectionName: 'A', examSessionName: 'Weekly Test - Mathematics Grade 9A', subjectsAppeared: 1, totalMarksObtained: 18, totalMaxMarks: 25, percentage: 72, grade: 'B+', resultStatus: 'Pass' },
  { id: 'srs-012', studentId: 'stu-017', studentName: 'Nikhil Kulkarni', classGradeName: 'Grade 9', sectionName: 'A', examSessionName: 'Weekly Test - Mathematics Grade 9A', subjectsAppeared: 1, totalMarksObtained: 22, totalMaxMarks: 25, percentage: 88, grade: 'A', resultStatus: 'Pass' },
];

// Exam Alerts (8)
export const examAlerts: ExamAlert[] = [
  { id: 'alert-001', title: 'Marks Entry Deadline Approaching', description: 'Mathematics marks for Grade 9A due on July 8th', severity: 'Warning', date: CURRENT_DATE, relatedEntity: { type: 'marks', id: 'sme-009', name: 'Mathematics Grade 9A' }, status: 'Active', actionRequired: 'Complete marks entry before deadline' },
  { id: 'alert-002', title: 'Verification Pending', description: 'Hindi marks for Grade 10A pending verification', severity: 'Info', date: CURRENT_DATE, relatedEntity: { type: 'marks', id: 'sme-004', name: 'Hindi Grade 10A' }, status: 'Active', actionRequired: 'Verify marks for result processing' },
  { id: 'alert-003', title: 'Schedule Conflict Detected', description: 'Mid Term exam overlaps with Practical Assessment on July 15th', severity: 'Critical', date: CURRENT_DATE, relatedEntity: { type: 'session', id: 'exam-sess-002', name: 'Mid Term Examination' }, status: 'Active', actionRequired: 'Resolve schedule conflict immediately' },
  { id: 'alert-004', title: 'Low Pass Rate Warning', description: 'Grade 8A Section A shows 60% pass rate in Monthly Test', severity: 'Warning', date: CURRENT_DATE, relatedEntity: { type: 'result', id: 'crs-003', name: 'Grade 8A' }, status: 'Acknowledged', actionRequired: 'Review student performance data' },
  { id: 'alert-005', title: 'Report Card Blocked', description: 'Co-Scholastic data missing from Data Entry Team', severity: 'Critical', date: CURRENT_DATE, relatedEntity: { type: 'result', id: 'rcr-006', name: 'Report Card Readiness' }, status: 'Active', actionRequired: 'Follow up with PE and Arts departments' },
  { id: 'alert-006', title: 'Exam Room Assignment Missing', description: 'Room not assigned for Term End Exam Grade 7A', severity: 'Info', date: CURRENT_DATE, relatedEntity: { type: 'schedule', id: 'sched-023', name: 'Term End Exam - Mathematics' }, status: 'Active', actionRequired: 'Assign exam room before schedule' },
  { id: 'alert-007', title: 'Grace Marks Threshold', description: '3 students in Grade 10A within 2 marks of passing threshold', severity: 'Info', date: CURRENT_DATE, relatedEntity: { type: 'marks', id: 'exam-sess-001', name: 'Unit Test 1' }, status: 'Active', actionRequired: 'Review for grace marks eligibility' },
  { id: 'alert-008', title: 'Practical Assessment Incomplete', description: 'Science Practical for Grade 10B 60% complete', severity: 'Warning', date: CURRENT_DATE, relatedEntity: { type: 'marks', id: 'sme-010', name: 'Science Practical Grade 10B' }, status: 'Active', actionRequired: 'Complete remaining assessments' },
];

// Exam Activity Events (12)
export const examActivityEvents: ExamActivityEvent[] = [
  { id: 'act-001', eventType: 'Exam Session Created', title: 'Mid Term Examination created', description: 'Exam session created for Grade 10 Mid Term Examination', actor: 'Arjun Mehta', timestamp: '2026-07-01T09:00:00Z', severity: 'info', relatedEntity: { type: 'session', id: 'exam-sess-002', name: 'Mid Term Examination' } },
  { id: 'act-002', eventType: 'Schedule Published', title: 'Unit Test 1 schedule published', description: 'Unit Test 1 schedule published for Grade 10A', actor: 'Arjun Mehta', timestamp: '2026-06-10T11:00:00Z', severity: 'success', relatedEntity: { type: 'schedule', id: 'exam-sess-001', name: 'Unit Test 1' } },
  { id: 'act-003', eventType: 'Marks Entry Opened', title: 'Marks entry opened for Mathematics', description: 'Marks entry enabled for Mathematics Grade 10A Unit Test 1', actor: 'Arjun Mehta', timestamp: '2026-06-15T13:00:00Z', severity: 'info', relatedEntity: { type: 'marks', id: 'sme-001', name: 'Mathematics Grade 10A' } },
  { id: 'act-004', eventType: 'Marks Submitted', title: 'Mathematics marks submitted', description: 'All 10 student marks submitted for Mathematics Grade 10A', actor: 'Rebecca Thomas', timestamp: '2026-06-16T15:30:00Z', severity: 'success', relatedEntity: { type: 'marks', id: 'sme-001', name: 'Mathematics Grade 10A' } },
  { id: 'act-005', eventType: 'Marks Verified', title: 'Science marks verified', description: 'Science marks verified by HOD for Grade 10A', actor: 'Arjun Mehta', timestamp: '2026-06-18T14:00:00Z', severity: 'success', relatedEntity: { type: 'marks', id: 'sme-002', name: 'Science Grade 10A' } },
  { id: 'act-006', eventType: 'Result Review Started', title: 'Grade 8A result review initiated', description: 'Monthly Test result review started for Grade 8A', actor: 'Ananya Reddy', timestamp: '2026-07-02T10:00:00Z', severity: 'info', relatedEntity: { type: 'result', id: 'crs-003', name: 'Grade 8A' } },
  { id: 'act-007', eventType: 'Report Card Blocker Added', title: 'Co-Scholastic blocker identified', description: 'Co-Scholastic data pending from PE and Arts department', actor: 'Data Entry Team', timestamp: '2026-07-05T09:00:00Z', severity: 'warning', relatedEntity: { type: 'result', id: 'rcr-006', name: 'Report Card Readiness' } },
  { id: 'act-008', eventType: 'Session Archived', title: 'Unit Test 1 archived', description: 'Unit Test 1 session archived after result publication', actor: 'Arjun Mehta', timestamp: '2026-06-28T16:00:00Z', severity: 'info', relatedEntity: { type: 'session', id: 'exam-sess-001', name: 'Unit Test 1' } },
  { id: 'act-009', eventType: 'Marks Submitted', title: 'Social Studies marks submitted', description: 'Social Studies marks submitted for Grade 10A Unit Test 1', actor: 'Ananya Reddy', timestamp: '2026-06-20T12:00:00Z', severity: 'success', relatedEntity: { type: 'marks', id: 'sme-005', name: 'Social Studies Grade 10A' } },
  { id: 'act-010', eventType: 'Schedule Published', title: 'Mid Term Exam schedule published', description: 'Mid Term Examination schedule published for Grade 10', actor: 'Arjun Mehta', timestamp: '2026-07-05T10:00:00Z', severity: 'success', relatedEntity: { type: 'schedule', id: 'exam-sess-002', name: 'Mid Term Examination' } },
  { id: 'act-011', eventType: 'Marks Entry Opened', title: 'Practical marks entry opened', description: 'Science Practical marks entry opened for Grade 10B', actor: 'Arjun Mehta', timestamp: '2026-07-01T09:00:00Z', severity: 'info', relatedEntity: { type: 'marks', id: 'sme-010', name: 'Science Practical' } },
  { id: 'act-012', eventType: 'Exam Session Created', title: 'Term End Exam session created', description: 'Draft session created for Grade 7A Term End Exam', actor: 'Priya Sharma', timestamp: '2026-07-03T09:00:00Z', severity: 'info', relatedEntity: { type: 'session', id: 'exam-sess-007', name: 'Term End Exam' } },
];
