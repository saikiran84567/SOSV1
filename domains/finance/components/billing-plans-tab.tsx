'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, IndianRupee, Layers } from 'lucide-react';
import { BillingPlanStatusBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { BillingPlan } from '../types';

interface BillingPlansTabProps {
  billingPlans: BillingPlan[];
}

export function BillingPlansTab({ billingPlans }: BillingPlansTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const uniqueStructures = Array.from(new Set(billingPlans.map((bp) => bp.feeStructureName))).sort();

  const filteredPlans = useMemo(() => {
    return billingPlans.filter((plan) => {
      const matchesSearch = searchQuery === '' ||
        plan.feeStructureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.installmentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [billingPlans, searchQuery, statusFilter]);

  const activeCount = billingPlans.filter((bp) => bp.status === 'Active').length;
  const totalAmount = billingPlans.reduce((sum, bp) => sum + bp.amount, 0);

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Plans</p>
                <p className="text-2xl font-bold">{billingPlans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-success" />
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
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-xl font-bold">{formatCurrencyINR(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search billing plans..."
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Billing Plans Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Billing Plans / Installments</CardTitle>
            <Badge variant="secondary">{filteredPlans.length} plans</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Structure</TableHead>
                  <TableHead>Installment</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sequence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Late Fee Rule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{plan.feeStructureName}</p>
                        <p className="text-xs text-muted-foreground">{plan.academicYearName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{plan.installmentName}</TableCell>
                    <TableCell>{formatFinanceDate(plan.dueDate)}</TableCell>
                    <TableCell className="font-medium">{formatCurrencyINR(plan.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.sequence}</Badge>
                    </TableCell>
                    <TableCell>
                      <BillingPlanStatusBadge status={plan.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {plan.lateFeeRuleNote || 'Not configured'}
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
