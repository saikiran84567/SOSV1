import { CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/shared/components/page-header';
import { SectionHeader } from '@/shared/components/section-header';
import { EmptyState } from '@/shared/components/empty-state';
import type { DomainMeta } from '@/shared/types';

interface DomainPlaceholderProps {
  meta: DomainMeta;
}

export function DomainPlaceholder({ meta }: DomainPlaceholderProps) {
  const Icon = meta.icon;

  return (
    <div className="space-y-8">
      <PageHeader
        title={meta.title}
        description={meta.description}
      >
        <Badge
          variant="secondary"
          className="gap-1.5 bg-success/10 text-success border-success/20"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Foundation ready
        </Badge>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">What this domain will handle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {meta.description} This module is part of the SOS platform
              foundation and is ready to receive feature development in upcoming
              iterations.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {meta.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 p-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Module status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Build phase
                </span>
                <Badge variant="outline" className="capitalize">
                  {meta.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Domain
                </span>
                <span className="text-sm font-medium text-foreground">
                  {meta.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Route
                </span>
                <code className="text-xs font-mono text-foreground bg-muted px-2 py-0.5 rounded">
                  /{meta.slug}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Ready for development
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This domain&apos;s routes, types, and structure are in
                    place. Feature builds can begin in the next iteration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Feature workspace"
          description="Domain-specific features will appear here once development begins"
        />
        <EmptyState
          icon={Icon}
          title="No features built yet"
          description={`The ${meta.title} domain is scaffolded and ready. Components, services, and mock data can be added under the domains/${meta.slug} directory.`}
        />
      </div>
    </div>
  );
}
