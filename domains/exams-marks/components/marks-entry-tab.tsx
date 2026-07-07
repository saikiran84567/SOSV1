'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, RotateCcw, CircleCheck as CheckCircle, Clock, Users } from 'lucide-react';
import { EmptyState } from '@/shared/components/empty-state';
import { useToast } from '@/hooks/use-toast';
import {
  subjectMarkEntries,
  studentMarkRecords,
} from '@/domains/exams-marks/mock-data/exams-marks';
import { calculateMarksEntryProgress, formatExamDate } from '@/domains/exams-marks/services/exams-marks';
import { MarkEntryStatusBadge, AssessmentTypeBadge, GradeBadge } from './badges';
import type { MarkEntryStatus, StudentMarkRecord } from '@/domains/exams-marks/types';

const markEntryStatuses: MarkEntryStatus[] = [
  'Not Started', 'In Progress', 'Submitted', 'Verified', 'Locked',
];

export function MarksEntryTab() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [teacherFilter, setTeacherFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [localMarks, setLocalMarks] = useState<Map<string, { marksObtained: number | null; remarks: string | null }>>(
    new Map(studentMarkRecords.map((r) => [r.id, { marksObtained: r.marksObtained, remarks: r.remarks }]))
  );
  const [localStatus, setLocalStatus] = useState<Map<string, MarkEntryStatus>>(
    new Map(studentMarkRecords.map((r) => [r.id, r.markEntryStatus]))
  );

  const filteredSubjectEntries = useMemo(() => {
    return subjectMarkEntries.filter((e) => {
      const matchesSearch =
        search === '' ||
        e.subjectName.toLowerCase().includes(search.toLowerCase()) ||
        e.teacherName.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = subjectFilter === 'all' || e.subjectId === subjectFilter;
      const matchesTeacher = teacherFilter === 'all' || e.teacherId === teacherFilter;
      const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchesSearch && matchesSubject && matchesTeacher && matchesStatus;
    });
  }, [search, subjectFilter, teacherFilter, statusFilter]);

  const markRecords = useMemo(() => {
    return studentMarkRecords
      .filter((r) => r.examSessionId === 'exam-sess-001')
      .slice(0, 40)
      .map((r) => ({
        ...r,
        marksObtained: localMarks.get(r.id)?.marksObtained ?? r.marksObtained,
        remarks: localMarks.get(r.id)?.remarks ?? r.remarks,
        markEntryStatus: localStatus.get(r.id) ?? r.markEntryStatus,
      }));
  }, [localMarks, localStatus]);

  const subjects = useMemo(() => {
    const unique = new Map<string, string>();
    subjectMarkEntries.forEach((e) => unique.set(e.subjectId, e.subjectName));
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  const teachers = useMemo(() => {
    const unique = new Map<string, string>();
    subjectMarkEntries.forEach((e) => unique.set(e.teacherId, e.teacherName));
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  function handleMarksChange(id: string, value: string) {
    const num = value === '' ? null : parseInt(value, 10);
    setLocalMarks((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { ...newMap.get(id)!, marksObtained: num });
      return newMap;
    });
  }

  function handleRemarksChange(id: string, value: string) {
    setLocalMarks((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { ...newMap.get(id)!, remarks: value || null });
      return newMap;
    });
  }

  function handleMarkSubmitted(id: string) {
    setLocalStatus((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, 'Submitted');
      return newMap;
    });
    toast({
      title: 'Marks submitted',
      description: 'Marks have been submitted for verification.',
    });
  }

  function handleReset() {
    setLocalMarks(new Map(studentMarkRecords.map((r) => [r.id, { marksObtained: r.marksObtained, remarks: r.remarks }])));
    setLocalStatus(new Map(studentMarkRecords.map((r) => [r.id, r.markEntryStatus])));
    toast({
      title: 'Reset complete',
      description: 'All local changes have been discarded.',
    });
  }

  return (
    <div className="space-y-6">
      {/* Subject Mark Entry Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subject Mark Entry Progress</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track marks entry status by subject and teacher
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filteredSubjectEntries.slice(0, 8).map((entry) => {
              const progress = calculateMarksEntryProgress(entry.marksEnteredCount, entry.totalStudents);
              return (
                <div key={entry.id} className="p-4 rounded-lg border bg-muted/30 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{entry.subjectName}</p>
                      <p className="text-xs text-muted-foreground">{entry.classGradeName} - {entry.sectionName}</p>
                    </div>
                    <MarkEntryStatusBadge status={entry.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {entry.marksEnteredCount}/{entry.totalStudents} entered
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          progress >= 100 ? 'bg-success' : progress >= 50 ? 'bg-primary' : 'bg-warning'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>{entry.teacherName}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {formatExamDate(entry.dueDate)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters for Marksheet */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by student name or admission number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
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
          <Select value={teacherFilter} onValueChange={setTeacherFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All teachers</SelectItem>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {markEntryStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Marksheet Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Student</TableHead>
                  <TableHead className="hidden md:table-cell min-w-[80px]">Admission</TableHead>
                  <TableHead className="hidden lg:table-cell min-w-[50px]">Roll</TableHead>
                  <TableHead className="min-w-[100px]">Subject</TableHead>
                  <TableHead className="hidden md:table-cell min-w-[70px]">Type</TableHead>
                  <TableHead className="min-w-[80px]">Marks</TableHead>
                  <TableHead className="hidden lg:table-cell min-w-[60px]">Max</TableHead>
                  <TableHead className="hidden xl:table-cell min-w-[80px]">Remarks</TableHead>
                  <TableHead className="min-w-[90px]">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {markRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center">
                      <p className="text-muted-foreground">No records found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  markRecords.slice(0, 25).map((record) => {
                    const currentMarks = localMarks.get(record.id);
                    const currentStatus = localStatus.get(record.id);
                    const isEditable = currentStatus !== 'Verified' && currentStatus !== 'Locked';
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <p className="text-sm font-medium truncate">{record.studentName}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">{record.admissionNumber}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">{record.rollNumber}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{record.subjectName}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <AssessmentTypeBadge type={record.assessmentType} />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={currentMarks?.marksObtained ?? ''}
                            onChange={(e) => handleMarksChange(record.id, e.target.value)}
                            disabled={!isEditable}
                            className="w-16 h-8"
                            min={0}
                            max={record.maxMarks}
                          />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">{record.maxMarks}</span>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <Input
                            value={currentMarks?.remarks ?? ''}
                            onChange={(e) => handleRemarksChange(record.id, e.target.value)}
                            disabled={!isEditable}
                            placeholder="Add..."
                            className="w-24 h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <MarkEntryStatusBadge status={currentStatus || record.markEntryStatus} />
                        </TableCell>
                        <TableCell>
                          {isEditable && currentStatus !== 'Submitted' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMarkSubmitted(record.id)}
                              disabled={currentMarks?.marksObtained === null}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing marks entry for Unit Test 1 - Grade 10A. Local changes only - not persisted.
      </p>
    </div>
  );
}
