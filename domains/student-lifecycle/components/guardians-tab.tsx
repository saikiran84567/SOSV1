'use client';

import { useState, useMemo } from 'react';
import { Search, Phone, Mail, Star, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/shared/components/empty-state';
import { students } from '@/domains/student-lifecycle/mock-data/students';
import { GuardianRelationBadge } from './badges';
import type { Guardian, StudentRecord } from '@/domains/student-lifecycle/types';

interface GuardianWithStudents {
  guardian: Guardian;
  students: { id: string; name: string; classGradeName: string | null }[];
}

export function GuardiansTab() {
  const [search, setSearch] = useState('');

  const guardianDirectory = useMemo(() => {
    const map = new Map<string, GuardianWithStudents>();
    for (const student of students) {
      for (const guardian of student.guardians) {
        if (!map.has(guardian.id)) {
          map.set(guardian.id, {
            guardian,
            students: [],
          });
        }
        map.get(guardian.id)!.students.push({
          id: student.id,
          name: student.displayName,
          classGradeName: student.classGradeName,
        });
      }
    }
    return Array.from(map.values());
  }, []);

  const filtered = useMemo(() => {
    return guardianDirectory.filter((entry) => {
      if (search === '') return true;
      const q = search.toLowerCase();
      return (
        entry.guardian.name.toLowerCase().includes(q) ||
        entry.guardian.phone.toLowerCase().includes(q) ||
        entry.guardian.email.toLowerCase().includes(q) ||
        entry.students.some((s) => s.name.toLowerCase().includes(q))
      );
    });
  }, [guardianDirectory, search]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by guardian name, student name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No guardians found"
          description="Try adjusting your search to find the guardians you're looking for."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <Card key={entry.guardian.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {entry.guardian.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {entry.guardian.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.guardian.occupation}
                      </p>
                    </div>
                  </div>
                  <GuardianRelationBadge relation={entry.guardian.relation} />
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{entry.guardian.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate">{entry.guardian.email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1.5">Linked students</p>
                  <div className="space-y-1">
                    {entry.students.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {s.classGradeName ?? '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  {entry.guardian.isPrimary && (
                    <span className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Star className="h-3 w-3" />
                      Primary
                    </span>
                  )}
                  {entry.guardian.isEmergencyContact && (
                    <span className="flex items-center gap-1 text-xs text-info">
                      <AlertCircle className="h-3 w-3" />
                      Emergency contact
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {guardianDirectory.length} guardians
      </p>
    </div>
  );
}
