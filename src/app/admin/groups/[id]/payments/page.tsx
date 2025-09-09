// src/app/admin/groups/[id]/payments/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PaymentTracker } from "@/components/admin/PaymentTracker";

export default function GroupPaymentsPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedRound, setSelectedRound] = useState("6");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Contribution Tracking
          </h1>
          <p className="text-gray-600">
            Track contributions for Family Savings Circle
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Round 1</option>
            <option value="2">Round 2</option>
            <option value="3">Round 3</option>
            <option value="4">Round 4</option>
            <option value="5">Round 5</option>
            <option value="6">Round 6 (Current)</option>
          </select>
        </div>
      </motion.div>

      {/* Payment Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">₹48,000</p>
            <p className="text-sm text-gray-500">Total Collected</p>
            <p className="text-xs text-gray-400">This Round</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">₹2,88,000</p>
            <p className="text-sm text-gray-500">Total Pool Value</p>
            <p className="text-xs text-gray-400">All Rounds</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xs text-gray-400">Need Follow-up</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">95%</p>
            <p className="text-sm text-gray-500">Collection Rate</p>
            <p className="text-xs text-gray-400">This Round</p>
          </div>
        </div>

        {/* Collection Progress */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Collection Progress
            </span>
            <span className="text-sm text-gray-500">8 of 10 collected</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Payout Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
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
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900">Next Payout</h3>
            <p className="text-blue-700 mt-1">
              Rajesh Kumar is scheduled to receive ₹50,000 on September 15, 2025
            </p>
            <div className="mt-3 flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Process Payout
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PaymentTracker />
      </motion.div>
    </div>
  );
}
