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
    makeSection('sec-n-a', 'A', 'cls-nursery', 'P-101', 25, 23, 'Priya Sharma'),
    makeSection('sec-n-b', 'B', 'cls-nursery', 'P-102', 25, 22, 'Ananya Reddy'),
  ], 'Priya Sharma'),
  makeClass('cls-lkg', 'LKG', 'Pre Primary', 2, [
    makeSection('sec-lkg-a', 'A', 'cls-lkg', 'P-103', 25, 24, 'Lakshmi Iyer'),
    makeSection('sec-lkg-b', 'B', 'cls-lkg', 'P-104', 25, 25, 'Ananya Reddy'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-ukg', 'UKG', 'Pre Primary', 3, [
    makeSection('sec-ukg-a', 'A', 'cls-ukg', 'P-105', 28, 26, 'Priya Sharma'),
    makeSection('sec-ukg-b', 'B', 'cls-ukg', 'P-106', 28, 27, 'Rebecca Thomas'),
  ], 'Rebecca Thomas'),
  makeClass('cls-1', 'Grade 1', 'Primary', 4, [
    makeSection('sec-1-a', 'A', 'cls-1', 'B-201', 30, 28, 'Rebecca Thomas'),
    makeSection('sec-1-b', 'B', 'cls-1', 'B-202', 30, 29, 'Arjun Mehta'),
    makeSection('sec-1-c', 'C', 'cls-1', 'B-203', 30, 27, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-2', 'Grade 2', 'Primary', 5, [
    makeSection('sec-2-a', 'A', 'cls-2', 'B-204', 30, 28, 'Lakshmi Iyer'),
    makeSection('sec-2-b', 'B', 'cls-2', 'B-205', 30, 30, 'Arjun Mehta'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-3', 'Grade 3', 'Primary', 6, [
    makeSection('sec-3-a', 'A', 'cls-3', 'B-206', 32, 30, 'Rebecca Thomas'),
    makeSection('sec-3-b', 'B', 'cls-3', 'B-207', 32, 29, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-4', 'Grade 4', 'Primary', 7, [
    makeSection('sec-4-a', 'A', 'cls-4', 'B-208', 32, 31, 'Arjun Mehta'),
    makeSection('sec-4-b', 'B', 'cls-4', 'B-209', 32, 28, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
  makeClass('cls-5', 'Grade 5', 'Primary', 8, [
    makeSection('sec-5-a', 'A', 'cls-5', 'B-210', 35, 33, 'Rebecca Thomas'),
    makeSection('sec-5-b', 'B', 'cls-5', 'B-211', 35, 34, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-6', 'Grade 6', 'Middle School', 9, [
    makeSection('sec-6-a', 'A', 'cls-6', 'C-301', 36, 34, 'Arjun Mehta'),
    makeSection('sec-6-b', 'B', 'cls-6', 'C-302', 36, 35, 'Lakshmi Iyer'),
    makeSection('sec-6-c', 'C', 'cls-6', 'C-303', 36, 33, 'Rebecca Thomas'),
  ], 'Arjun Mehta'),
  makeClass('cls-7', 'Grade 7', 'Middle School', 10, [
    makeSection('sec-7-a', 'A', 'cls-7', 'C-304', 36, 35, 'Ananya Reddy'),
    makeSection('sec-7-b', 'B', 'cls-7', 'C-305', 36, 34, 'Arjun Mehta'),
  ], 'Ananya Reddy'),
  makeClass('cls-8', 'Grade 8', 'Middle School', 11, [
    makeSection('sec-8-a', 'A', 'cls-8', 'C-306', 40, 38, 'Rebecca Thomas'),
    makeSection('sec-8-b', 'B', 'cls-8', 'C-307', 40, 37, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-9', 'Grade 9', 'Secondary', 12, [
    makeSection('sec-9-a', 'A', 'cls-9', 'D-401', 40, 38, 'Arjun Mehta'),
    makeSection('sec-9-b', 'B', 'cls-9', 'D-402', 40, 39, 'Ananya Reddy'),
    makeSection('sec-9-c', 'C', 'cls-9', 'D-403', 40, 36, 'Rebecca Thomas'),
  ], 'Arjun Mehta'),
  makeClass('cls-10', 'Grade 10', 'Secondary', 13, [
    makeSection('sec-10-a', 'A', 'cls-10', 'D-404', 42, 40, 'Lakshmi Iyer'),
    makeSection('sec-10-b', 'B', 'cls-10', 'D-405', 42, 41, 'Arjun Mehta'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-11', 'Grade 11', 'Senior Secondary', 14, [
    makeSection('sec-11-a', 'Science', 'cls-11', 'E-501', 45, 42, 'Rebecca Thomas'),
    makeSection('sec-11-b', 'Commerce', 'cls-11', 'E-502', 45, 38, 'Ananya Reddy'),
    makeSection('sec-11-c', 'Humanities', 'cls-11', 'E-503', 40, 35, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-12', 'Grade 12', 'Senior Secondary', 15, [
    makeSection('sec-12-a', 'Science', 'cls-12', 'E-504', 45, 43, 'Arjun Mehta'),
    makeSection('sec-12-b', 'Commerce', 'cls-12', 'E-505', 45, 40, 'Ananya Reddy'),
    makeSection('sec-12-c', 'Humanities', 'cls-12', 'E-506', 40, 32, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
];
