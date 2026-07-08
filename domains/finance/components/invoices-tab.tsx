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
import { Search, FileText, IndianRupee, Clock, MoveHorizontal as MoreHorizontal, Eye, CreditCard, Send, Circle as XCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { InvoiceStatusBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { StudentInvoice } from '../types';
import { toast } from 'sonner';

interface InvoicesTabProps {
  invoices: StudentInvoice[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');

  const uniqueCampuses = Array.from(new Set(invoices.map((inv) => inv.campusName))).sort();
  const uniqueClasses = Array.from(new Set(invoices.map((inv) => inv.classGradeName))).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0');
    const numB = parseInt(b.replace(/\D/g, '') || '0');
    return numA - numB;
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch = searchQuery === '' ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
      const matchesCampus = campusFilter === 'all' || inv.campusName === campusFilter;

      return matchesSearch && matchesStatus && matchesCampus;
    });
  }, [invoices, searchQuery, statusFilter, campusFilter]);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const totalDue = invoices.reduce((sum, inv) => sum + inv.dueAmount, 0);
  const overdueCount = invoices.filter((inv) => inv.status === 'Overdue').length;

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalInvoiced)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Due Amount</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalDue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
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
                placeholder="Search by invoice or student..."
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
                <SelectItem value="Issued">Issued</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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

      {/* Invoices Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Student Invoices</CardTitle>
            <Badge variant="secondary">{filteredInvoices.length} invoices</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class/Section</TableHead>
                  <TableHead>Installment</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div>
                        <p className="font-mono text-sm">{invoice.invoiceNumber}</p>
                        <p className="text-xs text-muted-foreground">{invoice.campusName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{invoice.studentName}</p>
                        <p className="text-xs text-muted-foreground">{invoice.admissionNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{invoice.classGradeName} - {invoice.sectionName}</p>
                    </TableCell>
                    <TableCell>{invoice.installmentName}</TableCell>
                    <TableCell>{formatFinanceDate(invoice.dueDate)}</TableCell>
                    <TableCell className="font-medium">{formatCurrencyINR(invoice.totalAmount)}</TableCell>
                    <TableCell className="text-success">{formatCurrencyINR(invoice.amountPaid)}</TableCell>
                    <TableCell className="text-warning">{formatCurrencyINR(invoice.dueAmount)}</TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Invoice detail view would open')}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Record payment dialog would open')}>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Record Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Mark as reviewed action')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Reminder sent')}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Cancel invoice action')}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Invoice
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
