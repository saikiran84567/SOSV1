'use client';

import {
  LogIn,
  KeyRound,
  ShieldAlert,
  UserMinus,
  UserPlus,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SeverityBadge } from './badges';
import { securityEvents } from '@/domains/identity-access/mock-data/security';
import { cn } from '@/lib/utils';
import type { SecurityEventType } from '@/domains/identity-access/types';

const eventConfig: Record<
  SecurityEventType,
  { icon: typeof LogIn; color: string; label: string }
> = {
  login: { icon: LogIn, color: 'bg-success/10 text-success', label: 'Login' },
  'login-failed': { icon: LogIn, color: 'bg-destructive/10 text-destructive', label: 'Failed Login' },
  'password-reset': { icon: KeyRound, color: 'bg-info/10 text-info', label: 'Password Reset' },
  'role-updated': { icon: ShieldAlert, color: 'bg-warning/10 text-warning', label: 'Role Updated' },
  'session-revoked': { icon: RefreshCw, color: 'bg-muted text-muted-foreground', label: 'Session Revoked' },
  'user-suspended': { icon: UserMinus, color: 'bg-destructive/10 text-destructive', label: 'User Suspended' },
  'user-invited': { icon: UserPlus, color: 'bg-info/10 text-info', label: 'User Invited' },
  'permission-changed': { icon: Lock, color: 'bg-warning/10 text-warning', label: 'Permission Changed' },
};

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function SecurityActivitySection() {
  return (
    <Card className="outline-none">
      <CardContent className="p-0 outline-none">
        <div className="divide-y divide-border">
          {securityEvents.map((event) => {
            const config = eventConfig[event.type];
            const Icon = config.icon;
            return (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
              >
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">
                      {config.label}
                    </span>
                    <SeverityBadge severity={event.severity} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                        {event.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{event.userName}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(event.timestamp)}
                    </span>
                    {event.ipAddress && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <code className="text-xs font-mono text-muted-foreground">
                          {event.ipAddress}
                        </code>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
