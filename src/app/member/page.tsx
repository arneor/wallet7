// src/app/member/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContributionDueCard } from "@/components/member/ContributionDueCard";
import { PayoutTurnCard } from "@/components/member/PayoutTurnCard";
import { GroupOverview } from "@/components/member/GroupOverview";
import { QuickStats } from "@/components/member/QuickStats";
import { NotificationPanel } from "@/components/member/NotificationPanel";
import { RecentActivity } from "@/components/member/RecentActivity";
import { GroupDetailsModal } from "@/components/member/GroupDetailsModal";
import { Group } from "@/types/group";

type TimeframeType = "7d" | "30d" | "90d";

export default function MemberDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<TimeframeType>("30d");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showGroupDetails, setShowGroupDetails] = useState<boolean>(false);

  // Updated mock group data with coordinator information
  const groups: Group[] = [
    {
      id: "1",
      name: "Family Savings Circle",
      description: "Monthly family savings for emergency fund",
      contributionAmount: 5000,
      frequency: "monthly",
      totalMembers: 10,
      currentRound: 6,
      totalRounds: 10,
      nextPaymentDate: "2025-09-15", // Updated to current year
      myPosition: 8,
      status: "active",
      avatar: "👨‍👩‍👧‍👦",
      memberPositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      completedPositions: [1, 2, 3, 4, 5, 6],
      coordinatorName: "Rajesh Kumar",
      coordinatorPhone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Business Investment Club",
      description: "Monthly investment pool for business opportunities",
      contributionAmount: 10000,
      frequency: "monthly",
      totalMembers: 8,
      currentRound: 3,
      totalRounds: 8,
      nextPaymentDate: "2025-09-20", // Updated to current year
      myPosition: 5,
      status: "active",
      avatar: "💼",
      memberPositions: [1, 2, 3, 4, 5, 6, 7, 8],
      completedPositions: [1, 2, 3],
      coordinatorName: "Priya Sharma",
      coordinatorPhone: "+91 98765 43211",
    },
    {
      id: "3",
      name: "Tech Startup Fund",
      description: "Quarterly funding for tech startups",
      contributionAmount: 25000,
      frequency: "quarterly",
      totalMembers: 6,
      currentRound: 2,
      totalRounds: 6,
      nextPaymentDate: "2025-12-01", // Updated to current year
      myPosition: 4,
      status: "active",
      avatar: "💻",
      memberPositions: [1, 2, 3, 4, 5, 6],
      completedPositions: [1, 2],
      coordinatorName: "Amit Singh",
      coordinatorPhone: "+91 98765 43212",
    },
  ];

  const handleViewGroup = (groupId: string): void => {
    setSelectedGroup(groupId);
    setShowGroupDetails(true);
  };

  const handleJoinNewGroup = (): void => {
    window.location.href = "/member/join-group";
  };

  const handleViewAllGroups = (): void => {
    window.location.href = "/member/groups";
  };

  const handleCloseModal = (): void => {
    setShowGroupDetails(false);
    setSelectedGroup(null);
  };

  const handleTimeframeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedTimeframe(e.target.value as TimeframeType);
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Welcome Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Welcome back, John! 👋
              </h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
                You&apos;re part of {groups.length} active WALLET7 groups with ₹
                {groups
                  .reduce((total, group) => total + group.contributionAmount, 0)
                  .toLocaleString()}{" "}
                in total contributions
              </p>
            </div>

            {/* Mobile-First Button Layout */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleJoinNewGroup}
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center"
                type="button"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Join New Group
              </button>
              <button
                onClick={handleViewAllGroups}
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-3 rounded-lg font-medium transition-all"
                type="button"
              >
                View All Groups
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats - Mobile Responsive Grid */}
        <QuickStats />

        {/* Priority Cards - Stack on Mobile - Now properly passing groups data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ContributionDueCard groups={groups} />
          <PayoutTurnCard groups={groups} />
        </div>

        {/* Main Content - Mobile First Layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {/* Groups Section - Mobile Priority */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                My Groups
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">View:</span>
                <select
                  value={selectedTimeframe}
                  onChange={handleTimeframeChange}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>

            {/* Groups List */}
            <div className="space-y-4">
              {groups.map((group: Group, index: number) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <GroupOverview
                    group={group}
                    showFullDetails={false}
                    showMemberOrder={false}
                    onViewDetails={() => handleViewGroup(group.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* View All Groups Link */}
            <div className="text-center pt-4">
              <button
                onClick={handleViewAllGroups}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                type="button"
              >
                View All Groups →
              </button>
            </div>
          </div>

          {/* Right Sidebar - Stack on Mobile */}
          <div className="space-y-4 sm:space-y-6">
            <NotificationPanel />
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Group Details Modal with Chat */}
      <AnimatePresence>
        {showGroupDetails && selectedGroup && (
          <GroupDetailsModal
            groupId={selectedGroup}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
