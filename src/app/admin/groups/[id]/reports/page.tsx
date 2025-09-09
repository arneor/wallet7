// src/app/admin/groups/[id]/reports/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ReportsExport } from "@/components/admin/ReportsExport";

export default function GroupReportsPage({
  params,
}: {
  params: { id: string };
}) {
  const [reportType, setReportType] = useState("overview");

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
            Group Reports & Ledger
          </h1>
          <p className="text-gray-600">
            Financial reports and transparency for Family Savings Circle
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="contributions">Contributions</option>
            <option value="payouts">Payouts</option>
            <option value="dividends">Dividends</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-blue-600">10</p>
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-xs text-green-600 mt-1">+0 this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-green-600">₹5,00,000</p>
          <p className="text-sm text-gray-500">Total Pool Value</p>
          <p className="text-xs text-blue-600 mt-1">Per round</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-purple-600">6</p>
          <p className="text-sm text-gray-500">Completed Rounds</p>
          <p className="text-xs text-gray-600 mt-1">60% progress</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-orange-600">97%</p>
          <p className="text-sm text-gray-500">Average Collection Rate</p>
          <p className="text-xs text-green-600 mt-1">+2% vs last month</p>
        </div>
      </motion.div>

      {/* Financial Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Contributions
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Collected:</span>
                <span className="text-sm font-medium">₹29,10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Outstanding:</span>
                <span className="text-sm font-medium text-orange-600">
                  ₹40,000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Penalties:</span>
                <span className="text-sm font-medium">₹2,500</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Payouts</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Disbursed:</span>
                <span className="text-sm font-medium">₹28,50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dividend Paid:</span>
                <span className="text-sm font-medium text-green-600">
                  ₹45,000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Payout:</span>
                <span className="text-sm font-medium">₹4,75,000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Fund Balance
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available:</span>
                <span className="text-sm font-medium text-blue-600">
                  ₹85,000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reserved:</span>
                <span className="text-sm font-medium">₹15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Interest Earned:</span>
                <span className="text-sm font-medium text-green-600">
                  ₹12,500
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compliance & Audit Trail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900">
              Compliance Status
            </h3>
            <p className="text-green-700 mt-1">
              This chit fund group is fully compliant with the Chit Funds Act,
              1982. All records are maintained digitally and available for
              audit.
            </p>
            <div className="mt-3 flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Generate Audit Report
              </button>
              <button className="border-2 border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm">
                View Digital Agreements
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reports Export */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ReportsExport />
      </motion.div>
    </div>
  );
}
