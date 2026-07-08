'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building, Users, UserCheck, Clock, TrendingUp, Briefcase } from 'lucide-react';
import type { StaffDepartmentSummary } from '../types';

interface DepartmentsTabProps {
  departmentSummaries: StaffDepartmentSummary[];
}

export function DepartmentsTab({ departmentSummaries }: DepartmentsTabProps) {
  const totalStaff = departmentSummaries.reduce((sum, d) => sum + d.totalStaff, 0);
  const totalActive = departmentSummaries.reduce((sum, d) => sum + d.activeStaff, 0);
  const totalOnLeave = departmentSummaries.reduce((sum, d) => sum + d.onLeaveStaff, 0);
  const avgTenure = departmentSummaries.length > 0
    ? Math.round(departmentSummaries.reduce((sum, d) => sum + d.averageTenureYears, 0) / departmentSummaries.length)
    : 0;
  const openPositions = departmentSummaries.reduce((sum, d) => sum + d.openPositions, 0);

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{departmentSummaries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{totalActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">{totalOnLeave}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
          <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <p className="text-2xl font-bold">{openPositions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departmentSummaries.map((dept) => {
          const utilization = dept.totalStaff > 0 ? Math.round((dept.activeStaff / dept.totalStaff) * 100) : 0;

          return (
            <Card key={dept.id} className="overflow-hidden">
              <CardHeader className="pb-2 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dept.departmentName}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dept.campusName} | Head: {dept.headOfDepartment}
                    </p>
                  </div>
                  <Badge variant={dept.openPositions > 0 ? 'destructive' : 'secondary'}>
                    {dept.openPositions > 0 ? `${dept.openPositions} Open` : 'Fully Staffed'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{dept.totalStaff}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{dept.activeStaff}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{dept.onLeaveStaff}</p>
                    <p className="text-xs text-muted-foreground">On Leave</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{dept.averageTenureYears}</p>
                    <p className="text-xs text-muted-foreground">Avg Yrs</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Staff Utilization</span>
                      <span className="font-medium">{utilization}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          utilization >= 90 ? 'bg-success' : utilization >= 75 ? 'bg-primary' : 'bg-warning'
                        }`}
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Budget Utilization</span>
                      <span className="font-medium">{dept.budgetUtilizationPercentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${dept.budgetUtilizationPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{dept.teachingStaff} Teaching</span>
                    <span>{dept.nonTeachingStaff} Non-Teaching</span>
                  </div>
                  <Badge variant="outline">{avgTenure} yrs avg tenure</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
