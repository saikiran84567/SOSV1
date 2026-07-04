'use client';

import {
  Clock,
  Coins,
  Languages,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Wallet,
  Mail,
  MessageSquare,
  Smartphone,
  Users,
  Pencil,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { schoolConfiguration } from '@/domains/school-setup/mock-data/school-profile';

function ConfigRow({
  icon: Icon,
  label,
  value,
  placeholder,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  placeholder?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{value}</span>
        {placeholder && (
          <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-border">
            Placeholder
          </Badge>
        )}
      </div>
    </div>
  );
}

export function ConfigurationTab() {
  const { toast } = useToast();

  function handleEdit() {
    toast({
      title: 'Edit configuration',
      description: 'Configuration editing will be enabled in a future update.',
    });
  }

  const notifPrefs = schoolConfiguration.notificationPreferences;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Configuration
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Localization & System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Localization & System</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ConfigRow
              icon={Clock}
              label="Timezone"
              value={schoolConfiguration.timezone}
            />
            <ConfigRow
              icon={Coins}
              label="Currency"
              value={schoolConfiguration.currency}
            />
            <ConfigRow
              icon={Languages}
              label="Default language"
              value={schoolConfiguration.defaultLanguage}
            />
            <ConfigRow
              icon={Calendar}
              label="Week start day"
              value={schoolConfiguration.weekStartDay}
            />
            <ConfigRow
              icon={ClipboardCheck}
              label="Attendance mode"
              value={schoolConfiguration.attendanceMode}
            />
          </CardContent>
        </Card>

        {/* Academic & Finance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic & Finance</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ConfigRow
              icon={GraduationCap}
              label="Grading system"
              value={schoolConfiguration.gradingSystem}
              placeholder
            />
            <ConfigRow
              icon={Wallet}
              label="Fee cycle"
              value={schoolConfiguration.feeCycle}
              placeholder
            />
          </CardContent>
        </Card>
      </div>

      {/* Notification preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Preferences</CardTitle>
          <p className="text-sm text-muted-foreground">
            Default communication channels for school-wide notifications.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Mail, label: 'Email', enabled: notifPrefs.email },
              { icon: MessageSquare, label: 'SMS', enabled: notifPrefs.sms },
              { icon: Smartphone, label: 'Push', enabled: notifPrefs.push },
              { icon: Users, label: 'Parent Portal', enabled: notifPrefs.parentPortal },
            ].map((pref) => {
              const Icon = pref.icon;
              return (
                <div
                  key={pref.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{pref.label}</p>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs mt-0.5',
                        pref.enabled
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      {pref.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
