import type {
  StudentRecord,
  AdmissionApplication,
  EnrollmentRecord,
  StudentTimelineEvent,
  Guardian,
  StudentDocument,
  DocumentType,
  DocumentStatus,
  StudentHealthInfo,
  StudentPreviousSchool,
  StudentAddress,
  EmergencyContact,
  StudentTag,
  StudentStatus,
  AdmissionStatus,
  EnrollmentStatus,
  StudentGender,
  BloodGroup,
  ApplicationSource,
} from '@/domains/student-lifecycle/types';

const CAMPUS_MAIN = { id: 'camp-001', name: 'Greenfield Main Campus' };
const CAMPUS_WFD = { id: 'camp-002', name: 'Greenfield Whitefield Campus' };
const AY_CURRENT = { id: 'ay-2026-27', name: 'Academic Year 2026-27' };

const classOptions = [
  { id: 'cls-nursery', name: 'Nursery' },
  { id: 'cls-lkg', name: 'LKG' },
  { id: 'cls-ukg', name: 'UKG' },
  { id: 'cls-1', name: 'Grade 1' },
  { id: 'cls-2', name: 'Grade 2' },
  { id: 'cls-3', name: 'Grade 3' },
  { id: 'cls-4', name: 'Grade 4' },
  { id: 'cls-5', name: 'Grade 5' },
  { id: 'cls-6', name: 'Grade 6' },
  { id: 'cls-7', name: 'Grade 7' },
  { id: 'cls-8', name: 'Grade 8' },
  { id: 'cls-9', name: 'Grade 9' },
  { id: 'cls-10', name: 'Grade 10' },
  { id: 'cls-11', name: 'Grade 11' },
  { id: 'cls-12', name: 'Grade 12' },
];

const sectionOptions: Record<string, { id: string; name: string }[]> = {
  'cls-nursery': [{ id: 'sec-n-a', name: 'A' }, { id: 'sec-n-b', name: 'B' }, { id: 'sec-n-c', name: 'C' }],
  'cls-lkg': [{ id: 'sec-lkg-a', name: 'A' }, { id: 'sec-lkg-b', name: 'B' }, { id: 'sec-lkg-c', name: 'C' }],
  'cls-ukg': [{ id: 'sec-ukg-a', name: 'A' }, { id: 'sec-ukg-b', name: 'B' }, { id: 'sec-ukg-c', name: 'C' }],
  'cls-1': [{ id: 'sec-1-a', name: 'A' }, { id: 'sec-1-b', name: 'B' }, { id: 'sec-1-c', name: 'C' }, { id: 'sec-1-d', name: 'D' }],
  'cls-2': [{ id: 'sec-2-a', name: 'A' }, { id: 'sec-2-b', name: 'B' }, { id: 'sec-2-c', name: 'C' }],
  'cls-3': [{ id: 'sec-3-a', name: 'A' }, { id: 'sec-3-b', name: 'B' }, { id: 'sec-3-c', name: 'C' }],
  'cls-4': [{ id: 'sec-4-a', name: 'A' }, { id: 'sec-4-b', name: 'B' }, { id: 'sec-4-c', name: 'C' }],
  'cls-5': [{ id: 'sec-5-a', name: 'A' }, { id: 'sec-5-b', name: 'B' }, { id: 'sec-5-c', name: 'C' }],
  'cls-6': [{ id: 'sec-6-a', name: 'A' }, { id: 'sec-6-b', name: 'B' }, { id: 'sec-6-c', name: 'C' }, { id: 'sec-6-d', name: 'D' }],
  'cls-7': [{ id: 'sec-7-a', name: 'A' }, { id: 'sec-7-b', name: 'B' }, { id: 'sec-7-c', name: 'C' }],
  'cls-8': [{ id: 'sec-8-a', name: 'A' }, { id: 'sec-8-b', name: 'B' }, { id: 'sec-8-c', name: 'C' }],
  'cls-9': [{ id: 'sec-9-a', name: 'A' }, { id: 'sec-9-b', name: 'B' }, { id: 'sec-9-c', name: 'C' }, { id: 'sec-9-d', name: 'D' }],
  'cls-10': [{ id: 'sec-10-a', name: 'A' }, { id: 'sec-10-b', name: 'B' }, { id: 'sec-10-c', name: 'C' }],
  'cls-11': [{ id: 'sec-11-a', name: 'Science' }, { id: 'sec-11-b', name: 'Commerce' }, { id: 'sec-11-c', name: 'Humanities' }],
  'cls-12': [{ id: 'sec-12-a', name: 'Science' }, { id: 'sec-12-b', name: 'Commerce' }, { id: 'sec-12-c', name: 'Humanities' }],
};

const requiredDocTypes: DocumentType[] = [
  'Birth Certificate',
  'Aadhaar Card',
  'Passport Photo',
  'Address Proof',
  'Parent ID Proof',
];

const optionalDocTypes: DocumentType[] = [
  'Transfer Certificate',
  'Previous Marksheet',
  'Medical Certificate',
  'Caste Certificate',
];

function makeDocuments(
  prefix: string,
  hasPrevSchool: boolean,
  submittedCount: number,
  verifiedCount: number
): StudentDocument[] {
  const docs: StudentDocument[] = [];
  let submittedIdx = 0;
  let verifiedIdx = 0;

  for (const type of requiredDocTypes) {
    const isSubmitted = submittedIdx < submittedCount;
    const isVerified = isSubmitted && verifiedIdx < verifiedCount;
    const status: DocumentStatus = isVerified
      ? 'verified'
      : isSubmitted
        ? 'submitted'
        : 'pending';
    docs.push({
      id: `doc-${prefix}-${type.toLowerCase().replace(/\s+/g, '-')}`,
      type,
      name: `${type}`,
      status,
      uploadedAt: isSubmitted ? '2026-03-15T10:30:00Z' : null,
      verifiedAt: isVerified ? '2026-03-16T14:00:00Z' : null,
      verifiedBy: isVerified ? 'Priya Sharma' : null,
      expiryDate: null,
      required: true,
    });
    if (isSubmitted) submittedIdx++;
    if (isVerified) verifiedIdx++;
  }

  const optionalDocs = hasPrevSchool
    ? optionalDocTypes
    : optionalDocTypes.filter((t) => t !== 'Transfer Certificate' && t !== 'Previous Marksheet');

  for (const type of optionalDocs) {
    docs.push({
      id: `doc-${prefix}-${type.toLowerCase().replace(/\s+/g, '-')}`,
      type,
      name: `${type}`,
      status: 'pending',
      uploadedAt: null,
      verifiedAt: null,
      verifiedBy: null,
      expiryDate: null,
      required: false,
    });
  }

  return docs;
}

function makeGuardians(
  prefix: string,
  fatherName: string,
  fatherPhone: string,
  fatherEmail: string,
  fatherOccupation: string,
  motherName: string,
  motherPhone: string,
  motherEmail: string,
  motherOccupation: string
): Guardian[] {
  return [
    {
      id: `grd-${prefix}-f`,
      name: fatherName,
      relation: 'Father',
      phone: fatherPhone,
      email: fatherEmail,
      occupation: fatherOccupation,
      isPrimary: true,
      isEmergencyContact: true,
      addressSameAsStudent: true,
    },
    {
      id: `grd-${prefix}-m`,
      name: motherName,
      relation: 'Mother',
      phone: motherPhone,
      email: motherEmail,
      occupation: motherOccupation,
      isPrimary: false,
      isEmergencyContact: true,
      addressSameAsStudent: true,
    },
  ];
}

function makeEmergencyContacts(prefix: string, name: string, phone: string): EmergencyContact[] {
  return [
    {
      id: `emg-${prefix}-1`,
      name,
      relation: 'Grandfather',
      phone,
    },
  ];
}

function makeHealthInfo(blood: BloodGroup, allergies: string[] = []): StudentHealthInfo {
  return {
    bloodGroup: blood,
    allergies,
    medicalConditions: [],
    medications: [],
    emergencyNotes: 'No special medical requirements noted.',
    height: undefined,
    weight: undefined,
  };
}

function makeAddress(line1: string, city: string, state: string, postalCode: string): StudentAddress {
  return {
    line1,
    line2: undefined,
    city,
    state,
    postalCode,
    country: 'India',
  };
}

function makePreviousSchool(
  schoolName: string,
  lastClass: string,
  yearOfLeaving: number,
  tc: string | null,
  reason: string,
  city: string
): StudentPreviousSchool {
  return {
    schoolName,
    lastClassAttended: lastClass,
    yearOfLeaving,
    transferCertificateNumber: tc,
    reasonForLeaving: reason,
    city,
  };
}

interface StudentSeed {
  id: string;
  admissionNumber: string;
  rollNumber: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  gender: StudentGender;
  bloodGroup: BloodGroup;
  status: StudentStatus;
  admissionStatus: AdmissionStatus;
  enrollmentStatus: EnrollmentStatus;
  campus: typeof CAMPUS_MAIN;
  classIdx: number;
  sectionIdx: number;
  admissionDate: string | null;
  joinedDate: string | null;
  father: { name: string; phone: string; email: string; occupation: string };
  mother: { name: string; phone: string; email: string; occupation: string };
  emergency: { name: string; phone: string };
  address: { line1: string; city: string; state: string; postalCode: string };
  hasPrevSchool: boolean;
  prevSchool?: { name: string; lastClass: string; year: number; tc: string | null; reason: string; city: string };
  tags: StudentTag[];
  docSubmitted: number;
  docVerified: number;
  allergies: string[];
  createdAt: string;
  updatedAt: string;
}

const studentSeeds: StudentSeed[] = [
  {
    id: 'stu-001', admissionNumber: 'GIS2026001', rollNumber: 'G1-001',
    firstName: 'Aarav', middleName: null, lastName: 'Sharma', dateOfBirth: '2020-05-15', gender: 'Male', bloodGroup: 'B+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 3, sectionIdx: 0, admissionDate: '2026-03-20', joinedDate: '2026-04-01',
    father: { name: 'Rahul Sharma', phone: '+91 98450 11223', email: 'rahul.sharma@email.com', occupation: 'Software Engineer' },
    mother: { name: 'Priya Sharma', phone: '+91 98450 11224', email: 'priya.sharma@email.com', occupation: 'Doctor' },
    emergency: { name: 'Mohan Sharma', phone: '+91 98450 11225' },
    address: { line1: '124, Koramangala 5th Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560095' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 5, docVerified: 5, allergies: [],
    createdAt: '2026-02-10T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-002', admissionNumber: 'GIS2026002', rollNumber: 'G1-002',
    firstName: 'Diya', middleName: null, lastName: 'Patel', dateOfBirth: '2020-08-22', gender: 'Female', bloodGroup: 'O+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 3, sectionIdx: 1, admissionDate: '2026-03-22', joinedDate: '2026-04-01',
    father: { name: 'Ketan Patel', phone: '+91 98450 22334', email: 'ketan.patel@email.com', occupation: 'Business Owner' },
    mother: { name: 'Anjali Patel', phone: '+91 98450 22335', email: 'anjali.patel@email.com', occupation: 'Teacher' },
    emergency: { name: 'Suresh Patel', phone: '+91 98450 22336' },
    address: { line1: '45, Indiranagar 2nd Stage', city: 'Bengaluru', state: 'Karnataka', postalCode: '560038' },
    hasPrevSchool: false, tags: ['New Admission', 'Transport Required'], docSubmitted: 5, docVerified: 4, allergies: ['Peanuts'],
    createdAt: '2026-02-12T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-003', admissionNumber: 'GIS2026003', rollNumber: 'G6-001',
    firstName: 'Vihaan', middleName: 'Kumar', lastName: 'Reddy', dateOfBirth: '2014-03-10', gender: 'Male', bloodGroup: 'A+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 8, sectionIdx: 0, admissionDate: '2026-03-18', joinedDate: '2026-04-01',
    father: { name: 'Suresh Reddy', phone: '+91 98450 33445', email: 'suresh.reddy@email.com', occupation: 'Architect' },
    mother: { name: 'Lakshmi Reddy', phone: '+91 98450 33446', email: 'lakshmi.reddy@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Gopal Reddy', phone: '+91 98450 33447' },
    address: { line1: '78, Jayanagar 4th Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560011' },
    hasPrevSchool: true, prevSchool: { name: 'Bright Future School', lastClass: 'Grade 5', year: 2026, tc: 'TC2026001', reason: 'Relocation', city: 'Mysuru' },
    tags: ['Transfer Student', 'Sports Quota'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-15T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-004', admissionNumber: 'GIS2026004', rollNumber: 'G9-001',
    firstName: 'Ananya', middleName: null, lastName: 'Iyer', dateOfBirth: '2011-07-18', gender: 'Female', bloodGroup: 'AB+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_WFD, classIdx: 11, sectionIdx: 0, admissionDate: '2026-03-19', joinedDate: '2026-04-01',
    father: { name: 'Krishnan Iyer', phone: '+91 98450 44556', email: 'krishnan.iyer@email.com', occupation: 'Bank Manager' },
    mother: { name: 'Revathi Iyer', phone: '+91 98450 44557', email: 'revathi.iyer@email.com', occupation: 'Chartered Accountant' },
    emergency: { name: 'Raman Iyer', phone: '+91 98450 44558' },
    address: { line1: '22, Whitefield Palm Meadows', city: 'Bengaluru', state: 'Karnataka', postalCode: '560066' },
    hasPrevSchool: true, prevSchool: { name: 'Delhi Public School', lastClass: 'Grade 8', year: 2026, tc: 'TC2026002', reason: 'Better opportunities', city: 'Bengaluru' },
    tags: ['Scholarship', 'Transfer Student'], docSubmitted: 7, docVerified: 6, allergies: ['Dust'],
    createdAt: '2026-01-20T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-005', admissionNumber: 'GIS2026005', rollNumber: 'G12-001',
    firstName: 'Arjun', middleName: null, lastName: 'Nair', dateOfBirth: '2008-11-25', gender: 'Male', bloodGroup: 'O-',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 14, sectionIdx: 0, admissionDate: '2026-03-15', joinedDate: '2026-04-01',
    father: { name: 'Mohan Nair', phone: '+91 98450 55667', email: 'mohan.nair@email.com', occupation: 'Professor' },
    mother: { name: 'Geetha Nair', phone: '+91 98450 55668', email: 'geetha.nair@email.com', occupation: 'Lawyer' },
    emergency: { name: 'Vijay Nair', phone: '+91 98450 55669' },
    address: { line1: '9, Malleshwaram 8th Cross', city: 'Bengaluru', state: 'Karnataka', postalCode: '560003' },
    hasPrevSchool: true, prevSchool: { name: 'National Public School', lastClass: 'Grade 11', year: 2026, tc: 'TC2026003', reason: 'Science stream preference', city: 'Bengaluru' },
    tags: ['Scholarship', 'Sports Quota'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-10T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-006', admissionNumber: 'GIS2026006', rollNumber: 'G3-001',
    firstName: 'Saanvi', middleName: null, lastName: 'Gupta', dateOfBirth: '2017-09-14', gender: 'Female', bloodGroup: 'B+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 5, sectionIdx: 0, admissionDate: '2026-03-21', joinedDate: '2026-04-01',
    father: { name: 'Amit Gupta', phone: '+91 98450 66778', email: 'amit.gupta@email.com', occupation: 'Doctor' },
    mother: { name: 'Neha Gupta', phone: '+91 98450 66779', email: 'neha.gupta@email.com', occupation: 'Software Engineer' },
    emergency: { name: 'Rajesh Gupta', phone: '+91 98450 66780' },
    address: { line1: '56, HSR Layout Sector 2', city: 'Bengaluru', state: 'Karnataka', postalCode: '560102' },
    hasPrevSchool: true, prevSchool: { name: 'Kidzee Preschool', lastClass: 'Grade 2', year: 2026, tc: 'TC2026004', reason: 'Academic upgrade', city: 'Bengaluru' },
    tags: ['New Admission'], docSubmitted: 5, docVerified: 5, allergies: ['Lactose'],
    createdAt: '2026-02-01T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-007', admissionNumber: 'GIS2026007', rollNumber: null,
    firstName: 'Kabir', middleName: null, lastName: 'Singh', dateOfBirth: '2019-04-30', gender: 'Male', bloodGroup: 'A+',
    status: 'Applicant', admissionStatus: 'Assessment Scheduled', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_WFD, classIdx: 1, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Harpreet Singh', phone: '+91 98450 77889', email: 'harpreet.singh@email.com', occupation: 'Business Owner' },
    mother: { name: 'Simran Singh', phone: '+91 98450 77890', email: 'simran.singh@email.com', occupation: 'Marketing Manager' },
    emergency: { name: 'Gurpreet Singh', phone: '+91 98450 77891' },
    address: { line1: '11, Whitefield ITPL Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560066' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 3, docVerified: 2, allergies: [],
    createdAt: '2026-03-01T09:00:00Z', updatedAt: '2026-03-28T10:00:00Z',
  },
  {
    id: 'stu-008', admissionNumber: 'GIS2026008', rollNumber: null,
    firstName: 'Myra', middleName: null, lastName: 'Joshi', dateOfBirth: '2018-12-05', gender: 'Female', bloodGroup: 'O+',
    status: 'Applicant', admissionStatus: 'Documents Pending', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_MAIN, classIdx: 2, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Sandeep Joshi', phone: '+91 98450 88990', email: 'sandeep.joshi@email.com', occupation: 'Consultant' },
    mother: { name: 'Ritu Joshi', phone: '+91 98450 88991', email: 'ritu.joshi@email.com', occupation: 'Designer' },
    emergency: { name: 'Prakash Joshi', phone: '+91 98450 88992' },
    address: { line1: '34, BTM Layout 2nd Stage', city: 'Bengaluru', state: 'Karnataka', postalCode: '560076' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 2, docVerified: 0, allergies: [],
    createdAt: '2026-03-05T09:00:00Z', updatedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'stu-009', admissionNumber: 'GIS2026009', rollNumber: null,
    firstName: 'Reyansh', middleName: null, lastName: 'Verma', dateOfBirth: '2015-06-20', gender: 'Male', bloodGroup: 'B-',
    status: 'Offered', admissionStatus: 'Offer Issued', enrollmentStatus: 'Pending Assignment',
    campus: CAMPUS_MAIN, classIdx: 7, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Deepak Verma', phone: '+91 98450 99001', email: 'deepak.verma@email.com', occupation: 'Engineer' },
    mother: { name: 'Kavita Verma', phone: '+91 98450 99002', email: 'kavita.verma@email.com', occupation: 'Banker' },
    emergency: { name: 'Mukesh Verma', phone: '+91 98450 99003' },
    address: { line1: '67, Electronic City Phase 1', city: 'Bengaluru', state: 'Karnataka', postalCode: '560100' },
    hasPrevSchool: true, prevSchool: { name: 'Global Indian School', lastClass: 'Grade 6', year: 2026, tc: 'TC2026005', reason: 'Closer to home', city: 'Bengaluru' },
    tags: ['Transfer Student'], docSubmitted: 5, docVerified: 5, allergies: [],
    createdAt: '2026-02-20T09:00:00Z', updatedAt: '2026-03-30T10:00:00Z',
  },
  {
    id: 'stu-010', admissionNumber: 'GIS2026010', rollNumber: null,
    firstName: 'Aadhya', middleName: null, lastName: 'Rao', dateOfBirth: '2013-02-14', gender: 'Female', bloodGroup: 'A-',
    status: 'Offered', admissionStatus: 'Offer Issued', enrollmentStatus: 'Pending Assignment',
    campus: CAMPUS_WFD, classIdx: 10, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Ganesh Rao', phone: '+91 98451 00112', email: 'ganesh.rao@email.com', occupation: 'Surgeon' },
    mother: { name: 'Shobha Rao', phone: '+91 98451 00113', email: 'shobha.rao@email.com', occupation: 'Professor' },
    emergency: { name: 'Narayan Rao', phone: '+91 98451 00114' },
    address: { line1: '5, Sadashivanagar', city: 'Bengaluru', state: 'Karnataka', postalCode: '560080' },
    hasPrevSchool: true, prevSchool: { name: 'Sophia High School', lastClass: 'Grade 9', year: 2026, tc: 'TC2026006', reason: 'Curriculum change', city: 'Bengaluru' },
    tags: ['Scholarship', 'Transfer Student'], docSubmitted: 7, docVerified: 6, allergies: ['Penicillin'],
    createdAt: '2026-02-15T09:00:00Z', updatedAt: '2026-03-29T10:00:00Z',
  },
  {
    id: 'stu-011', admissionNumber: 'GIS2026011', rollNumber: 'G4-001',
    firstName: 'Ishaan', middleName: null, lastName: 'Mehta', dateOfBirth: '2016-10-08', gender: 'Male', bloodGroup: 'AB-',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 6, sectionIdx: 0, admissionDate: '2026-03-25', joinedDate: '2026-04-01',
    father: { name: 'Rajesh Mehta', phone: '+91 98451 11223', email: 'rajesh.mehta@email.com', occupation: 'Finance Manager' },
    mother: { name: 'Sunita Mehta', phone: '+91 98451 11224', email: 'sunita.mehta@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Prakash Mehta', phone: '+91 98451 11225' },
    address: { line1: '89, JP Nagar 7th Phase', city: 'Bengaluru', state: 'Karnataka', postalCode: '560078' },
    hasPrevSchool: true, prevSchool: { name: 'Delhi Public School', lastClass: 'Grade 3', year: 2026, tc: 'TC2026007', reason: 'Relocation', city: 'Pune' },
    tags: ['Transfer Student', 'Sibling Discount'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-25T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-012', admissionNumber: 'GIS2026012', rollNumber: 'G7-001',
    firstName: 'Kiara', middleName: null, lastName: 'Bose', dateOfBirth: '2013-05-19', gender: 'Female', bloodGroup: 'O+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 9, sectionIdx: 0, admissionDate: '2026-03-23', joinedDate: '2026-04-01',
    father: { name: 'Subhash Bose', phone: '+91 98451 22334', email: 'subhash.bose@email.com', occupation: 'Government Officer' },
    mother: { name: 'Meera Bose', phone: '+91 98451 22335', email: 'meera.bose@email.com', occupation: 'Journalist' },
    emergency: { name: 'Arun Bose', phone: '+91 98451 22336' },
    address: { line1: '12, Richmond Town', city: 'Bengaluru', state: 'Karnataka', postalCode: '560025' },
    hasPrevSchool: true, prevSchool: { name: 'Bishop Cotton School', lastClass: 'Grade 6', year: 2026, tc: 'TC2026008', reason: 'Academic preference', city: 'Bengaluru' },
    tags: ['Sports Quota'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-18T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-013', admissionNumber: 'GIS2026013', rollNumber: 'G10-001',
    firstName: 'Advait', middleName: null, lastName: 'Deshpande', dateOfBirth: '2010-08-11', gender: 'Male', bloodGroup: 'B+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_WFD, classIdx: 12, sectionIdx: 0, admissionDate: '2026-03-17', joinedDate: '2026-04-01',
    father: { name: 'Nilesh Deshpande', phone: '+91 98451 33445', email: 'nilesh.deshpande@email.com', occupation: 'Pharmacist' },
    mother: { name: 'Snehal Deshpande', phone: '+91 98451 33446', email: 'snehal.deshpande@email.com', occupation: 'Teacher' },
    emergency: { name: 'Vilas Deshpande', phone: '+91 98451 33447' },
    address: { line1: '45, Marathahalli Bridge', city: 'Bengaluru', state: 'Karnataka', postalCode: '560037' },
    hasPrevSchool: true, prevSchool: { name: 'Kendriya Vidyalaya', lastClass: 'Grade 9', year: 2026, tc: 'TC2026009', reason: 'Better coaching', city: 'Bengaluru' },
    tags: ['New Admission', 'Transport Required'], docSubmitted: 7, docVerified: 6, allergies: ['Pollen'],
    createdAt: '2026-01-12T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-014', admissionNumber: 'GIS2026014', rollNumber: 'G2-001',
    firstName: 'Aaradhya', middleName: null, lastName: 'Kulkarni', dateOfBirth: '2018-03-25', gender: 'Female', bloodGroup: 'A+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 4, sectionIdx: 0, admissionDate: '2026-03-24', joinedDate: '2026-04-01',
    father: { name: 'Sachin Kulkarni', phone: '+91 98451 44556', email: 'sachin.kulkarni@email.com', occupation: 'IT Professional' },
    mother: { name: 'Aishwarya Kulkarni', phone: '+91 98451 44557', email: 'aishwarya.kulkarni@email.com', occupation: 'HR Manager' },
    emergency: { name: 'Dilip Kulkarni', phone: '+91 98451 44558' },
    address: { line1: '23, Banashankari 3rd Stage', city: 'Bengaluru', state: 'Karnataka', postalCode: '560085' },
    hasPrevSchool: false, tags: ['New Admission', 'Staff Child'], docSubmitted: 5, docVerified: 5, allergies: [],
    createdAt: '2026-02-05T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-015', admissionNumber: 'GIS2026015', rollNumber: 'G5-001',
    firstName: 'Vivaan', middleName: null, lastName: 'Agarwal', dateOfBirth: '2015-11-30', gender: 'Male', bloodGroup: 'O-',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 7, sectionIdx: 1, admissionDate: '2026-03-26', joinedDate: '2026-04-01',
    father: { name: 'Manish Agarwal', phone: '+91 98451 55667', email: 'manish.agarwal@email.com', occupation: 'Chartered Accountant' },
    mother: { name: 'Pooja Agarwal', phone: '+91 98451 55668', email: 'pooja.agarwal@email.com', occupation: 'Entrepreneur' },
    emergency: { name: 'Rakesh Agarwal', phone: '+91 98451 55669' },
    address: { line1: '78, Hebbal Kempapura', city: 'Bengaluru', state: 'Karnataka', postalCode: '560024' },
    hasPrevSchool: true, prevSchool: { name: 'Ryan International', lastClass: 'Grade 4', year: 2026, tc: 'TC2026010', reason: 'Closer to office', city: 'Bengaluru' },
    tags: ['Transfer Student', 'Sibling Discount'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-28T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-016', admissionNumber: 'GIS2026016', rollNumber: 'G8-001',
    firstName: 'Anika', middleName: null, lastName: 'Menon', dateOfBirth: '2012-07-07', gender: 'Female', bloodGroup: 'B+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_WFD, classIdx: 10, sectionIdx: 1, admissionDate: '2026-03-21', joinedDate: '2026-04-01',
    father: { name: 'Sreekumar Menon', phone: '+91 98451 66778', email: 'sreekumar.menon@email.com', occupation: 'Naval Officer' },
    mother: { name: 'Rema Menon', phone: '+91 98451 66779', email: 'rema.menon@email.com', occupation: 'Doctor' },
    emergency: { name: 'Vijayan Menon', phone: '+91 98451 66780' },
    address: { line1: '34, Kundalahalli Gate', city: 'Bengaluru', state: 'Karnataka', postalCode: '560037' },
    hasPrevSchool: true, prevSchool: { name: 'Naval Public School', lastClass: 'Grade 7', year: 2026, tc: 'TC2026011', reason: 'Transfer posting', city: 'Kochi' },
    tags: ['Transfer Student', 'Hostel'], docSubmitted: 7, docVerified: 6, allergies: ['Seafood'],
    createdAt: '2026-01-22T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-017', admissionNumber: 'GIS2026017', rollNumber: 'G11-001',
    firstName: 'Dhruv', middleName: null, lastName: 'Chowdhury', dateOfBirth: '2009-04-18', gender: 'Male', bloodGroup: 'A+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 13, sectionIdx: 0, admissionDate: '2026-03-19', joinedDate: '2026-04-01',
    father: { name: 'Pradeep Chowdhury', phone: '+91 98451 77889', email: 'pradeep.chowdhury@email.com', occupation: 'Advocate' },
    mother: { name: 'Sushma Chowdhury', phone: '+91 98451 77890', email: 'sushma.chowdhury@email.com', occupation: 'Professor' },
    emergency: { name: 'Dinesh Chowdhury', phone: '+91 98451 77891' },
    address: { line1: '56, Frazer Town', city: 'Bengaluru', state: 'Karnataka', postalCode: '560005' },
    hasPrevSchool: true, prevSchool: { name: 'St. Joseph\'s School', lastClass: 'Grade 10', year: 2026, tc: 'TC2026012', reason: 'Science stream', city: 'Bengaluru' },
    tags: ['Scholarship'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-08T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-018', admissionNumber: 'GIS2026018', rollNumber: 'N-001',
    firstName: 'Sara', middleName: null, lastName: 'Khan', dateOfBirth: '2021-01-12', gender: 'Female', bloodGroup: 'O+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 0, sectionIdx: 0, admissionDate: '2026-03-28', joinedDate: '2026-04-01',
    father: { name: 'Imran Khan', phone: '+91 98451 88990', email: 'imran.khan@email.com', occupation: 'Business Owner' },
    mother: { name: 'Farah Khan', phone: '+91 98451 88991', email: 'farah.khan@email.com', occupation: 'Interior Designer' },
    emergency: { name: 'Salman Khan', phone: '+91 98451 88992' },
    address: { line1: '90, Langford Town', city: 'Bengaluru', state: 'Karnataka', postalCode: '560025' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 5, docVerified: 4, allergies: [],
    createdAt: '2026-02-25T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-019', admissionNumber: 'GIS2026019', rollNumber: null,
    firstName: 'Atharv', middleName: null, lastName: 'Pillai', dateOfBirth: '2016-09-03', gender: 'Male', bloodGroup: 'B+',
    status: 'Inquiry', admissionStatus: 'Inquiry Received', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_MAIN, classIdx: 6, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Vinod Pillai', phone: '+91 98451 99001', email: 'vinod.pillai@email.com', occupation: 'Engineer' },
    mother: { name: 'Latha Pillai', phone: '+91 98451 99002', email: 'latha.pillai@email.com', occupation: 'Nurse' },
    emergency: { name: 'Suresh Pillai', phone: '+91 98451 99003' },
    address: { line1: '15, Yelahanka New Town', city: 'Bengaluru', state: 'Karnataka', postalCode: '560064' },
    hasPrevSchool: false, tags: [], docSubmitted: 0, docVerified: 0, allergies: [],
    createdAt: '2026-03-20T09:00:00Z', updatedAt: '2026-03-20T09:00:00Z',
  },
  {
    id: 'stu-020', admissionNumber: 'GIS2026020', rollNumber: null,
    firstName: 'Navya', middleName: null, lastName: 'Shetty', dateOfBirth: '2014-12-15', gender: 'Female', bloodGroup: 'A+',
    status: 'Applicant', admissionStatus: 'Interview Scheduled', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_WFD, classIdx: 8, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Ganesh Shetty', phone: '+91 98452 00112', email: 'ganesh.shetty@email.com', occupation: 'Restaurant Owner' },
    mother: { name: 'Vidya Shetty', phone: '+91 98452 00113', email: 'vidya.shetty@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Ramesh Shetty', phone: '+91 98452 00114' },
    address: { line1: '44, Bellandur Outer Ring Road', city: 'Bengaluru', state: 'Karnataka', postalCode: '560103' },
    hasPrevSchool: true, prevSchool: { name: 'Brigade School', lastClass: 'Grade 5', year: 2026, tc: null, reason: 'Pending', city: 'Bengaluru' },
    tags: ['New Admission'], docSubmitted: 4, docVerified: 3, allergies: [],
    createdAt: '2026-03-10T09:00:00Z', updatedAt: '2026-03-27T10:00:00Z',
  },
  {
    id: 'stu-021', admissionNumber: 'GIS2026021', rollNumber: 'G6-002',
    firstName: 'Reyansh', middleName: null, lastName: 'Bhat', dateOfBirth: '2014-02-28', gender: 'Male', bloodGroup: 'O+',
    status: 'On Hold', admissionStatus: 'Under Review', enrollmentStatus: 'Hold',
    campus: CAMPUS_MAIN, classIdx: 8, sectionIdx: 1, admissionDate: '2026-03-15', joinedDate: '2026-04-01',
    father: { name: 'Shashidhar Bhat', phone: '+91 98452 11223', email: 'shashidhar.bhat@email.com', occupation: 'Bank Manager' },
    mother: { name: 'Shobha Bhat', phone: '+91 98452 11224', email: 'shobha.bhat@email.com', occupation: 'Teacher' },
    emergency: { name: 'Nagaraj Bhat', phone: '+91 98452 11225' },
    address: { line1: '67, Rajajinagar 1st Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560010' },
    hasPrevSchool: true, prevSchool: { name: 'Sri Chaitanya School', lastClass: 'Grade 5', year: 2026, tc: 'TC2026013', reason: 'Fee dispute', city: 'Bengaluru' },
    tags: ['Transfer Student', 'Special Needs'], docSubmitted: 5, docVerified: 3, allergies: ['Gluten'],
    createdAt: '2026-01-30T09:00:00Z', updatedAt: '2026-03-28T10:00:00Z',
  },
  {
    id: 'stu-022', admissionNumber: 'GIS2026022', rollNumber: 'G9-002',
    firstName: 'Ira', middleName: null, lastName: 'Desai', dateOfBirth: '2011-06-14', gender: 'Female', bloodGroup: 'AB+',
    status: 'Transferred', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Completed',
    campus: CAMPUS_MAIN, classIdx: 11, sectionIdx: 1, admissionDate: '2025-06-15', joinedDate: '2025-06-20',
    father: { name: 'Milind Desai', phone: '+91 98452 22334', email: 'milind.desai@email.com', occupation: 'Architect' },
    mother: { name: 'Supriya Desai', phone: '+91 98452 22335', email: 'supriya.desai@email.com', occupation: 'Doctor' },
    emergency: { name: 'Vasant Desai', phone: '+91 98452 22336' },
    address: { line1: '23, Jayanagar 5th Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560041' },
    hasPrevSchool: true, prevSchool: { name: 'Greenfield Main Campus', lastClass: 'Grade 8', year: 2026, tc: 'TC2026014', reason: 'Family relocation to Mumbai', city: 'Bengaluru' },
    tags: ['Transfer Student'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2025-05-10T09:00:00Z', updatedAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'stu-023', admissionNumber: 'GIS2026023', rollNumber: 'G10-002',
    firstName: 'Kabir', middleName: null, lastName: 'Kapoor', dateOfBirth: '2010-03-22', gender: 'Male', bloodGroup: 'B+',
    status: 'Withdrawn', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Cancelled',
    campus: CAMPUS_WFD, classIdx: 12, sectionIdx: 1, admissionDate: '2025-06-18', joinedDate: '2025-06-22',
    father: { name: 'Rishi Kapoor', phone: '+91 98452 33445', email: 'rishi.kapoor@email.com', occupation: 'Film Producer' },
    mother: { name: 'Neetu Kapoor', phone: '+91 98452 33446', email: 'neetu.kapoor@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Raj Kapoor', phone: '+91 98452 33447' },
    address: { line1: '12, Sadashivanagar', city: 'Bengaluru', state: 'Karnataka', postalCode: '560080' },
    hasPrevSchool: true, prevSchool: { name: 'Greenfield Whitefield', lastClass: 'Grade 9', year: 2026, tc: null, reason: 'Personal reasons', city: 'Bengaluru' },
    tags: [], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2025-05-15T09:00:00Z', updatedAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'stu-024', admissionNumber: 'GIS2026024', rollNumber: null,
    firstName: 'Saanvi', middleName: null, lastName: 'Mishra', dateOfBirth: '2017-08-19', gender: 'Female', bloodGroup: 'A+',
    status: 'Applicant', admissionStatus: 'Application Submitted', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_MAIN, classIdx: 5, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Akhilesh Mishra', phone: '+91 98452 44556', email: 'akhilesh.mishra@email.com', occupation: 'Government Officer' },
    mother: { name: 'Sushma Mishra', phone: '+91 98452 44557', email: 'sushma.mishra@email.com', occupation: 'Teacher' },
    emergency: { name: 'Ramesh Mishra', phone: '+91 98452 44558' },
    address: { line1: '56, Vijayanagar 4th Stage', city: 'Bengaluru', state: 'Karnataka', postalCode: '560040' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 1, docVerified: 0, allergies: [],
    createdAt: '2026-03-15T09:00:00Z', updatedAt: '2026-03-22T10:00:00Z',
  },
  {
    id: 'stu-025', admissionNumber: 'GIS2026025', rollNumber: 'G7-002',
    firstName: 'Vedika', middleName: null, lastName: 'Gowda', dateOfBirth: '2013-11-11', gender: 'Female', bloodGroup: 'O+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 9, sectionIdx: 1, admissionDate: '2026-03-20', joinedDate: '2026-04-01',
    father: { name: 'Channabasava Gowda', phone: '+91 98452 55667', email: 'channabasava.gowda@email.com', occupation: 'Farmer' },
    mother: { name: 'Lakshmi Gowda', phone: '+91 98452 55668', email: 'lakshmi.gowda@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Mahadev Gowda', phone: '+91 98452 55669' },
    address: { line1: '78, Basaveshwaranagar', city: 'Bengaluru', state: 'Karnataka', postalCode: '560079' },
    hasPrevSchool: true, prevSchool: { name: 'Government School', lastClass: 'Grade 6', year: 2026, tc: 'TC2026015', reason: 'Better education', city: 'Bengaluru' },
    tags: ['Scholarship', 'Transport Required'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-14T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-026', admissionNumber: 'GIS2026026', rollNumber: 'G4-002',
    firstName: 'Arnav', middleName: null, lastName: 'Jain', dateOfBirth: '2016-05-27', gender: 'Male', bloodGroup: 'B+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_WFD, classIdx: 6, sectionIdx: 1, admissionDate: '2026-03-22', joinedDate: '2026-04-01',
    father: { name: 'Sanjay Jain', phone: '+91 98452 66778', email: 'sanjay.jain@email.com', occupation: 'Jeweller' },
    mother: { name: 'Rekha Jain', phone: '+91 98452 66779', email: 'rekha.jain@email.com', occupation: 'Boutique Owner' },
    emergency: { name: 'Prakash Jain', phone: '+91 98452 66780' },
    address: { line1: '34, Jayanagar 4th T Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560041' },
    hasPrevSchool: true, prevSchool: { name: 'Mahaveer Public School', lastClass: 'Grade 3', year: 2026, tc: 'TC2026016', reason: 'Better facilities', city: 'Bengaluru' },
    tags: ['Transfer Student', 'Sibling Discount'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2026-01-16T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-027', admissionNumber: 'GIS2026027', rollNumber: null,
    firstName: 'Trisha', middleName: null, lastName: 'Subramanian', dateOfBirth: '2009-10-03', gender: 'Female', bloodGroup: 'A-',
    status: 'Applicant', admissionStatus: 'Under Review', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_MAIN, classIdx: 13, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Balaji Subramanian', phone: '+91 98452 77889', email: 'balaji.subramanian@email.com', occupation: 'IT Consultant' },
    mother: { name: 'Padma Subramanian', phone: '+91 98452 77890', email: 'padma.subramanian@email.com', occupation: 'Software Architect' },
    emergency: { name: 'Srinivasan Subramanian', phone: '+91 98452 77891' },
    address: { line1: '12, CV Raman Nagar', city: 'Bengaluru', state: 'Karnataka', postalCode: '560093' },
    hasPrevSchool: true, prevSchool: { name: 'PSBB Learning Academy', lastClass: 'Grade 10', year: 2026, tc: 'TC2026017', reason: 'Commerce stream', city: 'Bengaluru' },
    tags: ['Transfer Student', 'Scholarship'], docSubmitted: 6, docVerified: 5, allergies: [],
    createdAt: '2026-02-28T09:00:00Z', updatedAt: '2026-03-26T10:00:00Z',
  },
  {
    id: 'stu-028', admissionNumber: 'GIS2026028', rollNumber: 'G11-002',
    firstName: 'Yash', middleName: null, lastName: 'Bhandari', dateOfBirth: '2009-01-15', gender: 'Male', bloodGroup: 'O+',
    status: 'Active', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Active',
    campus: CAMPUS_MAIN, classIdx: 13, sectionIdx: 1, admissionDate: '2026-03-18', joinedDate: '2026-04-01',
    father: { name: 'Mukesh Bhandari', phone: '+91 98452 88990', email: 'mukesh.bhandari@email.com', occupation: 'Trader' },
    mother: { name: 'Kamini Bhandari', phone: '+91 98452 88991', email: 'kamini.bhandari@email.com', occupation: 'Homemaker' },
    emergency: { name: 'Rajesh Bhandari', phone: '+91 98452 88992' },
    address: { line1: '90, Malleshwaram 18th Cross', city: 'Bengaluru', state: 'Karnataka', postalCode: '560003' },
    hasPrevSchool: true, prevSchool: { name: 'Kendriya Vidyalaya', lastClass: 'Grade 10', year: 2026, tc: 'TC2026018', reason: 'Commerce stream', city: 'Bengaluru' },
    tags: ['Sports Quota'], docSubmitted: 7, docVerified: 6, allergies: [],
    createdAt: '2026-01-05T09:00:00Z', updatedAt: '2026-04-01T08:00:00Z',
  },
  {
    id: 'stu-029', admissionNumber: 'GIS2026029', rollNumber: null,
    firstName: 'Saanvi', middleName: null, lastName: 'Kaur', dateOfBirth: '2019-07-22', gender: 'Female', bloodGroup: 'B+',
    status: 'Applicant', admissionStatus: 'Waitlisted', enrollmentStatus: 'Not Enrolled',
    campus: CAMPUS_WFD, classIdx: 0, sectionIdx: 0, admissionDate: null, joinedDate: null,
    father: { name: 'Gurpreet Kaur', phone: '+91 98452 99001', email: 'gurpreet.kaur@email.com', occupation: 'Restaurant Owner' },
    mother: { name: 'Harleen Kaur', phone: '+91 98452 99002', email: 'harleen.kaur@email.com', occupation: 'Beautician' },
    emergency: { name: 'Manpreet Kaur', phone: '+91 98452 99003' },
    address: { line1: '15, Whitefield Palm Springs', city: 'Bengaluru', state: 'Karnataka', postalCode: '560066' },
    hasPrevSchool: false, tags: ['New Admission'], docSubmitted: 3, docVerified: 2, allergies: [],
    createdAt: '2026-03-08T09:00:00Z', updatedAt: '2026-03-24T10:00:00Z',
  },
  {
    id: 'stu-030', admissionNumber: 'GIS2026030', rollNumber: 'G12-002',
    firstName: 'Pranav', middleName: null, lastName: 'Raghavan', dateOfBirth: '2008-05-09', gender: 'Male', bloodGroup: 'A+',
    status: 'Alumni', admissionStatus: 'Offer Accepted', enrollmentStatus: 'Completed',
    campus: CAMPUS_MAIN, classIdx: 14, sectionIdx: 1, admissionDate: '2024-06-15', joinedDate: '2024-06-20',
    father: { name: 'Sridhar Raghavan', phone: '+91 98453 00112', email: 'sridhar.raghavan@email.com', occupation: 'Retired Professor' },
    mother: { name: 'Lakshmi Raghavan', phone: '+91 98453 00113', email: 'lakshmi.raghavan@email.com', occupation: 'Retired Teacher' },
    emergency: { name: 'Venkat Raghavan', phone: '+91 98453 00114' },
    address: { line1: '45, Jayanagar 7th Block', city: 'Bengaluru', state: 'Karnataka', postalCode: '560082' },
    hasPrevSchool: true, prevSchool: { name: 'Greenfield Main Campus', lastClass: 'Grade 12', year: 2025, tc: null, reason: 'Graduation', city: 'Bengaluru' },
    tags: ['Scholarship'], docSubmitted: 7, docVerified: 7, allergies: [],
    createdAt: '2024-05-10T09:00:00Z', updatedAt: '2025-03-31T10:00:00Z',
  },
];

function buildStudentRecord(seed: StudentSeed): StudentRecord {
  const cls = classOptions[seed.classIdx];
  const section = sectionOptions[cls.id][seed.sectionIdx];
  const guardians = makeGuardians(
    seed.id,
    seed.father.name, seed.father.phone, seed.father.email, seed.father.occupation,
    seed.mother.name, seed.mother.phone, seed.mother.email, seed.mother.occupation
  );
  const emergencyContacts = makeEmergencyContacts(seed.id, seed.emergency.name, seed.emergency.phone);
  const documents = makeDocuments(seed.id, seed.hasPrevSchool, seed.docSubmitted, seed.docVerified);
  const healthInfo = makeHealthInfo(seed.bloodGroup, seed.allergies);
  const address = makeAddress(seed.address.line1, seed.address.city, seed.address.state, seed.address.postalCode);
  const previousSchool = seed.hasPrevSchool && seed.prevSchool
    ? makePreviousSchool(seed.prevSchool.name, seed.prevSchool.lastClass, seed.prevSchool.year, seed.prevSchool.tc, seed.prevSchool.reason, seed.prevSchool.city)
    : null;

  const isEnrolled = seed.status === 'Active' || seed.status === 'On Hold' || seed.status === 'Transferred' || seed.status === 'Withdrawn' || seed.status === 'Alumni';

  return {
    id: seed.id,
    admissionNumber: seed.admissionNumber,
    rollNumber: isEnrolled ? seed.rollNumber : null,
    firstName: seed.firstName,
    middleName: seed.middleName,
    lastName: seed.lastName,
    displayName: `${seed.firstName} ${seed.lastName}`,
    dateOfBirth: seed.dateOfBirth,
    gender: seed.gender,
    bloodGroup: seed.bloodGroup,
    photoInitials: `${seed.firstName[0]}${seed.lastName[0]}`,
    status: seed.status,
    admissionStatus: seed.admissionStatus,
    enrollmentStatus: seed.enrollmentStatus,
    academicYearId: AY_CURRENT.id,
    academicYearName: AY_CURRENT.name,
    campusId: seed.campus.id,
    campusName: seed.campus.name,
    classGradeId: isEnrolled ? cls.id : null,
    classGradeName: isEnrolled ? cls.name : null,
    sectionId: isEnrolled ? section.id : null,
    sectionName: isEnrolled ? section.name : null,
    admissionDate: seed.admissionDate,
    joinedDate: seed.joinedDate,
    primaryGuardianId: guardians[0].id,
    guardians,
    emergencyContacts,
    documents,
    healthInfo,
    previousSchool,
    address,
    tags: seed.tags,
    createdAt: seed.createdAt,
    updatedAt: seed.updatedAt,
  };
}

export const students: StudentRecord[] = studentSeeds.map(buildStudentRecord);

const applicationSources: ApplicationSource[] = ['Website', 'Walk-in', 'Referral', 'Social Media', 'Education Fair', 'Transfer'];

export const admissionApplications: AdmissionApplication[] = students
  .filter((s) => s.status === 'Inquiry' || s.status === 'Applicant' || s.status === 'Offered')
  .map((s, idx) => {
    const cls = classOptions.find((c) => c.id === s.classGradeId) ?? classOptions[0];
    const primaryGuardian = s.guardians.find((g) => g.id === s.primaryGuardianId);
    const stageActions: Record<AdmissionStatus, string> = {
      'Not Started': 'Begin application',
      'Inquiry Received': 'Send application form',
      'Application Submitted': 'Collect documents',
      'Documents Pending': 'Follow up on documents',
      'Assessment Scheduled': 'Conduct assessment',
      'Interview Scheduled': 'Conduct interview',
      'Under Review': 'Review application',
      'Offer Issued': 'Await offer response',
      'Offer Accepted': 'Process enrollment',
      'Rejected': 'Send rejection letter',
      'Waitlisted': 'Notify when seat available',
      'Cancelled': 'Archive application',
    };
    return {
      id: `app-${s.id}`,
      studentId: s.id,
      studentName: s.displayName,
      applyingForClassId: cls.id,
      applyingForClassName: cls.name,
      guardianName: primaryGuardian?.name ?? '—',
      source: applicationSources[idx % applicationSources.length],
      submittedDate: s.createdAt,
      currentStage: s.admissionStatus,
      pendingAction: stageActions[s.admissionStatus] ?? 'Review',
      campusId: s.campusId,
      campusName: s.campusName,
      academicYearId: s.academicYearId,
      academicYearName: s.academicYearName,
    };
  });

export const enrollmentRecords: EnrollmentRecord[] = students
  .filter((s) => s.enrollmentStatus !== 'Not Enrolled')
  .map((s) => ({
    id: `enr-${s.id}`,
    studentId: s.id,
    studentName: s.displayName,
    academicYearId: s.academicYearId,
    academicYearName: s.academicYearName,
    campusId: s.campusId,
    campusName: s.campusName,
    classGradeId: s.classGradeId ?? '',
    classGradeName: s.classGradeName ?? '—',
    sectionId: s.sectionId ?? '',
    sectionName: s.sectionName ?? '—',
    status: s.enrollmentStatus,
    assignedDate: s.joinedDate,
    rollNumber: s.rollNumber,
  }));

export const timelineEvents: StudentTimelineEvent[] = [
  {
    id: 'tl-001', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Inquiry Received', timestamp: '2026-02-10T09:00:00Z', actor: 'Priya Sharma',
    description: 'Inquiry received via website for Grade 1 admission', severity: 'info',
  },
  {
    id: 'tl-002', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Application Submitted', timestamp: '2026-02-15T14:30:00Z', actor: 'Rahul Sharma',
    description: 'Application form submitted with initial documents', severity: 'info',
  },
  {
    id: 'tl-003', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Document Verified', timestamp: '2026-03-16T14:00:00Z', actor: 'Priya Sharma',
    description: 'All 5 required documents verified successfully', severity: 'success',
  },
  {
    id: 'tl-004', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Offer Issued', timestamp: '2026-03-18T11:00:00Z', actor: 'Meera Krishnan',
    description: 'Admission offer issued for Grade 1, Section A', severity: 'success',
  },
  {
    id: 'tl-005', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Enrollment Assigned', timestamp: '2026-03-20T10:00:00Z', actor: 'Admissions Office',
    description: 'Enrolled in Grade 1, Section A with roll number G1-001', severity: 'success',
  },
  {
    id: 'tl-006', studentId: 'stu-001', studentName: 'Aarav Sharma',
    eventType: 'Student Activated', timestamp: '2026-04-01T08:00:00Z', actor: 'System',
    description: 'Student record activated for Academic Year 2026-27', severity: 'success',
  },
  {
    id: 'tl-007', studentId: 'stu-003', studentName: 'Vihaan Reddy',
    eventType: 'Transfer Requested', timestamp: '2026-01-10T10:00:00Z', actor: 'Suresh Reddy',
    description: 'Transfer request from Bright Future School, Mysuru', severity: 'warning',
  },
  {
    id: 'tl-008', studentId: 'stu-003', studentName: 'Vihaan Reddy',
    eventType: 'Document Verified', timestamp: '2026-03-15T15:00:00Z', actor: 'Arjun Mehta',
    description: 'Transfer certificate and previous marksheets verified', severity: 'success',
  },
  {
    id: 'tl-009', studentId: 'stu-004', studentName: 'Ananya Iyer',
    eventType: 'Assessment Scheduled', timestamp: '2026-02-05T09:00:00Z', actor: 'Admissions Office',
    description: 'Entrance assessment scheduled for Grade 9 admission', severity: 'info',
  },
  {
    id: 'tl-010', studentId: 'stu-004', studentName: 'Ananya Iyer',
    eventType: 'Offer Issued', timestamp: '2026-03-10T12:00:00Z', actor: 'Meera Krishnan',
    description: 'Offer issued with 50% scholarship for academic excellence', severity: 'success',
  },
  {
    id: 'tl-011', studentId: 'stu-007', studentName: 'Kabir Singh',
    eventType: 'Assessment Scheduled', timestamp: '2026-03-28T10:00:00Z', actor: 'Admissions Office',
    description: 'LKG assessment scheduled for April 5, 2026', severity: 'info',
  },
  {
    id: 'tl-012', studentId: 'stu-008', studentName: 'Myra Joshi',
    eventType: 'Document Uploaded', timestamp: '2026-03-25T16:00:00Z', actor: 'Sandeep Joshi',
    description: '2 of 5 required documents uploaded, 3 still pending', severity: 'warning',
  },
  {
    id: 'tl-013', studentId: 'stu-009', studentName: 'Reyansh Verma',
    eventType: 'Offer Issued', timestamp: '2026-03-30T11:00:00Z', actor: 'Meera Krishnan',
    description: 'Offer issued for Grade 7, pending acceptance from parents', severity: 'success',
  },
  {
    id: 'tl-014', studentId: 'stu-021', studentName: 'Reyansh Bhat',
    eventType: 'Document Verified', timestamp: '2026-03-28T14:00:00Z', actor: 'Arjun Mehta',
    description: '3 of 5 documents verified, 2 pending verification', severity: 'warning',
  },
  {
    id: 'tl-015', studentId: 'stu-022', studentName: 'Ira Desai',
    eventType: 'Transfer Requested', timestamp: '2026-03-15T10:00:00Z', actor: 'Milind Desai',
    description: 'Transfer to Mumbai school due to family relocation', severity: 'warning',
  },
  {
    id: 'tl-016', studentId: 'stu-022', studentName: 'Ira Desai',
    eventType: 'Withdrawal Completed', timestamp: '2026-03-20T16:00:00Z', actor: 'Admissions Office',
    description: 'Transfer certificate issued, enrollment marked as completed', severity: 'critical',
  },
  {
    id: 'tl-017', studentId: 'stu-023', studentName: 'Kabir Kapoor',
    eventType: 'Withdrawal Completed', timestamp: '2026-02-28T15:00:00Z', actor: 'Admissions Office',
    description: 'Withdrawal processed due to personal reasons', severity: 'critical',
  },
  {
    id: 'tl-018', studentId: 'stu-030', studentName: 'Pranav Raghavan',
    eventType: 'Student Activated', timestamp: '2025-03-31T10:00:00Z', actor: 'System',
    description: 'Student graduated and moved to alumni status', severity: 'info',
  },
  {
    id: 'tl-019', studentId: 'stu-019', studentName: 'Atharv Pillai',
    eventType: 'Inquiry Received', timestamp: '2026-03-20T09:00:00Z', actor: 'Walk-in',
    description: 'Walk-in inquiry for Grade 4 admission at Main Campus', severity: 'info',
  },
  {
    id: 'tl-020', studentId: 'stu-020', studentName: 'Navya Shetty',
    eventType: 'Assessment Scheduled', timestamp: '2026-03-27T11:00:00Z', actor: 'Admissions Office',
    description: 'Interview scheduled with parents for Grade 6 admission', severity: 'info',
  },
];
