'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, User, MapPin, BookOpen, Users, Paperclip, FileText, CircleCheck as CheckCircle2 } from 'lucide-react';
import { HomeworkStatusBadge, PriorityBadge, TaskTypeBadge } from './badges';
import { formatHomeworkDate, formatHomeworkDateTime, formatDuration } from '../services/homework';
import type { HomeworkTask, HomeworkAttachment, HomeworkSubmission, TaskChecklistItem } from '../types';

interface TaskDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: HomeworkTask | null;
  attachments: HomeworkAttachment[];
  submissions: HomeworkSubmission[];
  checklists: TaskChecklistItem[];
}

export function TaskDetailDrawer({
  open,
  onOpenChange,
  task,
  attachments,
  submissions,
  checklists,
}: TaskDetailDrawerProps) {
  if (!task) return null;

  const taskAttachments = attachments.filter((a) => a.taskId === task.id);
  const taskSubmissions = submissions.filter((s) => s.taskId === task.id);
  const taskChecklists = checklists.filter((c) => c.taskId === task.id);
  const submissionRate = task.totalStudents > 0
    ? Math.round((task.submissionCount / task.totalStudents) * 100)
    : 0;
  const reviewRate = task.submissionCount > 0
    ? Math.round((task.reviewedCount / task.submissionCount) * 100)
    : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <SheetTitle className="text-lg line-clamp-2">{task.title}</SheetTitle>
              <SheetDescription className="mt-1">
                {task.subjectName} | {task.classGradeName} - {task.sectionName}
              </SheetDescription>
            </div>
            <TaskTypeBadge taskType={task.taskType} />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-6">
            {/* Status and Priority */}
            <div className="flex flex-wrap gap-2">
              <HomeworkStatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
              {task.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Subject</p>
                    <p className="text-sm font-medium">{task.subjectName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Teacher</p>
                    <p className="text-sm font-medium">{task.teacherName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Class</p>
                    <p className="text-sm font-medium">
                      {task.classGradeName} - {task.sectionName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Campus</p>
                    <p className="text-sm font-medium">{task.campusName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Duration</p>
                    <p className="text-sm font-medium">{formatDuration(task.estimatedDurationMinutes)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Academic Year</p>
                    <p className="text-sm font-medium">{task.academicYearName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Assigned</p>
                  <p className="text-sm font-medium">{formatHomeworkDate(task.assignedDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="text-sm font-medium">{formatHomeworkDate(task.dueDate)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Instructions</h4>
              <p className="text-sm text-muted-foreground">{task.instructions}</p>
            </div>

            {/* Attachments */}
            {taskAttachments.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">
                      Attachments ({taskAttachments.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {taskAttachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{att.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {att.type} | {att.sizeLabel}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {att.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Submission Summary */}
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-3">Submission Summary</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-2xl font-bold">
                    {task.submissionCount}/{task.totalStudents}
                  </p>
                  <p className="text-xs text-muted-foreground">Submissions</p>
                  <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${submissionRate}%` }} />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-2xl font-bold">{task.reviewedCount}</p>
                  <p className="text-xs text-muted-foreground">Reviewed</p>
                  <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${reviewRate}%` }} />
                  </div>
                </div>
              </div>

              {taskSubmissions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Recent Submissions</p>
                  {taskSubmissions.slice(0, 5).map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/30 text-sm"
                    >
                      <div>
                        <p className="font-medium">{sub.studentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {sub.submittedAt ? formatHomeworkDateTime(sub.submittedAt) : 'Not submitted'}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          {sub.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {sub.reviewStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checklist */}
            {taskChecklists.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Checklist</h4>
                  </div>
                  <div className="space-y-2">
                    {taskChecklists.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-md text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              item.completed
                                ? 'bg-success border-success text-success-foreground'
                                : 'border-muted-foreground'
                            }`}
                          >
                            {item.completed && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                          <span
                            className={
                              item.completed ? 'text-muted-foreground line-through' : ''
                            }
                          >
                            {item.label}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.owner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Metadata */}
            <Separator />
            <div className="text-xs text-muted-foreground">
              <p>Created: {formatHomeworkDateTime(task.createdAt)}</p>
              <p>Updated: {formatHomeworkDateTime(task.updatedAt)}</p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
