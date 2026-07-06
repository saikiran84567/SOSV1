'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/shared/components/empty-state';
import { timelineEvents } from '@/domains/student-lifecycle/mock-data/students';
import { formatStudentDateTime } from '@/domains/student-lifecycle/services/student-lifecycle';
import type { StudentTimelineEvent } from '@/domains/student-lifecycle/types';

const severityConfig: Record<StudentTimelineEvent['severity'], { dot: string; label: string }> = {
  info: { dot: 'bg-info', label: 'text-info' },
  success: { dot: 'bg-success', label: 'text-success' },
  warning: { dot: 'bg-warning', label: 'text-warning' },
  critical: { dot: 'bg-destructive', label: 'text-destructive' },
};

export function TimelineTab() {
  const sorted = [...timelineEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          {sorted.length === 0 ? (
            <EmptyState
              title="No timeline events"
              description="Lifecycle activity will appear here as students move through the admission and enrollment process."
            />
          ) : (
            <div className="space-y-0">
              {sorted.map((event, idx) => {
                const config = severityConfig[event.severity];
                const isLast = idx === sorted.length - 1;
                return (
                  <div key={event.id} className="flex gap-4">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full ${config.dot} shrink-0 mt-1.5`} />
                      {!isLast && <div className="w-px flex-1 bg-border min-h-[60px]" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {event.studentName.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {event.eventType}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {event.studentName}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium ${config.label} shrink-0`}>
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{formatStudentDateTime(event.timestamp)}</span>
                        <span>·</span>
                        <span>by {event.actor}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing {sorted.length} lifecycle events
      </p>
    </div>
  );
}
