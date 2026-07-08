'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Send, CreditCard, Gift, Award, TriangleAlert as AlertTriangle, Clock, CircleCheck as CheckCircle2, CircleX } from 'lucide-react';
import { FinanceAlertSeverityBadge } from './badges';
import { formatFinanceDateTime } from '../services/finance';
import type { FinanceActivityEvent } from '../types';

interface FinanceActivityTabProps {
  activityEvents: FinanceActivityEvent[];
}

const eventIcons: Record<string, React.ElementType> = {
  'Fee Structure Created': FileText,
  'Fee Structure Activated': CheckCircle2,
  'Billing Plan Created': FileText,
  'Invoice Issued': Send,
  'Payment Recorded': CreditCard,
  'Concession Approved': Gift,
  'Scholarship Applied': Award,
  'Overdue Alert Raised': AlertTriangle,
  'Payment Failed': CircleX,
  'Refund Processed': CreditCard,
  'Invoice Cancelled': CircleX,
  'Structure Archived': FileText,
};

export function FinanceActivityTab({ activityEvents }: FinanceActivityTabProps) {
  const infoEvents = activityEvents.filter((e) => e.severity === 'Info');
  const warningEvents = activityEvents.filter((e) => e.severity === 'Warning');
  const criticalEvents = activityEvents.filter((e) => e.severity === 'Critical');
  const recentEvents = [...activityEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
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
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Info Events</p>
                <p className="text-2xl font-bold">{infoEvents.length}</p>
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
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">{criticalEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Finance Activity Timeline</CardTitle>
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
                            <FinanceAlertSeverityBadge severity={event.severity} />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>by {event.actor}</span>
                          <span>{formatFinanceDateTime(event.timestamp)}</span>
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
