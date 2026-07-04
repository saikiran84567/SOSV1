import type { Campus } from '@/domains/school-setup/types';

export const campuses: Campus[] = [
  {
    id: 'camp-001',
    name: 'Greenfield Main Campus',
    code: 'GIS-MAIN',
    type: 'main',
    status: 'active',
    address: 'Survey No. 42, Sarjapur Road, Kasavanahalli',
    city: 'Bengaluru',
    phone: '+91 80 4567 8900',
    email: 'main@greenfield.edu.in',
    capacity: 2400,
    currentStudents: 1847,
    principalOrHead: 'Dr. Meera Krishnan',
    establishedYear: 1998,
  },
  {
    id: 'camp-002',
    name: 'Greenfield Whitefield Campus',
    code: 'GIS-WFD',
    type: 'branch',
    status: 'active',
    address: 'Plot No. 15, Whitefield Main Road, Hope Farm',
    city: 'Bengaluru',
    phone: '+91 80 4567 8901',
    email: 'whitefield@greenfield.edu.in',
    capacity: 1200,
    currentStudents: 892,
    principalOrHead: 'Mr. Arvind Deshpande',
    establishedYear: 2015,
  },
];
