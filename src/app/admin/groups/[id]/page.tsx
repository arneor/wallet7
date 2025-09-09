// src/app/admin/groups/[id]/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// This is now just the Overview tab content
export default function GroupOverviewPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-600 mb-2">
            Total Pool Value
          </h3>
          <p className="text-2xl font-bold text-blue-900">₹50,000</p>
          <p className="text-xs text-blue-600">Per round</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-600 mb-2">
            Total Collected
          </h3>
          <p className="text-2xl font-bold text-green-900">₹2,40,000</p>
          <p className="text-xs text-green-600">All rounds</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="text-sm font-medium text-orange-600 mb-2">
            Pending Contributions
          </h3>
          <p className="text-2xl font-bold text-orange-900">2</p>
          <p className="text-xs text-orange-600">Need follow-up</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-sm font-medium text-purple-600 mb-2">
            Next Payout
          </h3>
          <p className="text-sm font-bold text-purple-900">Rajesh Kumar</p>
          <p className="text-xs text-purple-600">Sep 15, 2025</p>
        </div>
      </div>

      {/* Group Rules & Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">
            Group Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Created Date:</span>
              <span className="text-sm font-medium">Jan 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Frequency:</span>
              <span className="text-sm font-medium">Monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Group Coordinator:</span>
              <span className="text-sm font-medium">Rajesh Kumar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Payout Method:</span>
              <span className="text-sm font-medium">Lottery</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Group Rules</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Late Payment Penalty:
              </span>
              <span className="text-sm font-medium">₹100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Grace Period:</span>
              <span className="text-sm font-medium">3 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Current Round:</span>
              <span className="text-sm font-medium">6 of 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Estimated Completion:
              </span>
              <span className="text-sm font-medium">Jan 15, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">📅 Upcoming Events</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Next Payout Due:</span>
            <span className="text-sm font-medium text-blue-900">
              Sep 15, 2025
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              Next Contribution Due:
            </span>
            <span className="text-sm font-medium text-blue-900">
              Sep 24, 2025
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Priya Sharma made contribution for Round 6
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Payout processed for Amit Singh
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Reminder sent to 2 members
              </p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
