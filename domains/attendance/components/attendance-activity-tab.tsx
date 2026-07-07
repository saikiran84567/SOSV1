'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  UserCheck,
  CalendarCheck,
  FileWarning,
  Lock,
  Bell,
  Mail,
} from 'lucide-react';
import { attendanceActivityEvents } from '@/domains/attendance/mock-data/attendance';
import type { AttendanceActivityEvent } from '@/domains/attendance/types';

const severityConfig = {
  info: {
    icon: Info,
    bg: 'bg-info/10',
    color: 'text-info',
    border: 'border-info/20',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-success/10',
    color: 'text-success',
    border: 'border-success/20',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-warning/10',
    color: 'text-warning',
    border: 'border-warning/20',
  },
  critical: {
    icon: XCircle,
    bg: 'bg-destructive/10',
    color: 'text-destructive',
    border: 'border-destructive/20',
  },
};

const eventTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Student Attendance Submitted': CheckCircle,
  'Staff Attendance Submitted': UserCheck,
  'Late Arrival Flagged': AlertTriangle,
  'Leave Request Approved': CalendarCheck,
  'Leave Request Rejected': XCircle,
  'Attendance Correction Requested': FileWarning,
  'Session Locked': Lock,
  'Session Approved': CheckCircle,
  'Exception Resolved': CheckCircle,
  'Guardian Notification Queued': Bell,
};

const entityTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  student: UserCheck,
  staff: UserCheck,
  session: CalendarCheck,
  exception: FileWarning,
  leave: Mail,
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function ActivityItem({ event }: { event: AttendanceActivityEvent }) {
  const config = severityConfig[event.severity];
  const Icon = config.icon;
  const EventIcon = eventTypeIcons[event.eventType] || Info;
  const EntityIcon = entityTypeIcons[event.relatedEntity.type] || UserCheck;

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
      <div className={`shrink-0 rounded-lg p-2 ${config.bg}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <EventIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="text-sm font-medium text-foreground truncate">
              {event.title}
            </p>
          </div>
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
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTimestamp(event.timestamp)}</span>
          </div>
          <span>|</span>
          <span>by {event.actor}</span>
          <span>|</span>
          <div className="flex items-center gap-1.5">
            <EntityIcon className="h-3.5 w-3.5" />
            <span>{event.relatedEntity.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttendanceActivityTab() {
  const groupedEvents = useMemo(() => {
    const groups: Record<string, AttendanceActivityEvent[]> = {
      today: [],
      yesterday: [],
      earlier: [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    attendanceActivityEvents.forEach((event) => {
      const eventDate = new Date(event.timestamp);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        groups.today.push(event);
      } else if (eventDate.getTime() === yesterday.getTime()) {
        groups.yesterday.push(event);
      } else {
        groups.earlier.push(event);
      }
    });

    return groups;
  }, []);

  const stats = useMemo(() => {
    const counts = {
      total: attendanceActivityEvents.length,
      info: 0,
      success: 0,
      warning: 0,
      critical: 0,
    };

    attendanceActivityEvents.forEach((e) => {
      counts[e.severity]++;
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
              <div className="rounded-lg bg-destructive/10 p-2.5">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.critical}</p>
                <p className="text-xs text-muted-foreground">Critical Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Type Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Breakdown by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(
              attendanceActivityEvents.reduce((acc, e) => {
                acc[e.eventType] = (acc[e.eventType] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([type, count]) => {
              const Icon = eventTypeIcons[type] || Info;
              return (
                <div
                  key={type}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30"
                >
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
              {groupedEvents.today.map((event) => (
                <ActivityItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Yesterday */}
        {groupedEvents.yesterday.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning" />
              Yesterday
              <Badge variant="secondary" className="ml-1">
                {groupedEvents.yesterday.length}
              </Badge>
            </h3>
            <div className="space-y-3">
              {groupedEvents.yesterday.map((event) => (
                <ActivityItem key={event.id} event={event} />
              ))}
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
              {groupedEvents.earlier.map((event) => (
                <ActivityItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Activity Events</CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete log of attendance-related activities
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attendanceActivityEvents.map((event) => {
              const config = severityConfig[event.severity];
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`shrink-0 h-2 w-2 rounded-full ${
                      event.severity === 'critical'
                        ? 'bg-destructive'
                        : event.severity === 'warning'
                        ? 'bg-warning'
                        : event.severity === 'success'
                        ? 'bg-success'
                        : 'bg-info'
                    }`} />
                    <p className="text-sm truncate">{event.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                    <span>{event.actor}</span>
                    <span>{formatTimestamp(event.timestamp)}</span>
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
