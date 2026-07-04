'use client';

import {
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Calendar,
  Clock,
  Coins,
  Languages,
  Hash,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { schoolProfile } from '@/domains/school-setup/mock-data/school-profile';
import { SchoolStatusBadge } from './badges';

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground w-32 shrink-0">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

export function SchoolProfileTab() {
  const { toast } = useToast();

  function handleEdit() {
    toast({
      title: 'Edit school profile',
      description: 'Profile editing will be enabled in a future update.',
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xl font-bold text-primary">
                {schoolProfile.logoInitials}
              </span>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">{schoolProfile.name}</CardTitle>
              <div className="flex items-center gap-2">
                <SchoolStatusBadge status={schoolProfile.status} />
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">
                  {schoolProfile.board} Board
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Board & Affiliation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Board & Affiliation
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={Award} label="Board" value={schoolProfile.board} />
              <InfoRow icon={Hash} label="Registration" value={schoolProfile.registrationNumber} />
              <InfoRow icon={Hash} label="Affiliation" value={schoolProfile.affiliationNumber} />
              <InfoRow icon={Calendar} label="Established" value={String(schoolProfile.establishedYear)} />
            </div>
          </div>

          <Separator />

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={Mail} label="Email" value={schoolProfile.email} />
              <InfoRow icon={Phone} label="Phone" value={schoolProfile.phone} />
              <InfoRow icon={Globe} label="Website" value={schoolProfile.website} />
              <InfoRow icon={User} label="Principal" value={schoolProfile.principalName} />
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Address</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={MapPin} label="Address" value={schoolProfile.address} />
              <InfoRow icon={MapPin} label="City" value={schoolProfile.city} />
              <InfoRow icon={MapPin} label="State" value={schoolProfile.state} />
              <InfoRow icon={MapPin} label="Postal Code" value={schoolProfile.postalCode} />
            </div>
          </div>

          <Separator />

          {/* Localization */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Localization</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow icon={Clock} label="Timezone" value={schoolProfile.timezone} />
              <InfoRow icon={Coins} label="Currency" value={schoolProfile.currency} />
              <InfoRow icon={Languages} label="Language" value={schoolProfile.language} />
              <InfoRow icon={MapPin} label="Country" value={schoolProfile.country} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
