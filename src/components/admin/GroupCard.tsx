// src/components/admin/GroupCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface Group {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: string;
  totalMembers: number;
  currentRound: number;
  totalRounds: number;
  status: "active" | "inactive" | "completed";
  nextPayoutDate: string;
  nextPayoutMember: string;
  pendingPayments: number;
  collectionRate: number;
}

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const progress = (group.currentRound / group.totalRounds) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold text-gray-900 truncate pr-2">
            {group.name}
          </CardTitle>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(group.status)}`}
          >
            {group.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {group.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <span className="text-gray-600 block mb-1">Contribution</span>
            <p className="font-bold text-blue-900">
              ₹{group.contributionAmount.toLocaleString()}
            </p>
            <p className="text-xs text-blue-600 capitalize">
              {group.frequency}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <span className="text-gray-600 block mb-1">Collection Rate</span>
            <p className="font-bold text-green-900">{group.collectionRate}%</p>
            <p className="text-xs text-green-600">This round</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Round Progress
            </span>
            <span className="text-sm text-gray-600">
              {group.currentRound}/{group.totalRounds}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Next Payout Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600">Next Payout</p>
              <p className="font-medium text-gray-900">
                {group.nextPayoutMember}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Date</p>
              <p className="font-medium text-gray-900">
                {new Date(group.nextPayoutDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Alert for Pending Payments */}
        {group.pendingPayments > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-orange-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-orange-800">
                {group.pendingPayments} pending contribution
                {group.pendingPayments > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Link
            href={`/admin/groups/${group.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/admin/groups/${group.id}/payments`}
            className="flex-1 border-2 border-gray-300 text-gray-700 text-center py-2 px-3 rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Manage
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
