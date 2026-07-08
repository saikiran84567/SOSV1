import type {
  StaffProfile,
  StaffDepartmentSummary,
  StaffEmploymentRecord,
  StaffQualification,
  StaffCompensationSnapshot,
  StaffWorkloadSnapshot,
  StaffDocumentSummary,
  StaffLifecycleEvent,
  StaffAlert,
  StaffActivityEvent,
  StaffReportingLine,
  StaffIdentitySummary,
  StaffEmploymentType,
  StaffStatus,
  StaffRoleCategory,
  StaffGender,
} from '../types';

// Helper data
const firstNamesMale = ['Rajesh', 'Amit', 'Sunil', 'Vikram', 'Sanjay', 'Rahul', 'Anil', 'Deepak', 'Rakesh', 'Manoj', 'Ashok', 'Narendra', 'Prakash', 'Suresh', 'Mohan'];
const firstNamesFemale = ['Priya', 'Anita', 'Sunita', 'Kavita', 'Neha', 'Pooja', 'Rekha', 'Sangeeta', 'Meena', 'Deepa', 'Lakshmi', 'Sarla', 'Usha', 'Kiran', 'Jyoti'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Patel', 'Yadav', 'Mishra', 'Chauhan', 'Reddy', 'Nair', 'Iyer', 'Menon', 'Rao'];
const departments = [
  { id: 'dept-1', name: 'Mathematics' },
  { id: 'dept-2', name: 'Science' },
  { id: 'dept-3', name: 'English' },
  { id: 'dept-4', name: 'Social Studies' },
  { id: 'dept-5', name: 'Computer Science' },
  { id: 'dept-6', name: 'Physical Education' },
  { id: 'dept-7', name: 'Administration' },
  { id: 'dept-8', name: 'Library' },
  { id: 'dept-9', name: 'Accounts' },
  { id: 'dept-10', name: 'Human Resources' },
];
const campuses = [
  { id: 'camp-1', name: 'Main Campus' },
  { id: 'camp-2', name: 'North Campus' },
  { id: 'camp-3', name: 'South Campus' },
];
const designationsTeaching = ['PGT Mathematics', 'PGT Physics', 'TGT Science', 'TGT English', 'TGT Social Studies', 'PGT Chemistry', 'TGT Mathematics', 'PGT Computer Science', 'Sports Teacher', 'PGT Biology'];
const designationsAdmin = ['Principal', 'Vice Principal', 'Academic Coordinator', 'Admin Officer', 'Accountant', 'Librarian', 'Counselor', 'Office Assistant'];
const employmentTypes: StaffEmploymentType[] = ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Substitute', 'Intern'];
const statuses: StaffStatus[] = ['Active', 'On Leave', 'Suspended', 'Terminated', 'Resigned', 'Retired'];
const roleCategories: StaffRoleCategory[] = ['Teaching', 'Non-Teaching', 'Administration', 'Support', 'Leadership'];
const genders: StaffGender[] = ['Male', 'Female', 'Other'];
const degrees = ['M.Sc', 'M.A', 'B.Ed', 'M.Ed', 'B.Sc', 'B.A', 'MCA', 'MBA', 'Ph.D', 'B.Com', 'M.Com', 'LLB', 'B.Tech', 'M.Tech'];
const institutions = ['Delhi University', 'JNU', 'IIT Delhi', 'IGNOU', 'BHU', 'AMU', 'Jadavpur University', 'Pune University', 'Anna University', 'Osmania University'];
const documentTypes = ['Education Certificate', 'ID Proof', 'Experience Certificate', 'Police Verification', 'Medical Certificate', 'Address Proof', 'Reference Letter', 'Contract Document'];

// Generate Staff Profiles (30)
export const staffProfiles: StaffProfile[] = [];
for (let i = 1; i <= 30; i++) {
  const isMale = i % 2 === 0;
  const firstName = isMale ? firstNamesMale[(i - 1) % firstNamesMale.length] : firstNamesFemale[(i - 1) % firstNamesFemale.length];
  const lastName = lastNames[(i - 1) % lastNames.length];
  const fullName = `${firstName} ${lastName}`;
  const isTeaching = i <= 20;
  const department = departments[(i - 1) % departments.length];
  const campus = campuses[(i - 1) % campuses.length];
  const roleCategory: StaffRoleCategory = i <= 20 ? 'Teaching' : (i <= 24 ? 'Administration' : (i <= 27 ? 'Non-Teaching' : 'Support'));
  const status: StaffStatus = i <= 22 ? 'Active' : (i <= 26 ? 'On Leave' : (i <= 28 ? 'Suspended' : 'Resigned'));
  const employmentType: StaffEmploymentType = i <= 20 ? 'Full-Time' : (i <= 25 ? 'Contract' : 'Part-Time');
  const designation = isTeaching ? designationsTeaching[(i - 1) % designationsTeaching.length] : designationsAdmin[(i - 1) % designationsAdmin.length];

  staffProfiles.push({
    id: `staff-${i}`,
    employeeId: `EMP${String(1000 + i).padStart(4, '0')}`,
    firstName,
    lastName,
    fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.edu`,
    phone: `+91 98${String(10000000 + i).padStart(8, '0')}`,
    gender: isMale ? 'Male' : 'Female',
    dateOfBirth: `19${70 + (i % 20)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    joiningDate: `20${10 + (i % 10)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    status,
    employmentType,
    roleCategory,
    designation,
    departmentId: department.id,
    departmentName: department.name,
    campusId: campus.id,
    campusName: campus.name,
    reportingManagerId: i <= 2 ? null : `staff-${Math.max(1, i - 5)}`,
    reportingManagerName: i <= 2 ? null : staffProfiles[Math.max(0, i - 6)]?.fullName || null,
    totalExperienceYears: 5 + (i % 20),
    currentRoleExperienceYears: 1 + (i % 8),
    qualificationsCount: 2 + (i % 4),
    documentsCount: 3 + (i % 6),
    profilePhotoUrl: null,
    bio: `${fullName} is an experienced ${designation} with expertise in ${department.name}.`,
    createdAt: `20${10 + (i % 10)}-0${1 + (i % 3)}-15`,
    updatedAt: `20${20 + (i % 6)}-0${4 + (i % 6)}-10`,
  });
}

// Generate Department Summaries (10)
export const staffDepartmentSummaries: StaffDepartmentSummary[] = [];
for (let i = 1; i <= 10; i++) {
  const department = departments[(i - 1) % departments.length];
  const campus = campuses[(i - 1) % campuses.length];
  const totalStaff = 3 + (i * 2);
  const teachingStaff = i <= 6 ? Math.floor(totalStaff * 0.8) : Math.floor(totalStaff * 0.2);

  staffDepartmentSummaries.push({
    id: `dept-sum-${i}`,
    departmentId: department.id,
    departmentName: department.name,
    headOfDepartment: staffProfiles[(i - 1) % staffProfiles.length].fullName,
    campusId: campus.id,
    campusName: campus.name,
    totalStaff,
    teachingStaff,
    nonTeachingStaff: totalStaff - teachingStaff,
    activeStaff: totalStaff - Math.floor(totalStaff * 0.1),
    onLeaveStaff: Math.floor(totalStaff * 0.1),
    averageTenureYears: 4 + (i % 8),
    openPositions: i % 3,
    budgetUtilizationPercentage: 75 + (i % 20),
  });
}

// Generate Employment Records (30)
export const staffEmploymentRecords: StaffEmploymentRecord[] = [];
for (let i = 1; i <= 30; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const department = departments.find(d => d.id === profile.departmentId) || departments[0];
  const campus = campuses.find(c => c.id === profile.campusId) || campuses[0];

  staffEmploymentRecords.push({
    id: `emp-rec-${i}`,
    staffId: profile.id,
    employeeId: profile.employeeId,
    staffName: profile.fullName,
    employmentType: profile.employmentType,
    designation: profile.designation,
    departmentId: department.id,
    departmentName: department.name,
    startDate: profile.joiningDate,
    endDate: i > 28 ? `20${20 + (i % 3)}-${String(6 + (i % 6)).padStart(2, '0')}-${String(15 + (i % 10)).padStart(2, '0')}` : null,
    status: profile.status,
    campusId: campus.id,
    campusName: campus.name,
    reportingManagerId: profile.reportingManagerId,
    reportingManagerName: profile.reportingManagerName,
    reasonForEnd: i > 28 ? (i === 29 ? 'Resignation' : 'Contract End') : null,
    isCurrent: i <= 28,
  });
}

// Generate Qualifications (40)
export const staffQualifications: StaffQualification[] = [];
for (let i = 1; i <= 40; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const degree = degrees[(i - 1) % degrees.length];
  const isHighest = i % 3 === 0;

  staffQualifications.push({
    id: `qual-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    degreeName: degree,
    institution: institutions[(i - 1) % institutions.length],
    yearOfPassing: 2000 + (i % 20),
    grade: i % 2 === 0 ? 'First Division' : 'Second Division',
    specialization: i % 3 === 0 ? `${profile.departmentName}` : null,
    certificateUrl: i % 4 === 0 ? `/certificates/${i}.pdf` : null,
    isHighestQualification: isHighest,
  });
}

// Generate Compensation Snapshots (30)
export const staffCompensationSnapshots: StaffCompensationSnapshot[] = [];
for (let i = 1; i <= 30; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const basic = 30000 + (i * 2500);
  const allowances = Math.round(basic * 0.3);
  const deductions = Math.round(basic * 0.1);
  const net = basic + allowances - deductions;

  staffCompensationSnapshots.push({
    id: `comp-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    designation: profile.designation,
    departmentName: profile.departmentName,
    employmentType: profile.employmentType,
    effectiveDate: `20${20 + (i % 4)}-0${1 + (i % 4)}-01`,
    basicSalary: basic,
    allowances,
    deductions,
    netSalary: net,
    currency: 'INR',
    payFrequency: 'Monthly',
    bankName: i % 3 === 0 ? 'State Bank of India' : (i % 3 === 1 ? 'HDFC Bank' : 'ICICI Bank'),
    accountNumber: `XXXX${String(100000 + i).padStart(6, '0')}`,
  });
}

// Generate Workload Snapshots (20)
export const staffWorkloadSnapshots: StaffWorkloadSnapshot[] = [];
for (let i = 1; i <= 20; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const weeklyHours = 20 + (i % 25);
  const maxWeeklyHours = 40;
  const utilization = Math.min(100, Math.round((weeklyHours / maxWeeklyHours) * 100));
  const workloadStatus = utilization < 50 ? 'Underutilized' : (utilization <= 75 ? 'Optimal' : (utilization <= 90 ? 'High' : 'Overloaded'));
  const readinessScore = 60 + (i % 35);

  staffWorkloadSnapshots.push({
    id: `work-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    designation: profile.designation,
    departmentName: profile.departmentName,
    campusName: profile.campusName,
    recordedDate: `2026-0${1 + (i % 6)}-15`,
    classesAssigned: 3 + (i % 5),
    subjectsTaught: 1 + (i % 3),
    weeklyHours,
    maxWeeklyHours,
    utilizationPercentage: utilization,
    substituteAssignments: i % 4,
    extracurricularDuties: i % 3,
    administrativeDuties: i % 2,
    workloadStatus,
    readinessScore,
    certificationsCount: 1 + (i % 4),
    trainingsCompleted: 2 + (i % 6),
    certificationsExpiringSoon: i % 5,
  });
}

// Generate Document Summaries (30)
export const staffDocumentSummaries: StaffDocumentSummary[] = [];
for (let i = 1; i <= 30; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const documentType = documentTypes[(i - 1) % documentTypes.length];
  const verificationStatus = i % 4 === 0 ? 'Pending' : (i % 4 === 1 ? 'Verified' : (i % 4 === 2 ? 'Rejected' : 'Expired'));
  const year = 2020 + (i % 6);

  staffDocumentSummaries.push({
    id: `doc-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    documentType,
    documentName: `${documentType} - ${profile.fullName}`,
    documentNumber: i % 2 === 0 ? `DOC${String(10000 + i).padStart(5, '0')}` : null,
    issueDate: `${year}-0${1 + (i % 9)}-${String(10 + (i % 18)).padStart(2, '0')}`,
    expiryDate: documentType === 'Police Verification' ? `${year + 1}-0${1 + (i % 9)}-${String(10 + (i % 18)).padStart(2, '0')}` : null,
    issuingAuthority: i % 2 === 0 ? institutions[(i - 1) % institutions.length] : 'Government Authority',
    verificationStatus,
    documentUrl: i % 3 === 0 ? `/documents/${i}.pdf` : null,
    uploadedAt: `${year}-0${1 + (i % 9)}-${String(5 + (i % 10)).padStart(2, '0')}`,
    verifiedAt: verificationStatus === 'Verified' ? `${year}-0${2 + (i % 8)}-${String(10 + (i % 15)).padStart(2, '0')}` : null,
    verifiedBy: verificationStatus === 'Verified' ? 'HR Department' : null,
  });
}

// Generate Reporting Lines (20)
export const staffReportingLines: StaffReportingLine[] = [];
for (let i = 1; i <= 20; i++) {
  const managerIndex = (i - 1) % 5;
  const reporteeIndex = 5 + ((i - 1) % 15);
  const manager = staffProfiles[managerIndex];
  const reportee = staffProfiles[reporteeIndex];

  staffReportingLines.push({
    id: `report-line-${i}`,
    managerId: manager.id,
    managerName: manager.fullName,
    managerDesignation: manager.designation,
    managerDepartment: manager.departmentName,
    reporteeId: reportee.id,
    reporteeName: reportee.fullName,
    reporteeDesignation: reportee.designation,
    reporteeDepartment: reportee.departmentName,
    level: i <= 10 ? 1 : 2,
    isDirect: i <= 10,
  });
}

// Generate Lifecycle Events (20)
export const staffLifecycleEvents: StaffLifecycleEvent[] = [];
const eventTypes: StaffLifecycleEvent['eventType'][] = ['Joined', 'Promoted', 'Transferred', 'On Leave', 'Returned from Leave', 'Resigned', 'Terminated', 'Contract Ended', 'Extended', 'Warning Issued', 'Appreciation'];
for (let i = 1; i <= 20; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const eventType = eventTypes[(i - 1) % eventTypes.length];
  const year = 2020 + (i % 6);

  staffLifecycleEvents.push({
    id: `life-event-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    eventType,
    eventDate: `${year}-0${1 + (i % 9)}-${String(5 + (i % 20)).padStart(2, '0')}`,
    details: `${eventType} event for ${profile.fullName}`,
    previousState: eventType === 'Promoted' ? 'Previous Designation' : (eventType === 'Transferred' ? 'Previous Department' : null),
    newState: eventType === 'Promoted' ? profile.designation : (eventType === 'Transferred' ? profile.departmentName : null),
    initiatedBy: i % 3 === 0 ? 'HR Department' : (i % 3 === 1 ? 'Admin Office' : 'Principal'),
    approvedBy: i % 2 === 0 ? 'Principal' : null,
    remarks: i % 2 === 0 ? 'Approved as per policy' : null,
  });
}

// Generate Staff Alerts (8)
export const staffAlerts: StaffAlert[] = [
  {
    id: 'alert-1',
    title: 'Contract Expiring Soon',
    description: 'Contract for Priya Sharma expires in 30 days',
    severity: 'Warning',
    date: '2026-08-15',
    relatedEntity: { type: 'Staff', id: 'staff-5', name: 'Priya Sharma' },
    status: 'Open',
    actionRequired: 'Review contract renewal',
  },
  {
    id: 'alert-2',
    title: 'Document Verification Pending',
    description: '3 documents pending verification for Amit Verma',
    severity: 'Info',
    date: '2026-08-10',
    relatedEntity: { type: 'Staff', id: 'staff-2', name: 'Amit Verma' },
    status: 'Open',
    actionRequired: 'Complete document verification',
  },
  {
    id: 'alert-3',
    title: 'Critical Staff Shortage',
    description: 'Mathematics department has 3 teachers on leave',
    severity: 'Critical',
    date: '2026-08-12',
    relatedEntity: { type: 'Department', id: 'dept-1', name: 'Mathematics' },
    status: 'Open',
    actionRequired: 'Arrange substitute teachers',
  },
  {
    id: 'alert-4',
    title: 'Certification Expiry Alert',
    description: 'Teaching certification for 2 staff members expiring this month',
    severity: 'Warning',
    date: '2026-08-05',
    relatedEntity: { type: 'Certification', id: 'cert-group-1', name: 'Teaching Certifications' },
    status: 'Open',
    actionRequired: 'Schedule certification renewal',
  },
  {
    id: 'alert-5',
    title: 'Workload Overload',
    description: 'Rajesh Sharma has 120% workload capacity',
    severity: 'Warning',
    date: '2026-08-08',
    relatedEntity: { type: 'Staff', id: 'staff-1', name: 'Rajesh Sharma' },
    status: 'Open',
    actionRequired: 'Redistribute workload',
  },
  {
    id: 'alert-6',
    title: 'New Hire Onboarding',
    description: 'New staff member joining next week',
    severity: 'Info',
    date: '2026-08-20',
    relatedEntity: { type: 'Staff', id: 'staff-new-1', name: 'Pending Hire' },
    status: 'Pending',
    actionRequired: 'Prepare onboarding documents',
  },
  {
    id: 'alert-7',
    title: 'Performance Review Due',
    description: 'Quarterly performance review for 15 staff members due',
    severity: 'Info',
    date: '2026-08-01',
    relatedEntity: { type: 'Review', id: 'review-q3', name: 'Q3 Performance Review' },
    status: 'Open',
    actionRequired: 'Complete performance reviews',
  },
  {
    id: 'alert-8',
    title: 'Policy Violation Reported',
    description: 'Attendance policy violation reported for 2 staff members',
    severity: 'Critical',
    date: '2026-08-14',
    relatedEntity: { type: 'Staff', id: 'staff-multiple', name: 'Multiple Staff' },
    status: 'Under Investigation',
    actionRequired: 'Conduct investigation',
  },
];

// Generate Activity Events (12)
export const staffActivityEvents: StaffActivityEvent[] = [];
const activityEventTypes = ['Staff Created', 'Staff Joined', 'Promotion Processed', 'Transfer Completed', 'Leave Approved', 'Contract Renewed', 'Document Verified', 'Training Completed', 'Performance Review', 'Resignation Accepted', 'Exit Processed', 'Profile Updated'];
for (let i = 1; i <= 12; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];
  const eventType = activityEventTypes[(i - 1) % activityEventTypes.length];
  const severity: StaffActivityEvent['severity'] = i % 4 === 0 ? 'Warning' : (i % 4 === 1 ? 'Info' : 'Info');
  const day = 28 + i;
  const isFuture = day > 8;

  staffActivityEvents.push({
    id: `activity-${i}`,
    eventType,
    title: `${eventType} - ${profile.fullName}`,
    description: `${eventType} event recorded for ${profile.fullName} in ${profile.departmentName}`,
    actor: i % 2 === 0 ? 'HR Manager' : 'Admin Officer',
    timestamp: `2026-0${isFuture ? '0' : '7'}-${String(((day - 1) % 28) + 1).padStart(2, '0')}T${9 + (i % 8)}:${String(i * 5 % 60).padStart(2, '0')}:00`,
    severity,
    relatedEntity: { type: 'Staff', id: profile.id, name: profile.fullName },
  });
}

// Generate Identity Summaries (30)
export const staffIdentitySummaries: StaffIdentitySummary[] = [];
for (let i = 1; i <= 30; i++) {
  const profile = staffProfiles[(i - 1) % staffProfiles.length];

  staffIdentitySummaries.push({
    id: `identity-${i}`,
    staffId: profile.id,
    staffName: profile.fullName,
    documentType: i % 3 === 0 ? 'Aadhaar' : (i % 3 === 1 ? 'PAN' : 'Passport'),
    documentNumber: i % 3 === 0 ? `${String(100000000000 + i).padStart(12, '0')}` : (i % 3 === 1 ? `${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 5) % 26))}${String.fromCharCode(65 + ((i + 10) % 26))}${String(100000 + i).padStart(7, '0')}` : `K${String(10000000 + i).padStart(8, '0')}`),
    fullName: profile.fullName,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    nationality: 'Indian',
    bloodGroup: i % 4 === 0 ? 'O+' : (i % 4 === 1 ? 'A+' : (i % 4 === 2 ? 'B+' : 'AB+')),
    panNumber: i % 2 === 0 ? `${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 5) % 26))}${String.fromCharCode(65 + ((i + 10) % 26))}${String.fromCharCode(65 + ((i + 15) % 26))}${String.fromCharCode(65 + ((i + 20) % 26))}${String(1000 + i).padStart(4, '0')}` : null,
    aadhaarNumber: i % 2 === 1 ? `${String(100000000000 + i).padStart(12, '0')}` : null,
    passportNumber: i % 5 === 0 ? `K${String(10000000 + i).padStart(8, '0')}` : null,
    drivingLicenseNumber: i % 6 === 0 ? `DL${String(100000 + i).padStart(15, '0')}` : null,
  });
}
