'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Mail, Phone, MapPin, Users } from 'lucide-react';
import { StaffStatusBadge, EmploymentTypeBadge, RoleCategoryBadge, TenureBadge } from './badges';
import type { StaffProfile, StaffEmploymentType, StaffStatus, StaffRoleCategory, StaffGender } from '../types';
import { formatStaffDate } from '../services/staff';
import { toast } from 'sonner';

interface StaffDirectoryTabProps {
  staffProfiles: StaffProfile[];
  onSelectStaff: (staff: StaffProfile) => void;
}

export function StaffDirectoryTab({ staffProfiles, onSelectStaff }: StaffDirectoryTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string>('all');
  const [roleCategoryFilter, setRoleCategoryFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');

  const uniqueDepartments = Array.from(new Set(staffProfiles.map((s) => s.departmentName))).sort();
  const uniqueCampuses = Array.from(new Set(staffProfiles.map((s) => s.campusName))).sort();

  const filteredStaff = useMemo(() => {
    return staffProfiles.filter((staff) => {
      const matchesSearch = searchQuery === '' ||
        staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.designation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = departmentFilter === 'all' || staff.departmentName === departmentFilter;
      const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
      const matchesEmploymentType = employmentTypeFilter === 'all' || staff.employmentType === employmentTypeFilter;
      const matchesRoleCategory = roleCategoryFilter === 'all' || staff.roleCategory === roleCategoryFilter;
      const matchesCampus = campusFilter === 'all' || staff.campusName === campusFilter;

      return matchesSearch && matchesDepartment && matchesStatus && matchesEmploymentType && matchesRoleCategory && matchesCampus;
    });
  }, [staffProfiles, searchQuery, departmentFilter, statusFilter, employmentTypeFilter, roleCategoryFilter, campusFilter]);

  const handleEmail = (email: string) => {
    toast.info(`Email would be sent to ${email}`);
  };

  const handleCall = (phone: string) => {
    toast.info(`Call would be initiated to ${phone}`);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {uniqueDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Resigned">Resigned</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Employment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
                <SelectItem value="Substitute">Substitute</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleCategoryFilter} onValueChange={setRoleCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Teaching">Teaching</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={campusFilter} onValueChange={setCampusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                {uniqueCampuses.map((campus) => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Staff Directory</CardTitle>
            <Badge variant="secondary">{filteredStaff.length} staff members</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{staff.fullName}</p>
                          <p className="text-xs text-muted-foreground">{staff.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{staff.employeeId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{staff.designation}</p>
                        <p className="text-xs text-muted-foreground">{staff.campusName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{staff.departmentName}</p>
                        <RoleCategoryBadge category={staff.roleCategory} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <StaffStatusBadge status={staff.status} />
                    </TableCell>
                    <TableCell>
                      <EmploymentTypeBadge type={staff.employmentType} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <TenureBadge years={staff.totalExperienceYears} />
                        <p className="text-xs text-muted-foreground mt-1">{staff.currentRoleExperienceYears} yrs in role</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onSelectStaff(staff)}
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEmail(staff.email)}
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCall(staff.phone)}
                          title="Call"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
