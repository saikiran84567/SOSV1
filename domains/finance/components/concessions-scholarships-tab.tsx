'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Gift, Award, IndianRupee } from 'lucide-react';
import { ConcessionTypeBadge, ScholarshipTypeBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate } from '../services/finance';
import type { ConcessionRecord, ScholarshipRecord } from '../types';

interface ConcessionsScholarshipsTabProps {
  concessions: ConcessionRecord[];
  scholarships: ScholarshipRecord[];
}

export function ConcessionsScholarshipsTab({ concessions, scholarships }: ConcessionsScholarshipsTabProps) {
  const [concessionSearch, setConcessionSearch] = useState('');
  const [concessionTypeFilter, setConcessionTypeFilter] = useState<string>('all');
  const [scholarshipSearch, setScholarshipSearch] = useState('');
  const [scholarshipTypeFilter, setScholarshipTypeFilter] = useState<string>('all');

  const uniqueConcessionTypes = Array.from(new Set(concessions.map((c) => c.concessionType))).sort();
  const uniqueScholarshipTypes = Array.from(new Set(scholarships.map((s) => s.scholarshipType))).sort();

  const filteredConcessions = useMemo(() => {
    return concessions.filter((c) => {
      const matchesSearch = concessionSearch === '' ||
        c.studentName.toLowerCase().includes(concessionSearch.toLowerCase());
      const matchesType = concessionTypeFilter === 'all' || c.concessionType === concessionTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [concessions, concessionSearch, concessionTypeFilter]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const matchesSearch = scholarshipSearch === '' ||
        s.studentName.toLowerCase().includes(scholarshipSearch.toLowerCase());
      const matchesType = scholarshipTypeFilter === 'all' || s.scholarshipType === scholarshipTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [scholarships, scholarshipSearch, scholarshipTypeFilter]);

  const totalConcessions = concessions.filter((c) => c.status === 'Active').reduce((sum, c) => sum + c.amount, 0);
  const totalScholarships = scholarships.filter((s) => s.status === 'Active').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Concessions</p>
                <p className="text-2xl font-bold">{concessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Concession Amount</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalConcessions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Scholarships</p>
                <p className="text-2xl font-bold">{scholarships.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Scholarship Amount</p>
                <p className="text-lg font-bold">{formatCurrencyINR(totalScholarships)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Concessions Section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Concession Records</CardTitle>
            </div>
            <Badge variant="secondary">{filteredConcessions.length} records</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={concessionSearch}
                onChange={(e) => setConcessionSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={concessionTypeFilter} onValueChange={setConcessionTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Concession Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueConcessionTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[250px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConcessions.map((concession) => (
                  <TableRow key={concession.id}>
                    <TableCell className="font-medium">{concession.studentName}</TableCell>
                    <TableCell>
                      <ConcessionTypeBadge type={concession.concessionType} />
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrencyINR(concession.amount)}</TableCell>
                    <TableCell className="text-sm">{concession.approvedBy}</TableCell>
                    <TableCell>{formatFinanceDate(concession.effectiveFrom)}</TableCell>
                    <TableCell>
                      <Badge variant={concession.status === 'Active' ? 'default' : 'secondary'}>
                        {concession.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Scholarships Section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Scholarship Records</CardTitle>
            </div>
            <Badge variant="secondary">{filteredScholarships.length} records</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={scholarshipSearch}
                onChange={(e) => setScholarshipSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={scholarshipTypeFilter} onValueChange={setScholarshipTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Scholarship Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueScholarshipTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[250px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sponsor</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScholarships.map((scholarship) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium">{scholarship.studentName}</TableCell>
                    <TableCell>
                      <ScholarshipTypeBadge type={scholarship.scholarshipType} />
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrencyINR(scholarship.amount)}</TableCell>
                    <TableCell className="text-sm">{scholarship.sponsor}</TableCell>
                    <TableCell>{formatFinanceDate(scholarship.effectiveFrom)}</TableCell>
                    <TableCell>
                      <Badge variant={scholarship.status === 'Active' ? 'default' : 'secondary'}>
                        {scholarship.status}
                      </Badge>
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
