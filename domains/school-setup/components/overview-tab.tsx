'use client';

import {
  CheckCircle2,
  Circle,
  Building2,
  CalendarDays,
  Users,
  Pencil,
  Plus,
  CalendarPlus,
  Briefcase,
  GraduationCap,
  Settings2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';
import { SectionHeader } from '@/shared/components/section-header';
import { useToast } from '@/hooks/use-toast';
import { schoolProfile } from '@/domains/school-setup/mock-data/school-profile';
import { campuses } from '@/domains/school-setup/mock-data/campuses';
import { academicYears } from '@/domains/school-setup/mock-data/academic-years';
import { classGrades } from '@/domains/school-setup/mock-data/classes';
import { setupChecklist } from '@/domains/school-setup/mock-data/school-profile';
import {
  calculateSetupCompletion,
  calculateCapacityUtilization,
  getCurrentAcademicYear,
  formatSchoolDate,
  getTotalCapacity,
  getTotalCurrentStudents,
} from '@/domains/school-setup/services/school-setup';
import { AcademicYearStatusBadge } from './badges';

const quickActions = [
  { label: 'Edit school profile', icon: Pencil, action: 'edit-profile' },
  { label: 'Add campus', icon: Plus, action: 'add-campus' },
  { label: 'Create academic year', icon: CalendarPlus, action: 'add-year' },
  { label: 'Add department', icon: Briefcase, action: 'add-department' },
  { label: 'Add class/section', icon: GraduationCap, action: 'add-class' },
  { label: 'Configure calendar', icon: Settings2, action: 'config-calendar' },
];

export function OverviewTab() {
  const { toast } = useToast();
  const currentYear = getCurrentAcademicYear(academicYears);
  const completion = calculateSetupCompletion(setupChecklist);
  const totalCapacity = getTotalCapacity(classGrades);
  const totalStudents = getTotalCurrentStudents(classGrades);
  const overallUtilization = calculateCapacityUtilization(totalStudents, totalCapacity);

  function handleAction(action: string) {
    const labels: Record<string, string> = {
      'edit-profile': 'Edit school profile',
      'add-campus': 'Add campus',
      'add-year': 'Create academic year',
      'add-department': 'Add department',
      'add-class': 'Add class/section',
      'config-calendar': 'Configure calendar',
    };
    toast({
      title: labels[action] ?? 'Action triggered',
      description: 'This action will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-6">
      {/* Setup completion + Institution snapshot */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Setup Completion</CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete these steps to fully configure your school for the academic year.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <ProgressBar value={completion.percentage} className="h-3" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {completion.percentage}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {completion.completed} of {completion.total} steps completed
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {setupChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 p-3"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Institution Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-lg font-bold text-primary">
                  {schoolProfile.logoInitials}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {schoolProfile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {schoolProfile.board} · Est. {schoolProfile.establishedYear}
                </p>
              </div>
            </div>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Principal</span>
                <span className="text-foreground font-medium">
                  {schoolProfile.principalName}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Campuses</span>
                <span className="text-foreground font-medium">{campuses.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">City</span>
                <span className="text-foreground font-medium">{schoolProfile.city}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Currency</span>
                <span className="text-foreground font-medium">{schoolProfile.currency}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active year + Capacity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {currentYear && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Academic Year</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span className="text-base font-semibold text-foreground">
                    {currentYear.name}
                  </span>
                </div>
                <AcademicYearStatusBadge status={currentYear.status} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Start date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatSchoolDate(currentYear.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatSchoolDate(currentYear.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Terms</p>
                  <p className="text-sm font-medium text-foreground">
                    {currentYear.terms.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Instructional days</p>
                  <p className="text-sm font-medium text-foreground">
                    {currentYear.totalInstructionalDays}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <ProgressBar value={overallUtilization} className="h-3" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {overallUtilization}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Current students</p>
                  <p className="text-sm font-medium text-foreground">
                    {totalStudents.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total capacity</p>
                  <p className="text-sm font-medium text-foreground">
                    {totalCapacity.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <SectionHeader
          title="Quick Setup Actions"
          description="Jump to common configuration tasks"
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
