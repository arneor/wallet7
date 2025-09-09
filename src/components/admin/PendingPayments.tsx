// src/components/admin/PendingPayments.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface Group {
  id: string;
  name: string;
  pendingPayments: number;
  contributionAmount: number;
  nextPayoutDate: string;
}

interface PendingPaymentsProps {
  groups: Group[];
}

export function PendingPayments({ groups }: PendingPaymentsProps) {
  const groupsWithPending = groups.filter((group) => group.pendingPayments > 0);

  if (groupsWithPending.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <svg
              className="w-6 h-6 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            All Contributions Up to Date! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Great job! All members have made their contributions on time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <svg
              className="w-6 h-6 text-orange-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Pending Contributions
          </CardTitle>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
            Send All Reminders
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {groupsWithPending.map((group) => (
            <div
              key={group.id}
              className="bg-orange-50 border border-orange-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{group.name}</p>
                  <p className="text-sm text-gray-600">
                    {group.pendingPayments} member
                    {group.pendingPayments > 1 ? "s" : ""} pending • ₹
                    {group.contributionAmount.toLocaleString()} each
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="border-2 border-orange-300 text-orange-700 px-3 py-1 rounded text-sm font-medium hover:border-orange-400 hover:bg-orange-50 transition-colors">
                    Send Reminder
                  </button>
                  <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-orange-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
