import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  NotebookPen,
  Users,
  Wallet,
  MessageSquare,
  Bell,
  Workflow,
  FileText,
  Settings2,
  BarChart3,
  Sparkles,
  Settings,
} from 'lucide-react';
import type { NavGroup } from '@/shared/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        description: 'School-wide overview and quick actions',
      },
    ],
  },
  {
    label: 'Administration',
    items: [
      {
        label: 'Identity & Access',
        href: '/identity-access',
        icon: ShieldCheck,
        description: 'Users, roles, permissions, and access policies',
      },
      {
        label: 'School Setup',
        href: '/school-setup',
        icon: Building2,
        description: 'Campuses, departments, academic years, and configuration',
      },
    ],
  },
  {
    label: 'Students & Academics',
    items: [
      {
        label: 'Student Lifecycle',
        href: '/student-lifecycle',
        icon: GraduationCap,
        description: 'Admissions, enrollment, transfers, and alumni',
      },
      {
        label: 'Academics',
        href: '/academics',
        icon: BookOpen,
        description: 'Classes, subjects, timetables, and curriculum',
      },
      {
        label: 'Attendance',
        href: '/attendance',
        icon: CalendarCheck,
        description: 'Daily attendance, trends, and interventions',
      },
      {
        label: 'Exams & Marks',
        href: '/exams-marks',
        icon: ClipboardList,
        description: 'Exam scheduling, grading, and report cards',
      },
      {
        label: 'Homework',
        href: '/homework',
        icon: NotebookPen,
        description: 'Assignments, submissions, and feedback',
      },
    ],
  },
  {
    label: 'People & Finance',
    items: [
      {
        label: 'Staff',
        href: '/staff',
        icon: Users,
        description: 'Teachers, administration, payroll, and performance',
      },
      {
        label: 'Finance',
        href: '/finance',
        icon: Wallet,
        description: 'Fees, invoices, expenses, and budgets',
      },
    ],
  },
  {
    label: 'Communication & Operations',
    items: [
      {
        label: 'Communication',
        href: '/communication',
        icon: MessageSquare,
        description: 'Announcements, messages, and parent engagement',
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: Bell,
        description: 'Alerts, reminders, and delivery logs',
      },
      {
        label: 'Workflows',
        href: '/workflows',
        icon: Workflow,
        description: 'Approvals, automations, and process orchestration',
      },
      {
        label: 'Documents',
        href: '/documents',
        icon: FileText,
        description: 'Templates, records, and document management',
      },
      {
        label: 'Operations',
        href: '/operations',
        icon: Settings2,
        description: 'Facilities, transport, inventory, and scheduling',
      },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Reports, trends, and institutional insights',
      },
      {
        label: 'AI Workspace',
        href: '/ai-workspace',
        icon: Sparkles,
        description: 'AI-assisted drafting, summaries, and insights',
        badge: 'New',
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'System preferences, integrations, and branding',
      },
    ],
  },
];
