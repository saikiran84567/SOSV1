'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/shared/components/section-header';
import { useToast } from '@/hooks/use-toast';
import { CalendarPlus, ClipboardList, CircleCheck as CheckCircle, FileCheck, ChartBar as BarChart3, FileText, TriangleAlert as AlertTriangle, Clock, TrendingUp, Users, Eye } from 'lucide-react';
import {
  examSessions,
  examSchedules,
  studentMarkRecords,
  subjectMarkEntries,
  reportCardReadinessItems,
  examActivityEvents,
  examAlerts,
  classResultSummaries,
} from '@/domains/exams-marks/mock-data/exams-marks';
import {
  calculateExamStats,
  calculateReportCardReadiness,
  formatExamDate,
} from '@/domains/exams-marks/services/exams-marks';
import { ExamStatusBadge, ExamAlertSeverityBadge, ResultStatusBadge } from './badges';
import type { ExamSession } from '@/domains/exams-marks/types';

const quickActions = [
  { label: 'Create Exam Session', icon: CalendarPlus, action: 'create-session' },
  { label: 'Add Exam Schedule', icon: ClipboardList, action: 'add-schedule' },
  { label: 'Open Marks Entry', icon: FileCheck, action: 'open-marks' },
  { label: 'Verify Marks', icon: CheckCircle, action: 'verify-marks' },
  { label: 'Review Results', icon: BarChart3, action: 'review-results' },
  { label: 'Prepare Report Cards', icon: FileText, action: 'prepare-report-cards' },
];

interface OverviewTabProps {
  onViewSession?: (session: ExamSession) => void;
}

export function OverviewTab({ onViewSession }: OverviewTabProps) {
  const { toast } = useToast();
  const stats = calculateExamStats(
    examSessions,
    examSchedules,
    studentMarkRecords,
    subjectMarkEntries,
    reportCardReadinessItems
  );
  const readiness = calculateReportCardReadiness(reportCardReadinessItems);
  const activeAlerts = examAlerts.filter((a) => a.status === 'Active');
  const recentActivity = examActivityEvents.slice(0, 5);
  const activeSessions = examSessions.filter(
    (s) => s.status !== 'Draft' && s.status !== 'Archived'
  ).slice(0, 4);

  function handleAction(action: string) {
    const messages: Record<string, { title: string; description: string }> = {
      'create-session': {
        title: 'Create Exam Session',
        description: 'Exam session creation will be enabled in a future update.',
      },
      'add-schedule': {
        title: 'Add Exam Schedule',
        description: 'Schedule creation will be enabled in a future update.',
      },
      'open-marks': {
        title: 'Open Marks Entry',
        description: 'Marks entry workflow will be enabled in a future update.',
      },
      'verify-marks': {
        title: 'Verify Marks',
        description: 'Marks verification will be enabled in a future update.',
      },
      'review-results': {
        title: 'Review Results',
        description: 'Result review will be enabled in a future update.',
      },
      'prepare-report-cards': {
        title: 'Prepare Report Cards',
        description: 'Report card generation will be enabled in a future update.',
      },
    };
    const msg = messages[action];
    if (msg) {
      toast({ title: msg.title, description: msg.description });
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Exam Cycle Snapshot */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Current Exam Cycle Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-semibold">{stats.activeSessions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Scheduled Assessments</p>
              <p className="text-2xl font-semibold">{stats.scheduledAssessments}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Marks Entry Progress</p>
              <p className="text-2xl font-semibold">{stats.marksEntryProgress}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pending Verification</p>
              <p className="text-2xl font-semibold text-warning">{stats.pendingVerification}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Results Ready</p>
              <p className="text-2xl font-semibold text-success">{stats.resultReady}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Report Card Ready</p>
              <p className="text-2xl font-semibold">{stats.reportCardReadiness}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam Status Distribution and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exam Status Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Breakdown of exam sessions by status</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Scheduled', 'Ongoing', 'Marks Entry', 'Review', 'Published'].map((status) => {
                const count = examSessions.filter((s) => s.status === status).length;
                const maxCount = examSessions.length;
                const width = (count / maxCount) * 100;
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className="w-24 shrink-0">
                      <ExamStatusBadge status={status as any} />
                    </div>
                    <div className="flex-1 h-4 bg-muted/50 rounded overflow-hidden">
                      <div
                        className={`h-full rounded transition-all ${
                          status === 'Published'
                            ? 'bg-success'
                            : status === 'Ongoing'
                            ? 'bg-warning'
                            : status === 'Review'
                            ? 'bg-info'
                            : 'bg-primary'
                        }`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeAlerts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-sm">No active alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAlerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                    <ExamAlertSeverityBadge severity={alert.severity} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{alert.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{alert.relatedEntity.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Exam Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Exam Sessions</CardTitle>
          <p className="text-sm text-muted-foreground">Current exam sessions in progress or scheduled</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="p-4 rounded-lg border bg-muted/30 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-tight">{session.name}</p>
                  <ExamStatusBadge status={session.status} />
                </div>
                <p className="text-xs text-muted-foreground">{session.classGradeName} - {session.sectionName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{session.examType}</span>
                  <span>|</span>
                  <span>{formatExamDate(session.startDate)}</span>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${session.marksEntryProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{session.marksEntryProgress}%</span>
                </div>
                {onViewSession && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => onViewSession(session)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    View Details
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Performance Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Class Performance Highlights
          </CardTitle>
          <p className="text-sm text-muted-foreground">Published result summaries by class</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classResultSummaries
              .filter((s) => s.resultStatus === 'Published' || s.resultStatus === 'Ready for Review')
              .slice(0, 6)
              .map((summary) => (
                <div key={summary.id} className="p-4 rounded-lg border bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{summary.classGradeName} - {summary.sectionName}</p>
                    <ResultStatusBadge status={summary.resultStatus} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Appeared</p>
                      <p className="font-medium">{summary.studentsAppeared}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pass Rate</p>
                      <p className="font-medium">{Math.round((summary.passCount / summary.studentsAppeared) * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Class Avg</p>
                      <p className="font-medium">{summary.classAverage}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Highest</p>
                      <p className="font-medium">{summary.highestAverage}%</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Card Readiness and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Report Card Readiness */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Card Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    readiness.percentage >= 75 ? 'bg-success' : readiness.percentage >= 50 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${readiness.percentage}%` }}
                />
              </div>
              <span className="text-lg font-semibold">{readiness.percentage}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="rounded-lg bg-success/10 p-2">
                <p className="text-xl font-semibold text-success">{readiness.ready}</p>
                <p className="text-muted-foreground">Ready</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-2">
                <p className="text-xl font-semibold text-warning">{readiness.inProgress}</p>
                <p className="text-muted-foreground">In Progress</p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-2">
                <p className="text-xl font-semibold text-destructive">{readiness.blocked}</p>
                <p className="text-muted-foreground">Blocked</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="text-xl font-semibold">{readiness.notStarted}</p>
                <p className="text-muted-foreground">Not Started</p>
              </div>
            </div>
            {readiness.blocked > 0 && (
              <div className="mt-3 p-3 rounded-lg border border-destructive/20 bg-destructive/5 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                <p className="text-xs text-muted-foreground">
                  {readiness.blocked} blocker(s) preventing report card generation
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((event) => {
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
                        {event.actor} · {new Date(event.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <SectionHeader
          title="Quick Actions"
          description="Jump to common exam management tasks"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.action}
                variant="outline"
                onClick={() => handleAction(action.action)}
                className="h-auto justify-start py-3 px-4"
              >
                <Icon className="h-4 w-4 mr-2.5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
