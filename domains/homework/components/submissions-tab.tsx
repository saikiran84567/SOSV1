'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, Filter, MessageSquare, CircleCheck as CheckCircle2, RefreshCw, Circle as XCircle } from 'lucide-react';
import { SubmissionStatusBadge, ReviewStatusBadge } from './badges';
import { formatHomeworkDateTime, getLateSubmissionLabel } from '../services/homework';
import type { HomeworkSubmission, HomeworkTask, ReviewStatus } from '../types';
import { toast } from 'sonner';

interface SubmissionsTabProps {
  submissions: HomeworkSubmission[];
  tasks: HomeworkTask[];
}

const reviewStatuses: ReviewStatus[] = [
  'Not Reviewed',
  'In Review',
  'Reviewed',
  'Returned',
  'Rework Required',
];

export function SubmissionsTab({ submissions, tasks }: SubmissionsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [taskFilter, setTaskFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<string>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<HomeworkSubmission | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [selectedReviewStatus, setSelectedReviewStatus] = useState<ReviewStatus>('Not Reviewed');

  const tasksMap = useMemo(() => {
    return new Map(tasks.map((t) => [t.id, t]));
  }, [tasks]);

  const subjects = useMemo(() => {
    const unique = [...new Set(tasks.map((t) => t.subjectName))];
    return unique.sort();
  }, [tasks]);

  const taskTitles = useMemo(() => {
    return tasks.map((t) => ({ id: t.id, title: t.title }));
  }, [tasks]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const task = tasksMap.get(sub.taskId);
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !sub.studentName.toLowerCase().includes(query) &&
          !sub.admissionNumber.toLowerCase().includes(query) &&
          !sub.rollNumber.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (taskFilter !== 'all' && sub.taskId !== taskFilter) return false;
      if (subjectFilter !== 'all' && task?.subjectName !== subjectFilter) return false;
      if (submissionStatusFilter !== 'all' && sub.status !== submissionStatusFilter) return false;
      if (reviewStatusFilter !== 'all' && sub.reviewStatus !== reviewStatusFilter) return false;
      return true;
    });
  }, [
    submissions,
    tasksMap,
    searchQuery,
    taskFilter,
    subjectFilter,
    submissionStatusFilter,
    reviewStatusFilter,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setTaskFilter('all');
    setSubjectFilter('all');
    setSubmissionStatusFilter('all');
    setReviewStatusFilter('all');
  };

  const hasFilters =
    searchQuery ||
    taskFilter !== 'all' ||
    subjectFilter !== 'all' ||
    submissionStatusFilter !== 'all' ||
    reviewStatusFilter !== 'all';

  const openReviewDialog = (submission: HomeworkSubmission) => {
    setSelectedSubmission(submission);
    setReviewFeedback(submission.feedbackSnippet || '');
    setSelectedReviewStatus(submission.reviewStatus);
    setReviewDialogOpen(true);
  };

  const handleSaveReview = () => {
    if (!selectedSubmission) return;
    toast.success(`Review saved for ${selectedSubmission.studentName}`);
    setReviewDialogOpen(false);
    setSelectedSubmission(null);
    setReviewFeedback('');
  };

  const handleMarkReviewed = (submission: HomeworkSubmission) => {
    toast.success(`Marked as reviewed for ${submission.studentName}`);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">Submissions ({filteredSubmissions.length})</CardTitle>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
            <div className="relative col-span-2 md:col-span-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={taskFilter} onValueChange={setTaskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                {taskTitles.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title.length > 30 ? task.title.slice(0, 30) + '...' : task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={submissionStatusFilter} onValueChange={setSubmissionStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {['Submitted', 'Late Submission', 'Not Submitted', 'Missing', 'Excused'].map(
                  (status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Select value={reviewStatusFilter} onValueChange={setReviewStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Review" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                {reviewStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No submissions found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Student</TableHead>
                    <TableHead>Admission</TableHead>
                    <TableHead className="min-w-[150px]">Task</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead className="text-center">Files</TableHead>
                    <TableHead>Late By</TableHead>
                    <TableHead className="min-w-[150px]">Feedback</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((sub) => {
                    const task = tasksMap.get(sub.taskId);
                    return (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{sub.studentName}</p>
                            <p className="text-xs text-muted-foreground">{sub.rollNumber}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{sub.admissionNumber}</TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-1">
                            {task?.title || 'Unknown Task'}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm">{task?.subjectName}</TableCell>
                        <TableCell className="text-sm">
                          {sub.submittedAt ? formatHomeworkDateTime(sub.submittedAt) : '-'}
                        </TableCell>
                        <TableCell>
                          <SubmissionStatusBadge status={sub.status} />
                        </TableCell>
                        <TableCell>
                          <ReviewStatusBadge status={sub.reviewStatus} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-xs">
                            {sub.attachmentCount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {getLateSubmissionLabel(sub.lateByMinutes)}
                        </TableCell>
                        <TableCell>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {sub.feedbackSnippet || '-'}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openReviewDialog(sub)}
                              title="Add/Edit Review"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            {sub.status === 'Submitted' && sub.reviewStatus === 'Not Reviewed' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkReviewed(sub)}
                                title="Mark as Reviewed"
                              >
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Submission</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.studentName} - {tasksMap.get(selectedSubmission?.taskId || '')?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Review Status</label>
              <Select
                value={selectedReviewStatus}
                onValueChange={(val) => setSelectedReviewStatus(val as ReviewStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reviewStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Feedback</label>
              <Textarea
                placeholder="Enter your feedback..."
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveReview}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Save Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
