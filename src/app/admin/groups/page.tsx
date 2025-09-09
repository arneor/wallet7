// src/app/admin/groups/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GroupCard } from "@/components/admin/GroupCard";
import { CreateGroupModal } from "@/components/admin/CreateGroupModal";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const mockGroups = [
  {
    id: "1",
    name: "Family Savings Circle",
    description: "Monthly family savings for emergency fund",
    contributionAmount: 5000,
    frequency: "monthly",
    totalMembers: 10,
    currentRound: 6,
    totalRounds: 10,
    status: "active" as const,
    nextPayoutDate: "2025-09-15",
    nextPayoutMember: "Rajesh Kumar",
    pendingPayments: 2,
    collectionRate: 95,
    createdDate: "2025-01-15",
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
    status: "active" as const,
    nextPayoutDate: "2025-09-20",
    nextPayoutMember: "Priya Sharma",
    pendingPayments: 1,
    collectionRate: 100,
    createdDate: "2025-03-01",
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
    status: "active" as const,
    nextPayoutDate: "2025-12-01",
    nextPayoutMember: "Amit Singh",
    pendingPayments: 0,
    collectionRate: 100,
    createdDate: "2025-06-01",
  },
  {
    id: "4",
    name: "Community Development Fund",
    description: "Completed chit fund for community projects",
    contributionAmount: 3000,
    frequency: "monthly",
    totalMembers: 12,
    currentRound: 12,
    totalRounds: 12,
    status: "completed" as const,
    nextPayoutDate: "",
    nextPayoutMember: "",
    pendingPayments: 0,
    collectionRate: 100,
    createdDate: "2024-01-01",
  },
];

export default function AdminGroupsPage() {
  const router = useRouter(); // Add this line
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = mockGroups.filter((group) => {
    const matchesStatus =
      filterStatus === "all" || group.status === filterStatus;
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockGroups.length,
    active: mockGroups.filter((g) => g.status === "active").length,
    completed: mockGroups.filter((g) => g.status === "completed").length,
    totalMembers: mockGroups.reduce((sum, g) => sum + g.totalMembers, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Groups
          </h1>
          <p className="text-gray-600">
            Manage all your chit fund groups and track their progress
          </p>
        </div>
        <Button onClick={() => router.push("/admin/groups/create-group")}>
          Create New Group
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Groups</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-sm text-gray-500">Active Groups</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.completed}
            </p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {stats.totalMembers}
            </p>
            <p className="text-sm text-gray-500">Total Members</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <GroupCard group={group} />
          </motion.div>
        ))}
      </motion.div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14-10v10a2 2 0 01-2 2H7a2 2 0 01-2-2V1m14 0H5a2 2 0 00-2 2v2m16-2a2 2 0 012 2v2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No groups found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first chit fund group."}
          </p>
        </div>
      )}
    </div>
  );
}
