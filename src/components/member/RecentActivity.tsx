// src/components/member/RecentActivity.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Activity {
  id: string;
  type: "payment" | "group_join" | "payout" | "group_create" | "member_add";
  description: string;
  amount?: string;
  time: string;
  groupName?: string;
  status: "success" | "pending" | "failed";
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "payment",
      description: "Made payment to Family Savings Circle",
      amount: "+₹5,000",
      time: "2 hours ago",
      groupName: "Family Savings Circle",
      status: "success",
    },
    {
      id: "2",
      type: "group_join",
      description: "Joined Business Investment Club",
      amount: "",
      time: "1 day ago",
      groupName: "Business Investment Club",
      status: "success",
    },
    {
      id: "3",
      type: "payout",
      description: "Received payout from Community Fund",
      amount: "+₹45,000",
      time: "3 days ago",
      groupName: "Community Fund",
      status: "success",
    },
    {
      id: "4",
      type: "payment",
      description: "Payment pending for Tech Startup Group",
      amount: "₹2,000",
      time: "5 days ago",
      groupName: "Tech Startup Group",
      status: "pending",
    },
    {
      id: "5",
      type: "group_create",
      description: "Created Friends Savings Circle",
      amount: "",
      time: "1 week ago",
      groupName: "Friends Savings Circle",
      status: "success",
    },
  ]);

  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<"all" | "payments" | "groups">("all");

  const handleActivityClick = (activity: Activity) => {
    switch (activity.type) {
      case "payment":
      case "payout":
        window.location.href = "/member/payments";
        break;
      case "group_join":
      case "group_create":
        window.location.href = "/member/groups";
        break;
      default:
        break;
    }
  };

  const getActivityIcon = (type: string, status: string) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";

    switch (type) {
      case "payment":
        return (
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
              status === "success"
                ? "bg-green-100"
                : status === "pending"
                  ? "bg-yellow-100"
                  : "bg-red-100"
            }`}
          >
            <svg
              className={`${iconClass} ${
                status === "success"
                  ? "text-green-600"
                  : status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
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
        );
      case "payout":
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-purple-600`}
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
        );
      case "group_join":
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-blue-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        );
      case "group_create":
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-indigo-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-gray-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            Success
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true;
    if (filter === "payments")
      return activity.type === "payment" || activity.type === "payout";
    if (filter === "groups")
      return activity.type === "group_join" || activity.type === "group_create";
    return true;
  });

  const displayedActivities = showAll
    ? filteredActivities
    : filteredActivities.slice(0, 4);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      {/* Header with Filter - Mobile Optimized */}
      <div className="space-y-4 mb-6">
        <h3 className="font-bold text-lg text-gray-900">Recent Activity</h3>

        {/* Filter Buttons */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: "all", label: "All", icon: "📊" },
            { id: "payments", label: "Payments", icon: "💳" },
            { id: "groups", label: "Groups", icon: "👥" },
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as "all" | "payments" | "groups")}
              className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-all ${
                filter === filterOption.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{filterOption.icon}</span>
              <span className="hidden sm:inline">{filterOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleActivityClick(activity)}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              {/* Activity Icon */}
              {getActivityIcon(activity.type, activity.status)}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    {activity.groupName && (
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {activity.groupName}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>

                  {/* Amount */}
                  {activity.amount && (
                    <div className="ml-3 text-right">
                      <span
                        className={`text-sm font-medium ${
                          activity.amount.startsWith("+")
                            ? "text-green-600"
                            : activity.status === "pending"
                              ? "text-yellow-600"
                              : "text-gray-600"
                        }`}
                      >
                        {activity.amount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
        {filteredActivities.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex-1 text-sm text-gray-600 hover:text-gray-900 font-medium py-2"
          >
            {showAll ? "Show Less" : `Show All (${filteredActivities.length})`}
          </button>
        )}

        <button
          onClick={() => (window.location.href = "/member/activity")}
          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View All Activity
        </button>
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No recent activity</p>
        </div>
      )}
    </div>
  );
}
