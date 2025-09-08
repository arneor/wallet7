// src/components/member/GroupOverview.tsx
"use client";

import { motion } from "framer-motion";

export function GroupOverview() {
  const group = {
    id: "1",
    name: "Family Savings Circle",
    description: "Monthly family savings for emergency fund",
    contributionAmount: 5000,
    frequency: "monthly",
    totalMembers: 10,
    currentRound: 6,
    totalRounds: 10,
    nextPaymentDate: "2024-02-15",
    myPosition: 8,
    status: "active" as const,
    avatar: "👨‍👩‍👧‍👦",
  };

  const roundProgress = (group.currentRound / group.totalRounds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-hover"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
              {group.avatar}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{group.name}</h3>
              <p className="text-gray-600">{group.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="badge badge-success">{group.status}</span>
                <span className="text-sm text-gray-500">
                  {group.totalMembers} members
                </span>
              </div>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm">View Details</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              ₹{group.contributionAmount.toLocaleString()}
            </p>
            <p className="text-xs text-blue-700">Monthly</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              #{group.myPosition}
            </p>
            <p className="text-xs text-green-700">My Position</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl">
            <p className="text-2xl font-bold text-purple-600">
              ₹
              {(group.contributionAmount * group.totalMembers).toLocaleString()}
            </p>
            <p className="text-xs text-purple-700">Total Pool</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-xl">
            <p className="text-2xl font-bold text-orange-600">
              {group.totalRounds - group.currentRound}
            </p>
            <p className="text-xs text-orange-700">Rounds Left</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Round Progress
            </span>
            <span className="text-sm text-gray-500">
              {group.currentRound}/{group.totalRounds} completed
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${roundProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Next Payment:{" "}
              {new Date(group.nextPaymentDate).toLocaleDateString()}
            </span>
            <span className="text-blue-600 font-medium">View Timeline</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
