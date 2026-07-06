'use client';

import { useState, useMemo } from 'react';
import { Clock, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/shared/components/empty-state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { timetables, classOptions, sectionOptions } from '@/domains/academics/mock-data/academics';
import { getTimetableForSection, calculateTotalTeachingPeriods, getPeriodDuration } from '@/domains/academics/services/academics';
import { TimetableStatusBadge, getPeriodTypeStyle } from './badges';
import { cn } from '@/lib/utils';
import type { DayOfWeek, Period } from '@/domains/academics/types';

const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TimetablesTab() {
  const [selectedClass, setSelectedClass] = useState<string>('cls-10');
  const [selectedSection, setSelectedSection] = useState<string>('sec-10-a');

  const availableSections = useMemo(
    () => sectionOptions.filter((s) => s.classGradeId === selectedClass),
    [selectedClass]
  );

  const timetable = useMemo(
    () => getTimetableForSection(timetables, selectedSection),
    [selectedSection]
  );

  const totalPeriods = timetable ? calculateTotalTeachingPeriods(timetable) : 0;

  function handleClassChange(value: string) {
    setSelectedClass(value);
    const firstSection = sectionOptions.find((s) => s.classGradeId === value);
    if (firstSection) {
      setSelectedSection(firstSection.id);
    }
  }

  function renderPeriod(period: Period) {
    if (period.type === 'Break') {
      return (
        <div
          className={cn(
            'rounded-md border p-2 text-center',
            getPeriodTypeStyle(period.type)
          )}
        >
          <p className="text-xs font-medium text-warning">Break</p>
          <p className="text-[10px] text-muted-foreground">{getPeriodDuration(period)}</p>
        </div>
      );
    }

    if (period.type === 'Assembly') {
      return (
        <div
          className={cn(
            'rounded-md border p-2 text-center',
            getPeriodTypeStyle(period.type)
          )}
        >
          <p className="text-xs font-medium text-info">Assembly</p>
          <p className="text-[10px] text-muted-foreground">{getPeriodDuration(period)}</p>
        </div>
      );
    }

    return (
      <div
        className={cn(
          'rounded-md border p-2 space-y-1',
          getPeriodTypeStyle(period.type)
        )}
      >
        <p className="text-xs font-semibold text-foreground truncate">
          {period.subjectName ?? '—'}
        </p>
        <p className="text-[10px] text-muted-foreground">{getPeriodDuration(period)}</p>
        {period.teacherName && (
          <div className="flex items-center gap-1">
            <User className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
            <p className="text-[10px] text-muted-foreground truncate">{period.teacherName}</p>
          </div>
        )}
        {period.roomNumber && (
          <div className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
            <p className="text-[10px] text-muted-foreground truncate">{period.roomNumber}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selectors */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={selectedClass} onValueChange={handleClassChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {classOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {availableSections.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {timetable && (
          <div className="flex items-center gap-2">
            <TimetableStatusBadge status={timetable.status} />
            <span className="text-xs text-muted-foreground">{timetable.termName}</span>
          </div>
        )}
      </div>

      {timetable ? (
        <>
          {/* Summary */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Teaching periods/week:</span>
              <span className="font-medium text-foreground">{totalPeriods}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Days:</span>
              <span className="font-medium text-foreground">{days.length}</span>
            </div>
          </div>

          {/* Timetable grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {timetable.classGradeName} — Section {timetable.sectionName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-[800px] p-4">
                  <div className="grid gap-3" style={{ gridTemplateColumns: `80px repeat(${days.length}, 1fr)` }}>
                    {/* Header row */}
                    <div className="text-xs font-medium text-muted-foreground flex items-end pb-2">
                      Period
                    </div>
                    {days.map((day) => (
                      <div key={day} className="text-xs font-semibold text-foreground text-center pb-2 border-b border-border">
                        {day}
                      </div>
                    ))}

                    {/* Period rows */}
                    {timetable.schedule.Monday.map((_, periodIdx) => (
                      <>
                        <div key={`time-${periodIdx}`} className="text-xs text-muted-foreground flex items-center justify-end pr-2">
                          {timetable.schedule.Monday[periodIdx].startTime}
                        </div>
                        {days.map((day) => {
                          const period = timetable.schedule[day][periodIdx];
                          return (
                            <div key={`${day}-${periodIdx}`}>
                              {renderPeriod(period)}
                            </div>
                          );
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <EmptyState
          title="No timetable found"
          description="No published timetable exists for the selected class and section. Use the Create Timetable action to get started."
        />
      )}
    </div>
  );
}
