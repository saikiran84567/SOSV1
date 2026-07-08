'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Briefcase, Calendar, Building, User } from 'lucide-react';
import { StaffStatusBadge, EmploymentTypeBadge } from './badges';
import { formatStaffDate } from '../services/staff';
import type { StaffEmploymentRecord, StaffLifecycleEvent, StaffProfile } from '../types';

interface EmploymentTabProps {
  employmentRecords: StaffEmploymentRecord[];
  lifecycleEvents: StaffLifecycleEvent[];
  staffProfiles: StaffProfile[];
}

const eventTypeLabels: Record<string, string> = {
  'Joined': 'Joined',
  'Promoted': 'Promoted',
  'Transferred': 'Transferred',
  'On Leave': 'On Leave',
  'Returned from Leave': 'Returned',
  'Resigned': 'Resigned',
  'Terminated': 'Terminated',
  'Retired': 'Retired',
  'Contract Ended': 'Contract Ended',
  'Extended': 'Extended',
  'Warning Issued': 'Warning',
  'Appreciation': 'Appreciation',
};

export function EmploymentTab({ employmentRecords, lifecycleEvents, staffProfiles }: EmploymentTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string>('all');

  const currentEmployment = employmentRecords.filter((r) => r.isCurrent);

  const filteredRecords = useMemo(() => {
    return currentEmployment.filter((record) => {
      const matchesSearch = searchQuery === '' ||
        record.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.designation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesEmploymentType = employmentTypeFilter === 'all' || record.employmentType === employmentTypeFilter;

      return matchesSearch && matchesStatus && matchesEmploymentType;
    });
  }, [currentEmployment, searchQuery, statusFilter, employmentTypeFilter]);

  const recentLifecycle = [...lifecycleEvents]
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
    .slice(0, 10);

  const fullTimeCount = employmentRecords.filter((r) => r.isCurrent && r.employmentType === 'Full-Time').length;
  const contractCount = employmentRecords.filter((r) => r.isCurrent && r.employmentType === 'Contract').length;
  const partTimeCount = employmentRecords.filter((r) => r.isCurrent && r.employmentType === 'Part-Time').length;
  const activeCount = employmentRecords.filter((r) => r.isCurrent && r.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{currentEmployment.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Full-Time</p>
                <p className="text-2xl font-bold">{fullTimeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Contract</p>
                <p className="text-2xl font-bold">{contractCount}</p>
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
                placeholder="Search employment records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employment Records Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Current Employment Records</CardTitle>
            <Badge variant="secondary">{filteredRecords.length} records</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Campus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.staffName}</p>
                        <p className="text-xs text-muted-foreground">{record.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{record.designation}</TableCell>
                    <TableCell>{record.departmentName}</TableCell>
                    <TableCell>{formatStaffDate(record.startDate)}</TableCell>
                    <TableCell>
                      <EmploymentTypeBadge type={record.employmentType} />
                    </TableCell>
                    <TableCell>
                      <StaffStatusBadge status={record.status} />
                    </TableCell>
                    <TableCell>{record.campusName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Lifecycle Events */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Employment Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {recentLifecycle.map((event) => {
                const eventColor =
                  event.eventType === 'Joined' ? 'bg-primary/20' :
                  event.eventType === 'Promoted' ? 'bg-success/20' :
                  event.eventType === 'Resigned' || event.eventType === 'Terminated' ? 'bg-destructive/20' :
                  'bg-muted';

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <div className={`p-2 rounded-full ${eventColor}`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{event.staffName}</p>
                        <Badge variant="outline">{eventTypeLabels[event.eventType] || event.eventType}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>{formatStaffDate(event.eventDate)}</span>
                        <span>by {event.initiatedBy}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
