'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IndianRupee, FileText, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Percent, Plus, Send, CreditCard, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Download } from 'lucide-react';
import { FinanceAlertSeverityBadge, CollectionRateBadge, ReadinessBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { FinanceStats, FinanceAlert, FeeCollectionSummary, ReceiptReadinessItem } from '../types';
import { toast } from 'sonner';

interface OverviewTabProps {
  stats: FinanceStats;
  alerts: FinanceAlert[];
  collectionSummaries: FeeCollectionSummary[];
  receiptReadiness: ReceiptReadinessItem[];
}

export function OverviewTab({ stats, alerts, collectionSummaries, receiptReadiness }: OverviewTabProps) {
  const quickActions = [
    { label: 'Create Fee Structure', icon: Plus, action: () => toast.info('Create Fee Structure dialog would open') },
    { label: 'Issue Invoice', icon: Send, action: () => toast.info('Issue Invoice dialog would open') },
    { label: 'Record Payment', icon: CreditCard, action: () => toast.info('Record Payment dialog would open') },
    { label: 'Review Overdue', icon: AlertCircle, action: () => toast.info('Overdue review panel would open') },
    { label: 'Approve Concession', icon: CheckCircle, action: () => toast.info('Concession approval panel would open') },
    { label: 'Export Dues', icon: Download, action: () => toast.info('Export started - check downloads') },
  ];

  const activeAlerts = alerts.filter((a) => a.status === 'Open');
  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'Critical');
  const warningAlerts = activeAlerts.filter((a) => a.severity === 'Warning');

  const overallCollection = collectionSummaries.find((c) => c.label === 'Q1 2026-27');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Active Structures</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.activeFeeStructures}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Invoices Issued</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.invoicesIssued}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Collected</span>
            </div>
            <p className="text-2xl font-bold mt-1">{formatCurrencyINR(stats.totalAmountCollected)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Outstanding</span>
            </div>
            <p className="text-2xl font-bold mt-1">{formatCurrencyINR(stats.totalOutstandingDues)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Overdue</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-destructive">{stats.overdueInvoices}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Collection Rate</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.collectionRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts and Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alerts</CardTitle>
                {(criticalAlerts.length > 0 || warningAlerts.length > 0) && (
                  <div className="flex gap-2">
                    {criticalAlerts.length > 0 && (
                      <Badge variant="destructive">{criticalAlerts.length} Critical</Badge>
                    )}
                    {warningAlerts.length > 0 && (
                      <Badge variant="outline">{warningAlerts.length} Warning</Badge>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[220px]">
                <div className="space-y-3">
                  {activeAlerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border bg-muted/30 space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {alert.description}
                          </p>
                        </div>
                        <FinanceAlertSeverityBadge severity={alert.severity} />
                      </div>
                      {alert.actionRequired && (
                        <p className="text-xs text-primary">{alert.actionRequired}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2"
                    onClick={action.action}
                  >
                    <action.icon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Collection Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {collectionSummaries.map((summary) => (
                  <div key={summary.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{summary.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrencyINR(summary.totalCollected)} / {formatCurrencyINR(summary.totalBilled)}
                        </p>
                      </div>
                      <CollectionRateBadge rate={summary.collectionPercentage} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Outstanding</span>
                        <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning transition-all"
                            style={{ width: `${Math.min(100, (summary.totalOutstanding / summary.totalBilled) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overdue</span>
                        <div className="h-1.5 mt-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-destructive transition-all"
                            style={{ width: `${Math.min(100, (summary.overdueAmount / summary.totalBilled) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Column - Receipt Readiness */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Receipt Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-3">
                {receiptReadiness.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border bg-muted/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{item.area}</p>
                      <ReadinessBadge status={item.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Owner: {item.owner}</span>
                      {item.dueDate && <span>Due: {formatFinanceDate(item.dueDate)}</span>}
                    </div>
                    {item.blockers.length > 0 && (
                      <div className="space-y-1">
                        {item.blockers.map((blocker, idx) => (
                          <p key={idx} className="text-xs text-destructive">- {blocker}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Collection Snapshot */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Collection Snapshot - Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-success">{formatCurrencyINR(stats.totalAmountCollected)}</p>
              <p className="text-sm text-muted-foreground">Total Collected</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold">{formatCurrencyINR(stats.totalOutstandingDues)}</p>
              <p className="text-sm text-muted-foreground">Outstanding Dues</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold text-destructive">{stats.overdueInvoices}</p>
              <p className="text-sm text-muted-foreground">Overdue Invoices</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-3xl font-bold">{stats.collectionRate}%</p>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
