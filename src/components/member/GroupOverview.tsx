// src/components/member/GroupOverview.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GroupOverviewProps } from "@/types/group";

export const GroupOverview: React.FC<GroupOverviewProps> = ({
  group,
  showFullDetails = false,
  showMemberOrder = false,
  onViewDetails,
}) => {
  const roundProgress = (group.currentRound / group.totalRounds) * 100;

  const handleViewDetails = (): void => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      window.location.href = `/member/groups/${group.id}`;
    }
  };

  const handleViewTimeline = (): void => {
    window.location.href = `/member/groups/${group.id}/timeline`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* Mobile-First Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            {group.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
              {group.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 truncate">
              {group.description}
            </p>
            <div className="flex items-center space-x-3 mt-1 sm:mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  group.status === "active"
                    ? "bg-green-100 text-green-700"
                    : group.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {group.status}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                {group.totalMembers} members
              </span>
            </div>
          </div>
        </div>

        {/* FIXED: Button shows when showFullDetails is FALSE */}
        {!showFullDetails && (
          <button
            onClick={handleViewDetails}
            className="w-full sm:w-auto bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            type="button"
          >
            View Details & Chat
          </button>
        )}
      </div>

      {/* Stats Grid - Mobile Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 sm:mb-6">
        <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-blue-600">
            ₹{group.contributionAmount.toLocaleString()}
          </p>
          <p className="text-xs text-blue-700 capitalize">{group.frequency}</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-green-600">
            #{group.myPosition}
          </p>
          <p className="text-xs text-green-700">My Position</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-purple-600">
            ₹{(group.contributionAmount * group.totalMembers).toLocaleString()}
          </p>
          <p className="text-xs text-purple-700">Total Pool</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-orange-600">
            {group.totalRounds - group.currentRound}
          </p>
          <p className="text-xs text-orange-700">Rounds Left</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Round Progress
          </span>
          <span className="text-sm text-gray-500">
            {group.currentRound}/{group.totalRounds} completed
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${roundProgress}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Footer Info - Mobile Stack */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
          <span className="text-gray-500">
            Next Payment: {new Date(group.nextPaymentDate).toLocaleDateString()}
          </span>
          {!showFullDetails && (
            <button
              onClick={handleViewTimeline}
              className="text-blue-600 font-medium hover:underline text-left sm:text-right"
              type="button"
            >
              View Timeline
            </button>
          )}
        </div>
      </div>

      {/* Member Order Section - Show when requested */}
      {(showMemberOrder || showFullDetails) && group.memberPositions && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">Member Payout Order</h4>
            <span className="text-sm text-gray-500">
              Position {group.myPosition} of {group.totalMembers}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {group.memberPositions.map((position: number) => (
              <div
                key={position}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-colors ${
                  group.completedPositions?.includes(position)
                    ? "bg-green-100 text-green-700"
                    : position === group.myPosition
                      ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {group.completedPositions?.includes(position)
                  ? "✓"
                  : position === group.myPosition
                    ? "Me"
                    : position}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-green-100 rounded border"
                aria-hidden="true"
              ></div>
              <span className="text-gray-600">Received Payout</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-blue-100 rounded border-2 border-blue-300"
                aria-hidden="true"
              ></div>
              <span className="text-gray-600">Your Position</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-gray-100 rounded border"
                aria-hidden="true"
              ></div>
              <span className="text-gray-600">Waiting</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
