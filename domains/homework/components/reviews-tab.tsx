'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Clock, FileCheck, RefreshCw, UserCheck } from 'lucide-react';
import { ReviewStatusBadge } from './badges';
import { formatHomeworkDateTime } from '../services/homework';
import type { HomeworkSubmission, HomeworkReview, HomeworkTask } from '../types';

interface ReviewsTabProps {
  submissions: HomeworkSubmission[];
  reviews: HomeworkReview[];
  tasks: HomeworkTask[];
}

export function ReviewsTab({ submissions, reviews, tasks }: ReviewsTabProps) {
  const tasksMap = useMemo(() => {
    return new Map(tasks.map((t) => [t.id, t]));
  }, [tasks]);

  const pendingReviews = useMemo(() => {
    return submissions.filter(
      (s) => s.status === 'Submitted' && s.reviewStatus === 'Not Reviewed'
    );
  }, [submissions]);

  const reviewedSubmissions = useMemo(() => {
    return submissions.filter((s) => s.reviewStatus === 'Reviewed');
  }, [submissions]);

  const reworkRequired = useMemo(() => {
    return submissions.filter((s) => s.reviewStatus === 'Rework Required');
  }, [submissions]);

  const teacherStats = useMemo(() => {
    const stats = new Map<string, { name: string; pending: number; reviewed: number; total: number }>();
    submissions.forEach((sub) => {
      const task = tasksMap.get(sub.taskId);
      if (!task) return;
      const existing = stats.get(task.teacherId) || {
        name: task.teacherName,
        pending: 0,
        reviewed: 0,
        total: 0,
      };
      existing.total++;
      if (sub.reviewStatus === 'Not Reviewed' && sub.status === 'Submitted') {
        existing.pending++;
      }
      if (sub.reviewStatus === 'Reviewed') {
        existing.reviewed++;
      }
      stats.set(task.teacherId, existing);
    });
    return Array.from(stats.values());
  }, [submissions, tasksMap]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{pendingReviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Reviewed</p>
                <p className="text-2xl font-bold">{reviewedSubmissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Rework Required</p>
                <p className="text-2xl font-bold">{reworkRequired.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">
                  {submissions.filter((s) => s.status === 'Submitted' || s.status === 'Late Submission').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Review Queue */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Review Queue
            </CardTitle>
            <Badge variant="outline">{pendingReviews.length} pending</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {pendingReviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">All caught up!</p>
              <p className="text-sm">No pending reviews at this time</p>
            </div>
          ) : (
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Waiting</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReviews.slice(0, 10).map((sub) => {
                    const task = tasksMap.get(sub.taskId);
                    const waitingDays = sub.submittedAt
                      ? Math.floor(
                          (Date.now() - new Date(sub.submittedAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0;
                    return (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{sub.studentName}</p>
                            <p className="text-xs text-muted-foreground">{sub.rollNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-1">{task?.title}</p>
                        </TableCell>
                        <TableCell className="text-sm">{task?.subjectName}</TableCell>
                        <TableCell className="text-sm">
                          {sub.submittedAt ? formatHomeworkDateTime(sub.submittedAt) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={waitingDays > 2 ? 'destructive' : 'outline'}>
                            {waitingDays} day{waitingDays !== 1 ? 's' : ''}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Teacher Review Stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Teacher Review Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Pending</TableHead>
                  <TableHead className="text-center">Reviewed</TableHead>
                  <TableHead>Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherStats.map((stat) => (
                  <TableRow key={stat.name}>
                    <TableCell className="font-medium text-sm">{stat.name}</TableCell>
                    <TableCell className="text-center">{stat.total}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={stat.pending > 5 ? 'destructive' : 'outline'}>
                        {stat.pending}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{stat.reviewed}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {stat.total > 0
                            ? Math.round((stat.reviewed / stat.total) * 100)
                            : 0}
                          %
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Rework Required */}
      {reworkRequired.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Rework Required
              </CardTitle>
              <Badge variant="outline">{reworkRequired.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reworkRequired.map((sub) => {
                    const task = tasksMap.get(sub.taskId);
                    return (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{sub.studentName}</p>
                            <p className="text-xs text-muted-foreground">{sub.rollNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-1">{task?.title}</p>
                        </TableCell>
                        <TableCell className="text-sm">{task?.subjectName}</TableCell>
                        <TableCell>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {sub.feedbackSnippet || 'No feedback provided'}
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
