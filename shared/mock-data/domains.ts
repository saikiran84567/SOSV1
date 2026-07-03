import {
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
import type { DomainMeta } from '@/shared/types';

export const domainMeta: Record<string, DomainMeta> = {
  'identity-access': {
    slug: 'identity-access',
    title: 'Identity & Access',
    description:
      'Manage user accounts, roles, and permissions across the entire school system. Control who can access what, with audit trails and policy enforcement.',
    status: 'foundation-ready',
    capabilities: [
      'User provisioning and deactivation',
      'Role-based access control (RBAC)',
      'Permission groups by domain',
      'Login audit and session history',
      'SSO and MFA configuration',
    ],
    icon: ShieldCheck,
  },
  'school-setup': {
    slug: 'school-setup',
    title: 'School Setup',
    description:
      'Configure the structural foundation of your institution — campuses, departments, academic years, grading scales, and institutional policies.',
    status: 'foundation-ready',
    capabilities: [
      'Multi-campus management',
      'Academic year and term configuration',
      'Department and section setup',
      'Grading scales and assessment types',
      'Institutional policies and rules',
    ],
    icon: Building2,
  },
  'student-lifecycle': {
    slug: 'student-lifecycle',
    title: 'Student Lifecycle',
    description:
      'Track every student from inquiry through alumni. Manage admissions, enrollment, transfers, and graduation in one connected workflow.',
    status: 'foundation-ready',
    capabilities: [
      'Admissions and inquiry management',
      'Enrollment and re-enrollment',
      'Student profiles and history',
      'Transfers and withdrawals',
      'Alumni records',
    ],
    icon: GraduationCap,
  },
  academics: {
    slug: 'academics',
    title: 'Academics',
    description:
      'Design and deliver the academic program — classes, subjects, timetables, curriculum mapping, and teacher assignments.',
    status: 'foundation-ready',
    capabilities: [
      'Class and section management',
      'Subject and curriculum mapping',
      'Timetable generation and conflicts',
      'Teacher assignments',
      'Academic planning',
    ],
    icon: BookOpen,
  },
  attendance: {
    slug: 'attendance',
    title: 'Attendance',
    description:
      'Record and monitor attendance across the school. Identify at-risk students early with trend analysis and automated alerts.',
    status: 'foundation-ready',
    capabilities: [
      'Daily and period-wise attendance',
      'Attendance trends and analytics',
      'Automated parent notifications',
      'At-risk student flagging',
      'Compliance reporting',
    ],
    icon: CalendarCheck,
  },
  'exams-marks': {
    slug: 'exams-marks',
    title: 'Exams & Marks',
    description:
      'Plan examinations, record marks, generate report cards, and analyze performance across classes, subjects, and terms.',
    status: 'foundation-ready',
    capabilities: [
      'Exam scheduling and seating',
      'Mark entry and moderation',
      'Report card generation',
      'Grade analysis and comparisons',
      'Parent result sharing',
    ],
    icon: ClipboardList,
  },
  homework: {
    slug: 'homework',
    title: 'Homework',
    description:
      'Assign, collect, and review homework. Track submissions, provide feedback, and keep parents informed of expectations.',
    status: 'foundation-ready',
    capabilities: [
      'Assignment creation and scheduling',
      'Submission tracking',
      'Teacher feedback and grading',
      'Parent visibility',
      'Workload balancing',
    ],
    icon: NotebookPen,
  },
  staff: {
    slug: 'staff',
    title: 'Staff',
    description:
      'Manage teaching and non-teaching staff — profiles, assignments, payroll, leave, performance reviews, and professional development.',
    status: 'foundation-ready',
    capabilities: [
      'Staff profiles and directories',
      'Teaching load and assignments',
      'Payroll and compensation',
      'Leave and attendance',
      'Performance reviews',
    ],
    icon: Users,
  },
  finance: {
    slug: 'finance',
    title: 'Finance',
    description:
      'Handle all financial operations — fee collection, invoicing, expenses, budgets, and financial reporting with full audit trails.',
    status: 'foundation-ready',
    capabilities: [
      'Fee structure and collection',
      'Invoicing and receipts',
      'Expense tracking',
      'Budget planning and variance',
      'Financial statements',
    ],
    icon: Wallet,
  },
  communication: {
    slug: 'communication',
    title: 'Communication',
    description:
      'Centralize all school communication — announcements, messages, parent engagement, and multi-channel delivery with read tracking.',
    status: 'foundation-ready',
    capabilities: [
      'School-wide announcements',
      'Direct and group messaging',
      'Parent portal engagement',
      'Multi-channel delivery (email, SMS, push)',
      'Read receipts and engagement metrics',
    ],
    icon: MessageSquare,
  },
  notifications: {
    slug: 'notifications',
    title: 'Notifications',
    description:
      'Manage system alerts, reminders, and notification delivery. Configure rules, channels, and user preferences.',
    status: 'foundation-ready',
    capabilities: [
      'Alert and reminder rules',
      'Delivery channel management',
      'User notification preferences',
      'Notification logs and audit',
      'Digest and scheduling',
    ],
    icon: Bell,
  },
  workflows: {
    slug: 'workflows',
    title: 'Workflows',
    description:
      'Design and orchestrate approval processes, automations, and multi-step operations across domains with full visibility.',
    status: 'foundation-ready',
    capabilities: [
      'Approval process builder',
      'Multi-step automations',
      'Conditional routing',
      'Workflow analytics and bottlenecks',
      'Task assignment and tracking',
    ],
    icon: Workflow,
  },
  documents: {
    slug: 'documents',
    title: 'Documents',
    description:
      'Manage templates, records, certificates, and institutional documents with versioning, access control, and e-signature support.',
    status: 'foundation-ready',
    capabilities: [
      'Document templates',
      'Record and certificate generation',
      'Version control',
      'Access permissions',
      'E-signature workflows',
    ],
    icon: FileText,
  },
  operations: {
    slug: 'operations',
    title: 'Operations',
    description:
      'Coordinate day-to-day operations — facilities, transport, inventory, vendor management, and operational scheduling.',
    status: 'foundation-ready',
    capabilities: [
      'Facility and room management',
      'Transport and route planning',
      'Inventory and asset tracking',
      'Vendor and procurement',
      'Operational scheduling',
    ],
    icon: Settings2,
  },
  analytics: {
    slug: 'analytics',
    title: 'Analytics',
    description:
      'Gain institutional insights through dashboards, reports, and trend analysis across academics, finance, attendance, and operations.',
    status: 'foundation-ready',
    capabilities: [
      'Cross-domain dashboards',
      'Custom report builder',
      'Trend and comparative analysis',
      'Scheduled report delivery',
      'Export and data sharing',
    ],
    icon: BarChart3,
  },
  'ai-workspace': {
    slug: 'ai-workspace',
    title: 'AI Workspace',
    description:
      'Leverage AI-assisted tools for drafting communications, generating summaries, answering institutional questions, and surfacing insights.',
    status: 'foundation-ready',
    capabilities: [
      'AI-assisted drafting',
      'Document summarization',
      'Institutional Q&A',
      'Predictive insights',
      'Workflow suggestions',
    ],
    icon: Sparkles,
  },
  settings: {
    slug: 'settings',
    title: 'Settings',
    description:
      'Configure system-wide preferences, integrations, branding, localization, and data retention policies.',
    status: 'foundation-ready',
    capabilities: [
      'System preferences',
      'Integration management',
      'Branding and themes',
      'Localization and language',
      'Data retention policies',
    ],
    icon: Settings,
  },
};
