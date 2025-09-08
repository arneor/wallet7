// src/components/member/NotificationPanel.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type:
    | "payment_due"
    | "payout_turn"
    | "group_update"
    | "payment_received"
    | "member_joined";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  priority?: "high" | "normal" | "low";
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "payment_due",
      title: "Payment reminder",
      message: "Family Savings Circle payment due tomorrow",
      time: "2h ago",
      unread: true,
      priority: "high",
    },
    {
      id: "2",
      type: "payout_turn",
      title: "Payout notification",
      message: "You are next in line for Business Club payout",
      time: "5h ago",
      unread: true,
      priority: "high",
    },
    {
      id: "3",
      type: "group_update",
      title: "New member joined",
      message: "Sarah Johnson joined Family Savings Circle",
      time: "1d ago",
      unread: false,
      priority: "normal",
    },
    {
      id: "4",
      type: "payment_received",
      title: "Payment confirmed",
      message: "Your payment of ₹5,000 has been confirmed",
      time: "2d ago",
      unread: false,
      priority: "normal",
    },
  ]);

  const [showAll, setShowAll] = useState(false);

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    // Handle different notification types
    switch (notification.type) {
      case "payment_due":
        window.location.href = "/member/payments";
        break;
      case "payout_turn":
        window.location.href = "/member/groups";
        break;
      case "group_update":
        window.location.href = "/member/groups";
        break;
      default:
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";

    switch (type) {
      case "payment_due":
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-orange-600`}
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
          </div>
        );
      case "payout_turn":
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              className={`${iconClass} text-green-600`}
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
      case "group_update":
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        );
      case "payment_received":
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
                d="M5 13l4 4L19 7"
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

  const unreadCount = notifications.filter((n) => n.unread).length;
  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 3);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="font-bold text-lg text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayedNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleNotificationClick(notification)}
              className={`relative p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                notification.unread
                  ? "bg-blue-50 border-l-4 border-l-blue-500 hover:bg-blue-100"
                  : "bg-gray-50 border-l-4 border-l-gray-300 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Notification Icon */}
                {getNotificationIcon(notification.type)}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm sm:text-base font-medium truncate ${
                          notification.unread
                            ? "text-blue-900"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                          notification.unread
                            ? "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-1 ml-2">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority indicator */}
              {notification.priority === "high" && notification.unread && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-100">
        {notifications.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex-1 text-sm text-gray-600 hover:text-gray-900 font-medium py-2"
          >
            {showAll ? "Show Less" : `Show All (${notifications.length})`}
          </button>
        )}

        <button
          onClick={() => (window.location.href = "/member/notifications")}
          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View All Notifications
        </button>
      </div>

      {/* Empty state */}
      {notifications.length === 0 && (
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
                d="M15 17h5l-5 5v-5z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
