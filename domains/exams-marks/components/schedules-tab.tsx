'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Clock, MapPin, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState } from '@/shared/components/empty-state';
import { examSchedules, examSessions } from '@/domains/exams-marks/mock-data/exams-marks';
import { formatExamDate } from '@/domains/exams-marks/services/exams-marks';
import { ExamStatusBadge, AssessmentTypeBadge } from './badges';
import type { AssessmentType, ExamStatus } from '@/domains/exams-marks/types';

const assessmentTypes: AssessmentType[] = [
  'Theory', 'Practical', 'Oral', 'Project', 'Assignment', 'Internal',
];

const examStatuses: ExamStatus[] = [
  'Draft', 'Scheduled', 'Ongoing', 'Marks Entry', 'Review', 'Published', 'Archived',
];

const campusOptions = [
  { id: 'camp-001', name: 'Greenfield Main Campus' },
  { id: 'camp-002', name: 'Greenfield Whitefield Campus' },
];

export function SchedulesTab() {
  const [search, setSearch] = useState('');
  const [sessionFilter, setSessionFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [assessmentFilter, setAssessmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return examSchedules.filter((s) => {
      const matchesSearch =
        search === '' ||
        s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
        s.sessionName.toLowerCase().includes(search.toLowerCase());
      const matchesSession = sessionFilter === 'all' || s.examSessionId === sessionFilter;
      const matchesSubject = subjectFilter === 'all' || s.subjectId === subjectFilter;
      const matchesAssessment = assessmentFilter === 'all' || s.assessmentType === assessmentFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      const session = examSessions.find((es) => es.id === s.examSessionId);
      const matchesCampus = campusFilter === 'all' || session?.campusId === campusFilter;

      return matchesSearch && matchesSession && matchesSubject && matchesAssessment && matchesStatus && matchesCampus;
    });
  }, [search, sessionFilter, subjectFilter, assessmentFilter, statusFilter, campusFilter]);

  const subjects = useMemo(() => {
    const uniqueSubjects = new Map<string, string>();
    examSchedules.forEach((s) => {
      uniqueSubjects.set(s.subjectId, s.subjectName);
    });
    return Array.from(uniqueSubjects.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by subject or session..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={sessionFilter} onValueChange={setSessionFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All sessions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sessions</SelectItem>
              {examSessions.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={assessmentFilter} onValueChange={setAssessmentFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {assessmentTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {examStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
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
          title="No schedules found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">Date</TableHead>
                    <TableHead className="min-w-[180px]">Session</TableHead>
                    <TableHead className="min-w-[120px]">Subject</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[80px]">Type</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[80px]">Time</TableHead>
                    <TableHead className="hidden xl:table-cell min-w-[80px]">Room</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[100px]">Invigilator</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[80px]">Max</TableHead>
                    <TableHead className="min-w-[80px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>
                        <span className="text-sm text-foreground">
                          {formatExamDate(schedule.date)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground truncate max-w-[160px]">
                          {schedule.sessionName}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{schedule.subjectName}</p>
                          <p className="text-xs text-muted-foreground">{schedule.subjectCode}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <AssessmentTypeBadge type={schedule.assessmentType} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {schedule.startTime}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {schedule.room ? (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {schedule.room}
                            </span>
                          ) : '—'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {schedule.invigilator || '—'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm font-medium">{schedule.maxMarks}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          (P: {schedule.passingMarks})
                        </span>
                      </TableCell>
                      <TableCell>
                        <ExamStatusBadge status={schedule.status} />
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
        Showing {filtered.length} of {examSchedules.length} schedules
      </p>
    </div>
  );
}
