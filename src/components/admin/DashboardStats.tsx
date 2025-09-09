// src/components/admin/DashboardStats.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

interface Group {
  id: string;
  contributionAmount: number;
  totalMembers: number;
  pendingPayments: number;
  collectionRate: number;
  status: string;
}

interface DashboardStatsProps {
  groups: Group[];
}

export function DashboardStats({ groups }: DashboardStatsProps) {
  // Calculate statistics from groups data
  const totalGroups = groups.length;
  const activeGroups = groups.filter(
    (group) => group.status === "active"
  ).length;

  const totalMembers = groups.reduce(
    (sum, group) => sum + group.totalMembers,
    0
  );

  const totalPendingPayments = groups.reduce(
    (sum, group) => sum + group.pendingPayments,
    0
  );

  const totalPoolValue = groups.reduce(
    (sum, group) => sum + group.contributionAmount * group.totalMembers,
    0
  );

  const avgCollectionRate =
    groups.length > 0
      ? groups.reduce((sum, group) => sum + group.collectionRate, 0) /
        groups.length
      : 0;

  const stats = [
    {
      title: "Active Groups",
      value: activeGroups.toString(),
      subtitle: `${totalGroups} total groups`,
      change: "+2 this month",
      changeType: "positive" as const,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Members",
      value: totalMembers.toString(),
      subtitle: "Across all groups",
      change: "+12 this week",
      changeType: "positive" as const,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Contributions",
      value: totalPendingPayments.toString(),
      subtitle: "Need attention",
      change: totalPendingPayments === 0 ? "All clear!" : "Follow up required",
      changeType:
        totalPendingPayments === 0 ? "positive" : ("negative" as const),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: totalPendingPayments === 0 ? "bg-green-100" : "bg-orange-100",
      iconColor:
        totalPendingPayments === 0 ? "text-green-600" : "text-orange-600",
    },
    {
      title: "Collection Rate",
      value: `${avgCollectionRate.toFixed(1)}%`,
      subtitle: "Average across groups",
      change: "+1.2% from last month",
      changeType: "positive" as const,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600 mb-2">{stat.subtitle}</p>
                <p
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
