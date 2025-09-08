import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'member']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Group validation schemas
export const createGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
  description: z.string().optional(),
  contributionAmount: z.number().min(1, 'Contribution amount must be greater than 0'),
  frequency: z.enum(['weekly', 'monthly', 'quarterly']),
  maxMembers: z.number().min(2, 'Group must have at least 2 members').max(50, 'Group cannot exceed 50 members'),
  startDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Start date must be in the future',
  }),
});

export const updateGroupSchema = createGroupSchema.partial();

// Payment validation schemas
export const paymentSchema = z.object({
  groupId: z.string().min(1, 'Group ID is required'),
  memberId: z.string().min(1, 'Member ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  paymentMethod: z.enum(['bank_transfer', 'cash', 'mobile_money', 'check']),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

// Member validation schemas
export const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional(),
});

// Notification validation schemas
export const notificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum(['payment_due', 'payout_turn', 'payment_received', 'group_update', 'reminder']),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  groupId: z.string().optional(),
});

// Settings validation schemas
export const adminSettingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  defaultContribution: z.number().min(1, 'Default contribution must be greater than 0'),
  reminderDays: z.number().min(1, 'Reminder days must be at least 1').max(30, 'Reminder days cannot exceed 30'),
  autoReminders: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
});

export const memberProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional(),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type MemberInput = z.infer<typeof memberSchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;
export type AdminSettingsInput = z.infer<typeof adminSettingsSchema>;
export type MemberProfileInput = z.infer<typeof memberProfileSchema>;
