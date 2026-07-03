import type { LucideIcon } from 'lucide-react';

export type DomainStatus = 'foundation-ready' | 'in-progress' | 'planned';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface DomainMeta {
  slug: string;
  title: string;
  description: string;
  status: DomainStatus;
  capabilities: string[];
  icon: LucideIcon;
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  accent: 'primary' | 'success' | 'warning' | 'info' | 'destructive';
}

export interface TodaySummaryItem {
  label: string;
  value: string;
  sublabel?: string;
  icon: LucideIcon;
}

export interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export type ActivityType =
  | 'admission'
  | 'finance'
  | 'attendance'
  | 'academics'
  | 'communication'
  | 'staff'
  | 'operations';

export interface ActivityRecord {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
}

export interface DomainHealth {
  slug: string;
  label: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
  lastIncident?: string;
}
