// src/components/member/PaymentDueCard.tsx
"use client";

import { motion } from "framer-motion";

export function PaymentDueCard() {
  const paymentDue = {
    groupName: "Family Savings Circle",
    amount: 5000,
    dueDate: "2024-02-15",
    status: "due" as const,
  };

  const dueDate = new Date(paymentDue.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <h3 className="font-bold text-lg text-gray-900">Payment Due</h3>
              <p className="text-sm text-gray-600">{paymentDue.groupName}</p>
            </div>
          </div>

          <div
            className={`badge ${
              daysUntilDue <= 1
                ? "badge-danger"
                : daysUntilDue <= 3
                  ? "badge-warning"
                  : "badge-success"
            }`}
          >
            {daysUntilDue === 0
              ? "Due Today"
              : daysUntilDue === 1
                ? "Due Tomorrow"
                : `${daysUntilDue} days left`}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Amount Due</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{paymentDue.amount.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="font-medium">{dueDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="font-medium">Bank Transfer</p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button className="btn btn-primary flex-1">Make Payment</button>
            <button className="btn btn-secondary">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
