'use client';

import { Building2, CalendarDays, GraduationCap, Briefcase, Users, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/school-setup/components/overview-tab';
import { SchoolProfileTab } from '@/domains/school-setup/components/school-profile-tab';
import { AcademicYearsTab } from '@/domains/school-setup/components/academic-years-tab';
import { CampusesTab } from '@/domains/school-setup/components/campuses-tab';
import { DepartmentsTab } from '@/domains/school-setup/components/departments-tab';
import { ClassesSectionsTab } from '@/domains/school-setup/components/classes-sections-tab';
import { CalendarHolidaysTab } from '@/domains/school-setup/components/calendar-holidays-tab';
import { ConfigurationTab } from '@/domains/school-setup/components/configuration-tab';
import { campuses } from '@/domains/school-setup/mock-data/campuses';
import { academicYears } from '@/domains/school-setup/mock-data/academic-years';
import { departments } from '@/domains/school-setup/mock-data/departments';
import { classGrades } from '@/domains/school-setup/mock-data/classes';
import { setupChecklist } from '@/domains/school-setup/mock-data/school-profile';
import {
  calculateSetupCompletion,
  getCurrentAcademicYear,
  getTotalCapacity,
} from '@/domains/school-setup/services/school-setup';
import type { StatItem } from '@/shared/types';

export default function SchoolSetupPage() {
  const currentYear = getCurrentAcademicYear(academicYears);
  const completion = calculateSetupCompletion(setupChecklist);
  const totalCapacity = getTotalCapacity(classGrades);

  const stats: StatItem[] = [
    {
      label: 'Campuses',
      value: String(campuses.length),
      change: 'Main + 1 branch',
      trend: 'neutral',
      icon: Building2,
      accent: 'primary',
    },
    {
      label: 'Active Academic Year',
      value: currentYear?.name.split(' ').slice(-1)[0] ?? '—',
      change: currentYear?.status === 'active' ? 'Currently active' : 'Not set',
      trend: currentYear?.status === 'active' ? 'up' : 'down',
      icon: CalendarDays,
      accent: 'success',
    },
    {
      label: 'Classes',
      value: String(classGrades.length),
      change: 'Nursery to Grade 12',
      trend: 'neutral',
      icon: GraduationCap,
      accent: 'info',
    },
    {
      label: 'Departments',
      value: String(departments.length),
      change: 'Academic + administrative',
      trend: 'neutral',
      icon: Briefcase,
      accent: 'warning',
    },
    {
      label: 'Total Capacity',
      value: totalCapacity.toLocaleString('en-IN'),
      change: 'Across all classes',
      trend: 'neutral',
      icon: Users,
      accent: 'primary',
    },
    {
      label: 'Setup Completion',
      value: `${completion.percentage}%`,
      change: `${completion.completed} of ${completion.total} steps done`,
      trend: completion.percentage >= 50 ? 'up' : 'down',
      icon: CheckCircle2,
      accent: completion.percentage >= 50 ? 'success' : 'destructive',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="School Setup"
        description="Configure your institution profile, academic years, campuses, departments, classes, and system configuration. This module is the backbone for all other SOS domains."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">School Profile</TabsTrigger>
          <TabsTrigger value="years">Academic Years</TabsTrigger>
          <TabsTrigger value="campuses">Campuses</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="classes">Classes & Sections</TabsTrigger>
          <TabsTrigger value="calendar">Calendar & Holidays</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="profile">
          <SchoolProfileTab />
        </TabsContent>
        <TabsContent value="years">
          <AcademicYearsTab />
        </TabsContent>
        <TabsContent value="campuses">
          <CampusesTab />
        </TabsContent>
        <TabsContent value="departments">
          <DepartmentsTab />
        </TabsContent>
        <TabsContent value="classes">
          <ClassesSectionsTab />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarHolidaysTab />
        </TabsContent>
        <TabsContent value="configuration">
          <ConfigurationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
