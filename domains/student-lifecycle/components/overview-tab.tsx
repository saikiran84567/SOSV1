'use client';

import {
  UserPlus,
  FileText,
  GraduationCap,
  Upload,
  ArrowRightLeft,
  Download,
  TrendingDown,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/shared/components/section-header';
import { useToast } from '@/hooks/use-toast';
import { students, admissionApplications, timelineEvents } from '@/domains/student-lifecycle/mock-data/students';
import {
  calculateLifecycleStats,
  getAdmissionPipelineCounts,
  getPendingDocuments,
  formatStudentDateTime,
} from '@/domains/student-lifecycle/services/student-lifecycle';
import { AdmissionStatusBadge } from './badges';
import type { AdmissionStatus } from '@/domains/student-lifecycle/types';

const quickActions = [
  { label: 'Add inquiry', icon: UserPlus, action: 'add-inquiry' },
  { label: 'Create application', icon: FileText, action: 'create-application' },
  { label: 'Enroll student', icon: GraduationCap, action: 'enroll-student' },
  { label: 'Upload document', icon: Upload, action: 'upload-document' },
  { label: 'Assign class/section', icon: ArrowRightLeft, action: 'assign-class' },
  { label: 'Export student list', icon: Download, action: 'export-list' },
];

const pipelineStages: AdmissionStatus[] = [
  'Inquiry Received',
  'Application Submitted',
  'Documents Pending',
  'Assessment Scheduled',
  'Interview Scheduled',
  'Under Review',
  'Offer Issued',
  'Offer Accepted',
];

export function OverviewTab() {
  const { toast } = useToast();
  const stats = calculateLifecycleStats(students, admissionApplications);
  const pipelineCounts = getAdmissionPipelineCounts(admissionApplications);
  const recentActivity = timelineEvents.slice(0, 6);
  const pendingDocAlerts = students
    .filter((s) => getPendingDocuments(s).length > 0)
    .slice(0, 5);

  const statusDistribution: { status: string; count: number }[] = [
    { status: 'Active', count: students.filter((s) => s.status === 'Active').length },
    { status: 'Applicant', count: students.filter((s) => s.status === 'Applicant').length },
    { status: 'Inquiry', count: students.filter((s) => s.status === 'Inquiry').length },
    { status: 'Offered', count: students.filter((s) => s.status === 'Offered').length },
    { status: 'On Hold', count: students.filter((s) => s.status === 'On Hold').length },
    { status: 'Transferred', count: students.filter((s) => s.status === 'Transferred').length },
    { status: 'Withdrawn', count: students.filter((s) => s.status === 'Withdrawn').length },
    { status: 'Alumni', count: students.filter((s) => s.status === 'Alumni').length },
  ];

  const classAssignment = students
    .filter((s) => s.classGradeName)
    .reduce((acc, s) => {
      const key = s.classGradeName!;
      if (!acc[key]) acc[key] = 0;
      acc[key]++;
      return acc;
    }, {} as Record<string, number>);

  function handleAction(action: string) {
    const labels: Record<string, string> = {
      'add-inquiry': 'Add inquiry',
      'create-application': 'Create application',
      'enroll-student': 'Enroll student',
      'upload-document': 'Upload document',
      'assign-class': 'Assign class/section',
      'export-list': 'Export student list',
    };
    toast({
      title: labels[action] ?? 'Action triggered',
      description: 'This action will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-6">
      {/* Pipeline funnel + Status distribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Admissions Pipeline</CardTitle>
            <p className="text-sm text-muted-foreground">
              Funnel from inquiry to enrolled for Academic Year 2026-27
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pipelineStages.map((stage, idx) => {
                const count = pipelineCounts[stage];
                const maxCount = Math.max(...pipelineStages.map((s) => pipelineCounts[s]), 1);
                const width = (count / maxCount) * 100;
                return (
                  <div key={stage} className="flex items-center gap-3">
                    <div className="w-40 shrink-0">
                      <AdmissionStatusBadge status={stage} />
                    </div>
                    <div className="flex-1 h-7 rounded bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded bg-primary transition-all flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(width, 8)}%` }}
                      >
                        <span className="text-xs font-medium text-primary-foreground">
                          {count}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {statusDistribution.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.status}</span>
                <span className="font-medium text-foreground">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity + Pending documents */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Admissions Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm text-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatStudentDateTime(event.timestamp)} · {event.actor}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Pending Document Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingDocAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending documents.</p>
            ) : (
              pendingDocAlerts.map((student) => {
                const pending = getPendingDocuments(student);
                return (
                  <div key={student.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-foreground font-medium">{student.displayName}</p>
                      <p className="text-xs text-muted-foreground">{student.admissionNumber}</p>
                    </div>
                    <span className="text-xs text-warning font-medium">
                      {pending.length} pending
                    </span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Class assignment snapshot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Class Assignment Snapshot</CardTitle>
          <p className="text-sm text-muted-foreground">
            Students enrolled per class from this mock dataset
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(classAssignment).map(([className, count]) => (
              <div
                key={className}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <p className="text-sm font-medium text-foreground">{className}</p>
                <p className="text-2xl font-semibold text-primary mt-1">{count}</p>
                <p className="text-xs text-muted-foreground">students</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="space-y-4">
        <SectionHeader
          title="Quick Actions"
          description="Jump to common student lifecycle tasks"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
