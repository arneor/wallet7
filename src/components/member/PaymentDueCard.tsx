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

  const handleMakePayment = () => {
    // Navigate to payment page
    window.location.href = `/member/payment/${paymentDue.groupName}`;
  };

  const handleContactAdmin = () => {
    // Open chat or contact modal
    alert("Contact admin functionality - implement chat or phone call");
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
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">
                Payment Due
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {paymentDue.groupName}
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
                : `${daysUntilDue} days left`}
          </div>
        </div>

        {/* Amount - Mobile Friendly */}
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Amount Due</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{paymentDue.amount.toLocaleString()}
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
            <p className="text-xs text-gray-500">Payment Method</p>
            <p className="font-medium text-sm">Bank Transfer</p>
          </div>
        </div>

        {/* Mobile-First Button Layout */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleMakePayment}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-all"
          >
            Make Payment
          </button>
          <button
            onClick={handleContactAdmin}
            className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-3 rounded-lg transition-all flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
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
            <span className="hidden sm:inline">Contact</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
