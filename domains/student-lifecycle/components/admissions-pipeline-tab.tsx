'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/shared/components/empty-state';
import { admissionApplications } from '@/domains/student-lifecycle/mock-data/students';
import { AdmissionStatusBadge, ApplicationSourceBadge } from './badges';
import { formatStudentDate } from '@/domains/student-lifecycle/services/student-lifecycle';
import type { AdmissionStatus } from '@/domains/student-lifecycle/types';

const pipelineStages: AdmissionStatus[] = [
  'Inquiry Received',
  'Application Submitted',
  'Documents Pending',
  'Assessment Scheduled',
  'Interview Scheduled',
  'Under Review',
  'Offer Issued',
  'Offer Accepted',
];

export function AdmissionsPipelineTab() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {pipelineStages.map((stage) => {
          const apps = admissionApplications.filter((a) => a.currentStage === stage);
          return (
            <div key={stage} className="min-w-[280px] w-[280px] shrink-0">
              <div className="flex items-center justify-between mb-3">
                <AdmissionStatusBadge status={stage} />
                <span className="text-sm font-medium text-muted-foreground">
                  {apps.length}
                </span>
              </div>
              <div className="space-y-3">
                {apps.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    No applicants in this stage
                  </p>
                ) : (
                  apps.map((app) => (
                    <Card key={app.id} className="transition-shadow hover:shadow-md">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {app.studentName.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {app.studentName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Applying for {app.applyingForClassName}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Guardian</span>
                            <span className="text-foreground font-medium truncate ml-2">
                              {app.guardianName}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Source</span>
                            <ApplicationSourceBadge source={app.source} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Submitted</span>
                            <span className="text-foreground">
                              {formatStudentDate(app.submittedDate)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Campus</span>
                            <span className="text-foreground truncate ml-2">
                              {app.campusName.replace('Greenfield ', '')}
                            </span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">Pending action</p>
                          <p className="text-xs text-foreground font-medium">
                            {app.pendingAction}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
