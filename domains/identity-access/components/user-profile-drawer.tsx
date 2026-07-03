'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Phone, Building2, Clock, Calendar, Shield } from 'lucide-react';
import { UserStatusBadge, roleLabel } from './badges';
import { securityEvents } from '@/domains/identity-access/mock-data/security';
import type { User } from '@/domains/identity-access/types';

interface UserProfileDrawerProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function UserProfileDrawer({
  user,
  open,
  onOpenChange,
}: UserProfileDrawerProps) {
  if (!user) return null;

  const userActivity = securityEvents
    .filter((e) => e.userId === user.id)
    .slice(0, 5);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetDescription className="sr-only">
            User profile details
          </SheetDescription>
          <SheetTitle className="sr-only">{user.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-2 space-y-6">
          {/* Identity header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {user.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 pt-1">
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 pt-1">
                <UserStatusBadge status={user.status} />
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-sm text-foreground">{roleLabel(user.role)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Contact & Details</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{user.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{roleLabel(user.role)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account metadata */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Account</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Last login:</span>
                <span className="text-foreground">
                  {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Created:</span>
                <span className="text-foreground">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent activity */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Recent Security Activity</h3>
            {userActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity for this user.</p>
            ) : (
              <div className="space-y-3">
                {userActivity.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="space-y-0.5">
                      <p className="text-sm text-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(event.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
