import type { ClassGrade, Section } from '@/domains/school-setup/types';

function makeSection(
  id: string,
  name: string,
  classGradeId: string,
  roomNumber: string,
  capacity: number,
  currentStudents: number,
  classTeacher: string
): Section {
  return { id, name, classGradeId, roomNumber, capacity, currentStudents, classTeacher, status: 'active' };
}

function makeClass(
  id: string,
  name: string,
  level: ClassGrade['level'],
  order: number,
  sections: Section[],
  classTeacher: string | null
): ClassGrade {
  const capacity = sections.reduce((sum, s) => sum + s.capacity, 0);
  const currentStudents = sections.reduce((sum, s) => sum + s.currentStudents, 0);
  return { id, name, level, order, sections, capacity, currentStudents, classTeacher, status: 'active' };
}

export const classGrades: ClassGrade[] = [
  makeClass('cls-nursery', 'Nursery', 'Pre Primary', 1, [
    makeSection('sec-n-a', 'A', 'cls-nursery', 'P-101', 30, 45, 'Priya Sharma'),
    makeSection('sec-n-b', 'B', 'cls-nursery', 'P-102', 30, 44, 'Ananya Reddy'),
  ], 'Priya Sharma'),
  makeClass('cls-lkg', 'LKG', 'Pre Primary', 2, [
    makeSection('sec-lkg-a', 'A', 'cls-lkg', 'P-103', 30, 46, 'Lakshmi Iyer'),
    makeSection('sec-lkg-b', 'B', 'cls-lkg', 'P-104', 30, 45, 'Ananya Reddy'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-ukg', 'UKG', 'Pre Primary', 3, [
    makeSection('sec-ukg-a', 'A', 'cls-ukg', 'P-105', 30, 45, 'Priya Sharma'),
    makeSection('sec-ukg-b', 'B', 'cls-ukg', 'P-106', 30, 44, 'Rebecca Thomas'),
  ], 'Rebecca Thomas'),
  makeClass('cls-1', 'Grade 1', 'Primary', 4, [
    makeSection('sec-1-a', 'A', 'cls-1', 'B-201', 35, 50, 'Rebecca Thomas'),
    makeSection('sec-1-b', 'B', 'cls-1', 'B-202', 35, 49, 'Arjun Mehta'),
    makeSection('sec-1-c', 'C', 'cls-1', 'B-203', 35, 51, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-2', 'Grade 2', 'Primary', 5, [
    makeSection('sec-2-a', 'A', 'cls-2', 'B-204', 35, 50, 'Lakshmi Iyer'),
    makeSection('sec-2-b', 'B', 'cls-2', 'B-205', 35, 51, 'Arjun Mehta'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-3', 'Grade 3', 'Primary', 6, [
    makeSection('sec-3-a', 'A', 'cls-3', 'B-206', 35, 50, 'Rebecca Thomas'),
    makeSection('sec-3-b', 'B', 'cls-3', 'B-207', 35, 49, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-4', 'Grade 4', 'Primary', 7, [
    makeSection('sec-4-a', 'A', 'cls-4', 'B-208', 35, 50, 'Arjun Mehta'),
    makeSection('sec-4-b', 'B', 'cls-4', 'B-209', 35, 48, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
  makeClass('cls-5', 'Grade 5', 'Primary', 8, [
    makeSection('sec-5-a', 'A', 'cls-5', 'B-210', 38, 53, 'Rebecca Thomas'),
    makeSection('sec-5-b', 'B', 'cls-5', 'B-211', 38, 52, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-6', 'Grade 6', 'Middle School', 9, [
    makeSection('sec-6-a', 'A', 'cls-6', 'C-301', 40, 55, 'Arjun Mehta'),
    makeSection('sec-6-b', 'B', 'cls-6', 'C-302', 40, 54, 'Lakshmi Iyer'),
    makeSection('sec-6-c', 'C', 'cls-6', 'C-303', 40, 53, 'Rebecca Thomas'),
  ], 'Arjun Mehta'),
  makeClass('cls-7', 'Grade 7', 'Middle School', 10, [
    makeSection('sec-7-a', 'A', 'cls-7', 'C-304', 40, 55, 'Ananya Reddy'),
    makeSection('sec-7-b', 'B', 'cls-7', 'C-305', 40, 54, 'Arjun Mehta'),
  ], 'Ananya Reddy'),
  makeClass('cls-8', 'Grade 8', 'Middle School', 11, [
    makeSection('sec-8-a', 'A', 'cls-8', 'C-306', 42, 57, 'Rebecca Thomas'),
    makeSection('sec-8-b', 'B', 'cls-8', 'C-307', 42, 56, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-9', 'Grade 9', 'Secondary', 12, [
    makeSection('sec-9-a', 'A', 'cls-9', 'D-401', 42, 57, 'Arjun Mehta'),
    makeSection('sec-9-b', 'B', 'cls-9', 'D-402', 42, 58, 'Ananya Reddy'),
    makeSection('sec-9-c', 'C', 'cls-9', 'D-403', 42, 55, 'Rebecca Thomas'),
  ], 'Arjun Mehta'),
  makeClass('cls-10', 'Grade 10', 'Secondary', 13, [
    makeSection('sec-10-a', 'A', 'cls-10', 'D-404', 45, 60, 'Lakshmi Iyer'),
    makeSection('sec-10-b', 'B', 'cls-10', 'D-405', 45, 61, 'Arjun Mehta'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-11', 'Grade 11', 'Senior Secondary', 14, [
    makeSection('sec-11-a', 'Science', 'cls-11', 'E-501', 50, 63, 'Rebecca Thomas'),
    makeSection('sec-11-b', 'Commerce', 'cls-11', 'E-502', 50, 59, 'Ananya Reddy'),
    makeSection('sec-11-c', 'Humanities', 'cls-11', 'E-503', 45, 55, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-12', 'Grade 12', 'Senior Secondary', 15, [
    makeSection('sec-12-a', 'Science', 'cls-12', 'E-504', 50, 62, 'Arjun Mehta'),
    makeSection('sec-12-b', 'Commerce', 'cls-12', 'E-505', 50, 58, 'Ananya Reddy'),
    makeSection('sec-12-c', 'Humanities', 'cls-12', 'E-506', 45, 53, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
];
