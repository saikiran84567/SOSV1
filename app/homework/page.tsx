'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Clock,
  Eye,
  Users,
  TrendingUp,
  Activity,
  BookOpen,
} from 'lucide-react';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/homework/components/overview-tab';
import { TasksTab } from '@/domains/homework/components/tasks-tab';
import { TaskDetailDrawer } from '@/domains/homework/components/task-detail-drawer';
import { SubmissionsTab } from '@/domains/homework/components/submissions-tab';
import { ReviewsTab } from '@/domains/homework/components/reviews-tab';
import { ProgressTab } from '@/domains/homework/components/progress-tab';
import { TemplatesTab } from '@/domains/homework/components/templates-tab';
import { ActivityTab } from '@/domains/homework/components/activity-tab';
import { calculateHomeworkStats } from '@/domains/homework/services/homework';
import {
  homeworkTasks,
  homeworkAttachments,
  homeworkSubmissions,
  homeworkReviews,
  homeworkClassSummaries,
  homeworkSubjectSummaries,
  homeworkStudentProgress,
  homeworkAlerts,
  homeworkActivityEvents,
  taskChecklistItems,
  learningTaskTemplates,
} from '@/domains/homework/mock-data/homework';
import type { HomeworkTask } from '@/domains/homework/types';

export default function HomeworkPage() {
  const [selectedTask, setSelectedTask] = useState<HomeworkTask | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = calculateHomeworkStats({
    tasks: homeworkTasks,
    submissions: homeworkSubmissions,
    studentProgress: homeworkStudentProgress,
  });

  const handleViewTask = (task: HomeworkTask) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homework & Learning Tasks"
        description="Manage assignments, track due dates, monitor submissions, review student work, and analyze task completion progress across classes and subjects."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          stat={{
            label: 'Active Tasks',
            value: String(stats.activeTasks),
            icon: FileText,
            accent: 'primary',
          }}
        />
        <StatCard
          stat={{
            label: 'Due Today',
            value: String(stats.dueToday),
            icon: Clock,
            accent: 'warning',
          }}
        />
        <StatCard
          stat={{
            label: 'Overdue',
            value: String(stats.overdue),
            icon: Clock,
            accent: 'destructive',
          }}
        />
        <StatCard
          stat={{
            label: 'Submission Rate',
            value: `${stats.averageSubmissionRate}%`,
            icon: Users,
            accent: 'info',
          }}
        />
        <StatCard
          stat={{
            label: 'Pending Reviews',
            value: String(stats.pendingReviews),
            icon: Eye,
            accent: 'warning',
          }}
        />
        <StatCard
          stat={{
            label: 'Completion',
            value: `${stats.averageCompletionPercentage}%`,
            icon: TrendingUp,
            accent: 'success',
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
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="submissions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Submissions</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            stats={stats}
            alerts={homeworkAlerts}
            classSummaries={homeworkClassSummaries}
            subjectSummaries={homeworkSubjectSummaries}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <TasksTab
            tasks={homeworkTasks}
            onViewTask={handleViewTask}
          />
        </TabsContent>

        <TabsContent value="submissions">
          <SubmissionsTab
            submissions={homeworkSubmissions}
            tasks={homeworkTasks}
          />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab
            submissions={homeworkSubmissions}
            reviews={homeworkReviews}
            tasks={homeworkTasks}
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTab
            studentProgress={homeworkStudentProgress}
            classSummaries={homeworkClassSummaries}
            subjectSummaries={homeworkSubjectSummaries}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesTab templates={learningTaskTemplates} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab activityEvents={homeworkActivityEvents} />
        </TabsContent>
      </Tabs>

      {/* Task Detail Drawer */}
      <TaskDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        task={selectedTask}
        attachments={homeworkAttachments}
        submissions={homeworkSubmissions}
        checklists={taskChecklistItems}
      />
    </div>
  );
}
