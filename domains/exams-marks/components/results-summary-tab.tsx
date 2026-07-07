'use client';

import { useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { CircleCheck as CheckCircle, Circle as XCircle, TrendingUp, Users, Award, ChartBar as BarChart3 } from 'lucide-react';
import {
  studentMarkRecords,
  classResultSummaries,
  studentResultSnapshots,
} from '@/domains/exams-marks/mock-data/exams-marks';
import { calculateMarksSummary, calculatePassPercentage } from '@/domains/exams-marks/services/exams-marks';
import { ResultStatusBadge, GradeBadge, PassFailBadge } from './badges';

export function ResultsSummaryTab() {
  const marksSummary = useMemo(() => calculateMarksSummary(studentMarkRecords), []);

  const publishedSummaries = useMemo(
    () => classResultSummaries.filter((s) => s.resultStatus === 'Published' || s.resultStatus === 'Ready for Review'),
    []
  );

  const publishedSnapshots = useMemo(
    () => studentResultSnapshots.filter((s) => s.percentage > 0),
    []
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Total Records</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.totalRecords}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.completedEntries}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-warning" />
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.pendingEntries}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.verifiedEntries}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-info" />
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.averageScore}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-success" />
              <p className="text-xs text-muted-foreground">Pass %</p>
            </div>
            <p className="text-2xl font-semibold mt-1">{marksSummary.passPercentage}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Class Result Summaries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Class Result Summaries</CardTitle>
          <p className="text-sm text-muted-foreground">
            Published and reviewed results by class
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Appeared</TableHead>
                  <TableHead>Pass</TableHead>
                  <TableHead>Fail</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead>Highest</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishedSummaries.map((summary) => (
                  <TableRow key={summary.id}>
                    <TableCell>
                      <span className="font-medium">{summary.classGradeName} - {summary.sectionName}</span>
                    </TableCell>
                    <TableCell>{summary.studentsAppeared}</TableCell>
                    <TableCell className="text-success font-medium">{summary.passCount}</TableCell>
                    <TableCell className="text-destructive">{summary.failCount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          (summary.passCount / summary.studentsAppeared) >= 0.8
                            ? 'bg-success/10 text-success border-success/20'
                            : (summary.passCount / summary.studentsAppeared) >= 0.6
                            ? 'bg-warning/10 text-warning border-warning/20'
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }
                      >
                        {Math.round((summary.passCount / summary.studentsAppeared) * 100)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{summary.highestAverage}%</TableCell>
                    <TableCell>{summary.classAverage}%</TableCell>
                    <TableCell>
                      <ResultStatusBadge status={summary.resultStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Student Result Snapshots */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Student Result Snapshots</CardTitle>
          <p className="text-sm text-muted-foreground">
            Individual student performance in published exams
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exam Session</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishedSnapshots.map((snapshot) => (
                  <TableRow key={snapshot.id}>
                    <TableCell>
                      <span className="font-medium">{snapshot.studentName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {snapshot.classGradeName} - {snapshot.sectionName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm truncate max-w-[150px] block">
                        {snapshot.examSessionName}
                      </span>
                    </TableCell>
                    <TableCell>{snapshot.subjectsAppeared}</TableCell>
                    <TableCell>
                      {snapshot.totalMarksObtained}/{snapshot.totalMaxMarks}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          snapshot.percentage >= 75
                            ? 'bg-success/10 text-success border-success/20'
                            : snapshot.percentage >= 50
                            ? 'bg-warning/10 text-warning border-warning/20'
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }
                      >
                        {snapshot.percentage}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <GradeBadge grade={snapshot.grade} />
                    </TableCell>
                    <TableCell>
                      <PassFailBadge status={snapshot.resultStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pass/Fail Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pass/Fail Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-success/5 border border-success/20 text-center">
              <p className="text-3xl font-semibold text-success">
                {publishedSnapshots.filter((s) => s.resultStatus === 'Pass').length}
              </p>
              <p className="text-sm text-muted-foreground">Passed</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-center">
              <p className="text-3xl font-semibold text-destructive">
                {publishedSnapshots.filter((s) => s.resultStatus === 'Fail').length}
              </p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
