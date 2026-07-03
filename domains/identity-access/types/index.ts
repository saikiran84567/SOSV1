export type UserRole =
  | 'super-admin'
  | 'school-admin'
  | 'principal'
  | 'academic-coordinator'
  | 'teacher'
  | 'accountant'
  | 'admissions-officer'
  | 'staff'
  | 'parent'
  | 'student';

export type UserStatus = 'active' | 'invited' | 'suspended' | 'inactive';

export type PermissionAction =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'export'
  | 'manage';

export type PermissionGroupSlug =
  | 'dashboard'
  | 'identity-access'
  | 'school-setup'
  | 'student-lifecycle'
  | 'academics'
  | 'attendance'
  | 'exams-marks'
  | 'homework'
  | 'staff'
  | 'finance'
  | 'communication'
  | 'notifications'
  | 'workflows'
  | 'documents'
  | 'operations'
  | 'analytics'
  | 'ai-workspace'
  | 'settings';

export type AccessLevel = 'full' | 'manage' | 'view' | 'limited' | 'none';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface Role {
  slug: UserRole;
  name: string;
  description: string;
  userCount: number;
  accessLevel: AccessLevel;
}

export interface Permission {
  group: PermissionGroupSlug;
  label: string;
  actions: PermissionAction[];
}

export interface PermissionGroup {
  slug: PermissionGroupSlug;
  label: string;
  description: string;
}

export type RolePermissionMatrix = Record<
  UserRole,
  Partial<Record<PermissionGroupSlug, AccessLevel>>
>;

export interface Session {
  id: string;
  userId: string;
  userName: string;
  avatarInitials: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  status: 'active' | 'idle' | 'expired';
}

export interface LoginAttempt {
  id: string;
  userId: string | null;
  userName: string;
  email: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  success: boolean;
  failureReason?: string;
}

export type SecurityEventType =
  | 'login'
  | 'login-failed'
  | 'password-reset'
  | 'role-updated'
  | 'session-revoked'
  | 'user-suspended'
  | 'user-invited'
  | 'permission-changed';

export type SecuritySeverity = 'info' | 'warning' | 'critical';

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  userId: string | null;
  userName: string;
  timestamp: string;
  severity: SecuritySeverity;
  description: string;
  ipAddress?: string;
}

export interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  appliesTo: UserRole[];
  enforceMfa: boolean;
  sessionTimeoutMinutes: number;
  ipRestriction?: string;
}
