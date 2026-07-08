'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserPlus, UserCheck, TrendingUp, ArrowRightLeft, FileCheck, Calendar, Briefcase, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Clock } from 'lucide-react';
import { AlertSeverityBadge } from './badges';
import { formatStaffDateTime } from '../services/staff';
import type { StaffActivityEvent } from '../types';

interface StaffActivityTabProps {
  activityEvents: StaffActivityEvent[];
}

const eventIcons: Record<string, React.ElementType> = {
  'Staff Created': UserPlus,
  'Staff Joined': UserCheck,
  'Promotion Processed': TrendingUp,
  'Transfer Completed': ArrowRightLeft,
  'Leave Approved': Calendar,
  'Contract Renewed': Briefcase,
  'Document Verified': FileCheck,
  'Training Completed': CheckCircle2,
  'Performance Review': TrendingUp,
  'Resignation Accepted': UserCheck,
  'Exit Processed': UserCheck,
  'Profile Updated': UserCheck,
};

export function StaffActivityTab({ activityEvents }: StaffActivityTabProps) {
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
          <CardTitle className="text-lg">Staff Activity Timeline</CardTitle>
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
                          <span>{formatStaffDateTime(event.timestamp)}</span>
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
