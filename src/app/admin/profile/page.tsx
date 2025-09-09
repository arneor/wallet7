// src/app/admin/profile/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// TypeScript Interfaces
interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: "Super Admin" | "Admin" | "Group Manager";
  joinedDate: string;
  lastLogin: string;
  timezone: string;
  language: string;
  status: "Active" | "Inactive";
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}

interface AdminStats {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  activeMembers: number;
  completedCycles: number;
  pendingIssues: number;
}

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "activity" | "preferences" | "analytics"
  >("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // Mock data - replace with real data from your backend
  const adminProfile: AdminProfile = {
    id: "admin-001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.admin@roscahub.com",
    phone: "+91-9876543210",
    avatar: "/api/placeholder/150/150",
    role: "Super Admin",
    joinedDate: "2024-01-15T00:00:00Z",
    lastLogin: "2025-09-09T09:30:00Z",
    timezone: "Asia/Kolkata",
    language: "en",
    status: "Active",
  };

  const adminStats: AdminStats = {
    totalGroups: 25,
    activeGroups: 18,
    totalMembers: 247,
    activeMembers: 235,
    completedCycles: 12,
    pendingIssues: 3,
  };

  const recentActivity: ActivityLog[] = [
    {
      id: "act-1",
      action: "Group Created",
      description: "Created new group 'Community Savings Circle'",
      timestamp: "2025-09-09T08:45:00Z",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
    },
    {
      id: "act-2",
      action: "Member Approved",
      description: "Approved member: Priya Nair for Tech Professionals group",
      timestamp: "2025-09-09T07:30:00Z",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
    },
    {
      id: "act-3",
      action: "Settings Updated",
      description: "Updated notification preferences",
      timestamp: "2025-09-08T16:20:00Z",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
    },
    {
      id: "act-4",
      action: "Report Generated",
      description: "Generated monthly compliance report",
      timestamp: "2025-09-08T14:15:00Z",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
    },
  ];

  const [profileData, setProfileData] = useState(adminProfile);

  const handleProfileSave = () => {
    setIsEditing(false);
    // Here you would save to your backend
    console.log("Saving profile:", profileData);
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "activity", name: "Activity", icon: "📊" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "analytics", name: "Analytics", icon: "📈" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-gray-600">
              {profileData.role} • ROSCA Management Platform
            </p>
            <div className="flex items-center space-x-3 mt-1">
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                <span>🟢</span>
                <span>Online</span>
              </span>
              <span className="text-gray-500 text-sm">
                Last login: {new Date(profileData.lastLogin).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isEditing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditing ? "💾 Save Profile" : "✏️ Edit Profile"}
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            📤 Export Data
          </button>
        </div>
      </motion.div>

      {/* Admin Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {adminStats.totalGroups}
          </div>
          <div className="text-sm text-gray-600">Total Groups</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {adminStats.activeGroups}
          </div>
          <div className="text-sm text-gray-600">Active Groups</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {adminStats.totalMembers}
          </div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-teal-600">
            {adminStats.activeMembers}
          </div>
          <div className="text-sm text-gray-600">Active Members</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {adminStats.completedCycles}
          </div>
          <div className="text-sm text-gray-600">Completed Cycles</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-600">
            {adminStats.pendingIssues}
          </div>
          <div className="text-sm text-gray-600">Pending Issues</div>
        </div>
      </motion.div>

      {/* Profile Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-gray-200 bg-white rounded-t-lg"
      >
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Profile Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-6"
      >
        {/* Profile Information */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Personal Information
              </h2>
              <p className="text-gray-600 mb-6">
                Manage your personal profile information
              </p>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full border-4 border-gray-200"
                />
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-blue-700 transition-colors">
                    📷
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Update your photo to help members recognize you
                </p>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors">
                      Upload New
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 text-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 text-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 text-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 text-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={profileData.role}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                      profileData.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span>{profileData.status === "Active" ? "🟢" : "🔴"}</span>
                    <span>{profileData.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin ID
                  </label>
                  <input
                    type="text"
                    value={profileData.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={new Date(
                      profileData.joinedDate
                    ).toLocaleDateString()}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        timezone: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : ""
                    }`}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Mumbai">Asia/Mumbai (IST)</option>
                    <option value="Asia/Delhi">Asia/Delhi (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={profileData.language}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        language: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : ""
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="ml">Malayalam</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleProfileSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setProfileData(adminProfile); // Reset to original
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  ✕ Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Security Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Manage your account security and access
              </p>
            </div>

            {/* Password Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Password</h3>
                  <p className="text-gray-600 text-sm">
                    Last changed 45 days ago
                  </p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-600 text-sm">⚠️ Not Enabled</span>
                  <button
                    onClick={() => setShow2FAModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>

            {/* Session Management */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💻</div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Chrome on Windows
                      </h4>
                      <p className="text-gray-600 text-sm">
                        192.168.1.100 • Current session
                      </p>
                    </div>
                  </div>
                  <span className="text-green-600 text-sm">🟢 Active</span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Mobile App on iOS
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Last active: 2 hours ago
                      </p>
                    </div>
                  </div>
                  <button className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded">
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 text-xl">💡</div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Security Recommendations
                  </h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>
                      • Enable two-factor authentication for enhanced security
                    </li>
                    <li>
                      • Use a strong, unique password for your admin account
                    </li>
                    <li>• Review and revoke unused sessions regularly</li>
                    <li>• Keep your contact information up to date</li>
                    <li>
                      • Monitor login activity and report suspicious behavior
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Log */}
        {activeTab === "activity" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Activity Log
              </h2>
              <p className="text-gray-600 mb-6">
                Track your recent actions and system activity
              </p>
            </div>

            {/* Activity Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Activities</option>
                <option>Group Management</option>
                <option>Member Actions</option>
                <option>System Changes</option>
                <option>Security Events</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                📊 Export Log
              </button>
            </div>

            {/* Activity List */}
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {activity.action.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {activity.action}
                      </h3>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>🌐 {activity.ipAddress}</span>
                      <span>💻 {activity.device}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Load More Activities
              </button>
            </div>
          </div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Preferences & Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Customize your admin experience
              </p>
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      Email Notifications
                    </div>
                    <div className="text-sm text-gray-600">
                      Receive important updates via email
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">SMS Alerts</div>
                    <div className="text-sm text-gray-600">
                      Critical alerts via SMS
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      Push Notifications
                    </div>
                    <div className="text-sm text-gray-600">
                      Browser push notifications
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Dashboard Preferences */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Dashboard Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default View
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Groups Overview</option>
                    <option>Members Dashboard</option>
                    <option>Analytics View</option>
                    <option>Activity Summary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Items Per Page
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>10 items</option>
                    <option>25 items</option>
                    <option>50 items</option>
                    <option>100 items</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Theme Preferences */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Appearance</h3>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-lg cursor-pointer">
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded mb-2"></div>
                  <input
                    type="radio"
                    name="theme"
                    defaultChecked
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Light</span>
                </label>

                <label className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
                  <div className="w-12 h-8 bg-gray-800 rounded mb-2"></div>
                  <input type="radio" name="theme" className="sr-only" />
                  <span className="text-sm font-medium">Dark</span>
                </label>

                <label className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
                  <div className="w-12 h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                  <input type="radio" name="theme" className="sr-only" />
                  <span className="text-sm font-medium">Auto</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Admin Analytics
              </h2>
              <p className="text-gray-600 mb-6">
                Your performance and platform usage insights
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
                <div className="text-xs opacity-75 mt-1">
                  Group management actions
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm opacity-90">Avg Response Time</div>
                <div className="text-xs opacity-75 mt-1">
                  Hours to resolve issues
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm opacity-90">Actions This Week</div>
                <div className="text-xs opacity-75 mt-1">
                  Administrative actions
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm opacity-90">Member Satisfaction</div>
                <div className="text-xs opacity-75 mt-1">Based on feedback</div>
              </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Activity Overview (Last 30 Days)
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Activity chart would be displayed here</p>
                  <p className="text-sm">
                    Integration with charting library needed
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Group Management Expert
                    </div>
                    <div className="text-sm text-gray-600">
                      Successfully managed 25+ active groups
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="font-medium text-gray-900">
                      High Member Satisfaction
                    </div>
                    <div className="text-sm text-gray-600">
                      Maintained 90%+ satisfaction rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Fast Response Time
                    </div>
                    <div className="text-sm text-gray-600">
                      Average response time under 6 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Enable Two-Factor Authentication
              </h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Scan the QR code with your authenticator app or enter the setup
                key manually.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm text-gray-600">
                  QR Code would be displayed here
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Enable 2FA
                </button>
                <button
                  type="button"
                  onClick={() => setShow2FAModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
