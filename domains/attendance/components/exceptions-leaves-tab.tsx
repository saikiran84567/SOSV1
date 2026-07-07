'use client';

import { useState, useMemo } from 'react';
import { Search, CircleCheck as CheckCircle, Circle as XCircle, Clock, FileWarning, CalendarDays, Filter, CircleAlert as AlertCircle, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  attendanceExceptions,
  attendanceLeaveRequests,
} from '@/domains/attendance/mock-data/attendance';
import { ExceptionStatusBadge, LeaveStatusBadge } from './badges';
import { formatAttendanceDate, getPendingLeaveRequests, getOpen_exceptions } from '@/domains/attendance/services/attendance';
import type { AttendanceException, AttendanceLeaveRequest, AttendanceExceptionType } from '@/domains/attendance/types';

const exceptionTypes: AttendanceExceptionType[] = [
  'Late Arrival', 'Early Departure', 'Missing Check-in', 'Missing Check-out',
  'Attendance Correction', 'Medical Exception', 'Transport Delay', 'Other',
];

const exceptionStatuses = ['Open', 'In Progress', 'Resolved', 'Dismissed'] as const;
const leaveStatuses = ['Pending', 'Approved', 'Rejected', 'Cancelled'] as const;
const personTypes = ['Student', 'Staff'] as const;

export function ExceptionsLeavesTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'exceptions' | 'leaves'>('exceptions');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [personFilter, setPersonFilter] = useState<string>('all');

  const pendingLeaves = getPendingLeaveRequests(attendanceLeaveRequests);
  const openExceptions = getOpen_exceptions(attendanceExceptions);

  const filteredExceptions = useMemo(() => {
    return attendanceExceptions.filter((e) => {
      const matchesSearch =
        search === '' ||
        e.personName.toLowerCase().includes(search.toLowerCase()) ||
        e.reason.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
      const matchesType = typeFilter === 'all' || e.type === typeFilter;
      const matchesPerson = personFilter === 'all' || e.personType === personFilter;
      return matchesSearch && matchesStatus && matchesType && matchesPerson;
    });
  }, [search, statusFilter, typeFilter, personFilter]);

  const filteredLeaves = useMemo(() => {
    return attendanceLeaveRequests.filter((l) => {
      const matchesSearch =
        search === '' ||
        l.personName.toLowerCase().includes(search.toLowerCase()) ||
        l.reason.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      const matchesPerson = personFilter === 'all' || l.personType === personFilter;
      return matchesSearch && matchesStatus && matchesPerson;
    });
  }, [search, statusFilter, personFilter]);

  function handleExceptionAction(action: string, exception: AttendanceException) {
    const messages: Record<string, { title: string; description: string }> = {
      resolve: {
        title: `Resolve exception: ${exception.personName}`,
        description: 'Exception resolution will be enabled in a future update.',
      },
      dismiss: {
        title: `Dismiss exception: ${exception.personName}`,
        description: 'Exception dismissal will be enabled in a future update.',
      },
    };
    const msg = messages[action];
    if (msg) {
      toast({ title: msg.title, description: msg.description });
    }
  }

  function handleLeaveAction(action: string, leave: AttendanceLeaveRequest) {
    const messages: Record<string, { title: string; description: string }> = {
      approve: {
        title: `Approve leave: ${leave.personName}`,
        description: 'Leave approval will be enabled in a future update.',
      },
      reject: {
        title: `Reject leave: ${leave.personName}`,
        description: 'Leave rejection will be enabled in a future update.',
      },
    };
    const msg = messages[action];
    if (msg) {
      toast({ title: msg.title, description: msg.description });
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2.5">
                <FileWarning className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{openExceptions.length}</p>
                <p className="text-xs text-muted-foreground">Open Exceptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{pendingLeaves.length}</p>
                <p className="text-xs text-muted-foreground">Pending Leaves</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2.5">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {attendanceExceptions.filter((e) => e.status === 'Resolved').length}
                </p>
                <p className="text-xs text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2.5">
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {attendanceLeaveRequests.filter((l) => l.status === 'Rejected').length}
                </p>
                <p className="text-xs text-muted-foreground">Rejected Leaves</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'exceptions' | 'leaves')}>
        <TabsList>
          <TabsTrigger value="exceptions" className="gap-2">
            <FileWarning className="h-4 w-4" />
            Exceptions
            {openExceptions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {openExceptions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="leaves" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Leave Requests
            {pendingLeaves.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pendingLeaves.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exceptions" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by person name or reason..."
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
                  {exceptionStatuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {exceptionTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={personFilter} onValueChange={setPersonFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All persons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All persons</SelectItem>
                  {personTypes.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Exceptions List */}
          <div className="space-y-3">
            {filteredExceptions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">No exceptions found</p>
                </CardContent>
              </Card>
            ) : (
              filteredExceptions.map((exception) => (
                <Card key={exception.id}>
                  <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{exception.personName}</p>
                          <Badge variant="outline" className="text-xs">
                            {exception.personType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {exception.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{exception.reason}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatAttendanceDate(exception.date)}</span>
                          <span>|</span>
                          <span>Reported by: {exception.reportedBy}</span>
                          {exception.resolvedBy && (
                            <>
                              <span>|</span>
                              <span className="text-success">Resolved by: {exception.resolvedBy}</span>
                            </>
                          )}
                        </div>
                        {exception.notes && (
                          <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1 inline-block">
                            {exception.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                        <ExceptionStatusBadge status={exception.status} />
                        {(exception.status === 'Open' || exception.status === 'In Progress') && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleExceptionAction('resolve', exception)}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleExceptionAction('dismiss', exception)}
                            >
                              Dismiss
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="leaves" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by person name or reason..."
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
                  {leaveStatuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={personFilter} onValueChange={setPersonFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All persons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All persons</SelectItem>
                  {personTypes.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Leaves List */}
          <div className="space-y-3">
            {filteredLeaves.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">No leave requests found</p>
                </CardContent>
              </Card>
            ) : (
              filteredLeaves.map((leave) => (
                <Card key={leave.id}>
                  <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{leave.personName}</p>
                          <Badge variant="outline" className="text-xs">
                            {leave.personType}
                          </Badge>
                          {leave.attachmentRequired && (
                            <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{leave.reason}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>
                            {formatAttendanceDate(leave.fromDate)}
                            {leave.toDate !== leave.fromDate && (
                              <> - {formatAttendanceDate(leave.toDate)}</>
                            )}
                          </span>
                          <span>|</span>
                          <span>Requested by: {leave.requestedBy}</span>
                        </div>
                        {leave.notes && (
                          <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1 inline-block">
                            {leave.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                        <LeaveStatusBadge status={leave.status} />
                        {leave.status === 'Pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleLeaveAction('approve', leave)}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleLeaveAction('reject', leave)}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
