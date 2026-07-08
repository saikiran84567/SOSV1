'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, MoveHorizontal as MoreHorizontal, Eye, CreditCard as Edit, Send, Archive, Circle as XCircle, Filter } from 'lucide-react';
import { HomeworkStatusBadge, PriorityBadge, TaskTypeBadge } from './badges';
import { formatHomeworkDate } from '../services/homework';
import type { HomeworkTask, HomeworkTaskType, HomeworkStatus, PriorityLevel } from '../types';
import { toast } from 'sonner';

interface TasksTabProps {
  tasks: HomeworkTask[];
  onViewTask: (task: HomeworkTask) => void;
}

const taskTypes: HomeworkTaskType[] = [
  'Homework',
  'Assignment',
  'Project',
  'Worksheet',
  'Reading',
  'Practice',
  'Revision',
  'Activity',
];

const statuses: HomeworkStatus[] = [
  'Draft',
  'Scheduled',
  'Published',
  'In Progress',
  'Due Today',
  'Overdue',
  'Closed',
  'Archived',
];

const priorities: PriorityLevel[] = ['Low', 'Medium', 'High', 'Critical'];

export function TasksTab({ tasks, onViewTask }: TasksTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [teacherFilter, setTeacherFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [taskTypeFilter, setTaskTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const subjects = useMemo(() => {
    const unique = [...new Set(tasks.map((t) => t.subjectName))];
    return unique.sort();
  }, [tasks]);

  const teachers = useMemo(() => {
    const unique = [...new Set(tasks.map((t) => t.teacherName))];
    return unique.sort();
  }, [tasks]);

  const classes = useMemo(() => {
    const unique = [...new Set(tasks.map((t) => `${t.classGradeName} - ${t.sectionName}`))];
    return unique.sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !task.title.toLowerCase().includes(query) &&
          !task.subjectName.toLowerCase().includes(query) &&
          !task.teacherName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (subjectFilter !== 'all' && task.subjectName !== subjectFilter) return false;
      if (teacherFilter !== 'all' && task.teacherName !== teacherFilter) return false;
      if (classFilter !== 'all' && `${task.classGradeName} - ${task.sectionName}` !== classFilter)
        return false;
      if (taskTypeFilter !== 'all' && task.taskType !== taskTypeFilter) return false;
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      return true;
    });
  }, [
    tasks,
    searchQuery,
    subjectFilter,
    teacherFilter,
    classFilter,
    taskTypeFilter,
    statusFilter,
    priorityFilter,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSubjectFilter('all');
    setTeacherFilter('all');
    setClassFilter('all');
    setTaskTypeFilter('all');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const hasFilters =
    searchQuery ||
    subjectFilter !== 'all' ||
    teacherFilter !== 'all' ||
    classFilter !== 'all' ||
    taskTypeFilter !== 'all' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all';

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg">Homework Tasks ({filteredTasks.length})</CardTitle>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          <div className="relative col-span-2 md:col-span-1 lg:col-span-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
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
          <Select value={teacherFilter} onValueChange={setTeacherFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {teachers.map((teacher) => (
                <SelectItem key={teacher} value={teacher}>
                  {teacher}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={taskTypeFilter} onValueChange={setTaskTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {taskTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Task</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-center">Submissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{task.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {task.campusName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{task.subjectName}</TableCell>
                    <TableCell>{task.teacherName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {task.classGradeName} - {task.sectionName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <TaskTypeBadge taskType={task.taskType} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatHomeworkDate(task.assignedDate)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatHomeworkDate(task.dueDate)}
                    </TableCell>
                    <TableCell>
                      <HomeworkStatusBadge status={task.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={task.priority} />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">
                          {task.submissionCount}/{task.totalStudents}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {task.reviewedCount} reviewed
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewTask(task)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Task
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.info('Edit Task - Coming soon')}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => toast.info('Close Task - Coming soon')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Close Task
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.info('Archive Task - Coming soon')}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Archive Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
