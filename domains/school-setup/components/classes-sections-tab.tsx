'use client';

import { useState, useMemo } from 'react';
import { GraduationCap, Users, User, Plus, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState } from '@/shared/components/empty-state';
import { useToast } from '@/hooks/use-toast';
import { classGrades } from '@/domains/school-setup/mock-data/classes';
import { calculateCapacityUtilization } from '@/domains/school-setup/services/school-setup';
import { ClassStatusBadge } from './badges';
import type { SchoolLevel } from '@/domains/school-setup/types';

const schoolLevels: SchoolLevel[] = [
  'Pre Primary',
  'Primary',
  'Middle School',
  'Secondary',
  'Senior Secondary',
];

function utilizationColor(percentage: number): string {
  if (percentage >= 90) return 'text-destructive';
  if (percentage >= 75) return 'text-warning';
  return 'text-success';
}

export function ClassesSectionsTab() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return classGrades.filter((cls) => {
      const matchesSearch =
        search === '' ||
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        (cls.classTeacher?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesLevel = levelFilter === 'all' || cls.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  function handleAdd() {
    toast({
      title: 'Add class/section',
      description: 'Class and section creation will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by class name or teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {schoolLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>

      {/* Classes accordion */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No classes found"
          description="Try adjusting your search or filter to find the classes you're looking for."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Accordion type="multiple" className="w-full">
              {filtered.map((cls) => {
                const utilization = calculateCapacityUtilization(
                  cls.currentStudents,
                  cls.capacity
                );
                return (
                  <AccordionItem key={cls.id} value={cls.id} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3 w-full pr-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {cls.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cls.level} · {cls.sections.length} sections
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Students</p>
                            <p className="text-sm font-medium text-foreground">
                              {cls.currentStudents} / {cls.capacity}
                            </p>
                          </div>
                          <div className="text-right w-16">
                            <p className="text-xs text-muted-foreground">Utilization</p>
                            <p className={`text-sm font-medium ${utilizationColor(utilization)}`}>
                              {utilization}%
                            </p>
                          </div>
                          <ClassStatusBadge status={cls.status} />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3 pt-2">
                        {cls.classTeacher && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Class teacher:</span>
                            <span className="text-foreground font-medium">
                              {cls.classTeacher}
                            </span>
                          </div>
                        )}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {cls.sections.map((section) => {
                            const secUtil = calculateCapacityUtilization(
                              section.currentStudents,
                              section.capacity
                            );
                            return (
                              <div
                                key={section.id}
                                className="rounded-lg border border-border bg-muted/30 p-3 space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-foreground">
                                    Section {section.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Room {section.roomNumber}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <User className="h-3.5 w-3.5" />
                                  {section.classTeacher}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      {section.currentStudents} / {section.capacity}
                                    </span>
                                    <span className={utilizationColor(secUtil)}>
                                      {secUtil}%
                                    </span>
                                  </div>
                                  <ProgressBar value={secUtil} className="h-1.5" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {classGrades.length} classes
      </p>
    </div>
  );
}
