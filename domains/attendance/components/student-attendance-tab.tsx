'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, MoveHorizontal as MoreHorizontal, Phone, Calendar, Filter } from 'lucide-react';
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
import { studentAttendanceRecords, CURRENT_DATE } from '@/domains/attendance/mock-data/attendance';
import { AttendanceStatusBadge } from './badges';
import { formatAttendanceDate, formatAttendanceTime, calculateAttendancePercentage } from '@/domains/attendance/services/attendance';
import type { StudentAttendanceRecord, AttendanceStatus } from '@/domains/attendance/types';

const statusOptions: AttendanceStatus[] = [
  'Present', 'Absent', 'Late', 'Half Day', 'Leave', 'Excused', 'Not Marked',
];

const classOptions = [
  { id: 'cls-5', name: 'Grade 5' },
  { id: 'cls-6', name: 'Grade 6' },
  { id: 'cls-7', name: 'Grade 7' },
  { id: 'cls-8', name: 'Grade 8' },
  { id: 'cls-9', name: 'Grade 9' },
  { id: 'cls-10', name: 'Grade 10' },
];

const sectionOptions = [
  { id: 'sec-5-a', name: 'A' },
  { id: 'sec-6-a', name: 'A' },
  { id: 'sec-7-a', name: 'A' },
  { id: 'sec-8-a', name: 'A' },
  { id: 'sec-9-a', name: 'A' },
  { id: 'sec-10-a', name: 'A' },
  { id: 'sec-10-b', name: 'B' },
];

const campusOptions = [
  { id: 'camp-001', name: 'Greenfield Main Campus' },
  { id: 'camp-002', name: 'Greenfield Whitefield Campus' },
];

interface StudentAttendanceTabProps {
  onViewDetails?: (record: StudentAttendanceRecord) => void;
}

export function StudentAttendanceTab({ onViewDetails }: StudentAttendanceTabProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return studentAttendanceRecords.filter((r) => {
      const matchesSearch =
        search === '' ||
        r.personName.toLowerCase().includes(search.toLowerCase()) ||
        r.admissionNumber.toLowerCase().includes(search.toLowerCase()) ||
        (r.rollNumber ?? '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      const matchesClass = classFilter === 'all' || r.classGradeId === classFilter;
      const matchesSection = sectionFilter === 'all' || r.sectionId === sectionFilter;
      const matchesCampus = campusFilter === 'all' || r.campusId === campusFilter;
      return matchesSearch && matchesStatus && matchesClass && matchesSection && matchesCampus;
    });
  }, [search, statusFilter, classFilter, sectionFilter, campusFilter]);

  const stats = useMemo(() => {
    const present = filtered.filter((r) => r.status === 'Present' || r.status === 'Late').length;
    return {
      total: filtered.length,
      present,
      percentage: calculateAttendancePercentage(present, filtered.length),
    };
  }, [filtered]);

  function handleAction(action: string, record: StudentAttendanceRecord) {
    if (action === 'view' && onViewDetails) {
      onViewDetails(record);
      return;
    }
    const messages: Record<string, { title: string; description: string }> = {
      contact: {
        title: `Contact guardian of ${record.personName}`,
        description: 'Guardian notification feature will be enabled in a future update.',
      },
      history: {
        title: `View attendance history: ${record.personName}`,
        description: 'Historical attendance view will be enabled in a future update.',
      },
    };
    const msg = messages[action];
    if (msg) {
      toast({ title: msg.title, description: msg.description });
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatAttendanceDate(CURRENT_DATE)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Attendance: <strong className="text-foreground">{stats.percentage}%</strong> ({stats.present}/{stats.total} present)
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by student name, admission number, or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {classOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="All sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sections</SelectItem>
              {sectionOptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={campusFilter} onValueChange={setCampusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All campuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All campuses</SelectItem>
              {campusOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description="Try adjusting your search or filters to find the records you're looking for."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Student</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[100px]">Admission No.</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[80px]">Roll No.</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[120px]">Class</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[70px]">Status</TableHead>
                    <TableHead className="hidden xl:table-cell min-w-[80px]">Check-in</TableHead>
                    <TableHead className="hidden xl:table-cell min-w-[80px]">Check-out</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[100px]">Marked By</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((record) => (
                    <TableRow
                      key={record.id}
                      className="cursor-pointer"
                      onClick={() => onViewDetails?.(record)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {record.personName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {record.personName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate md:hidden">
                              {record.admissionNumber}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {record.admissionNumber}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {record.rollNumber ?? '—'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-foreground">
                          {record.classGradeName} · {record.sectionName}
                        </span>
                      </TableCell>
                      <TableCell>
                        <AttendanceStatusBadge status={record.status} />
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {formatAttendanceTime(record.checkInTime)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {formatAttendanceTime(record.checkOutTime)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {record.markedByName}
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
                            <DropdownMenuItem onClick={() => handleAction('view', record)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('contact', record)}>
                              <Phone className="mr-2 h-4 w-4" />
                              Contact guardian
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('history', record)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              View history
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {studentAttendanceRecords.length} student attendance records
      </p>
    </div>
  );
}
