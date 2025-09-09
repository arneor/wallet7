// src/app/admin/payments/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// TypeScript Interfaces
interface Payment {
  id: number;
  groupId: string;
  groupName: string;
  member: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  round: number;
  status: "Paid" | "Pending" | "Overdue" | "Partial";
  method?: string;
  notes?: string;
  lateFee?: number;
}

interface Group {
  id: string;
  name: string;
  contributionAmount: number;
  totalMembers: number;
  currentRound: number;
}

interface FilterState {
  groupId: string;
  status: string;
  round: string;
  dateRange: string;
  member: string;
}

// Mock ROSCA Payment Data
const mockPaymentData: Payment[] = [
  {
    id: 1,
    groupId: "1",
    groupName: "Family Savings Circle",
    member: "Rajesh Kumar",
    amount: 5000,
    dueDate: "2025-09-10",
    paidDate: "2025-09-08",
    round: 6,
    status: "Paid",
    method: "UPI",
    notes: "Paid early via PhonePe",
  },
  {
    id: 2,
    groupId: "1",
    groupName: "Family Savings Circle",
    member: "Priya Sharma",
    amount: 5000,
    dueDate: "2025-09-10",
    paidDate: "2025-09-09",
    round: 6,
    status: "Paid",
    method: "Cash",
  },
  {
    id: 3,
    groupId: "1",
    groupName: "Family Savings Circle",
    member: "Amit Singh",
    amount: 5000,
    dueDate: "2025-09-10",
    round: 6,
    status: "Pending",
    notes: "Reminder sent",
  },
  {
    id: 4,
    groupId: "2",
    groupName: "Business Investment Group",
    member: "Ravi Patel",
    amount: 10000,
    dueDate: "2025-09-08",
    round: 3,
    status: "Overdue",
    lateFee: 200,
  },
  {
    id: 5,
    groupId: "1",
    groupName: "Family Savings Circle",
    member: "Vikram Shah",
    amount: 5000,
    dueDate: "2025-09-05",
    round: 6,
    status: "Overdue",
    lateFee: 100,
  },
  {
    id: 6,
    groupId: "3",
    groupName: "Community Development Fund",
    member: "Suresh Kumar",
    amount: 3000,
    dueDate: "2025-09-12",
    round: 8,
    status: "Pending",
  },
  {
    id: 7,
    groupId: "2",
    groupName: "Business Investment Group",
    member: "Anita Reddy",
    amount: 10000,
    dueDate: "2025-09-08",
    paidDate: "2025-09-07",
    round: 3,
    status: "Paid",
    method: "Bank Transfer",
  },
  {
    id: 8,
    groupId: "3",
    groupName: "Community Development Fund",
    member: "Kavita Iyer",
    amount: 3000,
    dueDate: "2025-09-12",
    round: 8,
    status: "Paid",
    method: "Cash",
    paidDate: "2025-09-10",
  },
];

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Family Savings Circle",
    contributionAmount: 5000,
    totalMembers: 10,
    currentRound: 6,
  },
  {
    id: "2",
    name: "Business Investment Group",
    contributionAmount: 10000,
    totalMembers: 8,
    currentRound: 3,
  },
  {
    id: "3",
    name: "Community Development Fund",
    contributionAmount: 3000,
    totalMembers: 12,
    currentRound: 8,
  },
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPaymentData);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const [filters, setFilters] = useState<FilterState>({
    groupId: "all",
    status: "all",
    round: "all",
    dateRange: "all",
    member: "all",
  });

  // Filter payments based on selected filters
  const filteredPayments = useMemo((): Payment[] => {
    let filtered = [...payments];

    if (filters.groupId !== "all") {
      filtered = filtered.filter((p) => p.groupId === filters.groupId);
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.round !== "all") {
      filtered = filtered.filter((p) => p.round === parseInt(filters.round));
    }
    if (filters.member !== "all") {
      filtered = filtered.filter((p) => p.member === filters.member);
    }

    // Date range filter
    if (filters.dateRange === "overdue") {
      filtered = filtered.filter(
        (p) =>
          p.status === "Overdue" ||
          (new Date(p.dueDate) < new Date() && p.status === "Pending")
      );
    } else if (filters.dateRange === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((p) => p.dueDate === today);
    } else if (filters.dateRange === "week") {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      filtered = filtered.filter((p) => new Date(p.dueDate) <= weekFromNow);
    }

    return filtered.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }, [payments, filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalDue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = filteredPayments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalOverdue = filteredPayments.filter(
      (p) => p.status === "Overdue"
    ).length;
    const totalPending = filteredPayments.filter(
      (p) => p.status === "Pending"
    ).length;
    const totalLateFees = filteredPayments.reduce(
      (sum, p) => sum + (p.lateFee || 0),
      0
    );

    return {
      totalDue,
      totalPaid,
      totalOverdue,
      totalPending,
      totalLateFees,
      collectionRate:
        filteredPayments.length > 0
          ? (
              (filteredPayments.filter((p) => p.status === "Paid").length /
                filteredPayments.length) *
              100
            ).toFixed(1)
          : "0",
    };
  }, [filteredPayments]);

  // Get unique members for filter
  const allMembers = useMemo(() => {
    const members = new Set(payments.map((p) => p.member));
    return Array.from(members);
  }, [payments]);

  const handleFilterChange = (key: keyof FilterState, value: string): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectPayment = (paymentId: number): void => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = (): void => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map((p) => p.id));
    }
  };

  const handleMarkAsPaid = (
    paymentIds: number[],
    method: string,
    notes?: string
  ): void => {
    setPayments((prev) =>
      prev.map((payment) => {
        if (paymentIds.includes(payment.id)) {
          return {
            ...payment,
            status: "Paid" as const,
            paidDate: new Date().toISOString().split("T")[0],
            method: method,
            notes: notes,
          };
        }
        return payment;
      })
    );
    setSelectedPayments([]);
    setShowMarkPaidModal(false);
  };

  const handleSendReminder = (paymentIds: number[]): void => {
    console.log("Sending reminders to:", paymentIds);
    // Implementation for sending reminders
    setSelectedPayments([]);
    setShowReminderModal(false);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Partial":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetFilters = (): void => {
    setFilters({
      groupId: "all",
      status: "all",
      round: "all",
      dateRange: "all",
      member: "all",
    });
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
            💰 Payment Records & Tracking
          </h1>
          <p className="text-gray-600">
            Manage offline payments, track contributions, and maintain
            transparent records
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            {viewMode === "list" ? "📱 Grid View" : "📋 List View"}
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            📊 Payment Report
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Due</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{summaryStats.totalDue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{summaryStats.totalPaid.toLocaleString()}
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
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {summaryStats.totalOverdue}
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
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {summaryStats.totalPending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {summaryStats.collectionRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📈</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter Payments
          </h2>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ROSCA Group
            </label>
            <select
              value={filters.groupId}
              onChange={(e) => handleFilterChange("groupId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Groups</option>
              {mockGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Round
            </label>
            <select
              value={filters.round}
              onChange={(e) => handleFilterChange("round", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Rounds</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Round {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Member
            </label>
            <select
              value={filters.member}
              onChange={(e) => handleFilterChange("member", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Members</option>
              {allMembers.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="overdue">Overdue</option>
              <option value="today">Due Today</option>
              <option value="week">Due This Week</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Bulk Actions */}
      {selectedPayments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-blue-800 font-medium">
              {selectedPayments.length} payment
              {selectedPayments.length > 1 ? "s" : ""} selected
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowMarkPaidModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                ✅ Mark as Paid
              </button>
              <button
                onClick={() => setShowReminderModal(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                📧 Send Reminder
              </button>
              <button
                onClick={() => setSelectedPayments([])}
                className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Payment List/Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Records ({filteredPayments.length} payments)
            </h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  selectedPayments.length === filteredPayments.length &&
                  filteredPayments.length > 0
                }
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </label>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Round
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {payment.member}
                        </div>
                        {payment.notes && (
                          <div className="text-xs text-gray-500">
                            {payment.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.groupName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.round}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{payment.amount.toLocaleString()}
                        </div>
                        {payment.lateFee && (
                          <div className="text-xs text-red-600">
                            +₹{payment.lateFee} late fee
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </div>
                        {payment.paidDate && (
                          <div className="text-xs text-green-600">
                            Paid:{" "}
                            {new Date(payment.paidDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                        >
                          {payment.status}
                        </span>
                        {payment.method && (
                          <div className="text-xs text-gray-500 mt-1">
                            {payment.method}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {payment.status !== "Paid" && (
                            <button
                              onClick={() => {
                                setSelectedPayments([payment.id]);
                                setShowMarkPaidModal(true);
                              }}
                              className="text-green-600 hover:text-green-800 font-medium text-xs"
                            >
                              Mark Paid
                            </button>
                          )}
                          {payment.status === "Pending" && (
                            <button
                              onClick={() => {
                                setSelectedPayments([payment.id]);
                                setShowReminderModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                            >
                              Remind
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2">💰</span>
                        <p className="text-lg font-medium">No payments found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    selectedPayments.includes(payment.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <input
                      type="checkbox"
                      checked={selectedPayments.includes(payment.id)}
                      onChange={() => handleSelectPayment(payment.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {payment.member}
                    </h4>
                    <p className="text-sm text-gray-600">{payment.groupName}</p>
                    <p className="text-xs text-gray-500">
                      Round {payment.round}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                      {payment.lateFee && (
                        <span className="text-sm text-red-600 font-normal">
                          {" "}
                          +₹{payment.lateFee}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                    {payment.paidDate && (
                      <p className="text-xs text-green-600">
                        Paid: {new Date(payment.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {payment.method && (
                    <p className="text-xs text-gray-500 mb-3">
                      Method: {payment.method}
                    </p>
                  )}

                  {payment.notes && (
                    <p className="text-xs text-gray-600 mb-3 italic">
                      &ldquo;{payment.notes}&rdquo;
                    </p>
                  )}

                  <div className="flex space-x-2">
                    {payment.status !== "Paid" && (
                      <button
                        onClick={() => {
                          setSelectedPayments([payment.id]);
                          setShowMarkPaidModal(true);
                        }}
                        className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                    {payment.status === "Pending" && (
                      <button
                        onClick={() => {
                          setSelectedPayments([payment.id]);
                          setShowReminderModal(true);
                        }}
                        className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        Remind
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <span className="text-4xl mb-2 block">💰</span>
                <p className="text-lg font-medium">No payments found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Mark as Paid Modal */}
      {showMarkPaidModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mark Payment(s) as Paid
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    id="payment-method"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="payment-notes"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any notes about this payment..."
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {selectedPayments.length} payment
                    {selectedPayments.length > 1 ? "s" : ""} will be marked as
                    paid
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const method =
                        (
                          document.getElementById(
                            "payment-method"
                          ) as HTMLSelectElement
                        )?.value || "Cash";
                      const notes =
                        (
                          document.getElementById(
                            "payment-notes"
                          ) as HTMLTextAreaElement
                        )?.value || "";
                      handleMarkAsPaid(selectedPayments, method, notes);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => setShowMarkPaidModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Send Payment Reminder
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                    <option value="Call">Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Template
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="Dear member, this is a friendly reminder that your ROSCA contribution is due. Please make your payment at your earliest convenience. Thank you!"
                  />
                </div>

                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm text-orange-800">
                    Reminder will be sent to {selectedPayments.length} member
                    {selectedPayments.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSendReminder(selectedPayments)}
                    className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Send Reminder
                  </button>
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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
