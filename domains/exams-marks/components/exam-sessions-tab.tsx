'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Eye,
  Pencil,
  Calendar,
  Archive,
  MoveHorizontal as MoreHorizontal,
  Filter,
  ClipboardList,
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
import { examSessions } from '@/domains/exams-marks/mock-data/exams-marks';
import { formatExamDate, getExamSessionsByStatus } from '@/domains/exams-marks/services/exams-marks';
import { ExamStatusBadge, ResultStatusBadge, ExamTypeBadge, GradingScaleBadge } from './badges';
import type { ExamSession, ExamStatus, ExamType, ResultStatus } from '@/domains/exams-marks/types';

const examTypes: ExamType[] = [
  'Unit Test', 'Weekly Test', 'Monthly Test', 'Mid Term', 'Term End',
  'Final Exam', 'Practical Exam', 'Oral Assessment', 'Internal Assessment',
];

const examStatuses: ExamStatus[] = [
  'Draft', 'Scheduled', 'Ongoing', 'Marks Entry', 'Review', 'Published', 'Archived',
];

const resultStatuses: ResultStatus[] = [
  'Not Ready', 'Processing', 'Ready for Review', 'Published', 'Archived',
];

const campusOptions = [
  { id: 'camp-001', name: 'Greenfield Main Campus' },
  { id: 'camp-002', name: 'Greenfield Whitefield Campus' },
];

const classOptions = [
  { id: 'cls-10', name: 'Grade 10' },
  { id: 'cls-9', name: 'Grade 9' },
  { id: 'cls-8', name: 'Grade 8' },
  { id: 'cls-7', name: 'Grade 7' },
  { id: 'cls-6', name: 'Grade 6' },
  { id: 'cls-5', name: 'Grade 5' },
];

interface ExamSessionsTabProps {
  onViewSession: (session: ExamSession) => void;
}

export function ExamSessionsTab({ onViewSession }: ExamSessionsTabProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [resultStatusFilter, setResultStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return examSessions.filter((s) => {
      const matchesSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase());
      const matchesExamType = examTypeFilter === 'all' || s.examType === examTypeFilter;
      const matchesCampus = campusFilter === 'all' || s.campusId === campusFilter;
      const matchesClass = classFilter === 'all' || s.classGradeId === classFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesResultStatus = resultStatusFilter === 'all' || s.resultStatus === resultStatusFilter;
      return matchesSearch && matchesExamType && matchesCampus && matchesClass && matchesStatus && matchesResultStatus;
    });
  }, [search, examTypeFilter, campusFilter, classFilter, statusFilter, resultStatusFilter]);

  function handleAction(action: string, session: ExamSession) {
    if (action === 'view') {
      onViewSession(session);
      return;
    }
    const messages: Record<string, { title: string; description: string }> = {
      edit: {
        title: `Edit session: ${session.name}`,
        description: 'Session editing will be enabled in a future update.',
      },
      schedule: {
        title: `Open schedule: ${session.name}`,
        description: 'Schedule management will be enabled in a future update.',
      },
      marks: {
        title: `Open marks entry: ${session.name}`,
        description: 'Marks entry workflow will be enabled in a future update.',
      },
      archive: {
        title: `Archive session: ${session.name}`,
        description: 'Session archiving will be enabled in a future update.',
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
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by session name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {examTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {examStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={resultStatusFilter} onValueChange={setResultStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All results" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All results</SelectItem>
              {resultStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No exam sessions found"
          description="Try adjusting your search or filters to find the sessions you're looking for."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[1000px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Session Name</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[100px]">Type</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[120px]">Term</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[120px]">Class</TableHead>
                    <TableHead className="hidden xl:table-cell min-w-[100px]">Grading</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[100px]">Progress</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[110px]">Result</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((session) => (
                    <TableRow
                      key={session.id}
                      className="cursor-pointer"
                      onClick={() => onViewSession(session)}
                    >
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-foreground truncate">
                            {session.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatExamDate(session.startDate)} - {formatExamDate(session.endDate)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <ExamTypeBadge type={session.examType} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{session.termName}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-foreground">
                          {session.classGradeName} - {session.sectionName}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <GradingScaleBadge type={session.gradingScaleType} />
                      </TableCell>
                      <TableCell>
                        <ExamStatusBadge status={session.status} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${session.marksEntryProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{session.marksEntryProgress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <ResultStatusBadge status={session.resultStatus} />
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
                            <DropdownMenuItem onClick={() => handleAction('view', session)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View session
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('edit', session)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit session
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('schedule', session)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Open schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('marks', session)}>
                              <ClipboardList className="mr-2 h-4 w-4" />
                              Open marks entry
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAction('archive', session)}>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive session
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
        Showing {filtered.length} of {examSessions.length} exam sessions
      </p>
    </div>
  );
}
