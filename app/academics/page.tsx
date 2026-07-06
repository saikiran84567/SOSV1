'use client';

import { BookOpen, GitBranch, CalendarDays, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/academics/components/overview-tab';
import { SubjectsTab } from '@/domains/academics/components/subjects-tab';
import { ClassMappingTab } from '@/domains/academics/components/class-mapping-tab';
import { TimetablesTab } from '@/domains/academics/components/timetables-tab';
import { subjects, classSubjectMappings, timetables } from '@/domains/academics/mock-data/academics';
import { calculateAcademicStats } from '@/domains/academics/services/academics';
import type { StatItem } from '@/shared/types';

export default function AcademicsPage() {
  const stats = calculateAcademicStats(subjects, classSubjectMappings, timetables);

  const statItems: StatItem[] = [
    {
      label: 'Total Subjects',
      value: String(stats.totalSubjects),
      change: 'Active subjects',
      trend: 'neutral',
      icon: BookOpen,
      accent: 'primary',
    },
    {
      label: 'Mapped Classes',
      value: String(stats.mappedClasses),
      change: 'With subject mappings',
      trend: 'neutral',
      icon: GitBranch,
      accent: 'info',
    },
    {
      label: 'Published Timetables',
      value: String(stats.publishedTimetables),
      change: 'Currently active',
      trend: 'up',
      icon: CalendarDays,
      accent: 'success',
    },
    {
      label: 'Active Teachers',
      value: String(stats.activeTeachers),
      change: 'Placeholder metric',
      trend: 'neutral',
      icon: Users,
      accent: 'warning',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Academics"
        description="Manage academic curriculum structure including subjects, class-subject mappings, and weekly timetables. Define what is taught, map subjects to classes, and organize teaching schedules."
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statItems.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="mapping">Class Mapping</TabsTrigger>
          <TabsTrigger value="timetables">Timetables</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="subjects">
          <SubjectsTab />
        </TabsContent>
        <TabsContent value="mapping">
          <ClassMappingTab />
        </TabsContent>
        <TabsContent value="timetables">
          <TimetablesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
