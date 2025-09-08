// src/types/group.ts
export interface Group {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: "monthly" | "quarterly" | "yearly";
  totalMembers: number;
  currentRound: number;
  totalRounds: number;
  nextPaymentDate: string;
  myPosition: number;
  status: "active" | "completed" | "paused";
  avatar: string;
  memberPositions?: number[];
  completedPositions?: number[];
  adminName?: string;
  createdDate?: string;
  rules?: string[];
}

export interface GroupOverviewProps {
  group: Group;
  showFullDetails?: boolean;
  showMemberOrder?: boolean;
  onViewDetails?: () => void;
}
