'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, Check, X, Clock, RotateCcw, Send, CheckCheck } from 'lucide-react';
import { attendanceRegisterRows, attendanceSessions } from '@/domains/attendance/mock-data/attendance';
import type { AttendanceStatus, AttendanceRegisterRow, AttendanceSession } from '@/domains/attendance/types';
import { AttendanceStatusBadge } from './badges';

const statusOptions: AttendanceStatus[] = ['Present', 'Absent', 'Late', 'Half Day', 'Leave', 'Excused'];

const statusColors: Record<AttendanceStatus, string> = {
  Present: 'text-success',
  Absent: 'text-destructive',
  Late: 'text-warning',
  'Half Day': 'text-info',
  Leave: 'text-primary',
  Excused: 'text-muted-foreground',
  'Not Marked': 'text-muted-foreground/50',
};

interface RegisterRowWithStatus extends AttendanceRegisterRow {
  selectedStatus: AttendanceStatus;
  remarks: string;
}

export function MarkAttendanceTab() {
  const { toast } = useToast();
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState<RegisterRowWithStatus[]>(() =>
    attendanceRegisterRows.map((row) => ({
      ...row,
      selectedStatus: row.currentStatus,
      remarks: row.remarks || '',
    }))
  );

  const availableSessions = useMemo(() => {
    return attendanceSessions.filter((s) => s.status === 'Draft' || s.status === 'In Progress');
  }, []);

  const selectedSessionData = useMemo(() => {
    if (!selectedSession) return null;
    return attendanceSessions.find((s) => s.id === selectedSession);
  }, [selectedSession]);

  const filteredRows = useMemo(() => {
    let result = rows;

    if (selectedSessionData) {
      if (selectedSessionData.personType === 'Student') {
        result = result.filter(
          (r) =>
            r.personType === 'Student' &&
            r.classGradeId === selectedSessionData.classGradeId &&
            r.sectionId === selectedSessionData.sectionId
        );
      } else {
        result = result.filter(
          (r) => r.personType === 'Staff' && r.departmentName === selectedSessionData.departmentName
        );
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((r) => r.personName.toLowerCase().includes(query));
    }

    return result;
  }, [rows, selectedSessionData, searchQuery]);

  const statusCounts = useMemo(() => {
    const counts: Record<AttendanceStatus, number> = {
      Present: 0,
      Absent: 0,
      Late: 0,
      'Half Day': 0,
      Leave: 0,
      Excused: 0,
      'Not Marked': 0,
    };
    filteredRows.forEach((row) => {
      counts[row.selectedStatus]++;
    });
    return counts;
  }, [filteredRows]);

  function handleStatusChange(personId: string, status: AttendanceStatus) {
    setRows((prev) =>
      prev.map((row) => (row.personId === personId ? { ...row, selectedStatus: status } : row))
    );
  }

  function handleRemarksChange(personId: string, remarks: string) {
    setRows((prev) =>
      prev.map((row) => (row.personId === personId ? { ...row, remarks } : row))
    );
  }

  function handleMarkAllPresent() {
    setRows((prev) =>
      prev.map((row) => {
        if (filteredRows.some((fr) => fr.personId === row.personId)) {
          return { ...row, selectedStatus: 'Present' as AttendanceStatus };
        }
        return row;
      })
    );
    toast({
      title: 'All marked present',
      description: `${filteredRows.length} records updated.`,
    });
  }

  function handleReset() {
    setRows(
      attendanceRegisterRows.map((row) => ({
        ...row,
        selectedStatus: row.currentStatus,
        remarks: row.remarks || '',
      }))
    );
    toast({
      title: 'Reset complete',
      description: 'All changes have been discarded.',
    });
  }

  function handleSubmit() {
    const unmarkedCount = filteredRows.filter((r) => r.selectedStatus === 'Not Marked').length;
    if (unmarkedCount > 0) {
      toast({
        title: 'Cannot submit',
        description: `${unmarkedCount} records still need to be marked.`,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Attendance submitted',
      description: 'Attendance data has been recorded successfully.',
    });
  }

  return (
    <div className="space-y-6">
      {/* Session Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Attendance Session</CardTitle>
          <p className="text-sm text-muted-foreground">Choose a session to mark attendance</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Select session..." />
              </SelectTrigger>
              <SelectContent>
                {availableSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.sessionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSessionData && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{selectedSessionData.campusName}</span>
                <span>|</span>
                <span>{selectedSessionData.status}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statusOptions.map((status) => (
          <div
            key={status}
            className="rounded-lg border bg-muted/30 p-3 text-center"
          >
            <p className={`text-2xl font-semibold ${statusColors[status]}`}>
              {statusCounts[status]}
            </p>
            <p className="text-xs text-muted-foreground">{status}</p>
          </div>
        ))}
        <div className="rounded-lg border border-warning/20 bg-warning/5 p-3 text-center">
          <p className="text-2xl font-semibold text-warning">{statusCounts['Not Marked']}</p>
          <p className="text-xs text-muted-foreground">Not Marked</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
            <CheckCheck className="h-4 w-4 mr-1.5" />
            Mark All Present
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-1.5" />
            Submit
          </Button>
        </div>
      </div>

      {/* Attendance Register Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name / ID</TableHead>
                  <TableHead>Class / Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <p className="text-muted-foreground">
                        {selectedSession
                          ? 'No records found for this session'
                          : 'Select a session to view records'}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{row.personName}</p>
                          <p className="text-xs text-muted-foreground">
                            {row.personType === 'Student'
                              ? row.admissionNumber
                              : row.employeeCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {row.personType === 'Student' ? (
                          <div>
                            <p className="text-sm">{row.classGradeName} - {row.sectionName}</p>
                            <p className="text-xs text-muted-foreground">Roll: {row.rollNumber}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm">{row.departmentName}</p>
                            <p className="text-xs text-muted-foreground">{row.roleName}</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={row.selectedStatus}
                          onValueChange={(value) =>
                            handleStatusChange(row.personId, value as AttendanceStatus)
                          }
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue>
                              <span className="flex items-center gap-1.5">
                                {row.selectedStatus === 'Present' && (
                                  <Check className="h-3 w-3 text-success" />
                                )}
                                {row.selectedStatus === 'Absent' && (
                                  <X className="h-3 w-3 text-destructive" />
                                )}
                                {row.selectedStatus === 'Late' && (
                                  <Clock className="h-3 w-3 text-warning" />
                                )}
                                <span className="text-xs">{row.selectedStatus}</span>
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                <span className="flex items-center gap-1.5">
                                  {status === 'Present' && (
                                    <Check className="h-3 w-3 text-success" />
                                  )}
                                  {status === 'Absent' && (
                                    <X className="h-3 w-3 text-destructive" />
                                  )}
                                  {status === 'Late' && (
                                    <Clock className="h-3 w-3 text-warning" />
                                  )}
                                  <span>{status}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Add remarks..."
                          value={row.remarks}
                          onChange={(e) => handleRemarksChange(row.personId, e.target.value)}
                          className="w-40 h-8"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {filteredRows.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  Total: <strong>{filteredRows.length}</strong>
                </span>
                <span className="text-success">
                  Present: <strong>{statusCounts.Present}</strong>
                </span>
                <span className="text-destructive">
                  Absent: <strong>{statusCounts.Absent}</strong>
                </span>
                <span className="text-warning">
                  Late: <strong>{statusCounts.Late}</strong>
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Attendance:{' '}
                <strong className="text-foreground">
                  {Math.round(
                    ((statusCounts.Present + statusCounts.Late) / filteredRows.length) * 100
                  )}
                  %
                </strong>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
