'use client';

import { useState } from 'react';
import { Users, UserCheck, TriangleAlert as AlertTriangle, FileWarning, ClipboardList, CalendarDays, TrendingUp, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/attendance/components/overview-tab';
import { MarkAttendanceTab } from '@/domains/attendance/components/mark-attendance-tab';
import { StudentAttendanceTab } from '@/domains/attendance/components/student-attendance-tab';
import { StaffAttendanceTab } from '@/domains/attendance/components/staff-attendance-tab';
import { ExceptionsLeavesTab } from '@/domains/attendance/components/exceptions-leaves-tab';
import { TrendsTab } from '@/domains/attendance/components/trends-tab';
import { AttendanceActivityTab } from '@/domains/attendance/components/attendance-activity-tab';
import { AttendanceDetailDrawer } from '@/domains/attendance/components/attendance-detail-drawer';
import {
  studentAttendanceRecords,
  staffAttendanceRecords,
  attendanceSessions,
  attendanceExceptions,
  attendanceLeaveRequests,
  CURRENT_DATE,
} from '@/domains/attendance/mock-data/attendance';
import {
  calculateAttendanceStats,
  getPendingLeaveRequests,
  getOpen_exceptions,
} from '@/domains/attendance/services/attendance';
import type { StatItem } from '@/shared/types';
import type { AttendanceRecord } from '@/domains/attendance/types';

export default function AttendancePage() {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = calculateAttendanceStats(
    studentAttendanceRecords,
    staffAttendanceRecords,
    attendanceSessions,
    attendanceLeaveRequests,
    CURRENT_DATE
  );
  const pendingLeaves = getPendingLeaveRequests(attendanceLeaveRequests);
  const openExceptions = getOpen_exceptions(attendanceExceptions);

  const statItems: StatItem[] = [
    {
      label: 'Student Attendance',
      value: `${stats.studentAttendanceToday}%`,
      change: `${stats.studentPresent} of ${stats.studentTotal} present`,
      trend: stats.studentAttendanceToday >= 90 ? 'up' : stats.studentAttendanceToday >= 75 ? 'neutral' : 'down',
      icon: Users,
      accent: 'primary',
    },
    {
      label: 'Staff Attendance',
      value: `${stats.staffAttendanceToday}%`,
      change: `${stats.staffPresent} of ${stats.staffTotal} present`,
      trend: stats.staffAttendanceToday >= 90 ? 'up' : stats.staffAttendanceToday >= 75 ? 'neutral' : 'down',
      icon: UserCheck,
      accent: 'success',
    },
    {
      label: 'Absentees Today',
      value: String(stats.absentees),
      change: `${stats.lateArrivals} late arrivals`,
      trend: stats.absentees <= 10 ? 'up' : stats.absentees <= 20 ? 'neutral' : 'down',
      icon: AlertTriangle,
      accent: 'warning',
    },
    {
      label: 'Pending Actions',
      value: String(stats.pendingApprovals + openExceptions.length),
      change: `${pendingLeaves.length} leaves · ${openExceptions.length} exceptions`,
      trend: 'neutral',
      icon: FileWarning,
      accent: 'info',
    },
  ];

  function handleViewDetails(record: AttendanceRecord) {
    setSelectedRecord(record);
    setDrawerOpen(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance"
        description="Track and manage daily attendance for students and staff. Mark attendance, review records, manage exceptions and leave requests, and monitor attendance trends across the school."
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statItems.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mark" className="flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" />
            Mark Attendance
          </TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="exceptions" className="flex items-center gap-1.5">
            Exceptions
            {openExceptions.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
                {openExceptions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="mark">
          <MarkAttendanceTab />
        </TabsContent>
        <TabsContent value="students">
          <StudentAttendanceTab onViewDetails={handleViewDetails} />
        </TabsContent>
        <TabsContent value="staff">
          <StaffAttendanceTab onViewDetails={handleViewDetails} />
        </TabsContent>
        <TabsContent value="exceptions">
          <ExceptionsLeavesTab />
        </TabsContent>
        <TabsContent value="trends">
          <TrendsTab />
        </TabsContent>
        <TabsContent value="activity">
          <AttendanceActivityTab />
        </TabsContent>
      </Tabs>

      <AttendanceDetailDrawer
        record={selectedRecord}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
