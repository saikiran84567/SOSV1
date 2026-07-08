'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, IndianRupee, TriangleAlert as AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { DueSeverityBadge, CollectionRateBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { StudentDueSummary, FeeCollectionSummary, DueSeverity } from '../types';

interface DuesCollectionTabProps {
  dueSummaries: StudentDueSummary[];
  collectionSummaries: FeeCollectionSummary[];
}

export function DuesCollectionTab({ dueSummaries, collectionSummaries }: DuesCollectionTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredDues = useMemo(() => {
    return dueSummaries.filter((due) => {
      const matchesSearch = searchQuery === '' ||
        due.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        due.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = severityFilter === 'all' || due.dueSeverity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [dueSummaries, searchQuery, severityFilter]);

  const totalBilled = dueSummaries.reduce((sum, d) => sum + d.totalBilled, 0);
  const totalPaid = dueSummaries.reduce((sum, d) => sum + d.totalPaid, 0);
  const totalDue = dueSummaries.reduce((sum, d) => sum + d.totalDue, 0);
  const totalOverdue = dueSummaries.reduce((sum, d) => sum + d.overdueAmount, 0);
  const criticalCount = dueSummaries.filter((d) => d.dueSeverity === 'Critical').length;
  const highCount = dueSummaries.filter((d) => d.dueSeverity === 'High').length;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-2xl font-bold">{dueSummaries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Billed</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalBilled)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalDue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-lg font-bold text-destructive">{formatCurrencyINR(totalOverdue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Critical/High</p>
                <p className="text-2xl font-bold">{criticalCount + highCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection Summaries */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Fee Collection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {collectionSummaries.slice(0, 4).map((summary) => (
              <div key={summary.id} className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium text-sm">{summary.label}</p>
                  <CollectionRateBadge rate={summary.collectionPercentage} />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billed</span>
                    <span className="font-medium">{formatCurrencyINR(summary.totalBilled)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collected</span>
                    <span className="font-medium text-success">{formatCurrencyINR(summary.totalCollected)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="font-medium text-warning">{formatCurrencyINR(summary.totalOutstanding)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="font-medium text-destructive">{formatCurrencyINR(summary.overdueAmount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Due Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Student Due Summary</CardTitle>
            <Badge variant="secondary">{filteredDues.length} students</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Due Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class/Section</TableHead>
                  <TableHead>Total Billed</TableHead>
                  <TableHead>Total Paid</TableHead>
                  <TableHead>Total Due</TableHead>
                  <TableHead>Overdue</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDues.map((due) => (
                  <TableRow key={due.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{due.studentName}</p>
                        <p className="text-xs text-muted-foreground">{due.admissionNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{due.classGradeName} - {due.sectionName}</p>
                      <p className="text-xs text-muted-foreground">{due.campusName}</p>
                    </TableCell>
                    <TableCell>{formatCurrencyINR(due.totalBilled)}</TableCell>
                    <TableCell className="text-success">{formatCurrencyINR(due.totalPaid)}</TableCell>
                    <TableCell className="text-warning">{formatCurrencyINR(due.totalDue)}</TableCell>
                    <TableCell className="text-destructive font-medium">{formatCurrencyINR(due.overdueAmount)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="outline">{due.invoiceCount}</Badge>
                        {due.overdueInvoiceCount > 0 && (
                          <Badge variant="destructive">{due.overdueInvoiceCount} overdue</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {due.lastPaymentDate ? formatFinanceDate(due.lastPaymentDate) : 'No payment'}
                    </TableCell>
                    <TableCell>
                      <DueSeverityBadge severity={due.dueSeverity} />
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
