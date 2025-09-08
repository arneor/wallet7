// src/components/member/GroupDetailsModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GroupOverview } from "@/components/member/GroupOverview";
import { GroupChat } from "@/components/member/GroupChat";
import { PaymentHistory } from "@/components/member/PaymentHistory";
import { Group } from "@/types/group";

interface GroupDetailsModalProps {
  groupId: string;
  onClose: () => void;
}

type TabType = "overview" | "payments" | "chat";

export const GroupDetailsModal: React.FC<GroupDetailsModalProps> = ({
  groupId,
  onClose,
}) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    const fetchGroupDetails = async (): Promise<void> => {
      setLoading(true);

      // Mock data - replace with actual API call
      const mockGroups: Record<string, Group> = {
        "1": {
          id: "1",
          name: "Family Savings Circle",
          description: "Monthly family savings for emergency fund",
          contributionAmount: 5000,
          frequency: "monthly",
          totalMembers: 10,
          currentRound: 6,
          totalRounds: 10,
          nextPaymentDate: "2024-02-15",
          myPosition: 8,
          status: "active",
          avatar: "👨‍👩‍👧‍👦",
          memberPositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          completedPositions: [1, 2, 3, 4, 5, 6],
          adminName: "John Smith",
          createdDate: "2023-08-15",
          rules: [
            "Monthly contribution of ₹5,000 due by 15th of each month",
            "Late payment penalty: ₹200 per day after due date",
            "Member can bid for early payout with minimum 10% discount",
            "Group chat available 24/7 for queries and updates",
          ],
        },
        "2": {
          id: "2",
          name: "Business Investment Club",
          description: "Monthly investment pool for business opportunities",
          contributionAmount: 10000,
          frequency: "monthly",
          totalMembers: 8,
          currentRound: 3,
          totalRounds: 8,
          nextPaymentDate: "2024-02-20",
          myPosition: 5,
          status: "active",
          avatar: "💼",
          memberPositions: [1, 2, 3, 4, 5, 6, 7, 8],
          completedPositions: [1, 2, 3],
          adminName: "Sarah Johnson",
          createdDate: "2023-11-01",
          rules: [
            "Monthly contribution of ₹10,000 due by 20th of each month",
            "Business use only - provide investment plan when receiving payout",
            "Quarterly group meetings to discuss investment strategies",
            "Emergency fund available for urgent business needs",
          ],
        },
        "3": {
          id: "3",
          name: "Tech Startup Fund",
          description: "Quarterly funding for tech startups",
          contributionAmount: 25000,
          frequency: "quarterly",
          totalMembers: 6,
          currentRound: 2,
          totalRounds: 6,
          nextPaymentDate: "2024-03-01",
          myPosition: 4,
          status: "active",
          avatar: "💻",
          memberPositions: [1, 2, 3, 4, 5, 6],
          completedPositions: [1, 2],
        },
      };

      // Simulate API delay
      setTimeout(() => {
        const foundGroup = mockGroups[groupId];
        setGroup(foundGroup || null);
        setLoading(false);
      }, 300);
    };

    fetchGroupDetails();
  }, [groupId]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.4,
        }}
        className="bg-white w-full h-full flex flex-col overflow-hidden"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px] flex-1">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading group details...</p>
            </div>
          </div>
        ) : !group ? (
          <div className="flex items-center justify-center min-h-[400px] flex-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Group not found
              </h3>
              <p className="text-gray-600">Unable to load group details</p>
            </div>
          </div>
        ) : (
          <>
            {/* Full-Screen Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 lg:p-8 z-10 shadow-sm">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl lg:text-3xl flex-shrink-0">
                      {group.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2
                        id="modal-title"
                        className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 truncate"
                      >
                        {group.name}
                      </h2>
                      <p className="text-sm md:text-base lg:text-lg text-gray-600 truncate mt-1">
                        {group.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span
                          className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium ${
                            group.status === "active"
                              ? "bg-green-100 text-green-700"
                              : group.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {group.status}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500">
                          {group.totalMembers} members
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0 ml-3 md:ml-4"
                    type="button"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Enhanced Full-Screen Tabs */}
                <div className="flex space-x-2 bg-gray-100 p-1 md:p-2 rounded-xl">
                  {(
                    [
                      {
                        id: "overview",
                        label: "Overview",
                        icon: "📊",
                        shortLabel: "Info",
                      },
                      {
                        id: "payments",
                        label: "Payments",
                        icon: "💳",
                        shortLabel: "Pay",
                      },
                      {
                        id: "chat",
                        label: "Chat",
                        icon: "💬",
                        shortLabel: "Chat",
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 md:space-x-3 py-3 md:py-4 lg:py-5 px-3 md:px-6 rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      type="button"
                    >
                      <span
                        role="img"
                        aria-label={tab.label}
                        className="text-lg md:text-xl lg:text-2xl"
                      >
                        {tab.icon}
                      </span>
                      <span className="md:hidden font-semibold">
                        {tab.shortLabel}
                      </span>
                      <span className="hidden md:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Full-Screen Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 lg:space-y-10"
                    >
                      {/* Group Overview with Member Order */}
                      <GroupOverview
                        group={group}
                        showFullDetails={true}
                        showMemberOrder={true}
                      />

                      {/* Additional Group Information */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                        {/* Group Rules */}
                        <div className="lg:col-span-1 xl:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-blue-100">
                          <div className="flex items-center space-x-3 mb-4 md:mb-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <span
                                role="img"
                                aria-label="Rules"
                                className="text-lg md:text-xl"
                              >
                                📋
                              </span>
                            </div>
                            <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">
                              Group Rules
                            </h3>
                          </div>
                          <div className="space-y-4 md:space-y-5">
                            {group.rules?.map((rule: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-start space-x-4"
                              >
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-blue-600 text-sm md:text-base font-bold">
                                    {index + 1}
                                  </span>
                                </div>
                                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                                  {rule}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Group Information */}
                        <div className="lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-green-100">
                          <div className="flex items-center space-x-3 mb-4 md:mb-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                              <span
                                role="img"
                                aria-label="Information"
                                className="text-lg md:text-xl"
                              >
                                ℹ️
                              </span>
                            </div>
                            <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">
                              Group Info
                            </h3>
                          </div>
                          <div className="space-y-4 md:space-y-5">
                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                              <span className="text-gray-600 text-sm md:text-base lg:text-lg">
                                Admin
                              </span>
                              <span className="font-semibold text-sm md:text-base lg:text-lg">
                                {group.adminName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                              <span className="text-gray-600 text-sm md:text-base lg:text-lg">
                                Created
                              </span>
                              <span className="font-semibold text-sm md:text-base lg:text-lg">
                                {group.createdDate
                                  ? new Date(
                                      group.createdDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                              <span className="text-gray-600 text-sm md:text-base lg:text-lg">
                                Frequency
                              </span>
                              <span className="font-semibold capitalize text-sm md:text-base lg:text-lg">
                                {group.frequency}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                              <span className="text-gray-600 text-sm md:text-base lg:text-lg">
                                Status
                              </span>
                              <span
                                className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium ${
                                  group.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : group.status === "completed"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {group.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "payments" && (
                    <motion.div
                      key="payments"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 md:p-6 lg:p-8"
                    >
                      <PaymentHistory />
                    </motion.div>
                  )}

                  {activeTab === "chat" && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col"
                    >
                      <div className="flex-1 min-h-[500px] lg:min-h-[600px]">
                        <GroupChat />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
