'use client';

import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/shared/components/empty-state';
import { classSubjectMappings, classOptions } from '@/domains/academics/mock-data/academics';
import { getMappedSubjectsForClass } from '@/domains/academics/services/academics';
import { cn } from '@/lib/utils';

export function ClassMappingTab() {
  const [selectedClass, setSelectedClass] = useState<string>(classOptions[1].id);

  const mappings = useMemo(
    () => getMappedSubjectsForClass(classSubjectMappings, selectedClass),
    [selectedClass]
  );

  const selectedClassName = classOptions.find((c) => c.id === selectedClass)?.name ?? '—';
  const mandatoryCount = mappings.filter((m) => m.isMandatory).length;
  const electiveCount = mappings.filter((m) => !m.isMandatory).length;
  const totalPeriods = mappings.reduce((sum, m) => sum + m.periodsPerWeek, 0);

  return (
    <div className="space-y-4">
      {/* Class selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground">Select class:</span>
        {classOptions.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              selectedClass === cls.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {cls.name}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Subjects</p>
              <p className="text-xl font-semibold text-foreground">{mappings.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Mandatory / Elective</p>
              <p className="text-xl font-semibold text-foreground">{mandatoryCount} / {electiveCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Circle className="h-5 w-5 text-info" />
            <div>
              <p className="text-xs text-muted-foreground">Periods / Week</p>
              <p className="text-xl font-semibold text-foreground">{totalPeriods}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapping table */}
      {mappings.length === 0 ? (
        <EmptyState
          title="No subjects mapped"
          description={`No subjects have been mapped to ${selectedClassName} yet. Use the Map Class Subjects action to get started.`}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{selectedClassName} — Subject Mapping</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Subject</TableHead>
                    <TableHead className="min-w-[120px]">Type</TableHead>
                    <TableHead className="min-w-[100px]">Periods/Week</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappings.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <p className="text-sm font-medium text-foreground">{m.subjectName}</p>
                      </TableCell>
                      <TableCell>
                        {m.isMandatory ? (
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            Mandatory
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs bg-info/10 text-info border-info/20">
                            Elective
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">{m.periodsPerWeek}</span>
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
  );
}
