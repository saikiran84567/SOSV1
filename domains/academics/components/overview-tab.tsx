'use client';

import { BookOpen, GitBranch, CalendarDays, Plus, Map, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/shared/components/section-header';
import { useToast } from '@/hooks/use-toast';
import { subjects, classSubjectMappings, timetables } from '@/domains/academics/mock-data/academics';
import { calculateAcademicStats, calculateTotalTeachingPeriods } from '@/domains/academics/services/academics';

const quickActions = [
  { label: 'Add Subject', icon: Plus, action: 'add-subject' },
  { label: 'Map Class Subjects', icon: Map, action: 'map-subjects' },
  { label: 'Create Timetable', icon: CalendarDays, action: 'create-timetable' },
];

const recentActivity = [
  { title: 'Timetable published for Grade 10 - Section A', time: '2 hours ago', actor: 'Arjun Mehta' },
  { title: 'Computer Science mapped to Grade 10', time: '5 hours ago', actor: 'Rebecca Thomas' },
  { title: 'Robotics subject created (Draft)', time: '1 day ago', actor: 'Meera Krishnan' },
  { title: 'Grade 12 Science subjects updated', time: '2 days ago', actor: 'Vikram Rao' },
  { title: 'Kannada language subject activated', time: '3 days ago', actor: 'Lakshmi Iyer' },
];

export function OverviewTab() {
  const { toast } = useToast();
  const stats = calculateAcademicStats(subjects, classSubjectMappings, timetables);
  const publishedTimetable = timetables.find((t) => t.status === 'Published');
  const totalPeriods = publishedTimetable ? calculateTotalTeachingPeriods(publishedTimetable) : 0;

  const subjectTypeBreakdown = [
    { type: 'Core', count: subjects.filter((s) => s.type === 'Core').length },
    { type: 'Elective', count: subjects.filter((s) => s.type === 'Elective').length },
    { type: 'Language', count: subjects.filter((s) => s.type === 'Language').length },
    { type: 'Co-curricular', count: subjects.filter((s) => s.type === 'Co-curricular').length },
    { type: 'Vocational', count: subjects.filter((s) => s.type === 'Vocational').length },
  ];

  function handleAction(action: string) {
    const labels: Record<string, string> = {
      'add-subject': 'Add Subject',
      'map-subjects': 'Map Class Subjects',
      'create-timetable': 'Create Timetable',
    };
    toast({
      title: labels[action] ?? 'Action triggered',
      description: 'This action will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Curriculum coverage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Curriculum Coverage</CardTitle>
            <p className="text-sm text-muted-foreground">
              Subject distribution across the academic curriculum
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {subjectTypeBreakdown.map((item) => (
                <div key={item.type} className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">{item.count}</p>
                  <p className="text-xs text-muted-foreground">subjects</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <GitBranch className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Mapped Classes</p>
                  <p className="text-sm font-medium text-foreground">{stats.mappedClasses} classes with subject mappings</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Clock className="h-5 w-5 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Weekly Periods</p>
                  <p className="text-sm font-medium text-foreground">{totalPeriods} teaching periods (Grade 10-A)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time} · {activity.actor}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <SectionHeader
          title="Quick Actions"
          description="Jump to common academic setup tasks"
        />
        <div className="grid gap-3 sm:grid-cols-3">
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
