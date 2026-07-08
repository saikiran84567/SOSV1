'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Eye, MoveHorizontal as MoreHorizontal, FileText, Calendar, Building, IndianRupee } from 'lucide-react';
import { FeeStructureStatusBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { FeeStructure, FeeStructureStatus } from '../types';
import { toast } from 'sonner';

interface FeeStructuresTabProps {
  feeStructures: FeeStructure[];
  onViewStructure: (structure: FeeStructure) => void;
}

export function FeeStructuresTab({ feeStructures, onViewStructure }: FeeStructuresTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const uniqueCampuses = Array.from(new Set(feeStructures.map((fs) => fs.campusName))).sort();
  const uniqueClasses = Array.from(new Set(feeStructures.map((fs) => fs.classGradeName))).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0');
    const numB = parseInt(b.replace(/\D/g, '') || '0');
    return numA - numB;
  });

  const filteredStructures = useMemo(() => {
    return feeStructures.filter((fs) => {
      const matchesSearch = searchQuery === '' ||
        fs.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fs.classGradeName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCampus = campusFilter === 'all' || fs.campusName === campusFilter;
      const matchesClass = classFilter === 'all' || fs.classGradeName === classFilter;
      const matchesStatus = statusFilter === 'all' || fs.status === statusFilter;

      return matchesSearch && matchesCampus && matchesClass && matchesStatus;
    });
  }, [feeStructures, searchQuery, campusFilter, classFilter, statusFilter]);

  const activeCount = feeStructures.filter((fs) => fs.status === 'Active').length;
  const totalCount = feeStructures.length;
  const totalAmount = feeStructures.reduce((sum, fs) => sum + fs.totalAmount, 0);

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Structures</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-success" />
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
              <IndianRupee className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Annual Value</p>
                <p className="text-xl font-bold">{formatCurrencyINR(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Academic Year</p>
                <p className="text-lg font-bold">2026-27</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fee structures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
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
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Structures Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Fee Structures</CardTitle>
            <Badge variant="secondary">{filteredStructures.length} structures</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Structure Name</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Campus</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStructures.map((structure) => (
                  <TableRow key={structure.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{structure.name}</p>
                        <p className="text-xs text-muted-foreground">{structure.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{structure.academicYearName}</TableCell>
                    <TableCell>{structure.campusName}</TableCell>
                    <TableCell>{structure.classGradeName}</TableCell>
                    <TableCell className="font-medium">{formatCurrencyINR(structure.totalAmount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{structure.categoryBreakdownCount} categories</Badge>
                    </TableCell>
                    <TableCell>{formatFinanceDate(structure.effectiveFrom)}</TableCell>
                    <TableCell>
                      <FeeStructureStatusBadge status={structure.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewStructure(structure)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Structure
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Edit structure dialog would open')}>
                            Edit Structure
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Activate structure action')}>
                            Activate Structure
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Archive structure action')}>
                            Archive Structure
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
