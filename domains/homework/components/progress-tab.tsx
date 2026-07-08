'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Clock } from 'lucide-react';
import { CompletionBadge } from './badges';
import type { HomeworkStudentProgress, HomeworkClassSummary, HomeworkSubjectSummary } from '../types';

interface ProgressTabProps {
  studentProgress: HomeworkStudentProgress[];
  classSummaries: HomeworkClassSummary[];
  subjectSummaries: HomeworkSubjectSummary[];
}

export function ProgressTab({
  studentProgress,
  classSummaries,
  subjectSummaries,
}: ProgressTabProps) {
  const avgCompletion = studentProgress.length > 0
    ? Math.round(
        studentProgress.reduce((sum, sp) => sum + sp.completionPercentage, 0) /
          studentProgress.length
      )
    : 0;

  const atRiskStudents = studentProgress.filter((sp) => sp.completionPercentage < 60);
  const topPerformers = studentProgress.filter((sp) => sp.completionPercentage >= 90);
  const pendingTasks = studentProgress.reduce((sum, sp) => sum + sp.pendingTasks, 0);
  const overdueTasks = studentProgress.reduce((sum, sp) => sum + sp.overdueTasks, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{avgCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{studentProgress.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold">{atRiskStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">{pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Progress */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Student Progress</CardTitle>
              <div className="flex gap-2">
                <Badge variant="destructive">{atRiskStudents.length} at risk</Badge>
                <Badge variant="secondary">{topPerformers.length} excellent</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-center">Assigned</TableHead>
                    <TableHead className="text-center">Submitted</TableHead>
                    <TableHead className="text-center">Pending</TableHead>
                    <TableHead className="text-center">Overdue</TableHead>
                    <TableHead className="text-center">Reviewed</TableHead>
                    <TableHead className="text-center">Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentProgress.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{student.studentName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {student.classGradeName} - {student.sectionName}
                      </TableCell>
                      <TableCell className="text-center">{student.assignedTasks}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {student.submittedTasks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {student.pendingTasks > 0 ? (
                          <Badge variant="outline" className="text-xs">
                            {student.pendingTasks}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.overdueTasks > 0 ? (
                          <Badge variant="destructive" className="text-xs">
                            {student.overdueTasks}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {student.reviewedTasks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <CompletionBadge percentage={student.completionPercentage} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Class Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Class Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[180px]">
                <div className="space-y-4">
                  {classSummaries.slice(0, 8).map((cls) => (
                    <div key={cls.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {cls.classGradeName} - {cls.sectionName}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {cls.activeTasks} tasks
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Submission</span>
                          <div className="h-1 mt-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all" style={{ width: `${cls.submissionRate}%` }} />
                          </div>
                          <span className="text-muted-foreground">{cls.submissionRate}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Review</span>
                          <div className="h-1 mt-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all" style={{ width: `${cls.reviewRate}%` }} />
                          </div>
                          <span className="text-muted-foreground">{cls.reviewRate}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Subject Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Subject Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[180px]">
                <div className="space-y-3">
                  {subjectSummaries.map((subject) => (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{subject.subjectName}</p>
                        <Badge variant="outline" className="text-xs">
                          {subject.completionRate}%
                        </Badge>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${subject.completionRate}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{subject.activeTasks} tasks</span>
                        <span>{subject.pendingReviews} pending reviews</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
