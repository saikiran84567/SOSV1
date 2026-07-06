'use client';

import { useState } from 'react';
import { Users, UserCheck, FileText, FileWarning, Award, ArrowRightLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/student-lifecycle/components/overview-tab';
import { StudentsTab } from '@/domains/student-lifecycle/components/students-tab';
import { AdmissionsPipelineTab } from '@/domains/student-lifecycle/components/admissions-pipeline-tab';
import { EnrollmentTab } from '@/domains/student-lifecycle/components/enrollment-tab';
import { GuardiansTab } from '@/domains/student-lifecycle/components/guardians-tab';
import { DocumentsTab } from '@/domains/student-lifecycle/components/documents-tab';
import { TimelineTab } from '@/domains/student-lifecycle/components/timeline-tab';
import { StudentProfileDrawer } from '@/domains/student-lifecycle/components/student-profile-drawer';
import { students, admissionApplications } from '@/domains/student-lifecycle/mock-data/students';
import { calculateLifecycleStats } from '@/domains/student-lifecycle/services/student-lifecycle';
import type { StatItem } from '@/shared/types';
import type { StudentRecord } from '@/domains/student-lifecycle/types';

export default function StudentLifecyclePage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = calculateLifecycleStats(students, admissionApplications);

  const statItems: StatItem[] = [
    {
      label: 'Total Records',
      value: String(stats.totalRecords),
      change: 'Across all lifecycle stages',
      trend: 'neutral',
      icon: Users,
      accent: 'primary',
    },
    {
      label: 'Active Students',
      value: String(stats.activeStudents),
      change: 'Currently enrolled',
      trend: 'up',
      icon: UserCheck,
      accent: 'success',
    },
    {
      label: 'Applicants',
      value: String(stats.applicants),
      change: 'Inquiries + applications',
      trend: 'up',
      icon: FileText,
      accent: 'info',
    },
    {
      label: 'Pending Documents',
      value: String(stats.pendingDocuments),
      change: 'Awaiting submission',
      trend: 'down',
      icon: FileWarning,
      accent: 'warning',
    },
    {
      label: 'Offers Issued',
      value: String(stats.offersIssued),
      change: 'Awaiting acceptance',
      trend: 'neutral',
      icon: Award,
      accent: 'primary',
    },
    {
      label: 'Transfers/Withdrawals',
      value: String(stats.transfersWithdrawals),
      change: 'This academic year',
      trend: 'neutral',
      icon: ArrowRightLeft,
      accent: 'destructive',
    },
  ];

  function handleSelectStudent(student: StudentRecord) {
    setSelectedStudent(student);
    setDrawerOpen(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Lifecycle"
        description="Manage the complete student journey from inquiry and admission to enrollment, active schooling, transfer, withdrawal, and alumni records. Track guardians, documents, class assignments, and lifecycle events."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statItems.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="pipeline">Admissions Pipeline</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="guardians">Guardians</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="students">
          <StudentsTab onSelectStudent={handleSelectStudent} />
        </TabsContent>
        <TabsContent value="pipeline">
          <AdmissionsPipelineTab />
        </TabsContent>
        <TabsContent value="enrollment">
          <EnrollmentTab />
        </TabsContent>
        <TabsContent value="guardians">
          <GuardiansTab />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineTab />
        </TabsContent>
      </Tabs>

      <StudentProfileDrawer
        student={selectedStudent}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
