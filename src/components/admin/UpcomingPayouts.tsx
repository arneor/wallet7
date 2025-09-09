// src/components/admin/UpcomingPayouts.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface Group {
  id: string;
  name: string;
  nextPayoutDate: string;
  nextPayoutMember: string;
  contributionAmount: number;
  totalMembers: number;
}

interface UpcomingPayoutsProps {
  groups: Group[];
}

export function UpcomingPayouts({ groups }: UpcomingPayoutsProps) {
  const sortedGroups = groups
    .filter((group) => group.nextPayoutDate)
    .sort(
      (a, b) =>
        new Date(a.nextPayoutDate).getTime() -
        new Date(b.nextPayoutDate).getTime()
    )
    .slice(0, 5);

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const payoutDate = new Date(dateString);
    const diffTime = payoutDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <svg
            className="w-6 h-6 text-green-600 mr-2"
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
          Upcoming Payouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedGroups.map((group) => {
            const daysUntil = getDaysUntil(group.nextPayoutDate);
            const totalPayout = group.contributionAmount * group.totalMembers;

            return (
              <div
                key={group.id}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {group.nextPayoutMember}
                    </p>
                    <p className="text-sm text-gray-600">{group.name}</p>
                    <p className="text-sm font-medium text-green-700">
                      ₹{totalPayout.toLocaleString()} payout
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        daysUntil <= 1
                          ? "bg-red-100 text-red-700"
                          : daysUntil <= 7
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {daysUntil === 0
                        ? "Today"
                        : daysUntil === 1
                          ? "Tomorrow"
                          : `${daysUntil} days`}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(group.nextPayoutDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
