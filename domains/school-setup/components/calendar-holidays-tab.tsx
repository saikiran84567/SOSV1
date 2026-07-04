'use client';

import { Calendar, Clock, Sun, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { workingDays, holidays } from '@/domains/school-setup/mock-data/calendar';
import { academicYears } from '@/domains/school-setup/mock-data/academic-years';
import { formatSchoolDate } from '@/domains/school-setup/services/school-setup';
import { getCurrentAcademicYear } from '@/domains/school-setup/services/school-setup';
import { HolidayTypeBadge } from './badges';
import { cn } from '@/lib/utils';

export function CalendarHolidaysTab() {
  const currentYear = getCurrentAcademicYear(academicYears);
  const totalWorkingDays = workingDays.filter((d) => d.isWorking).length;
  const totalHolidays = holidays.length;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Working days per week</p>
              <p className="text-lg font-semibold text-foreground">{totalWorkingDays} days</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <Sun className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Holidays this year</p>
              <p className="text-lg font-semibold text-foreground">{totalHolidays} holidays</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Clock className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Instructional days</p>
              <p className="text-lg font-semibold text-foreground">
                {currentYear?.totalInstructionalDays ?? 0} days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Working days configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Working Days Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Weekly schedule with school timings.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Start time</TableHead>
                <TableHead className="hidden sm:table-cell">End time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workingDays.map((day) => (
                <TableRow key={day.day}>
                  <TableCell className="text-sm font-medium text-foreground">
                    {day.day}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        day.isWorking
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      {day.isWorking ? 'Working' : 'Holiday'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {day.isWorking ? day.startTime : '—'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {day.isWorking ? day.endTime : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Term date summary */}
      {currentYear && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Term Date Summary — {currentYear.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead className="hidden md:table-cell">Start date</TableHead>
                  <TableHead className="hidden md:table-cell">End date</TableHead>
                  <TableHead>Instructional days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentYear.terms.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell className="text-sm font-medium text-foreground">
                      {term.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatSchoolDate(term.startDate)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatSchoolDate(term.endDate)}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {term.instructionalDays} days
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Holiday list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Holiday List</CardTitle>
          <p className="text-sm text-muted-foreground">
            Holidays and breaks for the current academic year.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden lg:table-cell">Applies to</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {holiday.name}
                        </p>
                        <p className="text-xs text-muted-foreground md:hidden">
                          {formatSchoolDate(holiday.date)}
                          {holiday.endDate && ` — ${formatSchoolDate(holiday.endDate)}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatSchoolDate(holiday.date)}
                    {holiday.endDate && (
                      <span className="block text-xs">
                        to {formatSchoolDate(holiday.endDate)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <HolidayTypeBadge type={holiday.type} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {holiday.appliesToName}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
