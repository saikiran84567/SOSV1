'use client';

import { Monitor, Smartphone, Tablet, MoreHorizontal, LogOut } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { sessions } from '@/domains/identity-access/mock-data/sessions';
import { cn } from '@/lib/utils';
import type { Session } from '@/domains/identity-access/types';

function deviceIcon(device: string) {
  if (/iphone|android|mobile/i.test(device)) return Smartphone;
  if (/ipad|tablet/i.test(device)) return Tablet;
  return Monitor;
}

const sessionStatusConfig: Record<Session['status'], { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  idle: { label: 'Idle', className: 'bg-warning/10 text-warning border-warning/20' },
  expired: { label: 'Expired', className: 'bg-muted text-muted-foreground border-border' },
};

export function SessionsSection() {
  const { toast } = useToast();

  function handleRevoke(session: Session) {
    toast({ title: `Session revoked for ${session.userName}` });
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Device</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
              <TableHead className="hidden md:table-cell">Last active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const Icon = deviceIcon(session.device);
              const status = sessionStatusConfig[session.status];
              return (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {session.avatarInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {session.userName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate">{session.device}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.browser}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{session.location}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <code className="text-xs font-mono text-muted-foreground">{session.ipAddress}</code>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{session.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('text-xs', status.className)}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleRevoke(session)}
                          className="text-destructive focus:text-destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Revoke session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
