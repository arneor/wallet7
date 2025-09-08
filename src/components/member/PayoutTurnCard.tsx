// src/components/member/PayoutTurnCard.tsx
"use client";

import { motion } from "framer-motion";

export function PayoutTurnCard() {
  const payoutTurn = {
    groupName: "Business Investment Club",
    totalAmount: 60000,
    position: 2,
    totalMembers: 10,
    estimatedDate: "2024-04-15",
    status: "next" as const,
  };

  const progress =
    ((payoutTurn.totalMembers - payoutTurn.position + 1) /
      payoutTurn.totalMembers) *
    100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Payout Turn</h3>
              <p className="text-sm text-gray-600">{payoutTurn.groupName}</p>
            </div>
          </div>

          <div className="badge badge-success">
            Position #{payoutTurn.position}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Expected Payout</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{payoutTurn.totalAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Queue Progress</span>
              <span className="text-sm font-medium">
                {payoutTurn.totalMembers - payoutTurn.position + 1} of{" "}
                {payoutTurn.totalMembers}
              </span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Estimated Date</p>
              <p className="font-medium">
                {new Date(payoutTurn.estimatedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Members Ahead</p>
              <p className="font-medium">{payoutTurn.position - 1} members</p>
            </div>
          </div>

          {payoutTurn.status === "next" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-lg">🎉</span>
                <p className="text-sm text-green-800 font-medium">
                  You&apos;re next in line for the payout!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
