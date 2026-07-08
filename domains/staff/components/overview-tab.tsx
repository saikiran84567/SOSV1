'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Briefcase, GraduationCap, FileText, Plus, UserPlus, FileCheck, Calendar, TrendingUp, Award, Search } from 'lucide-react';
import { StaffStatusBadge, AlertSeverityBadge, EmploymentTypeBadge, RoleCategoryBadge } from './badges';
import { formatStaffDate } from '../services/staff';
import type { StaffStats, StaffAlert, StaffDepartmentSummary, StaffProfile } from '../types';
import { toast } from 'sonner';

interface OverviewTabProps {
  stats: StaffStats;
  alerts: StaffAlert[];
  departmentSummaries: StaffDepartmentSummary[];
  staffProfiles: StaffProfile[];
}

export function OverviewTab({ stats, alerts, departmentSummaries, staffProfiles }: OverviewTabProps) {
  const quickActions = [
    { label: 'Add Staff', icon: UserPlus, action: () => toast.info('Add Staff dialog would open') },
    { label: 'Verify Documents', icon: FileCheck, action: () => toast.info('Document verification panel would open') },
    { label: 'Assign Department', icon: Briefcase, action: () => toast.info('Department assignment dialog would open') },
    { label: 'Schedule Training', icon: Calendar, action: () => toast.info('Training scheduling dialog would open') },
    { label: 'Review Workload', icon: TrendingUp, action: () => toast.info('Navigate to Workload tab') },
    { label: 'Export Report', icon: FileText, action: () => toast.info('Export started - check downloads') },
  ];

  const activeAlerts = alerts.filter((a) => a.status === 'Open' || a.status === 'Under Investigation');
  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'Critical');
  const warningAlerts = activeAlerts.filter((a) => a.severity === 'Warning');

  const recentStaff = [...staffProfiles]
    .filter((s) => s.status === 'Active')
    .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Staff</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalStaff}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.activeStaff}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">On Leave</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.onLeaveStaff}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Teaching</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.teachingStaff}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Non-Teaching</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.nonTeachingStaff}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Avg Tenure</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.averageTenureYears} yrs</p>
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

        {/* Middle Column - Department Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Department Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {departmentSummaries.slice(0, 10).map((dept) => {
                  const utilization = Math.round((dept.activeStaff / dept.totalStaff) * 100);
                  return (
                    <div key={dept.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{dept.departmentName}</p>
                          <p className="text-xs text-muted-foreground">
                            {dept.totalStaff} staff | {dept.onLeaveStaff} on leave
                          </p>
                        </div>
                        <Badge variant={utilization >= 80 ? 'default' : 'outline'}>{utilization}%</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Active Staff</span>
                          <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all" style={{ width: `${utilization}%` }} />
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget</span>
                          <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all" style={{ width: `${dept.budgetUtilizationPercentage}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Column - Recent Staff */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recently Joined</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-3">
                {recentStaff.map((staff) => (
                  <div key={staff.id} className="p-3 rounded-lg border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{staff.fullName}</p>
                        <p className="text-xs text-muted-foreground">{staff.designation}</p>
                      </div>
                      <StaffStatusBadge status={staff.status} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <EmploymentTypeBadge type={staff.employmentType} />
                      <RoleCategoryBadge category={staff.roleCategory} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>{staff.departmentName}</span>
                      <span className="mx-2">|</span>
                      <span>Joined {formatStaffDate(staff.joiningDate)}</span>
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
          <CardTitle className="text-lg">Staff Overview Snapshot - {formatStaffDate('2026-07-08')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold">{stats.activeStaff}</p>
              <p className="text-sm text-muted-foreground">Active Staff</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-warning">{stats.workloadWarnings}</p>
              <p className="text-sm text-muted-foreground">Workload Warnings</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-destructive">{stats.certificationsExpiring}</p>
              <p className="text-sm text-muted-foreground">Certifications Expiring</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-warning">{stats.pendingVerifications}</p>
              <p className="text-sm text-muted-foreground">Pending Verifications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
