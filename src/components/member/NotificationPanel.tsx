// src/components/member/NotificationPanel.tsx
"use client";

import { motion } from "framer-motion";

export function NotificationPanel() {
  const notifications = [
    {
      id: "1",
      type: "payment_due",
      title: "Payment reminder",
      message: "Family Savings Circle payment due tomorrow",
      time: "2h ago",
      unread: true,
    },
    {
      id: "2",
      type: "payout_turn",
      title: "Payout notification",
      message: "You are next in line for Business Club payout",
      time: "5h ago",
      unread: true,
    },
    {
      id: "3",
      type: "group_update",
      title: "New member joined",
      message: "Sarah Johnson joined Family Savings Circle",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900">
            Recent Notifications
          </h3>
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-xl border-l-4 ${
                notification.unread
                  ? "bg-blue-50 border-l-blue-500"
                  : "bg-gray-50 border-l-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4
                    className={`font-medium text-sm ${
                      notification.unread ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      notification.unread ? "text-blue-700" : "text-gray-600"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
              </div>
              {notification.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto mt-2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
