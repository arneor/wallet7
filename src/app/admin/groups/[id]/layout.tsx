// src/app/admin/groups/[id]/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Mock group data for header
const mockGroup = {
  name: "Family Savings Circle",
  description: "Monthly family savings for emergency fund",
  contributionAmount: 5000,
  currentRound: 6,
  totalRounds: 10,
  currentMembers: 8,
  totalMembers: 10,
  collectionRate: 95,
  status: "active",
};

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const groupId = params.id as string;

  const basePath = `/admin/groups/${groupId}`;

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      href: basePath,
      icon: "📊",
    },
    {
      id: "members",
      name: "Members",
      href: `${basePath}/members`,
      icon: "👥",
    },
    {
      id: "payments",
      name: "Contributions",
      href: `${basePath}/payments`,
      icon: "💰",
    },
    {
      id: "payouts",
      name: "Payout Schedule",
      href: `${basePath}/payouts`,
      icon: "📅",
    },
    {
      id: "reports",
      name: "Reports",
      href: `${basePath}/reports`,
      icon: "📋",
    },
  ];

  const progress = (mockGroup.currentRound / mockGroup.totalRounds) * 100;

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {mockGroup.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mockGroup.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {mockGroup.status.charAt(0).toUpperCase() +
                  mockGroup.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{mockGroup.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Round Progress</p>
                <p className="font-semibold">
                  {mockGroup.currentRound}/{mockGroup.totalRounds}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-semibold">
                  {mockGroup.currentMembers}/{mockGroup.totalMembers}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contribution</p>
                <p className="font-semibold">
                  ₹{mockGroup.contributionAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Collection Rate</p>
                <p className="font-semibold text-green-600">
                  {mockGroup.collectionRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send Reminder
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Wallet7 Progress
            </span>
            <span className="text-sm text-gray-500">
              {progress.toFixed(1)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tab Content - This is where your child pages render */}
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}
