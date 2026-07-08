'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, MoveHorizontal as MoreHorizontal, Eye, CreditCard as Edit, Copy, Plus } from 'lucide-react';
import { TaskTypeBadge } from './badges';
import { formatDuration } from '../services/homework';
import type { LearningTaskTemplate } from '../types';
import { toast } from 'sonner';

interface TemplatesTabProps {
  templates: LearningTaskTemplate[];
}

export function TemplatesTab({ templates }: TemplatesTabProps) {
  const activeTemplates = templates.filter((t) => t.status === 'Active');
  const draftTemplates = templates.filter((t) => t.status === 'Draft');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Reusable learning task templates for quick assignment creation
          </p>
        </div>
        <Button onClick={() => toast.info('Create Template - Coming soon')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{draftTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Learning Task Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Template Name</TableHead>
                  <TableHead>Task Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Recommended For</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[250px]">Instructions Preview</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <p className="font-medium text-sm">{template.name}</p>
                    </TableCell>
                    <TableCell>
                      <TaskTypeBadge taskType={template.taskType} />
                    </TableCell>
                    <TableCell className="text-sm">{template.subjectName}</TableCell>
                    <TableCell className="text-sm">
                      {formatDuration(template.suggestedDurationMinutes)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {template.recommendedForLevels.slice(0, 3).map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                        {template.recommendedForLevels.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.recommendedForLevels.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          template.status === 'Active'
                            ? 'default'
                            : template.status === 'Draft'
                            ? 'outline'
                            : 'outline'
                        }
                      >
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.instructionsTemplate}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              toast.info('View Template - Coming soon')
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.info('Edit Template - Coming soon')
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.success('Template duplicated!')
                            }
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
