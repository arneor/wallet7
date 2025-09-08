// src/app/member/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PaymentDueCard } from "@/components/member/PaymentDueCard";
import { PayoutTurnCard } from "@/components/member/PayoutTurnCard";
import { GroupOverview } from "@/components/member/GroupOverview";
import { QuickStats } from "@/components/member/QuickStats";
import { NotificationPanel } from "@/components/member/NotificationPanel";
import { RecentActivity } from "@/components/member/RecentActivity";

export default function MemberDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
            <p className="text-blue-100 text-lg">
              You&apos;re part of 3 active ROSCA groups with ₹15,000 in total
              contributions
            </p>
          </div>

          <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3">
              View All Groups
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Priority Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentDueCard />
        <PayoutTurnCard />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Groups Overview */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Groups</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">View:</span>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="form-input py-1 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <GroupOverview />
            <GroupOverview />
            <GroupOverview />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <NotificationPanel />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
