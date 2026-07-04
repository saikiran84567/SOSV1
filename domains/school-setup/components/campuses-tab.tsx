'use client';

import { Building2, MapPin, Phone, Mail, Plus, User, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { campuses } from '@/domains/school-setup/mock-data/campuses';
import { calculateCapacityUtilization } from '@/domains/school-setup/services/school-setup';
import { CampusStatusBadge } from './badges';
import type { CampusType } from '@/domains/school-setup/types';

const campusTypeLabels: Record<CampusType, string> = {
  main: 'Main Campus',
  branch: 'Branch Campus',
  satellite: 'Satellite Campus',
};

export function CampusesTab() {
  const { toast } = useToast();

  function handleAdd() {
    toast({
      title: 'Add campus',
      description: 'Campus creation will be enabled in a future update.',
    });
  }

  function handleAction(action: string, campusName: string) {
    toast({
      title: action,
      description: `${campusName} — this action will be enabled in a future update.`,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Campus
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {campuses.map((campus) => {
          const utilization = calculateCapacityUtilization(
            campus.currentStudents,
            campus.capacity
          );
          return (
            <Card key={campus.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {campus.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {campus.code} · {campusTypeLabels[campus.type]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CampusStatusBadge status={campus.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('Edit campus', campus.name)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction('Delete campus', campus.name)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{campus.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Head:</span>
                    <span className="text-foreground">{campus.principalOrHead}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{campus.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{campus.email}</span>
                  </div>
                </div>

                {/* Utilization */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Campus utilization</span>
                    <span className="font-medium text-foreground">{utilization}%</span>
                  </div>
                  <ProgressBar
                    value={utilization}
                    className="h-2.5"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{campus.currentStudents.toLocaleString('en-IN')} students</span>
                    <span>{campus.capacity.toLocaleString('en-IN')} campus capacity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
