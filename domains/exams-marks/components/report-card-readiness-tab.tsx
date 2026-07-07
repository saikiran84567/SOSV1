'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle, Circle } from 'lucide-react';
import {
  reportCardReadinessItems,
} from '@/domains/exams-marks/mock-data/exams-marks';
import {
  calculateReportCardReadiness,
} from '@/domains/exams-marks/services/exams-marks';
import { ReadinessStatusBadge } from './badges';

export function ReportCardReadinessTab() {
  const readiness = useMemo(
    () => calculateReportCardReadiness(reportCardReadinessItems),
    []
  );

  const itemsByStatus = useMemo(
    () => ({
      Ready: reportCardReadinessItems.filter((i) => i.status === 'Ready'),
      InProgress: reportCardReadinessItems.filter((i) => i.status === 'In Progress'),
      Blocked: reportCardReadinessItems.filter((i) => i.status === 'Blocked'),
      NotStarted: reportCardReadinessItems.filter((i) => i.status === 'Not Started'),
    }),
    []
  );

  const statusIcons = {
    Ready: CheckCircle,
    'In Progress': Clock,
    Blocked: AlertTriangle,
    'Not Started': Circle,
  };

  const statusColors = {
    Ready: 'text-success',
    'In Progress': 'text-warning',
    Blocked: 'text-destructive',
    'Not Started': 'text-muted-foreground',
  };

  return (
    <div className="space-y-6">
      {/* Overall Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Report Card Readiness</CardTitle>
          <p className="text-sm text-muted-foreground">
            Checklist completion status for report card generation
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  readiness.percentage >= 75
                    ? 'bg-success'
                    : readiness.percentage >= 50
                    ? 'bg-warning'
                    : 'bg-destructive'
                }`}
                style={{ width: `${readiness.percentage}%` }}
              />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold">{readiness.percentage}%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
              <p className="text-2xl font-semibold text-success">{readiness.ready}</p>
              <p className="text-xs text-muted-foreground mt-1">Ready</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-2xl font-semibold text-warning">{readiness.inProgress}</p>
              <p className="text-xs text-muted-foreground mt-1">In Progress</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="text-2xl font-semibold text-destructive">{readiness.blocked}</p>
              <p className="text-xs text-muted-foreground mt-1">Blocked</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-2xl font-semibold">{readiness.notStarted}</p>
              <p className="text-xs text-muted-foreground mt-1">Not Started</p>
            </div>
          </div>
          {readiness.blocked > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Blockers Detected</p>
                <p className="text-xs text-muted-foreground">
                  {readiness.blocked} item(s) are blocked and preventing report card generation.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Readiness Items by Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ready Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Ready ({itemsByStatus.Ready.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {itemsByStatus.Ready.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No items ready yet
              </p>
            ) : (
              <div className="space-y-3">
                {itemsByStatus.Ready.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border bg-success/5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{item.area}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <ReadinessStatusBadge status="Ready" />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Owner: {item.owner}</span>
                      <span>|</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Progress Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              In Progress ({itemsByStatus.InProgress.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {itemsByStatus.InProgress.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No items in progress
              </p>
            ) : (
              <div className="space-y-3">
                {itemsByStatus.InProgress.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border bg-warning/5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{item.area}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <ReadinessStatusBadge status="In Progress" />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Owner: {item.owner}</span>
                      <span>|</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blocked Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Blocked ({itemsByStatus.Blocked.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {itemsByStatus.Blocked.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No blocked items
              </p>
            ) : (
              <div className="space-y-3">
                {itemsByStatus.Blocked.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border bg-destructive/5 border-destructive/20">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{item.area}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <ReadinessStatusBadge status="Blocked" />
                    </div>
                    {item.blockers && (
                      <div className="mt-2 p-2 rounded bg-destructive/10">
                        <p className="text-xs text-destructive font-medium">Blocker:</p>
                        <p className="text-xs text-muted-foreground">{item.blockers}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Owner: {item.owner}</span>
                      <span>|</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Not Started Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Circle className="h-5 w-5 text-muted-foreground" />
              Not Started ({itemsByStatus.NotStarted.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {itemsByStatus.NotStarted.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                All items started
              </p>
            ) : (
              <div className="space-y-3">
                {itemsByStatus.NotStarted.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{item.area}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <ReadinessStatusBadge status="Not Started" />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Owner: {item.owner}</span>
                      <span>|</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Full Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Complete Readiness Checklist</CardTitle>
          <p className="text-sm text-muted-foreground">
            All items required for report card generation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {reportCardReadinessItems.map((item) => {
              const Icon = statusIcons[item.status];
              return (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <Icon className={`h-5 w-5 shrink-0 ${statusColors[item.status]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{item.area}</p>
                      <ReadinessStatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{item.owner}</p>
                    <p>Due: {item.dueDate}</p>
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
