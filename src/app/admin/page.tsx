// src/app/admin/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { DashboardStats } from "@/components/admin/DashboardStats";

import { GroupCard } from "@/components/admin/GroupCard";
import { QuickActions } from "@/components/admin/QuickActions";
import { PendingPayments } from "@/components/admin/PendingPayments";
import { RecentActivity } from "@/components/member/RecentActivity";
import { UpcomingPayouts } from "@/components/admin/UpcomingPayouts";

// Mock data - replace with actual data from your state management
const mockGroups = [
  {
    id: "1",
    name: "Family Savings Circle",
    description: "Monthly family savings for emergency fund",
    contributionAmount: 5000,
    frequency: "monthly",
    totalMembers: 10,
    currentRound: 6,
    totalRounds: 10,
    status: "active" as const,
    nextPayoutDate: "2025-09-15",
    nextPayoutMember: "Rajesh Kumar",
    pendingPayments: 2,
    collectionRate: 95,
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
    status: "active" as const,
    nextPayoutDate: "2025-09-20",
    nextPayoutMember: "Priya Sharma",
    pendingPayments: 1,
    collectionRate: 100,
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
    status: "active" as const,
    nextPayoutDate: "2025-12-01",
    nextPayoutMember: "Amit Singh",
    pendingPayments: 0,
    collectionRate: 100,
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Group Conductor Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your chit fund groups and track member contributions
          </p>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardStats groups={mockGroups} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickActions />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Priority Items */}
          <div className="xl:col-span-2 space-y-6">
            {/* Pending Payments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PendingPayments groups={mockGroups} />
            </motion.div>

            {/* Active Groups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Active Groups
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockGroups.slice(0, 4).map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <GroupCard group={group} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Secondary Info */}
          <div className="space-y-6">
            {/* Upcoming Payouts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <UpcomingPayouts groups={mockGroups} />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <RecentActivity />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
