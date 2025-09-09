// src/app/admin/groups/[id]/members/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MemberList } from "@/components/admin/MemberList";

const mockMembers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@email.com",
    phone: "+91 98765 43210",
    position: 1,
    status: "active",
    joinDate: "2025-01-15",
    paymentStatus: "paid",
    totalContributions: 30000,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98765 43211",
    position: 2,
    status: "active",
    joinDate: "2025-01-15",
    paymentStatus: "pending",
    totalContributions: 25000,
  },
  // Add more mock members...
];

export default function GroupMembersPage({
  params,
}: {
  params: { id: string };
}) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInviteMember = () => {
    console.log("Inviting member:", inviteEmail);
    setInviteEmail("");
    setShowInviteModal(false);
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
            Group Members
          </h1>
          <p className="text-gray-600">
            Manage members for Family Savings Circle
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Invite Member
        </button>
      </motion.div>

      {/* Members Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">10</p>
            <p className="text-sm text-gray-500">Total Members</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-500">Pending Payment</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">₹4,80,000</p>
            <p className="text-sm text-gray-500">Total Collected</p>
          </div>
        </div>
      </motion.div>

      {/* Member List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MemberList />
      </motion.div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Invite New Member
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="member@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleInviteMember}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Invite
                  </button>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
