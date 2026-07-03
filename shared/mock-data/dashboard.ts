import {
  Users,
  GraduationCap,
  Wallet,
  CalendarCheck,
  UserPlus,
  Receipt,
  Send,
  FileText,
  Bell,
  BookOpen,
  ShieldCheck,
  Building2,
  ClipboardList,
  NotebookPen,
  MessageSquare,
  Workflow,
  Settings2,
  BarChart3,
  Sparkles,
  Settings,
} from 'lucide-react';
import type {
  StatItem,
  TodaySummaryItem,
  QuickAction,
  ActivityRecord,
  DomainHealth,
} from '@/shared/types';

export const overviewStats: StatItem[] = [
  {
    label: 'Total Students',
    value: '1,847',
    change: '+32 this term',
    trend: 'up',
    icon: GraduationCap,
    accent: 'primary',
  },
  {
    label: 'Staff Members',
    value: '142',
    change: '+3 this month',
    trend: 'up',
    icon: Users,
    accent: 'info',
  },
  {
    label: 'Fee Collection',
    value: '₹4.2M',
    change: '87% collected',
    trend: 'up',
    icon: Wallet,
    accent: 'success',
  },
  {
    label: 'Attendance Today',
    value: '94.2%',
    change: '-1.1% vs avg',
    trend: 'down',
    icon: CalendarCheck,
    accent: 'warning',
  },
];

export const todaySummary: TodaySummaryItem[] = [
  { label: 'Present', value: '1,740', sublabel: 'of 1,847 enrolled', icon: CalendarCheck },
  { label: 'Absent', value: '89', sublabel: '4.8% absence rate', icon: Users },
  { label: 'Late Arrivals', value: '18', sublabel: 'across 6 classes', icon: Bell },
  { label: 'Classes Running', value: '48', sublabel: 'of 52 scheduled', icon: BookOpen },
  { label: 'Pending Fees', value: '₹612K', sublabel: '234 students', icon: Wallet },
  { label: 'New Admissions', value: '5', sublabel: 'inquiries today', icon: UserPlus },
];

export const quickActions: QuickAction[] = [
  {
    label: 'Add Student',
    description: 'Enroll a new student',
    href: '/student-lifecycle',
    icon: UserPlus,
  },
  {
    label: 'Record Payment',
    description: 'Log a fee collection',
    href: '/finance',
    icon: Receipt,
  },
  {
    label: 'Send Announcement',
    description: 'Broadcast to parents',
    href: '/communication',
    icon: Send,
  },
  {
    label: 'Generate Report',
    description: 'Create a custom report',
    href: '/analytics',
    icon: FileText,
  },
];

export const recentActivity: ActivityRecord[] = [
  {
    id: 'act-001',
    type: 'admission',
    title: 'New admission inquiry received',
    description: 'Grade 9 inquiry from Priya Sharma for 2026-27 academic year',
    actor: 'Admissions Office',
    timestamp: '10 minutes ago',
  },
  {
    id: 'act-002',
    type: 'finance',
    title: 'Fee payment recorded',
    description: '₹45,000 quarterly fee collected from Arjun Mehta (Grade 10-B)',
    actor: 'Finance Desk',
    timestamp: '32 minutes ago',
  },
  {
    id: 'act-003',
    type: 'attendance',
    title: 'Attendance marked for Grade 8',
    description: 'All 4 sections of Grade 8 marked present by 9:15 AM',
    actor: 'Ms. Rebecca Thomas',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-004',
    type: 'communication',
    title: 'Parent-teacher meeting announced',
    description: 'PTM scheduled for July 12 sent to 1,847 parents',
    actor: 'Principal Office',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-005',
    type: 'staff',
    title: 'New teacher onboarded',
    description: 'Mr. Vikram Rao joined as Senior Mathematics Teacher',
    actor: 'HR Department',
    timestamp: '3 hours ago',
  },
  {
    id: 'act-006',
    type: 'academics',
    title: 'Mid-term exam schedule published',
    description: 'Schedule for Grades 6-10 released to students and parents',
    actor: 'Academic Coordinator',
    timestamp: '5 hours ago',
  },
];

export const domainHealth: DomainHealth[] = [
  { slug: 'identity-access', label: 'Identity & Access', status: 'operational', uptime: '99.98%' },
  { slug: 'school-setup', label: 'School Setup', status: 'operational', uptime: '100%' },
  { slug: 'student-lifecycle', label: 'Student Lifecycle', status: 'operational', uptime: '99.95%' },
  { slug: 'academics', label: 'Academics', status: 'operational', uptime: '99.99%' },
  { slug: 'attendance', label: 'Attendance', status: 'operational', uptime: '99.97%' },
  { slug: 'exams-marks', label: 'Exams & Marks', status: 'operational', uptime: '100%' },
  { slug: 'homework', label: 'Homework', status: 'operational', uptime: '99.92%' },
  { slug: 'staff', label: 'Staff', status: 'operational', uptime: '99.98%' },
  { slug: 'finance', label: 'Finance', status: 'operational', uptime: '99.96%' },
  { slug: 'communication', label: 'Communication', status: 'operational', uptime: '99.94%' },
  { slug: 'notifications', label: 'Notifications', status: 'operational', uptime: '100%' },
  { slug: 'workflows', label: 'Workflows', status: 'operational', uptime: '99.91%' },
  { slug: 'documents', label: 'Documents', status: 'operational', uptime: '99.99%' },
  { slug: 'operations', label: 'Operations', status: 'operational', uptime: '99.95%' },
  { slug: 'analytics', label: 'Analytics', status: 'operational', uptime: '99.97%' },
  { slug: 'ai-workspace', label: 'AI Workspace', status: 'maintenance', uptime: '98.50%', lastIncident: 'Scheduled model update' },
  { slug: 'settings', label: 'Settings', status: 'operational', uptime: '100%' },
];

export const activityTypeConfig: Record<
  string,
  { icon: typeof Bell; color: string }
> = {
  admission: { icon: UserPlus, color: 'text-primary' },
  finance: { icon: Wallet, color: 'text-success' },
  attendance: { icon: CalendarCheck, color: 'text-info' },
  academics: { icon: BookOpen, color: 'text-primary' },
  communication: { icon: MessageSquare, color: 'text-warning' },
  staff: { icon: Users, color: 'text-info' },
  operations: { icon: Settings2, color: 'text-muted-foreground' },
};
