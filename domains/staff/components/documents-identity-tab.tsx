'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, FileCheck, TriangleAlert as AlertTriangle, Clock, User } from 'lucide-react';
import { DocumentStatusBadge } from './badges';
import { formatStaffDate } from '../services/staff';
import type { StaffDocumentSummary, StaffIdentitySummary } from '../types';

interface DocumentsIdentityTabProps {
  documentSummaries: StaffDocumentSummary[];
  identitySummaries: StaffIdentitySummary[];
}

export function DocumentsIdentityTab({ documentSummaries, identitySummaries }: DocumentsIdentityTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>('all');
  const [verificationStatusFilter, setVerificationStatusFilter] = useState<string>('all');

  const uniqueDocumentTypes = Array.from(new Set(documentSummaries.map((d) => d.documentType))).sort();

  const filteredDocuments = useMemo(() => {
    return documentSummaries.filter((doc) => {
      const matchesSearch = searchQuery === '' ||
        doc.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = documentTypeFilter === 'all' || doc.documentType === documentTypeFilter;
      const matchesStatus = verificationStatusFilter === 'all' || doc.verificationStatus === verificationStatusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [documentSummaries, searchQuery, documentTypeFilter, verificationStatusFilter]);

  const pendingDocs = documentSummaries.filter((d) => d.verificationStatus === 'Pending').length;
  const verifiedDocs = documentSummaries.filter((d) => d.verificationStatus === 'Verified').length;
  const rejectedDocs = documentSummaries.filter((d) => d.verificationStatus === 'Rejected').length;
  const expiredDocs = documentSummaries.filter((d) => d.verificationStatus === 'Expired').length;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Docs</p>
                <p className="text-2xl font-bold">{documentSummaries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{verifiedDocs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingDocs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{rejectedDocs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold">{expiredDocs}</p>
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
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueDocumentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={verificationStatusFilter} onValueChange={setVerificationStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Verification Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Document Registry</CardTitle>
            <Badge variant="secondary">{filteredDocuments.length} documents</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Document Info</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{doc.staffName}</p>
                        <p className="text-xs text-muted-foreground">{doc.staffId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.documentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{doc.documentName}</p>
                        {doc.documentNumber && (
                          <p className="text-xs text-muted-foreground font-mono">{doc.documentNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {doc.issueDate ? formatStaffDate(doc.issueDate) : '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {doc.expiryDate ? formatStaffDate(doc.expiryDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <DocumentStatusBadge status={doc.verificationStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Identity Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Identity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {identitySummaries.slice(0, 20).map((identity) => (
                <div
                  key={identity.id}
                  className="p-4 rounded-lg border bg-muted/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{identity.staffName}</p>
                    </div>
                    <Badge variant="outline">{identity.documentType}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {identity.aadhaarNumber && (
                      <div className="p-2 rounded bg-muted">
                        <p className="text-muted-foreground">Aadhaar</p>
                        <p className="font-mono">{identity.aadhaarNumber}</p>
                      </div>
                    )}
                    {identity.panNumber && (
                      <div className="p-2 rounded bg-muted">
                        <p className="text-muted-foreground">PAN</p>
                        <p className="font-mono">{identity.panNumber}</p>
                      </div>
                    )}
                    {identity.bloodGroup && (
                      <div className="p-2 rounded bg-muted">
                        <p className="text-muted-foreground">Blood</p>
                        <p className="font-medium">{identity.bloodGroup}</p>
                      </div>
                    )}
                    <div className="p-2 rounded bg-muted">
                      <p className="text-muted-foreground">Nationality</p>
                      <p className="font-medium">{identity.nationality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
