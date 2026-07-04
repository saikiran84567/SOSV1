'use client';

import { CalendarDays, CheckCircle2, Plus, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { academicYears } from '@/domains/school-setup/mock-data/academic-years';
import { formatSchoolDate } from '@/domains/school-setup/services/school-setup';
import { AcademicYearStatusBadge, TermStatusBadge } from './badges';

export function AcademicYearsTab() {
  const { toast } = useToast();

  function handleAction(action: string) {
    toast({
      title: action,
      description: 'This action will be enabled in a future update.',
    });
  }

  const currentYear = academicYears.find((y) => y.isCurrent);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => handleAction('Create academic year')}>
          <Plus className="h-4 w-4 mr-2" />
          New Academic Year
        </Button>
      </div>

      {/* Academic years table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Academic Years</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Start date</TableHead>
                <TableHead className="hidden md:table-cell">End date</TableHead>
                <TableHead>Terms</TableHead>
                <TableHead className="hidden lg:table-cell">Instructional days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {academicYears.map((year) => (
                <TableRow key={year.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {year.isCurrent && (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{year.name}</p>
                        {year.isCurrent && (
                          <p className="text-xs text-success">Current year</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatSchoolDate(year.startDate)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatSchoolDate(year.endDate)}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {year.terms.length}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-foreground">
                    {year.totalInstructionalDays}
                  </TableCell>
                  <TableCell>
                    <AcademicYearStatusBadge status={year.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAction(`Manage ${year.name}`)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Term details for current year */}
      {currentYear && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Terms — {currentYear.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Term breakdown for the current academic year.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead className="hidden md:table-cell">Start date</TableHead>
                  <TableHead className="hidden md:table-cell">End date</TableHead>
                  <TableHead className="hidden lg:table-cell">Instructional days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentYear.terms.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {term.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatSchoolDate(term.startDate)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatSchoolDate(term.endDate)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-foreground">
                      {term.instructionalDays}
                    </TableCell>
                    <TableCell>
                      <TermStatusBadge status={term.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
