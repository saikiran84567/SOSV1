'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, GraduationCap, BookOpen, ChartBar as BarChart3, Users, CircleCheck as CheckCircle } from 'lucide-react';
import {
  examSchedules,
  examSubjectComponents,
  examActivityEvents,
  classResultSummaries,
} from '@/domains/exams-marks/mock-data/exams-marks';
import {
  getSchedulesBySession,
  formatExamDate,
} from '@/domains/exams-marks/services/exams-marks';
import { ExamStatusBadge, ResultStatusBadge, ExamTypeBadge, GradingScaleBadge, AssessmentTypeBadge } from './badges';
import type { ExamSession } from '@/domains/exams-marks/types';

interface ExamSessionDrawerProps {
  session: ExamSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExamSessionDrawer({
  session,
  open,
  onOpenChange,
}: ExamSessionDrawerProps) {
  if (!session) return null;

  const schedules = getSchedulesBySession(examSchedules, session.id);
  const components = examSubjectComponents.filter((c) =>
    schedules.some((s) => s.subjectId === c.subjectId)
  ).slice(0, 6);
  const activity = examActivityEvents
    .filter((e) => e.relatedEntity.id === session.id)
    .slice(0, 5);
  const resultSummary = classResultSummaries.find(
    (r) => r.examSessionId === session.id && r.sectionName === session.sectionName
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetDescription className="sr-only">
            Exam session details
          </SheetDescription>
          <SheetTitle className="sr-only">{session.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-2 space-y-6 pb-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 flex-wrap">
              <ExamStatusBadge status={session.status} />
              <ResultStatusBadge status={session.resultStatus} />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {session.name}
            </h2>
            <div className="flex items-center gap-2">
              <ExamTypeBadge type={session.examType} />
              <GradingScaleBadge type={session.gradingScaleType} />
            </div>
          </div>

          <Separator />

          {/* Session Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Session Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Academic Year</p>
                <p className="text-foreground">{session.academicYearName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Term</p>
                <p className="text-foreground">{session.termName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Campus</p>
                <p className="text-foreground">{session.campusName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Class</p>
                <p className="text-foreground">{session.classGradeName} - {session.sectionName}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">Date Range</p>
                <p className="text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatExamDate(session.startDate)} - {formatExamDate(session.endDate)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Marks Entry Progress */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Marks Entry Progress
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    session.marksEntryProgress >= 100
                      ? 'bg-success'
                      : session.marksEntryProgress >= 50
                      ? 'bg-primary'
                      : 'bg-warning'
                  }`}
                  style={{ width: `${session.marksEntryProgress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{session.marksEntryProgress}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{session.totalSubjects} subjects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5" />
                <span>~10 students</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subject Components */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Subject Components</h3>
            {components.length === 0 ? (
              <p className="text-sm text-muted-foreground">No subject components configured.</p>
            ) : (
              <div className="space-y-2">
                {components.map((comp) => (
                  <div key={comp.id} className="flex items-center justify-between p-2 rounded-lg border bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{comp.subjectName}</p>
                      <p className="text-xs text-muted-foreground">{comp.componentName}</p>
                    </div>
                    <div className="text-right">
                      <AssessmentTypeBadge type={comp.assessmentType} />
                      <p className="text-xs text-muted-foreground mt-1">
                        {comp.maxMarks} marks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Schedule Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule Overview
            </h3>
            {schedules.length === 0 ? (
              <p className="text-sm text-muted-foreground">No schedules configured.</p>
            ) : (
              <div className="space-y-2">
                {schedules.slice(0, 5).map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-2 rounded-lg border bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{schedule.subjectName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatExamDate(schedule.date)} · {schedule.startTime} - {schedule.endTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {schedule.maxMarks} marks
                      </Badge>
                      {schedule.room && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                          <MapPin className="h-3 w-3" />
                          {schedule.room}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Result Summary */}
          {resultSummary && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Result Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg border bg-muted/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Appeared</p>
                    <p className="text-lg font-semibold">{resultSummary.studentsAppeared}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pass Count</p>
                    <p className="text-lg font-semibold text-success">{resultSummary.passCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Class Average</p>
                    <p className="text-lg font-semibold">{resultSummary.classAverage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Highest Average</p>
                    <p className="text-lg font-semibold">{resultSummary.highestAverage}%</p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Recent Activity
            </h3>
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity for this session.</p>
            ) : (
              <div className="space-y-2">
                {activity.map((event) => {
                  const severityColors: Record<string, string> = {
                    info: 'bg-info',
                    success: 'bg-success',
                    warning: 'bg-warning',
                    critical: 'bg-destructive',
                  };
                  return (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${severityColors[event.severity]}`} />
                      <div className="space-y-0.5">
                        <p className="text-sm text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.actor} · {new Date(event.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <p><span className="font-medium">Created by:</span> {session.createdBy}</p>
            <p><span className="font-medium">Created:</span> {new Date(session.createdAt).toLocaleString('en-IN')}</p>
            <p><span className="font-medium">Updated:</span> {new Date(session.updatedAt).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
