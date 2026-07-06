'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/shared/components/empty-state';
import { students } from '@/domains/student-lifecycle/mock-data/students';
import { DocumentStatusBadge } from './badges';
import {
  getRequiredDocuments,
  getVerifiedDocuments,
  getPendingDocuments,
  getDocumentCompletionPercentage,
} from '@/domains/student-lifecycle/services/student-lifecycle';
import type { DocumentStatus, DocumentType } from '@/domains/student-lifecycle/types';

const documentStatuses: (DocumentStatus | 'all')[] = ['all', 'pending', 'submitted', 'verified', 'expired', 'rejected'];
const documentTypes: (DocumentType | 'all')[] = [
  'all', 'Birth Certificate', 'Aadhaar Card', 'Transfer Certificate', 'Previous Marksheet',
  'Passport Photo', 'Medical Certificate', 'Address Proof', 'Parent ID Proof', 'Caste Certificate', 'Other',
];

interface StudentDocSummary {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  photoInitials: string;
  required: number;
  submitted: number;
  pending: number;
  verified: number;
  completion: number;
  documents: { id: string; type: DocumentType; status: DocumentStatus; required: boolean }[];
}

export function DocumentsTab() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const summaries: StudentDocSummary[] = useMemo(() => {
    return students.map((s) => {
      const required = getRequiredDocuments(s);
      const verified = getVerifiedDocuments(s);
      const pending = getPendingDocuments(s);
      const submitted = s.documents.filter((d) => d.status === 'submitted').length;
      return {
        studentId: s.id,
        studentName: s.displayName,
        admissionNumber: s.admissionNumber,
        photoInitials: s.photoInitials,
        required: required.length,
        submitted,
        pending: pending.length,
        verified: verified.length,
        completion: getDocumentCompletionPercentage(s),
        documents: s.documents.map((d) => ({ id: d.id, type: d.type, status: d.status, required: d.required })),
      };
    });
  }, []);

  const totalRequired = summaries.reduce((sum, s) => sum + s.required, 0);
  const totalVerified = summaries.reduce((sum, s) => sum + s.verified, 0);
  const totalPending = summaries.reduce((sum, s) => sum + s.pending, 0);
  const totalSubmitted = summaries.reduce((sum, s) => sum + s.submitted, 0);

  const allDocuments = useMemo(() => {
    const docs: { studentName: string; admissionNumber: string; photoInitials: string; docId: string; type: DocumentType; status: DocumentStatus; required: boolean }[] = [];
    for (const s of students) {
      for (const d of s.documents) {
        docs.push({
          studentName: s.displayName,
          admissionNumber: s.admissionNumber,
          photoInitials: s.photoInitials,
          docId: d.id,
          type: d.type,
          status: d.status,
          required: d.required,
        });
      }
    }
    return docs.filter((d) => {
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchesType = typeFilter === 'all' || d.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Required</p>
            <p className="text-2xl font-semibold text-foreground mt-1">{totalRequired}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-2xl font-semibold text-success mt-1">{totalVerified}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Submitted (pending verification)</p>
            <p className="text-2xl font-semibold text-info mt-1">{totalSubmitted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Not Submitted</p>
            <p className="text-2xl font-semibold text-warning mt-1">{totalPending}</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-student document summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document Status by Student</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden md:table-cell">Admission No.</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaries.map((s) => (
                  <TableRow key={s.studentId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {s.photoInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {s.studentName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{s.admissionNumber}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{s.required}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{s.submitted + s.verified}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-warning">{s.pending}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-success">{s.verified}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${s.completion}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{s.completion}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Document-level tracking */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All statuses
          </Button>
          {documentStatuses.filter((s) => s !== 'all').map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={typeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('all')}
          >
            All types
          </Button>
          {documentTypes.filter((t) => t !== 'all').map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </Button>
          ))}
        </div>

        {allDocuments.length === 0 ? (
          <EmptyState
            title="No documents found"
            description="No documents match the selected filters."
          />
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Admission No.</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allDocuments.slice(0, 50).map((doc) => (
                      <TableRow key={doc.docId}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-7 w-7 shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {doc.photoInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                              {doc.studentName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">{doc.admissionNumber}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-foreground">{doc.type}</span>
                        </TableCell>
                        <TableCell>
                          {doc.required ? (
                            <span className="text-xs text-primary font-medium">Required</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Optional</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DocumentStatusBadge status={doc.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {allDocuments.length} documents
      </p>
    </div>
  );
}
