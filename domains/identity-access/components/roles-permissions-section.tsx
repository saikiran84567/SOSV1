'use client';

import { Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { roles, permissionGroups, rolePermissionMatrix } from '@/domains/identity-access/mock-data/roles-permissions';
import { AccessLevelBadge, roleLabel } from './badges';
import type { AccessLevel, UserRole } from '@/domains/identity-access/types';

const accessLevelDot: Record<AccessLevel, string> = {
  full: 'bg-primary',
  manage: 'bg-info',
  view: 'bg-muted-foreground/40',
  limited: 'bg-warning',
  none: 'bg-muted-foreground/20',
};

function MatrixCell({ level }: { level: AccessLevel }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${accessLevelDot[level]}`} />
        <span className="text-xs capitalize text-foreground">{level}</span>
      </div>
    </div>
  );
}

export function RolesPermissionsSection() {
  const matrixRoles = roles.filter((r) => r.slug !== 'parent' && r.slug !== 'student');
  const matrixRoleSlugs = matrixRoles.map((r) => r.slug) as UserRole[];

  return (
    <div className="space-y-6">
      {/* Role cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.slug} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <AccessLevelBadge level={role.accessLevel} />
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-base font-semibold text-foreground">
                  {role.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {role.userCount.toLocaleString('en-IN')} {role.userCount === 1 ? 'user' : 'users'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permission Matrix</CardTitle>
          <p className="text-sm text-muted-foreground">
            Access levels by role across each system domain. Showing administrative and staff roles.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full outline-none">
            <div className="min-w-[700px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 bg-card z-10 min-w-[180px]">
                      Domain
                    </TableHead>
                    {matrixRoles.map((role) => (
                      <TableHead key={role.slug} className="text-center min-w-[100px]">
                        {role.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionGroups.map((group) => (
                    <TableRow key={group.slug}>
                      <TableCell className="sticky left-0 bg-card z-10 font-medium text-foreground">
                        {group.label}
                      </TableCell>
                      {matrixRoleSlugs.map((roleSlug) => {
                        const level = rolePermissionMatrix[roleSlug]?.[group.slug] ?? 'none';
                        return (
                          <TableCell key={roleSlug} className="text-center">
                            <MatrixCell level={level} />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1">
        {(['full', 'manage', 'view', 'limited', 'none'] as AccessLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${accessLevelDot[level]}`} />
            <span className="text-xs text-muted-foreground capitalize">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
