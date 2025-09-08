// src/app/member/groups/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GroupOverview } from "@/components/member/GroupOverview";
import { PaymentHistory } from "@/components/member/PaymentHistory";
import { GroupChat } from "@/components/member/GroupChat";
import { Group } from "@/types/group";

interface MemberGroupDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

type TabType = "overview" | "payments" | "chat";

export default function MemberGroupDetailsPage({
  params,
}: MemberGroupDetailsPageProps) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [groupId, setGroupId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setGroupId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!groupId) return;
    
    const fetchGroupDetails = async (): Promise<void> => {
      setLoading(true);

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
      };

      // Simulate API delay
      setTimeout(() => {
        const foundGroup = mockGroups[groupId];
        setGroup(foundGroup || null);
        setLoading(false);
      }, 500);
    };

    fetchGroupDetails();
  }, [groupId]);

  const handleBackToGroups = (): void => {
    window.location.href = "/member/groups";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading group details...</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-red-500"
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
        <p className="text-gray-600 mb-4">
          The group you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to
          it.
        </p>
        <button
          onClick={handleBackToGroups}
          className="btn btn-primary"
          type="button"
        >
          Back to My Groups
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackToGroups}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
          aria-label="Back to groups"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
          <p className="text-gray-600">{group.description}</p>
        </div>
      </div>

      {/* Mobile-Optimized Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
          {(
            [
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "payments", label: "Payments", icon: "💳" },
              { id: "chat", label: "Chat", icon: "💬" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              type="button"
            >
              <span role="img" aria-label={tab.label}>
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Group Overview with Full Details - MEMBER ORDER WILL SHOW */}
            <GroupOverview
              group={group}
              showFullDetails={true}
              showMemberOrder={true}
            />

            {/* Additional Group Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Group Rules */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Group Rules
                </h3>
                <div className="space-y-3">
                  {group.rules?.map((rule: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Group Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Admin</span>
                    <span className="font-medium">{group.adminName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created Date</span>
                    <span className="font-medium">
                      {group.createdDate
                        ? new Date(group.createdDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency</span>
                    <span className="font-medium capitalize">
                      {group.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
          </div>
        )}

        {activeTab === "payments" && <PaymentHistory />}

        {activeTab === "chat" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px]">
            <GroupChat />
          </div>
        )}
      </motion.div>
    </div>
  );
}
