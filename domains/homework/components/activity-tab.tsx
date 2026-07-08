'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Send, CircleCheck as CheckCircle2, Eye, TriangleAlert as AlertTriangle, Archive, RefreshCw, Clock } from 'lucide-react';
import { AlertSeverityBadge } from './badges';
import { formatHomeworkDateTime } from '../services/homework';
import type { HomeworkActivityEvent } from '../types';

interface ActivityTabProps {
  activityEvents: HomeworkActivityEvent[];
}

const eventIcons: Record<string, React.ElementType> = {
  'Task Created': FileText,
  'Task Published': Send,
  'Submission Received': CheckCircle2,
  'Review Completed': Eye,
  'Rework Requested': RefreshCw,
  'Task Overdue Alert': AlertTriangle,
  'Task Archived': Archive,
  'Task Closed': CheckCircle2,
  'Late Submission Received': Clock,
};

export function ActivityTab({ activityEvents }: ActivityTabProps) {
  const infoEvents = activityEvents.filter((e) => e.severity === 'Info');
  const warningEvents = activityEvents.filter((e) => e.severity === 'Warning');
  const recentEvents = [...activityEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{activityEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold">{warningEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Info Events</p>
                <p className="text-2xl font-bold">{infoEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Homework Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {recentEvents.map((event, index) => {
                  const Icon = eventIcons[event.eventType] || Clock;
                  return (
                    <div
                      key={event.id}
                      className="relative pl-10 pb-6"
                    >
                      <div
                        className={`absolute left-2 top-1 p-1.5 rounded-full ${
                          event.severity === 'Warning'
                            ? 'bg-warning/20'
                            : event.severity === 'Critical'
                            ? 'bg-destructive/20'
                            : 'bg-primary/20'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            event.severity === 'Warning'
                              ? 'text-warning'
                              : event.severity === 'Critical'
                              ? 'text-destructive'
                              : 'text-primary'
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{event.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {event.eventType}
                            </Badge>
                            <AlertSeverityBadge severity={event.severity} />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>by {event.actor}</span>
                          <span>{formatHomeworkDateTime(event.timestamp)}</span>
                        </div>
                        {event.relatedEntity && (
                          <Badge variant="secondary" className="text-xs">
                            {event.relatedEntity.type}: {event.relatedEntity.name}
                          </Badge>
                        )}
                      </div>
                      {index < recentEvents.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
