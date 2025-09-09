// src/app/admin/reports/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// TypeScript Interfaces
interface Transaction {
  id: number;
  date: string;
  groupId: string;
  groupName: string;
  member: string;
  type: string;
  amount: number;
  round: number;
  status: string;
  method: string;
}

interface Group {
  id: string;
  name: string;
  members: number;
  contributionAmount: number;
}

interface FilterState {
  dateRange: string;
  groupId: string;
  member: string;
  transactionType: string;
  status: string;
  round: string;
  method: string;
  startDate: string;
  endDate: string;
}

interface SummaryStats {
  totalTransactions: number;
  totalAmount: number;
  totalContributions: number;
  totalPayouts: number;
  totalFees: number;
  paidTransactions: number;
  pendingTransactions: number;
  overdueTransactions: number;
  collectionRate: string;
}

interface Wallet7Data {
  groups: Group[];
  transactions: Transaction[];
  members: string[];
}

// Mock Wallet7 data with proper typing
const mockWallet7Data: Wallet7Data = {
  groups: [
    {
      id: "1",
      name: "Family Savings Circle",
      members: 10,
      contributionAmount: 5000,
    },
    {
      id: "2",
      name: "Business Investment Group",
      members: 8,
      contributionAmount: 10000,
    },
    {
      id: "3",
      name: "Community Development Fund",
      members: 12,
      contributionAmount: 3000,
    },
  ],
  transactions: [
    {
      id: 1,
      date: "2025-09-08",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Rajesh Kumar",
      type: "Contribution",
      amount: 5000,
      round: 6,
      status: "Paid",
      method: "Cash",
    },
    {
      id: 2,
      date: "2025-09-08",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Priya Sharma",
      type: "Contribution",
      amount: 5000,
      round: 6,
      status: "Paid",
      method: "UPI",
    },
    {
      id: 3,
      date: "2025-09-07",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Amit Singh",
      type: "Contribution",
      amount: 5000,
      round: 6,
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      id: 4,
      date: "2025-09-06",
      groupId: "2",
      groupName: "Business Investment Group",
      member: "Ravi Patel",
      type: "Contribution",
      amount: 10000,
      round: 3,
      status: "Paid",
      method: "UPI",
    },
    {
      id: 5,
      date: "2025-09-05",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Meera Joshi",
      type: "Payout",
      amount: 48000,
      round: 5,
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: 6,
      date: "2025-09-04",
      groupId: "3",
      groupName: "Community Development Fund",
      member: "Suresh Kumar",
      type: "Late Fee",
      amount: 100,
      round: 8,
      status: "Paid",
      method: "Cash",
    },
    {
      id: 7,
      date: "2025-09-03",
      groupId: "2",
      groupName: "Business Investment Group",
      member: "Anita Reddy",
      type: "Contribution",
      amount: 10000,
      round: 3,
      status: "Paid",
      method: "Cash",
    },
    {
      id: 8,
      date: "2025-09-02",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Vikram Shah",
      type: "Contribution",
      amount: 5000,
      round: 6,
      status: "Overdue",
      method: "UPI",
    },
    {
      id: 9,
      date: "2025-08-30",
      groupId: "3",
      groupName: "Community Development Fund",
      member: "Kavita Iyer",
      type: "Payout",
      amount: 35000,
      round: 7,
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: 10,
      date: "2025-08-28",
      groupId: "1",
      groupName: "Family Savings Circle",
      member: "Sanjay Gupta",
      type: "Contribution",
      amount: 5000,
      round: 5,
      status: "Paid",
      method: "Cash",
    },
  ],
  members: [
    "Rajesh Kumar",
    "Priya Sharma",
    "Amit Singh",
    "Ravi Patel",
    "Meera Joshi",
    "Suresh Kumar",
    "Anita Reddy",
    "Vikram Shah",
    "Kavita Iyer",
    "Sanjay Gupta",
  ],
};

export default function Wallet7ReportsPage() {
  // Filter states with proper typing
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "all",
    groupId: "all",
    member: "all",
    transactionType: "all",
    status: "all",
    round: "all",
    method: "all",
    startDate: "",
    endDate: "",
  });

  const [viewMode, setViewMode] = useState<
    "transactions" | "summary" | "analytics"
  >("transactions");
  const [exportFormat, setExportFormat] = useState<string>("pdf");

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo((): Transaction[] => {
    let filtered = [...mockWallet7Data.transactions];

    // Date range filter
    if (filters.dateRange !== "all") {
      const today = new Date();
      let startDate = new Date();

      switch (filters.dateRange) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "quarter":
          startDate.setMonth(today.getMonth() - 3);
          break;
        case "year":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        case "custom":
          if (filters.startDate && filters.endDate) {
            filtered = filtered.filter((t) => {
              const transactionDate = new Date(t.date);
              return (
                transactionDate >= new Date(filters.startDate) &&
                transactionDate <= new Date(filters.endDate)
              );
            });
          }
          break;
      }

      if (filters.dateRange !== "custom") {
        filtered = filtered.filter((t) => new Date(t.date) >= startDate);
      }
    }

    // Other filters
    if (filters.groupId !== "all") {
      filtered = filtered.filter((t) => t.groupId === filters.groupId);
    }
    if (filters.member !== "all") {
      filtered = filtered.filter((t) => t.member === filters.member);
    }
    if (filters.transactionType !== "all") {
      filtered = filtered.filter((t) => t.type === filters.transactionType);
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status);
    }
    if (filters.round !== "all") {
      filtered = filtered.filter((t) => t.round === parseInt(filters.round));
    }
    if (filters.method !== "all") {
      filtered = filtered.filter((t) => t.method === filters.method);
    }

    return filtered;
  }, [filters]);

  // Calculate summary statistics with proper typing
  const summaryStats: SummaryStats = useMemo(() => {
    const totalTransactions = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const totalContributions = filteredTransactions
      .filter((t) => t.type === "Contribution")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalPayouts = filteredTransactions
      .filter((t) => t.type === "Payout")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalFees = filteredTransactions
      .filter((t) => t.type === "Late Fee")
      .reduce((sum, t) => sum + t.amount, 0);
    const paidTransactions = filteredTransactions.filter(
      (t) => t.status === "Paid" || t.status === "Completed"
    ).length;
    const pendingTransactions = filteredTransactions.filter(
      (t) => t.status === "Pending"
    ).length;
    const overdueTransactions = filteredTransactions.filter(
      (t) => t.status === "Overdue"
    ).length;

    const collectionRate =
      totalTransactions > 0
        ? ((paidTransactions / totalTransactions) * 100).toFixed(1)
        : "0";

    return {
      totalTransactions,
      totalAmount,
      totalContributions,
      totalPayouts,
      totalFees,
      paidTransactions,
      pendingTransactions,
      overdueTransactions,
      collectionRate,
    };
  }, [filteredTransactions]);

  // Helper function to calculate top performers
  const topPerformers = useMemo(() => {
    const memberContributions: Record<string, number> = {};

    filteredTransactions.forEach((transaction) => {
      if (
        transaction.type === "Contribution" &&
        transaction.status === "Paid"
      ) {
        memberContributions[transaction.member] =
          (memberContributions[transaction.member] || 0) + 1;
      }
    });

    return Object.entries(memberContributions)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5);
  }, [filteredTransactions]);

  const handleFilterChange = (key: keyof FilterState, value: string): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = (): void => {
    setFilters({
      dateRange: "all",
      groupId: "all",
      member: "all",
      transactionType: "all",
      status: "all",
      round: "all",
      method: "all",
      startDate: "",
      endDate: "",
    });
  };

  const handleExport = (): void => {
    console.log(`Exporting Wallet7 report in ${exportFormat} format`);
    // Implementation for export functionality
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
            Wallet7 Reports & Ledger
          </h1>
          <p className="text-gray-600">
            Comprehensive transaction tracking and member activity reports
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pdf">Export PDF</option>
            <option value="excel">Export Excel</option>
            <option value="csv">Export CSV</option>
          </select>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            📄 Export
          </button>
        </div>
      </motion.div>

      {/* View Mode Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b border-gray-200"
      >
        <nav className="flex space-x-8">
          {[
            { id: "transactions", name: "All Transactions", icon: "📋" },
            { id: "summary", name: "Summary", icon: "📊" },
            { id: "analytics", name: "Analytics", icon: "📈" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setViewMode(tab.id as "transactions" | "summary" | "analytics")
              }
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === tab.id
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

      {/* Advanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter Transactions
          </h2>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet7 Group
            </label>
            <select
              value={filters.groupId}
              onChange={(e) => handleFilterChange("groupId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Groups</option>
              {mockWallet7Data.groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Member Filter */}
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
              {mockWallet7Data.members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              value={filters.transactionType}
              onChange={(e) =>
                handleFilterChange("transactionType", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Contribution">Contributions</option>
              <option value="Payout">Payouts</option>
              <option value="Late Fee">Late Fees</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
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
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Round Filter */}
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

          {/* Payment Method Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={filters.method}
              onChange={(e) => handleFilterChange("method", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Methods</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Custom Date Range */}
        {filters.dateRange === "custom" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-600">
                {summaryStats.totalTransactions}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{summaryStats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
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

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending/Overdue</p>
              <p className="text-2xl font-bold text-orange-600">
                {summaryStats.pendingTransactions +
                  summaryStats.overdueTransactions}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">⏰</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        {viewMode === "transactions" && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction History ({filteredTransactions.length} records)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Round
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.groupName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.member}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.type === "Contribution"
                                ? "bg-blue-100 text-blue-800"
                                : transaction.type === "Payout"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.round}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === "Paid" ||
                              transaction.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
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
                          <span className="text-4xl mb-2">📋</span>
                          <p className="text-lg font-medium">
                            No transactions found
                          </p>
                          <p className="text-sm">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === "summary" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Financial Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Total Contributions:</span>
                    <span className="font-semibold text-green-600">
                      ₹{summaryStats.totalContributions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Total Payouts:</span>
                    <span className="font-semibold text-blue-600">
                      ₹{summaryStats.totalPayouts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Late Fees Collected:</span>
                    <span className="font-semibold text-orange-600">
                      ₹{summaryStats.totalFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b font-semibold">
                    <span className="text-gray-900">Net Amount:</span>
                    <span className="text-gray-900">
                      ₹
                      {(
                        summaryStats.totalContributions +
                        summaryStats.totalFees -
                        summaryStats.totalPayouts
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transaction Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">
                      Completed Transactions:
                    </span>
                    <span className="font-semibold text-green-600">
                      {summaryStats.paidTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Pending Transactions:</span>
                    <span className="font-semibold text-yellow-600">
                      {summaryStats.pendingTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Overdue Transactions:</span>
                    <span className="font-semibold text-red-600">
                      {summaryStats.overdueTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b font-semibold">
                    <span className="text-gray-900">Collection Rate:</span>
                    <span className="text-gray-900">
                      {summaryStats.collectionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "analytics" && (
          <div className="p-6 space-y-8">
            {/* Analytics Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                📊 Wallet7 Analytics Dashboard
              </h2>
              <p className="text-gray-600">
                Visual insights into your Wallet7 groups performance and trends
              </p>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Monthly Growth
                    </p>
                    <p className="text-3xl font-bold text-blue-800">+12.5%</p>
                    <p className="text-xs text-blue-600">vs last month</p>
                  </div>
                  <div className="text-4xl">📈</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-green-800">
                      {summaryStats.collectionRate}%
                    </p>
                    <p className="text-xs text-green-600">
                      collection efficiency
                    </p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Active Members
                    </p>
                    <p className="text-3xl font-bold text-purple-800">
                      {mockWallet7Data.members.length}
                    </p>
                    <p className="text-xs text-purple-600">across all groups</p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Avg. Response
                    </p>
                    <p className="text-3xl font-bold text-orange-800">2.1</p>
                    <p className="text-xs text-orange-600">days to payment</p>
                  </div>
                  <div className="text-4xl">⚡</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trends Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    📈 Monthly Trends
                  </h3>
                  <select className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                  </select>
                </div>

                <div className="h-80">
                  {/* Simulated Line Chart */}
                  <div className="relative h-full bg-gray-50 rounded-lg p-4">
                    <div className="absolute inset-4">
                      <div className="h-full border-l-2 border-b-2 border-gray-300 relative">
                        {/* Y-axis labels */}
                        <div className="absolute -left-12 top-0 text-xs text-gray-500">
                          ₹60K
                        </div>
                        <div className="absolute -left-12 top-1/4 text-xs text-gray-500">
                          ₹45K
                        </div>
                        <div className="absolute -left-12 top-1/2 text-xs text-gray-500">
                          ₹30K
                        </div>
                        <div className="absolute -left-12 top-3/4 text-xs text-gray-500">
                          ₹15K
                        </div>
                        <div className="absolute -left-8 bottom-0 text-xs text-gray-500">
                          ₹0
                        </div>

                        {/* X-axis labels */}
                        <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
                          Apr
                        </div>
                        <div className="absolute -bottom-8 left-1/6 text-xs text-gray-500">
                          May
                        </div>
                        <div className="absolute -bottom-8 left-2/6 text-xs text-gray-500">
                          Jun
                        </div>
                        <div className="absolute -bottom-8 left-3/6 text-xs text-gray-500">
                          Jul
                        </div>
                        <div className="absolute -bottom-8 left-4/6 text-xs text-gray-500">
                          Aug
                        </div>
                        <div className="absolute -bottom-8 left-5/6 text-xs text-gray-500">
                          Sep
                        </div>

                        {/* Simulated trend lines */}
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <polyline
                            points="0,60 20,45 40,50 60,35 80,25 100,70"
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="0.8"
                            className="drop-shadow-sm"
                          />
                          <polyline
                            points="0,70 20,55 40,60 60,45 80,40 100,85"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="0.8"
                            className="drop-shadow-sm"
                          />

                          {/* Data points */}
                          <circle cx="0" cy="60" r="1" fill="#34d399" />
                          <circle cx="20" cy="45" r="1" fill="#34d399" />
                          <circle cx="40" cy="50" r="1" fill="#34d399" />
                          <circle cx="60" cy="35" r="1" fill="#34d399" />
                          <circle cx="80" cy="25" r="1" fill="#34d399" />
                          <circle cx="100" cy="70" r="1" fill="#34d399" />

                          <circle cx="0" cy="70" r="1" fill="#3b82f6" />
                          <circle cx="20" cy="55" r="1" fill="#3b82f6" />
                          <circle cx="40" cy="60" r="1" fill="#3b82f6" />
                          <circle cx="60" cy="45" r="1" fill="#3b82f6" />
                          <circle cx="80" cy="40" r="1" fill="#3b82f6" />
                          <circle cx="100" cy="85" r="1" fill="#3b82f6" />
                        </svg>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          Contributions
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">Payouts</span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-4 right-4">
                      <p className="text-center text-xs text-gray-500">
                        Interactive line chart showing monthly financial trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group Performance Bar Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  🏆 Group Performance
                </h3>

                <div className="space-y-4">
                  {mockWallet7Data.groups.map((group, index) => {
                    const performance = [95, 100, 88][index]; // Mock performance data
                    return (
                      <div key={group.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {group.name}
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {performance}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          <div
                            className={`h-4 rounded-full transition-all duration-1000 ${
                              performance >= 95
                                ? "bg-gradient-to-r from-green-400 to-green-500"
                                : performance >= 90
                                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                  : "bg-gradient-to-r from-red-400 to-red-500"
                            }`}
                            style={{ width: `${performance}%` }}
                          >
                            <div className="h-full bg-white bg-opacity-20 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{group.members} members</span>
                          <span>
                            ₹
                            {(
                              (group.contributionAmount * group.members) /
                              1000
                            ).toFixed(0)}
                            K pool
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 text-center">
                    🎯 Average group performance: 94.3% - Excellent results!
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods & Member Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Methods Distribution */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  💳 Payment Methods
                </h3>

                <div className="relative">
                  {/* Donut Chart Simulation */}
                  <div className="w-40 h-40 mx-auto mb-6 relative">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                      />

                      {/* UPI - 45% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        strokeDasharray="84.78 188.4"
                        strokeDashoffset="0"
                      />

                      {/* Cash - 35% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="12"
                        strokeDasharray="65.94 188.4"
                        strokeDashoffset="-84.78"
                      />

                      {/* Bank Transfer - 20% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="12"
                        strokeDasharray="37.68 188.4"
                        strokeDashoffset="-150.72"
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          100%
                        </div>
                        <div className="text-xs text-gray-500">Coverage</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">UPI</span>
                      </div>
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Cash</span>
                      </div>
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Bank Transfer
                        </span>
                      </div>
                      <span className="text-sm font-semibold">20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Performing Members - Fixed */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  ⭐ Top Performers
                </h3>

                <div className="space-y-4">
                  {topPerformers.length > 0 ? (
                    topPerformers.map(([member, count], index) => (
                      <div
                        key={member}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                  ? "bg-gray-400"
                                  : index === 2
                                    ? "bg-orange-600"
                                    : "bg-blue-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {member}
                            </div>
                            <div className="text-xs text-gray-500">
                              {count} contributions
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-600">
                            100%
                          </div>
                          <div className="text-xs text-gray-500">
                            reliability
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-sm">No performance data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Wallet7 Health Score */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  🏥 Wallet7 Health
                </h3>

                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray={`${92 * 2.199} 219.9`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        92
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-medium text-gray-700">
                    Excellent Health
                  </div>
                  <div className="text-sm text-gray-500">
                    Overall platform score
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Collection Rate
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${summaryStats.collectionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {summaryStats.collectionRate}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Member Retention
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Group Activity
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 text-center">
                    🎉 Platform performing excellently! All metrics above
                    target.
                  </p>
                </div>
              </div>
            </div>

            {/* Insights and Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                💡 AI-Powered Insights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Performance Insight
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your collection rate improved by 5% this quarter. The
                        "Business Investment Group" leads with 100% collection
                        efficiency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Growth Opportunity
                      </h4>
                      <p className="text-sm text-gray-600">
                        Consider creating 2 more groups this quarter. High
                        member satisfaction (96%) indicates strong growth
                        potential.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Areas to Watch
                      </h4>
                      <p className="text-sm text-gray-600">
                        "Community Development Fund" shows 88% collection rate.
                        Consider personalized reminders to boost engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                🚀 Quick Actions
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    📋
                  </div>
                  <div className="text-sm font-medium text-blue-800">
                    Generate Report
                  </div>
                </button>

                <button className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    Add New Group
                  </div>
                </button>

                <button className="p-4 text-center bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    📧
                  </div>
                  <div className="text-sm font-medium text-orange-800">
                    Send Reminders
                  </div>
                </button>

                <button className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    ⚙️
                  </div>
                  <div className="text-sm font-medium text-purple-800">
                    Group Settings
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
