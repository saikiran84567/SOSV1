'use client';

import { useState, useMemo } from 'react';
import { Briefcase, Users, Filter, Search, MoreHorizontal, Pencil, Trash2, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/shared/components/empty-state';
import { useToast } from '@/hooks/use-toast';
import { departments } from '@/domains/school-setup/mock-data/departments';
import { DepartmentStatusBadge } from './badges';
import type { DepartmentType } from '@/domains/school-setup/types';

const departmentTypes: DepartmentType[] = [
  'Academic',
  'Administrative',
  'Finance',
  'Operations',
  'Support',
];

export function DepartmentsTab() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch =
        search === '' ||
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.code.toLowerCase().includes(search.toLowerCase()) ||
        dept.headOfDepartment.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || dept.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  function handleAction(action: string, deptName: string) {
    toast({
      title: action,
      description: `${deptName} — this action will be enabled in a future update.`,
    });
  }

  function handleAdd() {
    toast({
      title: 'Add department',
      description: 'Department creation will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, code, or head..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {departmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={handleAdd} className="sm:ml-auto">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Department
        </Button>
      </div>

      {/* Department cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No departments found"
          description="Try adjusting your search or filters to find the departments you're looking for."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dept) => (
            <Card key={dept.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {dept.code} · {dept.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DepartmentStatusBadge status={dept.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('Edit department', dept.name)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction('Delete department', dept.name)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dept.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {dept.staffCount} staff
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Head</p>
                    <p className="text-sm font-medium text-foreground">
                      {dept.headOfDepartment}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {departments.length} departments
      </p>
    </div>
  );
}
