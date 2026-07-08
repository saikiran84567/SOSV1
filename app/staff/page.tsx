'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Briefcase,
  Building,
  TrendingUp,
  FileText,
  Activity,
  UserCheck,
} from 'lucide-react';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/staff/components/overview-tab';
import { StaffDirectoryTab } from '@/domains/staff/components/staff-directory-tab';
import { StaffProfileDrawer } from '@/domains/staff/components/staff-profile-drawer';
import { EmploymentTab } from '@/domains/staff/components/employment-tab';
import { DepartmentsTab } from '@/domains/staff/components/departments-tab';
import { WorkloadReadinessTab } from '@/domains/staff/components/workload-readiness-tab';
import { DocumentsIdentityTab } from '@/domains/staff/components/documents-identity-tab';
import { StaffActivityTab } from '@/domains/staff/components/staff-activity-tab';
import { calculateStaffStats } from '@/domains/staff/services/staff';
import {
  staffProfiles,
  staffDepartmentSummaries,
  staffEmploymentRecords,
  staffQualifications,
  staffCompensationSnapshots,
  staffWorkloadSnapshots,
  staffDocumentSummaries,
  staffLifecycleEvents,
  staffAlerts,
  staffActivityEvents,
  staffReportingLines,
  staffIdentitySummaries,
} from '@/domains/staff/mock-data/staff';
import type { StaffProfile } from '@/domains/staff/types';

export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState<StaffProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = calculateStaffStats(
    staffProfiles,
    staffWorkloadSnapshots,
    staffDocumentSummaries
  );

  const handleSelectStaff = (staff: StaffProfile) => {
    setSelectedStaff(staff);
    setDrawerOpen(true);
  };

  const selectedStaffIdentity = selectedStaff
    ? staffIdentitySummaries.find((i) => i.staffId === selectedStaff.id) || null
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        description="Manage employee profiles, track employment records, monitor workload distribution, verify documents, and analyze staff activity across departments and campuses."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          stat={{
            label: 'Total Staff',
            value: String(stats.totalStaff),
            icon: Users,
            accent: 'primary',
          }}
        />
        <StatCard
          stat={{
            label: 'Active',
            value: String(stats.activeStaff),
            icon: UserCheck,
            accent: 'success',
          }}
        />
        <StatCard
          stat={{
            label: 'On Leave',
            value: String(stats.onLeaveStaff),
            icon: Users,
            accent: 'warning',
          }}
        />
        <StatCard
          stat={{
            label: 'Teaching',
            value: String(stats.teachingStaff),
            icon: Users,
            accent: 'info',
          }}
        />
        <StatCard
          stat={{
            label: 'Avg Tenure',
            value: `${stats.averageTenureYears} yrs`,
            icon: TrendingUp,
            accent: 'info',
          }}
        />
        <StatCard
          stat={{
            label: 'Pending Docs',
            value: String(stats.pendingVerifications),
            icon: FileText,
            accent: 'warning',
          }}
        />
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full lg:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Directory</span>
          </TabsTrigger>
          <TabsTrigger value="employment" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Employment</span>
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Departments</span>
          </TabsTrigger>
          <TabsTrigger value="workload" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Workload</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            stats={stats}
            alerts={staffAlerts}
            departmentSummaries={staffDepartmentSummaries}
            staffProfiles={staffProfiles}
          />
        </TabsContent>

        <TabsContent value="directory">
          <StaffDirectoryTab
            staffProfiles={staffProfiles}
            onSelectStaff={handleSelectStaff}
          />
        </TabsContent>

        <TabsContent value="employment">
          <EmploymentTab
            employmentRecords={staffEmploymentRecords}
            lifecycleEvents={staffLifecycleEvents}
            staffProfiles={staffProfiles}
          />
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentsTab departmentSummaries={staffDepartmentSummaries} />
        </TabsContent>

        <TabsContent value="workload">
          <WorkloadReadinessTab workloadSnapshots={staffWorkloadSnapshots} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsIdentityTab
            documentSummaries={staffDocumentSummaries}
            identitySummaries={staffIdentitySummaries}
          />
        </TabsContent>

        <TabsContent value="activity">
          <StaffActivityTab activityEvents={staffActivityEvents} />
        </TabsContent>
      </Tabs>

      {/* Staff Profile Drawer */}
      <StaffProfileDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        staff={selectedStaff}
        qualifications={staffQualifications}
        workloads={staffWorkloadSnapshots}
        documents={staffDocumentSummaries}
        identity={selectedStaffIdentity}
      />
    </div>
  );
}
