import Link from 'next/link';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/shared/components/page-header';
import { SectionHeader } from '@/shared/components/section-header';
import { StatCard } from '@/shared/components/stat-card';
import {
  overviewStats,
  todaySummary,
  quickActions,
  recentActivity,
  domainHealth,
  activityTypeConfig,
} from '@/shared/mock-data/dashboard';

const statusConfig = {
  operational: { label: 'Operational', className: 'bg-success/10 text-success border-success/20' },
  degraded: { label: 'Degraded', className: 'bg-warning/10 text-warning border-warning/20' },
  maintenance: { label: 'Maintenance', className: 'bg-info/10 text-info border-info/20' },
} as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="School-wide overview of operations, academics, and finance for Greenfield International School."
      >
        <Button variant="outline" size="sm">
          Academic Year 2026-27
        </Button>
      </PageHeader>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Today Summary + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Today at a glance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {todaySummary.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3.5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background border border-border">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground leading-tight">
                        {item.value}
                      </p>
                      {item.sublabel ? (
                        <p className="text-xs text-muted-foreground truncate">
                          {item.sublabel}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 hover:border-primary/30"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Domain Health */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg">Recent activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((activity) => {
                const config = activityTypeConfig[activity.type];
                const Icon = config?.icon ?? Activity;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className={`h-4 w-4 ${config?.color ?? 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-muted-foreground">
                          {activity.actor}
                        </span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg">Domain health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
              {domainHealth.map((domain) => {
                const status = statusConfig[domain.status];
                return (
                  <div
                    key={domain.slug}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-foreground truncate">
                      {domain.label}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {domain.uptime}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 ${status.className}`}
                      >
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
