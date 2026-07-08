'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, Award, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { WorkloadStatusBadge, ReadinessScoreBadge, UtilizationBadge } from './badges';
import { getReadinessScoreLabel } from '../services/staff';
import type { StaffWorkloadSnapshot } from '../types';

interface WorkloadReadinessTabProps {
  workloadSnapshots: StaffWorkloadSnapshot[];
}

export function WorkloadReadinessTab({ workloadSnapshots }: WorkloadReadinessTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [workloadStatusFilter, setWorkloadStatusFilter] = useState<string>('all');
  const [readinessRangeFilter, setReadinessRangeFilter] = useState<string>('all');

  const filteredWorkloads = useMemo(() => {
    return workloadSnapshots.filter((w) => {
      const matchesSearch = searchQuery === '' ||
        w.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesWorkloadStatus = workloadStatusFilter === 'all' || w.workloadStatus === workloadStatusFilter;

      let matchesReadiness = true;
      if (readinessRangeFilter === 'high') {
        matchesReadiness = w.readinessScore >= 80;
      } else if (readinessRangeFilter === 'medium') {
        matchesReadiness = w.readinessScore >= 60 && w.readinessScore < 80;
      } else if (readinessRangeFilter === 'low') {
        matchesReadiness = w.readinessScore < 60;
      }

      return matchesSearch && matchesWorkloadStatus && matchesReadiness;
    });
  }, [workloadSnapshots, searchQuery, workloadStatusFilter, readinessRangeFilter]);

  const optimalStats = workloadSnapshots.filter((w) => w.workloadStatus === 'Optimal').length;
  const highWorkload = workloadSnapshots.filter((w) => w.workloadStatus === 'High' || w.workloadStatus === 'Overloaded').length;
  const avgUtilization = workloadSnapshots.length > 0
    ? Math.round(workloadSnapshots.reduce((sum, w) => sum + w.utilizationPercentage, 0) / workloadSnapshots.length)
    : 0;
  const avgReadiness = workloadSnapshots.length > 0
    ? Math.round(workloadSnapshots.reduce((sum, w) => sum + w.readinessScore, 0) / workloadSnapshots.length)
    : 0;
  const expiringCerts = workloadSnapshots.reduce((sum, w) => sum + w.certificationsExpiringSoon, 0);

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Optimal Workload</p>
                <p className="text-2xl font-bold">{optimalStats}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">High/Overloaded</p>
                <p className="text-2xl font-bold">{highWorkload}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className="text-2xl font-bold">{avgUtilization}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Readiness</p>
                <p className="text-2xl font-bold">{avgReadiness}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Certs</p>
                <p className="text-2xl font-bold">{expiringCerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={workloadStatusFilter} onValueChange={setWorkloadStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Workload Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Optimal">Optimal</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Overloaded">Overloaded</SelectItem>
                <SelectItem value="Underutilized">Underutilized</SelectItem>
              </SelectContent>
            </Select>
            <Select value={readinessRangeFilter} onValueChange={setReadinessRangeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Readiness Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Readiness</SelectItem>
                <SelectItem value="high">High (80%+)</SelectItem>
                <SelectItem value="medium">Medium (60-79%)</SelectItem>
                <SelectItem value="low">Low (&lt;60%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workload Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Staff Workload & Readiness</CardTitle>
            <Badge variant="secondary">{filteredWorkloads.length} staff members</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Weekly Hours</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Readiness</TableHead>
                  <TableHead>Certs Expiring</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkloads.map((workload) => (
                  <TableRow key={workload.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{workload.staffName}</p>
                        <p className="text-xs text-muted-foreground">{workload.designation}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{workload.departmentName}</p>
                        <p className="text-xs text-muted-foreground">{workload.campusName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{workload.weeklyHours}</span>
                        <span className="text-xs text-muted-foreground">/ {workload.maxWeeklyHours}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <UtilizationBadge percentage={workload.utilizationPercentage} />
                    </TableCell>
                    <TableCell>
                      <WorkloadStatusBadge status={workload.workloadStatus} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ReadinessScoreBadge score={workload.readinessScore} />
                        <span className="text-xs text-muted-foreground">
                          {getReadinessScoreLabel(workload.readinessScore)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {workload.certificationsExpiringSoon > 0 ? (
                        <Badge variant="destructive">{workload.certificationsExpiringSoon} expiring</Badge>
                      ) : (
                        <Badge variant="secondary">None</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Workload Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 text-center">
              <p className="text-3xl font-bold text-success">
                {workloadSnapshots.filter((w) => w.workloadStatus === 'Optimal').length}
              </p>
              <p className="text-sm text-muted-foreground">Optimal</p>
              <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-success"
                  style={{ width: `${(workloadSnapshots.filter((w) => w.workloadStatus === 'Optimal').length / workloadSnapshots.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 text-center">
              <p className="text-3xl font-bold text-warning">
                {workloadSnapshots.filter((w) => w.workloadStatus === 'High').length}
              </p>
              <p className="text-sm text-muted-foreground">High</p>
              <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning"
                  style={{ width: `${(workloadSnapshots.filter((w) => w.workloadStatus === 'High').length / workloadSnapshots.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 text-center">
              <p className="text-3xl font-bold text-destructive">
                {workloadSnapshots.filter((w) => w.workloadStatus === 'Overloaded').length}
              </p>
              <p className="text-sm text-muted-foreground">Overloaded</p>
              <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive"
                  style={{ width: `${(workloadSnapshots.filter((w) => w.workloadStatus === 'Overloaded').length / workloadSnapshots.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 text-center">
              <p className="text-3xl font-bold">
                {workloadSnapshots.filter((w) => w.workloadStatus === 'Underutilized').length}
              </p>
              <p className="text-sm text-muted-foreground">Underutilized</p>
              <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(workloadSnapshots.filter((w) => w.workloadStatus === 'Underutilized').length / workloadSnapshots.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
