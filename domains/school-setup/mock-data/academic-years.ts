import type { AcademicYear } from '@/domains/school-setup/types';

export const academicYears: AcademicYear[] = [
  {
    id: 'ay-2026-27',
    name: 'Academic Year 2026-27',
    startDate: '2026-04-01',
    endDate: '2027-03-31',
    status: 'active',
    isCurrent: true,
    totalInstructionalDays: 220,
    terms: [
      {
        id: 'term-001',
        name: 'Term 1 — April to September',
        startDate: '2026-04-01',
        endDate: '2026-09-30',
        status: 'active',
        instructionalDays: 110,
      },
      {
        id: 'term-002',
        name: 'Term 2 — October to March',
        startDate: '2026-10-01',
        endDate: '2027-03-31',
        status: 'upcoming',
        instructionalDays: 110,
      },
    ],
  },
  {
    id: 'ay-2025-26',
    name: 'Academic Year 2025-26',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    status: 'closed',
    isCurrent: false,
    totalInstructionalDays: 218,
    terms: [
      {
        id: 'term-003',
        name: 'Term 1 — April to September',
        startDate: '2025-04-01',
        endDate: '2025-09-30',
        status: 'completed',
        instructionalDays: 109,
      },
      {
        id: 'term-004',
        name: 'Term 2 — October to March',
        startDate: '2025-10-01',
        endDate: '2026-03-31',
        status: 'completed',
        instructionalDays: 109,
      },
    ],
  },
];
