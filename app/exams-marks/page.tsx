'use client';

import { useState, useMemo } from 'react';
import { CalendarCheck, FileCheck, Clipboard as ClipboardEdit, Eye, ChartBar as BarChart3, FileText, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/exams-marks/components/overview-tab';
import { ExamSessionsTab } from '@/domains/exams-marks/components/exam-sessions-tab';
import { SchedulesTab } from '@/domains/exams-marks/components/schedules-tab';
import { MarksEntryTab } from '@/domains/exams-marks/components/marks-entry-tab';
import { ResultsSummaryTab } from '@/domains/exams-marks/components/results-summary-tab';
import { ReportCardReadinessTab } from '@/domains/exams-marks/components/report-card-readiness-tab';
import { ExamActivityTab } from '@/domains/exams-marks/components/exam-activity-tab';
import { ExamSessionDrawer } from '@/domains/exams-marks/components/exam-session-drawer';
import {
  examSessions,
  examSchedules,
  studentMarkRecords,
  subjectMarkEntries,
  reportCardReadinessItems,
  examAlerts,
} from '@/domains/exams-marks/mock-data/exams-marks';
import {
  calculateExamStats,
  calculateReportCardReadiness,
} from '@/domains/exams-marks/services/exams-marks';
import type { StatItem } from '@/shared/types';
import type { ExamSession } from '@/domains/exams-marks/types';

export default function ExamsMarksPage() {
  const [selectedSession, setSelectedSession] = useState<ExamSession | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = useMemo(
    () => calculateExamStats(examSessions, examSchedules, studentMarkRecords, subjectMarkEntries, reportCardReadinessItems),
    []
  );

  const readiness = useMemo(
    () => calculateReportCardReadiness(reportCardReadinessItems),
    []
  );

  const criticalAlerts = useMemo(
    () => examAlerts.filter((a) => a.severity === 'Critical'),
    []
  );

  const warningAlerts = useMemo(
    () => examAlerts.filter((a) => a.severity === 'Warning'),
    []
  );

  function handleViewSession(session: ExamSession) {
    setSelectedSession(session);
    setDrawerOpen(true);
  }

  const statItems: StatItem[] = [
    {
      label: 'Active Sessions',
      value: String(stats.activeSessions),
      change: `${stats.totalSessions - stats.activeSessions} inactive`,
      trend: stats.activeSessions >= 3 ? 'up' : 'neutral',
      icon: CalendarCheck,
      accent: 'primary',
    },
    {
      label: 'Scheduled Assessments',
      value: String(stats.scheduledAssessments),
      change: 'Across active sessions',
      trend: 'neutral',
      icon: FileCheck,
      accent: 'success',
    },
    {
      label: 'Marks Entry Progress',
      value: `${stats.marksEntryProgress}%`,
      change: 'All subjects combined',
      trend: stats.marksEntryProgress >= 75 ? 'up' : stats.marksEntryProgress >= 50 ? 'neutral' : 'down',
      icon: ClipboardEdit,
      accent: 'info',
    },
    {
      label: 'Pending Verification',
      value: String(stats.pendingVerification),
      change: 'Subjects awaiting review',
      trend: stats.pendingVerification <= 10 ? 'up' : 'neutral',
      icon: Eye,
      accent: 'warning',
    },
    {
      label: 'Results Ready',
      value: String(stats.resultReady),
      change: `${stats.totalSessions} total sessions`,
      trend: stats.resultReady >= 3 ? 'up' : 'neutral',
      icon: BarChart3,
      accent: 'success',
    },
    {
      label: 'Report Card Readiness',
      value: `${readiness.percentage}%`,
      change: `${readiness.blocked} blockers`,
      trend: readiness.blocked === 0 ? 'up' : readiness.blocked <= 2 ? 'neutral' : 'down',
      icon: FileText,
      accent: readiness.blocked > 0 ? 'warning' : 'success',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Exams & Marks"
        description="Manage exam sessions, schedules, marks entry, and results. Track report card readiness and monitor exam activity across all classes and campuses."
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statItems.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Exam Sessions</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="marks-entry" className="flex items-center gap-1.5">
            <ClipboardEdit className="h-3.5 w-3.5" />
            Marks Entry
          </TabsTrigger>
          <TabsTrigger value="results">Results Summary</TabsTrigger>
          <TabsTrigger value="readiness" className="flex items-center gap-1.5">
            <FileCheck className="h-3.5 w-3.5" />
            Report Card Readiness
            {readiness.blocked > 0 && (
              <Badge variant="outline" className="ml-1 bg-destructive/10 text-destructive border-destructive/20 text-xs">
                {readiness.blocked}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" />
            Activity
            {(criticalAlerts.length + warningAlerts.length) > 0 && (
              <Badge variant="outline" className="ml-1 bg-warning/10 text-warning border-warning/20 text-xs">
                {criticalAlerts.length + warningAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab onViewSession={handleViewSession} />
        </TabsContent>
        <TabsContent value="sessions">
          <ExamSessionsTab onViewSession={handleViewSession} />
        </TabsContent>
        <TabsContent value="schedules">
          <SchedulesTab />
        </TabsContent>
        <TabsContent value="marks-entry">
          <MarksEntryTab />
        </TabsContent>
        <TabsContent value="results">
          <ResultsSummaryTab />
        </TabsContent>
        <TabsContent value="readiness">
          <ReportCardReadinessTab />
        </TabsContent>
        <TabsContent value="activity">
          <ExamActivityTab />
        </TabsContent>
      </Tabs>

      <ExamSessionDrawer
        session={selectedSession}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
