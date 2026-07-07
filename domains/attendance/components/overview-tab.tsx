'use client';

import { Users, UserCheck, TriangleAlert as AlertTriangle, Clock, CircleCheck as CheckCircle, Circle as XCircle, CalendarCheck, ClipboardList, FileWarning, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/shared/components/section-header';
import { useToast } from '@/hooks/use-toast';
import {
  studentAttendanceRecords,
  staffAttendanceRecords,
  attendanceSessions,
  attendanceAlerts,
  attendanceActivityEvents,
  attendanceLeaveRequests,
  CURRENT_DATE,
} from '@/domains/attendance/mock-data/attendance';
import {
  calculateAttendanceStats,
  calculateClassAttendanceSummaries,
  calculateStaffAttendanceSummaries,
  getAttendanceAlertsBySeverity,
  getPendingLeaveRequests,
  formatAttendanceDate,
} from '@/domains/attendance/services/attendance';
import { AttendanceStatusBadge, AlertSeverityBadge, SessionStatusBadge } from './badges';

const quickActions = [
  { label: 'Mark Student Attendance', icon: ClipboardList, action: 'mark-student' },
  { label: 'Mark Staff Attendance', icon: UserCheck, action: 'mark-staff' },
  { label: 'Review Exceptions', icon: FileWarning, action: 'review-exceptions' },
  { label: 'View Leave Requests', icon: CalendarCheck, action: 'view-leaves' },
];

function TodaySnapshot() {
  const stats = calculateAttendanceStats(
    studentAttendanceRecords,
    staffAttendanceRecords,
    attendanceSessions,
    attendanceLeaveRequests,
    CURRENT_DATE
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Today's Snapshot</CardTitle>
          <span className="text-xs text-muted-foreground">{formatAttendanceDate(CURRENT_DATE)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Student Attendance</span>
            </div>
            <p className="text-2xl font-semibold">{stats.studentAttendanceToday}%</p>
            <p className="text-xs text-muted-foreground">{stats.studentPresent} of {stats.studentTotal} present</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Staff Attendance</span>
            </div>
            <p className="text-2xl font-semibold">{stats.staffAttendanceToday}%</p>
            <p className="text-xs text-muted-foreground">{stats.staffPresent} of {stats.staffTotal} present</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Absentees</span>
            </div>
            <p className="text-2xl font-semibold">{stats.absentees}</p>
            <p className="text-xs text-muted-foreground">students + staff</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">Late Arrivals</span>
            </div>
            <p className="text-2xl font-semibold">{stats.lateArrivals}</p>
            <p className="text-xs text-muted-foreground">today</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <div>
              <p className="text-sm font-medium">{stats.pendingApprovals}</p>
              <p className="text-xs text-muted-foreground">Pending Leave Approvals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-info" />
            <div>
              <p className="text-sm font-medium">{stats.unmarkedSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions Pending Marking</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClassSummaries() {
  const classSummaries = calculateClassAttendanceSummaries(studentAttendanceRecords, CURRENT_DATE);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Class Attendance Summary</CardTitle>
        <p className="text-sm text-muted-foreground">Today's attendance by class</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {classSummaries.slice(0, 5).map((cls) => (
            <div key={`${cls.classGradeId}-${cls.sectionId}`} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{cls.classGradeName.split(' ')[1]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{cls.classGradeName} - {cls.sectionName}</p>
                  <p className="text-xs text-muted-foreground">{cls.campusName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cls.attendancePercentage}%`,
                        backgroundColor: cls.attendancePercentage >= 90 ? 'hsl(var(--success))' : cls.attendancePercentage >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{cls.attendancePercentage}%</span>
                </div>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>P: {cls.presentCount}</span>
                  <span>A: {cls.absentCount}</span>
                  <span>L: {cls.lateCount}</span>
                  {cls.notMarkedCount > 0 && <span className="text-warning">NM: {cls.notMarkedCount}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StaffSummaries() {
  const staffSummaries = calculateStaffAttendanceSummaries(staffAttendanceRecords, CURRENT_DATE);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Staff by Department</CardTitle>
        <p className="text-sm text-muted-foreground">Today's staff attendance</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {staffSummaries.map((dept) => (
            <div key={dept.departmentId} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div>
                <p className="text-sm font-medium">{dept.departmentName}</p>
                <p className="text-xs text-muted-foreground">{dept.campusName}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${dept.attendancePercentage}%`,
                        backgroundColor: dept.attendancePercentage >= 90 ? 'hsl(var(--success))' : dept.attendancePercentage >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{dept.attendancePercentage}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{dept.presentCount}/{dept.totalCount} present</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertsPanel() {
  const criticalAlerts = getAttendanceAlertsBySeverity(attendanceAlerts, 'Critical');
  const warningAlerts = getAttendanceAlertsBySeverity(attendanceAlerts, 'Warning');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Attendance Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalAlerts.length === 0 && warningAlerts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-sm">No active alerts</p>
            </div>
          ) : (
            <>
              {criticalAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{alert.personName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.title}</p>
                    </div>
                    <AlertSeverityBadge severity="Critical" />
                  </div>
                </div>
              ))}
              {warningAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-warning/20 bg-warning/5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{alert.personName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.title}</p>
                    </div>
                    <AlertSeverityBadge severity="Warning" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const recentEvents = attendanceActivityEvents.slice(0, 5);

  const severityColors: Record<string, string> = {
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    critical: 'bg-destructive',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${severityColors[event.severity]}`} />
              <div className="space-y-0.5">
                <p className="text-sm text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {event.actor} · {new Date(event.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SessionsNeedingAttention() {
  const pendingSessions = attendanceSessions.filter(
    (s) => s.status === 'Draft' || s.status === 'In Progress' || s.notMarkedCount > 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sessions Needing Attention</CardTitle>
        <p className="text-sm text-muted-foreground">Attendance sessions pending action</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingSessions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-sm">All sessions completed</p>
            </div>
          ) : (
            pendingSessions.slice(0, 4).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{session.sessionName}</p>
                  <p className="text-xs text-muted-foreground">{session.campusName}</p>
                </div>
                <div className="flex items-center gap-2">
                  {session.notMarkedCount > 0 && (
                    <span className="text-xs text-warning">{session.notMarkedCount} unmarked</span>
                  )}
                  <SessionStatusBadge status={session.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewTab() {
  const { toast } = useToast();
  const pendingLeaves = getPendingLeaveRequests(attendanceLeaveRequests);

  function handleAction(action: string) {
    const labels: Record<string, string> = {
      'mark-student': 'Mark Student Attendance',
      'mark-staff': 'Mark Staff Attendance',
      'review-exceptions': 'Review Exceptions',
      'view-leaves': 'View Leave Requests',
    };
    toast({
      title: labels[action] ?? 'Action triggered',
      description: 'This action will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-6">
      {/* Today's Snapshot */}
      <TodaySnapshot />

      {/* Class and Staff Summaries */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ClassSummaries />
        <div className="space-y-6">
          <StaffSummaries />
          <SessionsNeedingAttention />
        </div>
      </div>

      {/* Alerts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AlertsPanel />
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <SectionHeader
          title="Quick Actions"
          description="Jump to common attendance tasks"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Pending Approvals Summary */}
      {pendingLeaves.length > 0 && (
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-medium">{pendingLeaves.length} pending leave requests</p>
                  <p className="text-xs text-muted-foreground">Requires your approval</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleAction('view-leaves')}>
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
