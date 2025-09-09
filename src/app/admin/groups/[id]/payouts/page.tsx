// src/app/admin/groups/[id]/payouts/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock data for payouts
const mockPayoutData = {
  currentRound: 6,
  totalRounds: 10,
  nextPayoutDate: "2025-09-15",
  nextPayoutMember: "Rajesh Kumar",
  payoutAmount: 50000,
  payoutOrder: [
    {
      position: 1,
      member: "Suresh Kumar",
      status: "completed",
      date: "2025-01-15",
      amount: 48500,
    },
    {
      position: 2,
      member: "Priya Sharma",
      status: "completed",
      date: "2025-02-15",
      amount: 49000,
    },
    {
      position: 3,
      member: "Amit Singh",
      status: "completed",
      date: "2025-03-15",
      amount: 49200,
    },
    {
      position: 4,
      member: "Ravi Patel",
      status: "completed",
      date: "2025-04-15",
      amount: 49500,
    },
    {
      position: 5,
      member: "Meera Joshi",
      status: "completed",
      date: "2025-05-15",
      amount: 49800,
    },
    {
      position: 6,
      member: "Rajesh Kumar",
      status: "upcoming",
      date: "2025-09-15",
      amount: 50000,
    },
    {
      position: 7,
      member: "Anita Reddy",
      status: "pending",
      date: "2025-10-15",
      amount: 50000,
    },
    {
      position: 8,
      member: "Vikram Shah",
      status: "pending",
      date: "2025-11-15",
      amount: 50000,
    },
    {
      position: 9,
      member: "Sanjay Gupta",
      status: "pending",
      date: "2025-12-15",
      amount: 50000,
    },
    {
      position: 10,
      member: "Kavita Iyer",
      status: "pending",
      date: "2026-01-15",
      amount: 50000,
    },
  ],
  payoutMethod: "lottery",
  dividendRate: 2.5,
};

export default function GroupPayoutsPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedRound, setSelectedRound] = useState(
    mockPayoutData.currentRound
  );
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const upcomingPayouts = mockPayoutData.payoutOrder
    .filter((p) => p.status === "upcoming" || p.status === "pending")
    .slice(0, 3);
  const completedPayouts = mockPayoutData.payoutOrder.filter(
    (p) => p.status === "completed"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleProcessPayout = () => {
    console.log("Processing payout for", mockPayoutData.nextPayoutMember);
    setShowPayoutModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Next Payout Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
            <h3 className="text-lg font-semibold text-blue-900">
              Next Payout Due
            </h3>
            <p className="text-blue-700 mt-1">
              <span className="font-bold">
                {mockPayoutData.nextPayoutMember}
              </span>{" "}
              is scheduled to receive{" "}
              <span className="font-bold">
                ₹{mockPayoutData.payoutAmount.toLocaleString()}
              </span>{" "}
              on{" "}
              <span className="font-bold">
                {new Date(mockPayoutData.nextPayoutDate).toLocaleDateString()}
              </span>
            </p>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => setShowPayoutModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Process Payout
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                Send Notification
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {completedPayouts.length}
            </p>
            <p className="text-sm text-gray-500">Completed Payouts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {mockPayoutData.totalRounds - completedPayouts.length}
            </p>
            <p className="text-sm text-gray-500">Remaining Payouts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              ₹{mockPayoutData.payoutAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Current Payout Amount</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {mockPayoutData.dividendRate}%
            </p>
            <p className="text-sm text-gray-500">Average Dividend Rate</p>
          </div>
        </div>
      </div>

      {/* Upcoming Payouts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Upcoming Payouts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingPayouts.map((payout, index) => (
            <div
              key={payout.position}
              className={`p-4 rounded-lg border-2 ${
                payout.status === "upcoming"
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center font-bold text-lg text-gray-700">
                  {payout.position}
                </div>
                <h3 className="font-semibold text-gray-900">{payout.member}</h3>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  ₹{payout.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(payout.date).toLocaleDateString()}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(payout.status)}`}
                >
                  {payout.status === "upcoming" ? "Next" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Payout Timeline</h2>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: mockPayoutData.totalRounds }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Round {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {mockPayoutData.payoutOrder.map((payout, index) => (
            <div
              key={payout.position}
              className={`flex items-center space-x-4 p-4 rounded-lg border ${
                payout.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : payout.status === "upcoming"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
              }`}
            >
              {/* Position Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  payout.status === "completed"
                    ? "bg-green-600 text-white"
                    : payout.status === "upcoming"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-400 text-white"
                }`}
              >
                {payout.position}
              </div>

              {/* Member Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{payout.member}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(payout.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{payout.amount.toLocaleString()}
                </p>
                {payout.status === "completed" && (
                  <p className="text-xs text-green-600">
                    Dividend: ₹
                    {(
                      mockPayoutData.payoutAmount - payout.amount
                    ).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}
                >
                  {payout.status.charAt(0).toUpperCase() +
                    payout.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {payout.status === "upcoming" && (
                  <button
                    onClick={() => setShowPayoutModal(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Process
                  </button>
                )}
                {payout.status === "completed" && (
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                    Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Rules Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">
          📋 Payout Rules & Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">Payout Method</h4>
            <p className="text-yellow-700">
              This group uses{" "}
              <span className="font-semibold capitalize">
                {mockPayoutData.payoutMethod}
              </span>{" "}
              system for determining payout order.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Dividend Calculation
            </h4>
            <p className="text-yellow-700">
              Dividends are calculated based on the bid amount and distributed
              equally among non-prized members.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Payout Processing
            </h4>
            <p className="text-yellow-700">
              Payouts are processed within 2 business days of the due date after
              all contributions are collected.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Late Payments Impact
            </h4>
            <p className="text-yellow-700">
              Payouts may be delayed if contributions are pending. Penalties
              apply for late payments.
            </p>
          </div>
        </div>
      </div>

      {/* Process Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Process Payout
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Member:</span>{" "}
                    {mockPayoutData.nextPayoutMember}
                  </p>
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Amount:</span> ₹
                    {mockPayoutData.payoutAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Due Date:</span>{" "}
                    {new Date(
                      mockPayoutData.nextPayoutDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any notes about this payout..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleProcessPayout}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Confirm Payout
                  </button>
                  <button
                    onClick={() => setShowPayoutModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
