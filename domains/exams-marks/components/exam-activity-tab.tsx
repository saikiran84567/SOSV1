'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileCheck, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, FileText, Archive, Eye, Clock } from 'lucide-react';
import {
  examActivityEvents,
} from '@/domains/exams-marks/mock-data/exams-marks';
import { formatExamDateTime } from '@/domains/exams-marks/services/exams-marks';

const eventTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Exam Session Created': Calendar,
  'Schedule Published': FileCheck,
  'Marks Entry Opened': FileText,
  'Marks Submitted': CheckCircle,
  'Marks Verified': CheckCircle,
  'Result Review Started': Eye,
  'Report Card Blocker Added': AlertTriangle,
  'Session Archived': Archive,
};

const severityColors: Record<string, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  critical: 'bg-destructive',
};

function formatEventTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
}

export function ExamActivityTab() {
  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof examActivityEvents> = {
      today: [],
      earlier: [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    examActivityEvents.forEach((event) => {
      const eventDate = new Date(event.timestamp);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        groups.today.push(event);
      } else {
        groups.earlier.push(event);
      }
    });

    return groups;
  }, []);

  const stats = useMemo(() => {
    const counts = {
      total: examActivityEvents.length,
      info: 0,
      success: 0,
      warning: 0,
      critical: 0,
    };
    examActivityEvents.forEach((e) => counts[e.severity]++);
    return counts;
  }, []);

  const eventTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    examActivityEvents.forEach((e) => {
      counts[e.eventType] = (counts[e.eventType] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2.5">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.success}</p>
                <p className="text-xs text-muted-foreground">Success Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2.5">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.warning}</p>
                <p className="text-xs text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2.5">
                <Eye className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.info}</p>
                <p className="text-xs text-muted-foreground">Info Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(eventTypeCounts).map(([type, count]) => {
              const Icon = eventTypeIcons[type] || Clock;
              return (
                <div key={type} className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30">
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{type}</p>
                    <p className="text-xs text-muted-foreground">{count} events</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {/* Today */}
        {groupedEvents.today.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Today
              <Badge variant="secondary" className="ml-1">
                {groupedEvents.today.length}
              </Badge>
            </h3>
            <div className="space-y-3">
              {groupedEvents.today.map((event) => {
                const Icon = eventTypeIcons[event.eventType] || Clock;
                return (
                  <Card key={event.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 rounded-lg p-2 ${
                          event.severity === 'success'
                            ? 'bg-success/10'
                            : event.severity === 'warning'
                            ? 'bg-warning/10'
                            : event.severity === 'critical'
                            ? 'bg-destructive/10'
                            : 'bg-info/10'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            event.severity === 'success'
                              ? 'text-success'
                              : event.severity === 'warning'
                              ? 'text-warning'
                              : event.severity === 'critical'
                              ? 'text-destructive'
                              : 'text-info'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-foreground">{event.title}</p>
                            <Badge
                              variant="outline"
                              className={`shrink-0 text-xs ${
                                event.severity === 'critical'
                                  ? 'border-destructive/20 text-destructive'
                                  : event.severity === 'warning'
                                  ? 'border-warning/20 text-warning'
                                  : event.severity === 'success'
                                  ? 'border-success/20 text-success'
                                  : 'border-info/20 text-info'
                              }`}
                            >
                              {event.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{event.actor}</span>
                            <span>|</span>
                            <span>{formatEventTimestamp(event.timestamp)}</span>
                            <span>|</span>
                            <span>{event.relatedEntity.name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Earlier */}
        {groupedEvents.earlier.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-muted-foreground" />
              Earlier
              <Badge variant="secondary" className="ml-1">
                {groupedEvents.earlier.length}
              </Badge>
            </h3>
            <div className="space-y-3">
              {groupedEvents.earlier.map((event) => {
                const Icon = eventTypeIcons[event.eventType] || Clock;
                return (
                  <Card key={event.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 rounded-lg p-2 ${
                          event.severity === 'success'
                            ? 'bg-success/10'
                            : event.severity === 'warning'
                            ? 'bg-warning/10'
                            : event.severity === 'critical'
                            ? 'bg-destructive/10'
                            : 'bg-info/10'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            event.severity === 'success'
                              ? 'text-success'
                              : event.severity === 'warning'
                              ? 'text-warning'
                              : event.severity === 'critical'
                              ? 'text-destructive'
                              : 'text-info'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-foreground">{event.title}</p>
                            <Badge
                              variant="outline"
                              className={`shrink-0 text-xs ${
                                event.severity === 'critical'
                                  ? 'border-destructive/20 text-destructive'
                                  : event.severity === 'warning'
                                  ? 'border-warning/20 text-warning'
                                  : event.severity === 'success'
                                  ? 'border-success/20 text-success'
                                  : 'border-info/20 text-info'
                              }`}
                            >
                              {event.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{event.actor}</span>
                            <span>|</span>
                            <span>{formatExamDateTime(event.timestamp)}</span>
                            <span>|</span>
                            <span>{event.relatedEntity.name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* All Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Exam Activity Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {examActivityEvents.map((event) => {
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`shrink-0 h-2 w-2 rounded-full ${severityColors[event.severity]}`} />
                    <p className="text-sm truncate">{event.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                    <span>{event.actor}</span>
                    <span>{formatEventTimestamp(event.timestamp)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
