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
    makeSection('sec-n-a', 'A', 'cls-nursery', 'P-101', 35, 32, 'Priya Sharma'),
    makeSection('sec-n-b', 'B', 'cls-nursery', 'P-102', 35, 29, 'Ananya Reddy'),
    makeSection('sec-n-c', 'C', 'cls-nursery', 'P-103', 35, 28, 'Lakshmi Iyer'),
  ], 'Priya Sharma'),
  makeClass('cls-lkg', 'LKG', 'Pre Primary', 2, [
    makeSection('sec-lkg-a', 'A', 'cls-lkg', 'P-104', 35, 31, 'Lakshmi Iyer'),
    makeSection('sec-lkg-b', 'B', 'cls-lkg', 'P-105', 35, 30, 'Ananya Reddy'),
    makeSection('sec-lkg-c', 'C', 'cls-lkg', 'P-106', 35, 29, 'Rebecca Thomas'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-ukg', 'UKG', 'Pre Primary', 3, [
    makeSection('sec-ukg-a', 'A', 'cls-ukg', 'P-107', 35, 32, 'Priya Sharma'),
    makeSection('sec-ukg-b', 'B', 'cls-ukg', 'P-108', 35, 29, 'Rebecca Thomas'),
    makeSection('sec-ukg-c', 'C', 'cls-ukg', 'P-109', 35, 28, 'Ananya Reddy'),
  ], 'Rebecca Thomas'),
  makeClass('cls-1', 'Grade 1', 'Primary', 4, [
    makeSection('sec-1-a', 'A', 'cls-1', 'B-201', 45, 38, 'Rebecca Thomas'),
    makeSection('sec-1-b', 'B', 'cls-1', 'B-202', 45, 37, 'Arjun Mehta'),
    makeSection('sec-1-c', 'C', 'cls-1', 'B-203', 45, 39, 'Ananya Reddy'),
    makeSection('sec-1-d', 'D', 'cls-1', 'B-204', 45, 36, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-2', 'Grade 2', 'Primary', 5, [
    makeSection('sec-2-a', 'A', 'cls-2', 'B-205', 45, 38, 'Lakshmi Iyer'),
    makeSection('sec-2-b', 'B', 'cls-2', 'B-206', 45, 39, 'Arjun Mehta'),
    makeSection('sec-2-c', 'C', 'cls-2', 'B-207', 45, 37, 'Rebecca Thomas'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-3', 'Grade 3', 'Primary', 6, [
    makeSection('sec-3-a', 'A', 'cls-3', 'B-208', 45, 40, 'Rebecca Thomas'),
    makeSection('sec-3-b', 'B', 'cls-3', 'B-209', 45, 37, 'Ananya Reddy'),
    makeSection('sec-3-c', 'C', 'cls-3', 'B-210', 45, 36, 'Arjun Mehta'),
  ], 'Rebecca Thomas'),
  makeClass('cls-4', 'Grade 4', 'Primary', 7, [
    makeSection('sec-4-a', 'A', 'cls-4', 'B-211', 45, 38, 'Arjun Mehta'),
    makeSection('sec-4-b', 'B', 'cls-4', 'B-212', 45, 36, 'Lakshmi Iyer'),
    makeSection('sec-4-c', 'C', 'cls-4', 'B-213', 45, 37, 'Ananya Reddy'),
  ], 'Arjun Mehta'),
  makeClass('cls-5', 'Grade 5', 'Primary', 8, [
    makeSection('sec-5-a', 'A', 'cls-5', 'B-214', 48, 41, 'Rebecca Thomas'),
    makeSection('sec-5-b', 'B', 'cls-5', 'B-215', 48, 40, 'Ananya Reddy'),
    makeSection('sec-5-c', 'C', 'cls-5', 'B-216', 48, 39, 'Arjun Mehta'),
  ], 'Rebecca Thomas'),
  makeClass('cls-6', 'Grade 6', 'Middle School', 9, [
    makeSection('sec-6-a', 'A', 'cls-6', 'C-301', 50, 43, 'Arjun Mehta'),
    makeSection('sec-6-b', 'B', 'cls-6', 'C-302', 50, 42, 'Lakshmi Iyer'),
    makeSection('sec-6-c', 'C', 'cls-6', 'C-303', 50, 41, 'Rebecca Thomas'),
    makeSection('sec-6-d', 'D', 'cls-6', 'C-304', 50, 40, 'Ananya Reddy'),
  ], 'Arjun Mehta'),
  makeClass('cls-7', 'Grade 7', 'Middle School', 10, [
    makeSection('sec-7-a', 'A', 'cls-7', 'C-305', 50, 43, 'Ananya Reddy'),
    makeSection('sec-7-b', 'B', 'cls-7', 'C-306', 50, 42, 'Arjun Mehta'),
    makeSection('sec-7-c', 'C', 'cls-7', 'C-307', 50, 41, 'Rebecca Thomas'),
  ], 'Ananya Reddy'),
  makeClass('cls-8', 'Grade 8', 'Middle School', 11, [
    makeSection('sec-8-a', 'A', 'cls-8', 'C-308', 52, 45, 'Rebecca Thomas'),
    makeSection('sec-8-b', 'B', 'cls-8', 'C-309', 52, 44, 'Lakshmi Iyer'),
    makeSection('sec-8-c', 'C', 'cls-8', 'C-310', 52, 43, 'Arjun Mehta'),
  ], 'Rebecca Thomas'),
  makeClass('cls-9', 'Grade 9', 'Secondary', 12, [
    makeSection('sec-9-a', 'A', 'cls-9', 'D-401', 52, 45, 'Arjun Mehta'),
    makeSection('sec-9-b', 'B', 'cls-9', 'D-402', 52, 46, 'Ananya Reddy'),
    makeSection('sec-9-c', 'C', 'cls-9', 'D-403', 52, 43, 'Rebecca Thomas'),
    makeSection('sec-9-d', 'D', 'cls-9', 'D-404', 52, 42, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
  makeClass('cls-10', 'Grade 10', 'Secondary', 13, [
    makeSection('sec-10-a', 'A', 'cls-10', 'D-405', 52, 43, 'Lakshmi Iyer'),
    makeSection('sec-10-b', 'B', 'cls-10', 'D-406', 52, 44, 'Arjun Mehta'),
    makeSection('sec-10-c', 'C', 'cls-10', 'D-407', 52, 42, 'Rebecca Thomas'),
  ], 'Lakshmi Iyer'),
  makeClass('cls-11', 'Grade 11', 'Senior Secondary', 14, [
    makeSection('sec-11-a', 'Science', 'cls-11', 'E-501', 50, 45, 'Rebecca Thomas'),
    makeSection('sec-11-b', 'Commerce', 'cls-11', 'E-502', 50, 41, 'Ananya Reddy'),
    makeSection('sec-11-c', 'Humanities', 'cls-11', 'E-503', 45, 37, 'Lakshmi Iyer'),
  ], 'Rebecca Thomas'),
  makeClass('cls-12', 'Grade 12', 'Senior Secondary', 15, [
    makeSection('sec-12-a', 'Science', 'cls-12', 'E-504', 50, 44, 'Arjun Mehta'),
    makeSection('sec-12-b', 'Commerce', 'cls-12', 'E-505', 50, 40, 'Ananya Reddy'),
    makeSection('sec-12-c', 'Humanities', 'cls-12', 'E-506', 45, 35, 'Lakshmi Iyer'),
  ], 'Arjun Mehta'),
];
