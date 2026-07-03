import { rolePermissionMatrix, permissionGroups } from '@/domains/identity-access/mock-data/roles-permissions';
import { navGroups } from '@/shared/mock-data/navigation';
import type {
  UserRole,
  PermissionGroupSlug,
  PermissionAction,
  AccessLevel,
} from '@/domains/identity-access/types';
import type { NavItem } from '@/shared/types';

const actionRank: Record<PermissionAction, number> = {
  view: 1,
  create: 2,
  edit: 3,
  export: 3,
  approve: 4,
  delete: 5,
  manage: 6,
};

const levelRank: Record<AccessLevel, number> = {
  none: 0,
  limited: 1,
  view: 2,
  manage: 4,
  full: 6,
};

const actionToLevel: Record<PermissionAction, AccessLevel> = {
  view: 'view',
  create: 'manage',
  edit: 'manage',
  export: 'manage',
  approve: 'manage',
  delete: 'manage',
  manage: 'manage',
};

export function getAccessLevel(
  role: UserRole,
  group: PermissionGroupSlug
): AccessLevel {
  return rolePermissionMatrix[role]?.[group] ?? 'none';
}

export function getPermissionsForRole(
  role: UserRole
): Partial<Record<PermissionGroupSlug, AccessLevel>> {
  return rolePermissionMatrix[role] ?? {};
}

export function canAccess(
  role: UserRole,
  group: PermissionGroupSlug,
  action: PermissionAction
): boolean {
  const level = getAccessLevel(role, group);
  if (level === 'none') return false;
  if (level === 'full') return true;
  const requiredLevel = actionToLevel[action];
  return levelRank[level] >= levelRank[requiredLevel];
}

export function hasFullAccess(
  role: UserRole,
  group: PermissionGroupSlug
): boolean {
  return getAccessLevel(role, group) === 'full';
}

export function hasManageAccess(
  role: UserRole,
  group: PermissionGroupSlug
): boolean {
  const level = getAccessLevel(role, group);
  return level === 'full' || level === 'manage';
}

const navHrefToGroup: Record<string, PermissionGroupSlug> = {
  '/': 'dashboard',
  '/identity-access': 'identity-access',
  '/school-setup': 'school-setup',
  '/student-lifecycle': 'student-lifecycle',
  '/academics': 'academics',
  '/attendance': 'attendance',
  '/exams-marks': 'exams-marks',
  '/homework': 'homework',
  '/staff': 'staff',
  '/finance': 'finance',
  '/communication': 'communication',
  '/notifications': 'notifications',
  '/workflows': 'workflows',
  '/documents': 'documents',
  '/operations': 'operations',
  '/analytics': 'analytics',
  '/ai-workspace': 'ai-workspace',
  '/settings': 'settings',
};

export function getAccessibleNavigation(
  role: UserRole
): typeof navGroups {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item: NavItem) => {
        const permGroup = navHrefToGroup[item.href];
        if (!permGroup) return true;
        return getAccessLevel(role, permGroup) !== 'none';
      }),
    }))
    .filter((group) => group.items.length > 0);
}

export function getAccessibleGroups(role: UserRole): PermissionGroupSlug[] {
  return permissionGroups
    .filter((g) => getAccessLevel(role, g.slug) !== 'none')
    .map((g) => g.slug);
}
