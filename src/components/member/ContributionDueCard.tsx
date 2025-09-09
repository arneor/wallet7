// src/components/member/ContributionDueCard.tsx
"use client";

import { motion } from "framer-motion";
import { Group, ContributionDueCardProps } from "@/types/group";

export function ContributionDueCard({ groups }: ContributionDueCardProps) {
  // Find the group with the earliest payment due date
  const getNextContributionDue = (groups: Group[]) => {
    const activeGroups = groups.filter((group) => group.status === "active");
    if (activeGroups.length === 0) return null;

    return activeGroups.reduce((earliest, current) => {
      const earliestDate = new Date(earliest.nextPaymentDate);
      const currentDate = new Date(current.nextPaymentDate);
      return currentDate < earliestDate ? current : earliest;
    });
  };

  const contributionGroup = getNextContributionDue(groups);

  // If no active groups with pending contributions
  if (!contributionGroup) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 relative overflow-hidden"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            All Caught Up! ✨
          </h3>
          <p className="text-gray-600">
            No pending contributions at the moment.
          </p>
        </div>
      </motion.div>
    );
  }

  const dueDate = new Date(contributionGroup.nextPaymentDate);
  const today = new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleContactCoordinator = () => {
    if (contributionGroup.coordinatorPhone) {
      const phoneNumber = contributionGroup.coordinatorPhone.replace(/\s/g, "");
      window.open(`tel:${phoneNumber}`, "_self");
    }
  };

  const handleSetReminder = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Contribution Reminder Set!", {
            body: `Reminder set for ${contributionGroup.name} contribution`,
            icon: "/icon-192x192.png",
          });
        }
      });
    }
  };

  const handleViewGroupDetails = () => {
    window.location.href = `/member/groups/${contributionGroup.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 relative overflow-hidden"
    >
      {/* Mobile-first gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>

      <div className="relative z-10 space-y-4">
        {/* Header - Mobile Optimized */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              {contributionGroup.avatar ? (
                <span className="text-lg sm:text-xl">
                  {contributionGroup.avatar}
                </span>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">
                Contribution Due
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {contributionGroup.name}
              </p>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              daysUntilDue <= 1
                ? "bg-red-100 text-red-700"
                : daysUntilDue <= 3
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {daysUntilDue === 0
              ? "Due Today"
              : daysUntilDue === 1
                ? "Due Tomorrow"
                : daysUntilDue < 0
                  ? `${Math.abs(daysUntilDue)} days overdue`
                  : `${daysUntilDue} days left`}
          </div>
        </div>

        {/* Amount - Mobile Friendly */}
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Amount Due</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{contributionGroup.contributionAmount.toLocaleString()}
          </p>
        </div>

        {/* Details Grid - Stack on Mobile */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="font-medium text-sm">
              {dueDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Frequency</p>
            <p className="font-medium text-sm capitalize">
              {contributionGroup.frequency}
            </p>
          </div>
        </div>

        {/* Coordinator Contact Info */}
        {contributionGroup.coordinatorName && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-blue-600 mb-1">
              Contact for Contribution
            </p>
            <p className="text-sm font-medium text-blue-800">
              {contributionGroup.coordinatorName}
            </p>
            {contributionGroup.coordinatorPhone && (
              <p className="text-xs text-blue-700 mt-1">
                {contributionGroup.coordinatorPhone}
              </p>
            )}
          </div>
        )}

        {/* Mobile-First Button Layout - No Icons, Border Style */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleContactCoordinator}
            disabled={!contributionGroup.coordinatorPhone}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-all text-center"
          >
            Contact Coordinator
          </button>

          <button
            onClick={handleSetReminder}
            className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-all text-center"
          >
            <span className="hidden sm:inline">Set Reminder</span>
            <span className="sm:hidden">Reminder</span>
          </button>

          <button
            onClick={handleViewGroupDetails}
            className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-all text-center"
          >
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
