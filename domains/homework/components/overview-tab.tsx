'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Users, TrendingUp, Plus, Send, Eye, Bell, FolderOpen, Download } from 'lucide-react';
import { HomeworkStatusBadge, AlertSeverityBadge, SubmissionRateBadge } from './badges';
import { formatHomeworkDate } from '../services/homework';
import type { HomeworkStats, HomeworkAlert, HomeworkClassSummary, HomeworkSubjectSummary } from '../types';
import { toast } from 'sonner';

interface OverviewTabProps {
  stats: HomeworkStats;
  alerts: HomeworkAlert[];
  classSummaries: HomeworkClassSummary[];
  subjectSummaries: HomeworkSubjectSummary[];
}

export function OverviewTab({ stats, alerts, classSummaries, subjectSummaries }: OverviewTabProps) {
  const quickActions = [
    { label: 'Create Task', icon: Plus, action: () => toast.info('Create Task dialog would open') },
    { label: 'Publish Assignment', icon: Send, action: () => toast.info('Publish Assignment dialog would open') },
    { label: 'Review Submissions', icon: Eye, action: () => toast.info('Navigate to Submissions tab') },
    { label: 'Follow Up Overdue', icon: Bell, action: () => toast.info('Overdue follow-up dialog would open') },
    { label: 'Class Progress', icon: FolderOpen, action: () => toast.info('Navigate to Progress tab') },
    { label: 'Export Task List', icon: Download, action: () => toast.info('Export started - check downloads') },
  ];

  const activeAlerts = alerts.filter((a) => a.status === 'Active');
  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'Critical');
  const warningAlerts = activeAlerts.filter((a) => a.severity === 'Warning');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Active Tasks</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.activeTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Due Today</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-warning">{stats.dueToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Overdue</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-destructive">{stats.overdue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Submission Rate</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.averageSubmissionRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Pending Reviews</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.pendingReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Completion</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.averageCompletionPercentage}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts and Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alerts</CardTitle>
                {(criticalAlerts.length > 0 || warningAlerts.length > 0) && (
                  <div className="flex gap-2">
                    {criticalAlerts.length > 0 && (
                      <Badge variant="destructive">{criticalAlerts.length} Critical</Badge>
                    )}
                    {warningAlerts.length > 0 && (
                      <Badge variant="outline">{warningAlerts.length} Warning</Badge>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[220px]">
                <div className="space-y-3">
                  {activeAlerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border bg-muted/30 space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {alert.description}
                          </p>
                        </div>
                        <AlertSeverityBadge severity={alert.severity} />
                      </div>
                      {alert.actionRequired && (
                        <p className="text-xs text-primary">{alert.actionRequired}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2"
                    onClick={action.action}
                  >
                    <action.icon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Class Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Class Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {classSummaries.slice(0, 8).map((cls) => (
                  <div key={cls.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          {cls.classGradeName} - {cls.sectionName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cls.activeTasks} active | {cls.dueToday} due | {cls.overdue} overdue
                        </p>
                      </div>
                      <SubmissionRateBadge rate={cls.submissionRate} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Submission</span>
                        <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${cls.submissionRate}%` }} />
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Review</span>
                        <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${cls.reviewRate}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Column - Subject Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subject Workload Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {subjectSummaries.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{subject.subjectName}</p>
                        <p className="text-xs text-muted-foreground">
                          {subject.activeTasks} tasks | {subject.pendingReviews} pending reviews
                        </p>
                      </div>
                      <Badge variant="outline">{subject.completionRate}%</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span>{subject.completionRate}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${subject.completionRate}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Today's Snapshot */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today&apos;s Snapshot - {formatHomeworkDate('2026-07-08')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-warning">{stats.dueToday}</p>
              <p className="text-sm text-muted-foreground">Tasks Due Today</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold">{stats.pendingReviews}</p>
              <p className="text-sm text-muted-foreground">Awaiting Review</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-destructive">{stats.overdue}</p>
              <p className="text-sm text-muted-foreground">Overdue Tasks</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-success">{stats.averageCompletionPercentage}%</p>
              <p className="text-sm text-muted-foreground">Avg Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
