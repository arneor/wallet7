export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  contributionAmount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  maxMembers: number;
  currentMembers: number;
  status: 'active' | 'inactive' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  joinDate: string;
  position: number;
  status: 'active' | 'inactive';
  totalPaid: number;
  paymentStatus: 'current' | 'overdue' | 'pending';
}

export interface Payment {
  id: string;
  groupId: string;
  memberId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'failed';
  paymentMethod?: 'bank_transfer' | 'cash' | 'mobile_money' | 'check';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payout {
  id: string;
  groupId: string;
  memberId: string;
  amount: number;
  scheduledDate: string;
  paidDate?: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  round: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'payment_due' | 'payout_turn' | 'payment_received' | 'group_update' | 'reminder';
  title: string;
  message: string;
  groupId?: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
}

export interface AdminSettings {
  id: string;
  companyName: string;
  currency: string;
  defaultContribution: number;
  reminderDays: number;
  autoReminders: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  updatedAt: string;
}

export interface MemberProfile {
  userId: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  preferences: {
    currency: string;
    timezone: string;
  };
  updatedAt: string;
}

export interface DashboardStats {
  totalGroups: number;
  activeMembers: number;
  totalPoolValue: number;
  paymentRate: number;
  monthlyGrowth: {
    groups: number;
    members: number;
    poolValue: number;
    paymentRate: number;
  };
}

export interface GroupStats {
  totalMembers: number;
  totalContributions: number;
  completedRounds: number;
  paymentRate: number;
  nextPayoutDate: string;
  nextPayoutMember: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'member';
}

export interface CreateGroupForm {
  name: string;
  description?: string;
  contributionAmount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  maxMembers: number;
  startDate: string;
}

export interface PaymentForm {
  groupId: string;
  memberId: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'mobile_money' | 'check';
  notes?: string;
}
