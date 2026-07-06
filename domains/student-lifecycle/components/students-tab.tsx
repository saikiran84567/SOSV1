'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  FileText,
  ArrowRightLeft,
  Archive,
  GraduationCap,
  Filter,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/shared/components/empty-state';
import { useToast } from '@/hooks/use-toast';
import { students } from '@/domains/student-lifecycle/mock-data/students';
import {
  StudentStatusBadge,
  AdmissionStatusBadge,
  EnrollmentStatusBadge,
} from './badges';
import { getPrimaryGuardian, formatStudentDate } from '@/domains/student-lifecycle/services/student-lifecycle';
import type { StudentRecord, StudentStatus, AdmissionStatus, EnrollmentStatus } from '@/domains/student-lifecycle/types';

const studentStatuses: StudentStatus[] = [
  'Inquiry', 'Applicant', 'Offered', 'Enrolled', 'Active', 'On Hold',
  'Transferred', 'Withdrawn', 'Alumni', 'Archived',
];

const admissionStatuses: AdmissionStatus[] = [
  'Not Started', 'Inquiry Received', 'Application Submitted', 'Documents Pending',
  'Assessment Scheduled', 'Interview Scheduled', 'Under Review', 'Offer Issued',
  'Offer Accepted', 'Rejected', 'Waitlisted', 'Cancelled',
];

const enrollmentStatuses: EnrollmentStatus[] = [
  'Not Enrolled', 'Pending Assignment', 'Assigned', 'Active', 'Hold', 'Completed', 'Cancelled',
];

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

const campusOptions = [
  { id: 'camp-001', name: 'Greenfield Main Campus' },
  { id: 'camp-002', name: 'Greenfield Whitefield Campus' },
];

interface StudentsTabProps {
  onSelectStudent: (student: StudentRecord) => void;
}

export function StudentsTab({ onSelectStudent }: StudentsTabProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [admissionFilter, setAdmissionFilter] = useState<string>('all');
  const [enrollmentFilter, setEnrollmentFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const primaryGuardian = getPrimaryGuardian(s);
      const matchesSearch =
        search === '' ||
        s.displayName.toLowerCase().includes(search.toLowerCase()) ||
        s.admissionNumber.toLowerCase().includes(search.toLowerCase()) ||
        (s.rollNumber ?? '').toLowerCase().includes(search.toLowerCase()) ||
        primaryGuardian?.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesClass = classFilter === 'all' || s.classGradeId === classFilter;
      const matchesCampus = campusFilter === 'all' || s.campusId === campusFilter;
      const matchesAdmission = admissionFilter === 'all' || s.admissionStatus === admissionFilter;
      const matchesEnrollment = enrollmentFilter === 'all' || s.enrollmentStatus === enrollmentFilter;
      return matchesSearch && matchesStatus && matchesClass && matchesCampus && matchesAdmission && matchesEnrollment;
    });
  }, [search, statusFilter, classFilter, campusFilter, admissionFilter, enrollmentFilter]);

  function handleAction(action: string, student: StudentRecord) {
    if (action === 'view') {
      onSelectStudent(student);
      return;
    }
    const messages: Record<string, { title: string; description: string }> = {
      edit: {
        title: `Edit record: ${student.displayName}`,
        description: 'Student record editing will be enabled in a future update.',
      },
      enroll: {
        title: `Start enrollment: ${student.displayName}`,
        description: 'Enrollment workflow will be enabled in a future update.',
      },
      documents: {
        title: `Request documents: ${student.displayName}`,
        description: 'Document request notifications will be enabled in a future update.',
      },
      transfer: {
        title: `Transfer student: ${student.displayName}`,
        description: 'Transfer workflow will be enabled in a future update.',
      },
      archive: {
        title: `Archive record: ${student.displayName}`,
        description: 'Record archiving will be enabled in a future update.',
      },
    };
    const msg = messages[action];
    if (msg) {
      toast({ title: msg.title, description: msg.description });
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by student name, admission number, roll number, or guardian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 max-w-md"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {studentStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {classOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={campusFilter} onValueChange={setCampusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All campuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All campuses</SelectItem>
              {campusOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={admissionFilter} onValueChange={setAdmissionFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Admission status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All admission</SelectItem>
              {admissionStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={enrollmentFilter} onValueChange={setEnrollmentFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Enrollment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All enrollment</SelectItem>
              {enrollmentStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try adjusting your search or filters to find the students you're looking for."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="hidden md:table-cell">Admission No.</TableHead>
                    <TableHead className="hidden lg:table-cell">Roll No.</TableHead>
                    <TableHead className="hidden md:table-cell">Class</TableHead>
                    <TableHead className="hidden lg:table-cell">Campus</TableHead>
                    <TableHead className="hidden xl:table-cell">Guardian</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Admission</TableHead>
                    <TableHead className="hidden xl:table-cell">Enrollment</TableHead>
                    <TableHead className="hidden lg:table-cell">Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((student) => {
                    const guardian = getPrimaryGuardian(student);
                    return (
                      <TableRow
                        key={student.id}
                        className="cursor-pointer"
                        onClick={() => onSelectStudent(student)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {student.photoInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {student.displayName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate md:hidden">
                                {student.admissionNumber}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {student.admissionNumber}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {student.rollNumber ?? '—'}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-foreground">
                            {student.classGradeName ?? '—'}
                            {student.sectionName ? ` · ${student.sectionName}` : ''}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {student.campusName}
                          </span>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {guardian?.name ?? '—'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StudentStatusBadge status={student.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <AdmissionStatusBadge status={student.admissionStatus} />
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <EnrollmentStatusBadge status={student.enrollmentStatus} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {formatStudentDate(student.updatedAt)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction('view', student)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction('edit', student)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit record
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction('enroll', student)}>
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Start enrollment
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction('documents', student)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Request documents
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction('transfer', student)}>
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                Transfer student
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAction('archive', student)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Archive className="mr-2 h-4 w-4" />
                                Archive record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {students.length} students
      </p>
    </div>
  );
}
