'use client';

import { useState } from 'react';
import { Users, UserCheck, MailOpen, Ban } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { UsersSection } from '@/domains/identity-access/components/users-section';
import { UserProfileDrawer } from '@/domains/identity-access/components/user-profile-drawer';
import { RolesPermissionsSection } from '@/domains/identity-access/components/roles-permissions-section';
import { SessionsSection } from '@/domains/identity-access/components/sessions-section';
import { SecurityActivitySection } from '@/domains/identity-access/components/security-activity-section';
import { users } from '@/domains/identity-access/mock-data/users';
import type { StatItem } from '@/shared/types';
import type { User as IAMUser } from '@/domains/identity-access/types';

const stats: StatItem[] = [
  {
    label: 'Total Users',
    value: users.length.toString(),
    change: 'Across all roles',
    trend: 'neutral',
    icon: Users,
    accent: 'primary',
  },
  {
    label: 'Active Users',
    value: users.filter((u) => u.status === 'active').length.toString(),
    change: 'Currently enabled',
    trend: 'up',
    icon: UserCheck,
    accent: 'success',
  },
  {
    label: 'Pending Invites',
    value: users.filter((u) => u.status === 'invited').length.toString(),
    change: 'Awaiting acceptance',
    trend: 'neutral',
    icon: MailOpen,
    accent: 'info',
  },
  {
    label: 'Suspended Users',
    value: users.filter((u) => u.status === 'suspended').length.toString(),
    change: 'Access revoked',
    trend: 'down',
    icon: Ban,
    accent: 'destructive',
  },
];

export default function IdentityAccessPage() {
  const [selectedUser, setSelectedUser] = useState<IAMUser | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSelectUser(user: IAMUser) {
    setSelectedUser(user);
    setDrawerOpen(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Identity & Access"
        description="Manage user accounts, roles, permissions, and security across the school system. Control who can access what with audit trails and policy enforcement."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto scrollbar-thin sm:w-auto">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="security">Security Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UsersSection onSelectUser={handleSelectUser} />
        </TabsContent>

        <TabsContent value="roles">
          <RolesPermissionsSection />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsSection />
        </TabsContent>

        <TabsContent value="security">
          <SecurityActivitySection />
        </TabsContent>
      </Tabs>

      <UserProfileDrawer
        user={selectedUser}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
