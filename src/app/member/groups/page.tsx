// src/app/member/groups/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GroupOverview } from "@/components/member/GroupOverview";
import { Group } from "@/types/group";

export default function MemberGroupsPage() {
  // Mock group data with proper typing
  const groups: Group[] = [
    {
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
    },
    {
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
    },
    {
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
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<Group["status"] | "all">(
    "all"
  );

  const filteredGroups = groups.filter((group: Group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || group.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleJoinNewGroup = (): void => {
    window.location.href = "/member/join-group";
  };

  const handleViewGroupDetails = (groupId: string): void => {
    window.location.href = `/member/groups/${groupId}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
          <p className="text-gray-600">Manage your WALLET7 group memberships</p>
        </div>

        <button
          onClick={handleJoinNewGroup}
          className="btn btn-primary px-4 py-2"
          type="button"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Join New Group
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(e.target.value as Group["status"] | "all")
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Groups</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* Groups List - FIXED: showFullDetails={false} to show button */}
      <div className="space-y-4 sm:space-y-6">
        {filteredGroups.map((group: Group, index: number) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GroupOverview
              group={group}
              showFullDetails={false}
              showMemberOrder={true}
              onViewDetails={() => handleViewGroupDetails(group.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No groups found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "You haven't joined any groups yet"}
          </p>
          <button
            onClick={handleJoinNewGroup}
            className="btn btn-primary"
            type="button"
          >
            Join Your First Group
          </button>
        </div>
      )}
    </div>
  );
}
