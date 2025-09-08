export const APP_CONFIG = {
  name: 'ROSCA Chit Fund',
  description: 'Manage your rotating savings and credit associations',
  version: '1.0.0',
} as const;

export const PAYMENT_FREQUENCIES = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
} as const;

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  FAILED: 'failed',
} as const;

export const GROUP_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export const NOTIFICATION_TYPES = {
  PAYMENT_DUE: 'payment_due',
  PAYOUT_TURN: 'payout_turn',
  PAYMENT_RECEIVED: 'payment_received',
  GROUP_UPDATE: 'group_update',
  REMINDER: 'reminder',
} as const;

export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
  MOBILE_MONEY: 'mobile_money',
  CHECK: 'check',
} as const;

export const DEFAULT_CURRENCY = 'USD';

export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin',
    GROUPS: '/admin/groups',
    CREATE_GROUP: '/admin/groups/create',
    GROUP_DETAILS: (id: string) => `/admin/groups/${id}`,
    GROUP_MEMBERS: (id: string) => `/admin/groups/${id}/members`,
    GROUP_PAYMENTS: (id: string) => `/admin/groups/${id}/payments`,
    GROUP_REPORTS: (id: string) => `/admin/groups/${id}/reports`,
    REMINDERS: '/admin/reminders',
    SETTINGS: '/admin/settings',
  },
  MEMBER: {
    DASHBOARD: '/member',
    GROUPS: '/member/groups',
    GROUP_DETAILS: (id: string) => `/member/groups/${id}`,
    PAYMENTS: '/member/payments',
    CHAT: '/member/chat',
    PROFILE: '/member/profile',
  },
} as const;
