// src/app/admin/reminders/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// TypeScript Interfaces
interface Reminder {
  id: number;
  title: string;
  type:
    | "Payment Due"
    | "Payout Notification"
    | "Group Meeting"
    | "Late Payment"
    | "Custom";
  groupId: string;
  groupName: string;
  recipients: string[];
  method: "WhatsApp" | "SMS" | "Email" | "Push Notification" | "All";
  scheduledDate: string;
  dueDate?: string;
  status: "Scheduled" | "Sent" | "Failed" | "Cancelled";
  template: string;
  isRecurring: boolean;
  recurringType?: "Daily" | "Weekly" | "Monthly";
  createdAt: string;
  sentAt?: string;
  notes?: string;
}

interface ReminderTemplate {
  id: number;
  name: string;
  type: string;
  content: string;
  variables: string[];
}

interface Group {
  id: string;
  name: string;
  members: string[];
  contributionAmount: number;
}

// Mock Data
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Family Savings Circle",
    members: ["Rajesh Kumar", "Priya Sharma", "Amit Singh", "Ravi Patel"],
    contributionAmount: 5000,
  },
  {
    id: "2",
    name: "Business Investment Group",
    members: ["Anita Reddy", "Vikram Shah", "Suresh Kumar"],
    contributionAmount: 10000,
  },
  {
    id: "3",
    name: "Community Development Fund",
    members: ["Kavita Iyer", "Sanjay Gupta", "Meera Joshi"],
    contributionAmount: 3000,
  },
];

const mockTemplates: ReminderTemplate[] = [
  {
    id: 1,
    name: "Payment Due Reminder",
    type: "Payment Due",
    content:
      "Dear {memberName}, your WALLET7 contribution of ₹{amount} is due on {dueDate}. Please make your payment to keep the group running smoothly. Group: {groupName}",
    variables: ["memberName", "amount", "dueDate", "groupName"],
  },
  {
    id: 2,
    name: "Payout Notification",
    type: "Payout Notification",
    content:
      "Congratulations {memberName}! Your payout of ₹{payoutAmount} from {groupName} is ready for collection. Please contact the group coordinator.",
    variables: ["memberName", "payoutAmount", "groupName"],
  },
  {
    id: 3,
    name: "Late Payment Alert",
    type: "Late Payment",
    content:
      "Dear {memberName}, your payment for {groupName} is overdue. Please pay ₹{amount} plus late fee of ₹{lateFee} immediately to avoid further penalties.",
    variables: ["memberName", "groupName", "amount", "lateFee"],
  },
  {
    id: 4,
    name: "Group Meeting Notice",
    type: "Group Meeting",
    content:
      "Dear {memberName}, we have a {groupName} meeting scheduled on {meetingDate} at {meetingTime}. Please confirm your attendance.",
    variables: ["memberName", "groupName", "meetingDate", "meetingTime"],
  },
];

const mockReminders: Reminder[] = [
  {
    id: 1,
    title: "Monthly Payment Due - Round 6",
    type: "Payment Due",
    groupId: "1",
    groupName: "Family Savings Circle",
    recipients: ["Amit Singh", "Ravi Patel"],
    method: "WhatsApp",
    scheduledDate: "2025-09-10T09:00:00",
    dueDate: "2025-09-12",
    status: "Scheduled",
    template:
      "Dear member, your WALLET7 contribution is due soon. Please make your payment on time.",
    isRecurring: true,
    recurringType: "Monthly",
    createdAt: "2025-09-08T10:30:00",
    notes: "Automated monthly reminder for pending members",
  },
  {
    id: 2,
    title: "Payout Ready - Rajesh Kumar",
    type: "Payout Notification",
    groupId: "1",
    groupName: "Family Savings Circle",
    recipients: ["Rajesh Kumar"],
    method: "SMS",
    scheduledDate: "2025-09-15T14:00:00",
    status: "Sent",
    template: "Congratulations! Your payout is ready for collection.",
    isRecurring: false,
    createdAt: "2025-09-09T11:20:00",
    sentAt: "2025-09-09T14:00:00",
  },
  {
    id: 3,
    title: "Late Payment Alert",
    type: "Late Payment",
    groupId: "2",
    groupName: "Business Investment Group",
    recipients: ["Vikram Shah"],
    method: "All",
    scheduledDate: "2025-09-09T16:00:00",
    status: "Failed",
    template:
      "Your payment is overdue. Please pay immediately to avoid penalties.",
    isRecurring: false,
    createdAt: "2025-09-09T15:45:00",
    notes: "Payment overdue by 3 days",
  },
];

export default function AdminRemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [templates] = useState<ReminderTemplate[]>(mockTemplates);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const [viewMode, setViewMode] = useState<
    "upcoming" | "sent" | "failed" | "all"
  >("upcoming");

  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: "",
    type: "Payment Due",
    groupId: "",
    recipients: [],
    method: "WhatsApp",
    scheduledDate: "",
    dueDate: "",
    template: "",
    isRecurring: false,
    notes: "",
  });

  // Filter reminders based on view mode
  const filteredReminders = useMemo(() => {
    const now = new Date();
    switch (viewMode) {
      case "upcoming":
        return reminders.filter(
          (r) => r.status === "Scheduled" && new Date(r.scheduledDate) > now
        );
      case "sent":
        return reminders.filter((r) => r.status === "Sent");
      case "failed":
        return reminders.filter((r) => r.status === "Failed");
      default:
        return reminders;
    }
  }, [reminders, viewMode]);

  const summaryStats = useMemo(() => {
    const now = new Date();
    return {
      upcoming: reminders.filter(
        (r) => r.status === "Scheduled" && new Date(r.scheduledDate) > now
      ).length,
      sent: reminders.filter((r) => r.status === "Sent").length,
      failed: reminders.filter((r) => r.status === "Failed").length,
      total: reminders.length,
    };
  }, [reminders]);

  const handleCreateReminder = (): void => {
    if (
      !newReminder.title ||
      !newReminder.groupId ||
      !newReminder.scheduledDate ||
      !newReminder.template
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedGroup = mockGroups.find((g) => g.id === newReminder.groupId);
    if (!selectedGroup) return;

    const reminder: Reminder = {
      id: Date.now(),
      title: newReminder.title!,
      type: newReminder.type!,
      groupId: newReminder.groupId!,
      groupName: selectedGroup.name,
      recipients: newReminder.recipients || selectedGroup.members,
      method: newReminder.method!,
      scheduledDate: newReminder.scheduledDate!,
      dueDate: newReminder.dueDate,
      status: "Scheduled",
      template: newReminder.template!,
      isRecurring: newReminder.isRecurring!,
      recurringType: newReminder.recurringType,
      createdAt: new Date().toISOString(),
      notes: newReminder.notes,
    };

    setReminders((prev) => [...prev, reminder]);
    setShowCreateModal(false);
    resetNewReminder();
  };

  const resetNewReminder = (): void => {
    setNewReminder({
      title: "",
      type: "Payment Due",
      groupId: "",
      recipients: [],
      method: "WhatsApp",
      scheduledDate: "",
      dueDate: "",
      template: "",
      isRecurring: false,
      notes: "",
    });
  };

  const handleCancelReminder = (reminderId: number): void => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === reminderId ? { ...r, status: "Cancelled" as const } : r
      )
    );
  };

  const handleResendReminder = (reminderId: number): void => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === reminderId
          ? {
              ...r,
              status: "Scheduled" as const,
              scheduledDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
            }
          : r
      )
    );
  };

  const formatDateTime = (dateTime: string): string => {
    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Sent":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method: string): string => {
    switch (method) {
      case "WhatsApp":
        return "💬";
      case "SMS":
        return "📱";
      case "Email":
        return "📧";
      case "Push Notification":
        return "🔔";
      case "All":
        return "📢";
      default:
        return "📤";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            📢 Member Reminders & Communications
          </h1>
          <p className="text-gray-600">
            Schedule, manage, and track all member communications for your
            WALLET7 groups
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            📝 Templates
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ➕ Schedule Reminder
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {summaryStats.upcoming}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">⏰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sent Today</p>
              <p className="text-2xl font-bold text-green-600">
                {summaryStats.sent}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {summaryStats.failed}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-purple-600">
                {summaryStats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Mode Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8">
          {[
            { id: "upcoming", name: "Upcoming", count: summaryStats.upcoming },
            { id: "sent", name: "Sent", count: summaryStats.sent },
            { id: "failed", name: "Failed", count: summaryStats.failed },
            { id: "all", name: "All", count: summaryStats.total },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as typeof viewMode)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Reminders List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Reminders ({filteredReminders.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReminders.length > 0 ? (
            filteredReminders.map((reminder) => (
              <div key={reminder.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">
                        {reminder.title}
                      </h4>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reminder.status)}`}
                      >
                        {reminder.status}
                      </span>
                      <span className="text-lg">
                        {getMethodIcon(reminder.method)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Group
                        </p>
                        <p className="text-sm text-gray-900">
                          {reminder.groupName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Recipients
                        </p>
                        <p className="text-sm text-gray-900">
                          {reminder.recipients.length} member(s)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Scheduled
                        </p>
                        <p className="text-sm text-gray-900">
                          {formatDateTime(reminder.scheduledDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Method
                        </p>
                        <p className="text-sm text-gray-900">
                          {reminder.method}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Message Preview:
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        &ldquo;{reminder.template}&rdquo;
                      </p>
                    </div>

                    {reminder.notes && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Notes:</span>{" "}
                        {reminder.notes}
                      </p>
                    )}

                    {reminder.isRecurring && (
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          🔄 Recurring ({reminder.recurringType})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    {reminder.status === "Scheduled" && (
                      <>
                        <button
                          onClick={() => setSelectedReminder(reminder)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancelReminder(reminder.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reminder.status === "Failed" && (
                      <button
                        onClick={() => handleResendReminder(reminder.id)}
                        className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                      >
                        Retry
                      </button>
                    )}
                    <button
                      onClick={() => console.log("View details:", reminder)}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <span className="text-4xl mb-4 block">📢</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reminders found
              </h3>
              <p className="text-sm">Create a new reminder to get started</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Create/Edit Reminder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-8 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Schedule New Reminder
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Title *
                  </label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Monthly Payment Due"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={newReminder.type}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        type: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Payment Due">Payment Due</option>
                    <option value="Payout Notification">
                      Payout Notification
                    </option>
                    <option value="Group Meeting">Group Meeting</option>
                    <option value="Late Payment">Late Payment</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WALLET7 Group *
                  </label>
                  <select
                    value={newReminder.groupId}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        groupId: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a group</option>
                    {mockGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Communication Method
                  </label>
                  <select
                    value={newReminder.method}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        method: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                    <option value="Push Notification">Push Notification</option>
                    <option value="All">All Methods</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newReminder.scheduledDate}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        scheduledDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Template *
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {templates
                    .filter(
                      (t) =>
                        t.type === newReminder.type ||
                        newReminder.type === "Custom"
                    )
                    .map((template) => (
                      <button
                        key={template.id}
                        onClick={() =>
                          setNewReminder((prev) => ({
                            ...prev,
                            template: template.content,
                          }))
                        }
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                      >
                        Use "{template.name}"
                      </button>
                    ))}
                </div>
                <textarea
                  value={newReminder.template}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      template: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message template here..."
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newReminder.isRecurring}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        isRecurring: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Make this a recurring reminder
                  </span>
                </label>

                {newReminder.isRecurring && (
                  <select
                    value={newReminder.recurringType}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        recurringType: e.target.value as any,
                      }))
                    }
                    className="mt-2 w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newReminder.notes}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCreateReminder}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Schedule Reminder
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Management Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-8 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Message Templates
                </h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {template.name}
                        </h4>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {template.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      "{template.content}"
                    </p>

                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Variables:</span>{" "}
                      {template.variables.join(", ")}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
