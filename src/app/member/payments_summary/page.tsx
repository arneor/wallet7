// src/app/member/payments/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { PaymentHistory } from "@/components/member/PaymentHistory";
import { ContributionDueCard } from "@/components/member/ContributionDueCard";
import { Group } from "@/types/group";

export default function MemberPaymentsSummaryPage() {
  // Sample groups data - you can fetch this from your state management or API
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
      nextPaymentDate: "2025-09-15",
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
      nextPaymentDate: "2025-09-20",
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
      nextPaymentDate: "2025-12-01",
      myPosition: 4,
      status: "active",
      avatar: "💻",
      memberPositions: [1, 2, 3, 4, 5, 6],
      completedPositions: [1, 2],
      coordinatorName: "Amit Singh",
      coordinatorPhone: "+91 98765 43212",
    },
  ];

  // Calculate payment statistics
  const totalContributed = groups.reduce((total, group) => {
    const completedPayments = group.completedPositions?.length || 0;
    return total + group.contributionAmount * completedPayments;
  }, 0);

  const nextContributionAmount =
    groups
      .filter((group) => group.status === "active")
      .reduce((min, group) => {
        const nextPayment = new Date(group.nextPaymentDate);
        const earliestPayment = new Date(min.nextPaymentDate);
        return nextPayment < earliestPayment ? group : min;
      }, groups[0])?.contributionAmount || 0;

  const totalPaymentsMade = groups.reduce((total, group) => {
    return total + (group.completedPositions?.length || 0);
  }, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Contributions Summary
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Track your contribution history and upcoming due dates
        </p>
      </motion.div>

      {/* Contribution Due Card */}
      <ContributionDueCard groups={groups} />

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Contributed */}
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
              ₹{totalContributed.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Total Contributed
            </p>
          </div>

          {/* Next Contribution */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
              ₹{nextContributionAmount.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Next Contribution
            </p>
          </div>

          {/* Contributions Made */}
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
              {totalPaymentsMade}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Contributions Made
            </p>
          </div>
        </div>
      </motion.div>

      {/* Active Groups Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Active Groups Overview
        </h2>
        <div className="space-y-3">
          {groups
            .filter((group) => group.status === "active")
            .map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{group.avatar}</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {group.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Round {group.currentRound} of {group.totalRounds} •{" "}
                      {group.frequency}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">
                    ₹{group.contributionAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Next: {new Date(group.nextPaymentDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <PaymentHistory />
      </motion.div>
    </div>
  );
}
