'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/shared/components/empty-state';
import { useToast } from '@/hooks/use-toast';
import { enrollmentRecords } from '@/domains/student-lifecycle/mock-data/students';
import { EnrollmentStatusBadge } from './badges';
import { getEnrollmentStatusCounts, formatStudentDate } from '@/domains/student-lifecycle/services/student-lifecycle';
import type { EnrollmentStatus } from '@/domains/student-lifecycle/types';

const enrollmentStatuses: EnrollmentStatus[] = [
  'Pending Assignment', 'Assigned', 'Active', 'Hold', 'Completed', 'Cancelled',
];

export function EnrollmentTab() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const counts = useMemo(() => getEnrollmentStatusCounts(enrollmentRecords), []);

  const filtered = useMemo(() => {
    return enrollmentRecords.filter((e) => statusFilter === 'all' || e.status === statusFilter);
  }, [statusFilter]);

  const pendingAssignment = enrollmentRecords.filter((e) => e.status === 'Pending Assignment');
  const activeEnrolled = enrollmentRecords.filter((e) => e.status === 'Active');

  function handleAction(action: string, studentName: string) {
    toast({
      title: action,
      description: `${studentName} — this action will be enabled in a future update.`,
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enrollmentStatuses.map((status) => (
          <Card key={status}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{status}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {counts[status]}
                </p>
              </div>
              <EnrollmentStatusBadge status={status} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending assignment list */}
      {pendingAssignment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Class Assignment</CardTitle>
            <p className="text-sm text-muted-foreground">
              Students with offers accepted but no class/section assigned yet
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingAssignment.map((enr) => (
              <div
                key={enr.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {enr.studentName.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{enr.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {enr.campusName} · {enr.academicYearName}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('Assign class/section', enr.studentName)}
                >
                  Assign
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Enrollment table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All ({enrollmentRecords.length})
          </Button>
          {enrollmentStatuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status} ({counts[status]})
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No enrollment records"
            description="No enrollment records match the selected filter."
          />
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Academic Year</TableHead>
                      <TableHead className="hidden lg:table-cell">Campus</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead className="hidden md:table-cell">Section</TableHead>
                      <TableHead className="hidden lg:table-cell">Roll No.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Assigned</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((enr) => (
                      <TableRow key={enr.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {enr.studentName.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                              {enr.studentName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {enr.academicYearName}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {enr.campusName}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-foreground">
                            {enr.classGradeName}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {enr.sectionName}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {enr.rollNumber ?? '—'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <EnrollmentStatusBadge status={enr.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {enr.assignedDate ? formatStudentDate(enr.assignedDate) : '—'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => handleAction('Manage enrollment', enr.studentName)}
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
