// src/app/admin/support/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// TypeScript Interfaces
interface SupportTicket {
  id: string;
  memberName: string;
  email: string;
  subject: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  lastUpdated: string;
  description: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  views: number;
}

interface SystemStatus {
  service: string;
  status: "Operational" | "Issues" | "Maintenance";
  lastChecked: string;
  uptime: string;
}

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState<
    "tickets" | "faq" | "resources" | "system"
  >("tickets");
  const [ticketFilter, setTicketFilter] = useState<
    "all" | "open" | "in-progress" | "resolved"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  // Mock data - replace with real data from your backend
  const supportTickets: SupportTicket[] = [
    {
      id: "TKT-001",
      memberName: "Rajesh Kumar",
      email: "rajesh@email.com",
      subject: "Unable to join group",
      category: "Group Management",
      priority: "High",
      status: "Open",
      createdAt: "2025-09-08T10:30:00Z",
      lastUpdated: "2025-09-08T10:30:00Z",
      description:
        "I'm getting an error when trying to join the Community Savings group. The error says 'Group is full' but I can see there are only 8 members.",
    },
    {
      id: "TKT-002",
      memberName: "Priya Nair",
      email: "priya@email.com",
      subject: "Contribution amount calculation issue",
      category: "Calculations",
      priority: "Medium",
      status: "In Progress",
      createdAt: "2025-09-07T15:45:00Z",
      lastUpdated: "2025-09-08T09:15:00Z",
      description:
        "The dividend calculation seems incorrect for our group. Can someone please verify the calculations?",
    },
    {
      id: "TKT-003",
      memberName: "Mohammed Ali",
      email: "mohammed@email.com",
      subject: "Profile picture not updating",
      category: "Profile",
      priority: "Low",
      status: "Resolved",
      createdAt: "2025-09-06T11:20:00Z",
      lastUpdated: "2025-09-07T14:30:00Z",
      description:
        "I uploaded a new profile picture but it's not showing up. Still showing the old one.",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: "faq-1",
      question: "How do I create a new ROSCA group?",
      answer:
        "To create a new ROSCA group: 1) Go to Groups > Create New Group 2) Fill in group details like name, contribution amount, and duration 3) Set group rules and policies 4) Invite members via email or share group code 5) Activate the group once you have enough members.",
      category: "Group Management",
      helpful: 45,
      views: 120,
    },
    {
      id: "faq-2",
      question: "How are payout turns decided?",
      answer:
        "Payout turns are decided based on the method selected when creating the group: 1) Random draw - system randomly selects each round 2) Bidding system - members bid for their preferred turn 3) Fixed order - predetermined sequence set by admin 4) Lottery system - fair randomization for each cycle.",
      category: "Payouts",
      helpful: 38,
      views: 95,
    },
    {
      id: "faq-3",
      question: "What happens if a member misses a contribution?",
      answer:
        "If a member misses a contribution: 1) They have a grace period (default 3 days) to make the contribution 2) Automatic reminders are sent during grace period 3) After grace period, the member is marked as defaulted 4) Group admin can decide on penalties or member removal 5) The group can continue with remaining active members.",
      category: "Contributions",
      helpful: 52,
      views: 140,
    },
    {
      id: "faq-4",
      question: "Is my data secure on this platform?",
      answer:
        "Yes, your data is secure: 1) All data is encrypted in transit and at rest 2) We use bank-level security protocols 3) Regular security audits are conducted 4) Member data is never shared with third parties 5) You can export or delete your data anytime 6) We comply with data protection regulations.",
      category: "Security",
      helpful: 67,
      views: 180,
    },
  ];

  const systemStatus: SystemStatus[] = [
    {
      service: "User Authentication",
      status: "Operational",
      lastChecked: "2 minutes ago",
      uptime: "99.9%",
    },
    {
      service: "Group Management",
      status: "Operational",
      lastChecked: "5 minutes ago",
      uptime: "99.8%",
    },
    {
      service: "Notifications",
      status: "Issues",
      lastChecked: "1 minute ago",
      uptime: "98.5%",
    },
    {
      service: "Data Backup",
      status: "Operational",
      lastChecked: "10 minutes ago",
      uptime: "100%",
    },
  ];

  const resources = [
    {
      title: "ROSCA Management Guide",
      description: "Complete guide on managing ROSCA groups effectively",
      type: "PDF",
      size: "2.5 MB",
      downloadUrl: "#",
    },
    {
      title: "Member Onboarding Checklist",
      description: "Step-by-step checklist for adding new members",
      type: "PDF",
      size: "1.2 MB",
      downloadUrl: "#",
    },
    {
      title: "Platform Tutorial Videos",
      description: "Video tutorials covering all platform features",
      type: "Video",
      size: "Series",
      downloadUrl: "#",
    },
    {
      title: "Troubleshooting Guide",
      description: "Common issues and their solutions",
      type: "PDF",
      size: "1.8 MB",
      downloadUrl: "#",
    },
  ];

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesFilter =
      ticketFilter === "all" ||
      (ticketFilter === "open" && ticket.status === "Open") ||
      (ticketFilter === "in-progress" && ticket.status === "In Progress") ||
      (ticketFilter === "resolved" && ticket.status === "Resolved");

    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600 bg-red-100";
      case "High":
        return "text-orange-600 bg-orange-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "text-red-600 bg-red-100";
      case "In Progress":
        return "text-blue-600 bg-blue-100";
      case "Resolved":
        return "text-green-600 bg-green-100";
      case "Closed":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "text-green-600 bg-green-100";
      case "Issues":
        return "text-yellow-600 bg-yellow-100";
      case "Maintenance":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const tabs = [
    {
      id: "tickets",
      name: "Support Tickets",
      icon: "🎫",
      count: supportTickets.length,
    },
    { id: "faq", name: "FAQ & Help", icon: "❓", count: faqs.length },
    { id: "resources", name: "Resources", icon: "📚", count: resources.length },
    {
      id: "system",
      name: "System Status",
      icon: "🔧",
      count: systemStatus.length,
    },
  ];

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
            🛠️ Support & Help Center
          </h1>
          <p className="text-gray-600">
            Manage support requests, help members, and monitor system health
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
              <span>✅</span>
              <span>System Operational</span>
            </span>
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
              <span>📞</span>
              <span>24/7 Support</span>
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowNewTicketForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📝 Create Ticket
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            📞 Contact Support
          </button>
        </div>
      </motion.div>

      {/* Support Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tab.count}
                </span>
              </span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Support Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-6"
      >
        {/* Support Tickets */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Support Tickets
                </h2>
                <p className="text-gray-600">
                  Manage member support requests and issues
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <select
                  value={ticketFilter}
                  onChange={(e) =>
                    setTicketFilter(e.target.value as typeof ticketFilter)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Tickets</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📭</div>
                  <p className="text-gray-500">No support tickets found</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {ticket.subject}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                          >
                            {ticket.priority}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>🆔 {ticket.id}</span>
                          <span>👤 {ticket.memberName}</span>
                          <span>📧 {ticket.email}</span>
                          <span>📂 {ticket.category}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            Created:{" "}
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Updated:{" "}
                            {new Date(ticket.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors">
                          View
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors">
                          Reply
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* FAQ & Help */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-6">
                Common questions and answers for ROSCA management
              </p>
            </div>

            {/* Quick Contact */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="text-blue-600 text-2xl">💬</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Need Immediate Help?
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Can't find what you're looking for? Our support team is here
                    to help you 24/7.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      💬 Live Chat
                    </button>
                    <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded text-sm hover:bg-blue-50 transition-colors">
                      📧 Email Support
                    </button>
                    <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded text-sm hover:bg-blue-50 transition-colors">
                      📞 Call Us: +91-9876543210
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">
                          {faq.answer}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {faq.category}
                          </span>
                          <span>👁️ {faq.views} views</span>
                          <span>👍 {faq.helpful} helpful</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-green-600 hover:bg-green-100 p-1 rounded">
                          👍
                        </button>
                        <button className="text-red-600 hover:bg-red-100 p-1 rounded">
                          👎
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resources & Documentation
              </h2>
              <p className="text-gray-600 mb-6">
                Download guides, tutorials, and documentation
              </p>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">
                      {resource.type === "PDF"
                        ? "📄"
                        : resource.type === "Video"
                          ? "🎥"
                          : "📚"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {resource.type}
                          </span>
                          <span>{resource.size}</span>
                        </div>
                        <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Additional Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎓</div>
                  <h4 className="font-medium text-gray-900">Training Videos</h4>
                  <p className="text-gray-600 text-sm">
                    Step-by-step tutorials
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <h4 className="font-medium text-gray-900">Community Forum</h4>
                  <p className="text-gray-600 text-sm">
                    Connect with other admins
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-medium text-gray-900">Best Practices</h4>
                  <p className="text-gray-600 text-sm">ROSCA management tips</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Status */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                System Status & Health
              </h2>
              <p className="text-gray-600 mb-6">
                Monitor platform health and service availability
              </p>
            </div>

            {/* Overall Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-green-600 text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold text-green-900">
                    All Systems Operational
                  </h3>
                  <p className="text-green-800 text-sm">
                    Platform is running smoothly with 99.8% uptime
                  </p>
                </div>
              </div>
            </div>

            {/* Service Status */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Service Status</h3>
              {systemStatus.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        service.status === "Operational"
                          ? "bg-green-500"
                          : service.status === "Issues"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {service.service}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Last checked: {service.lastChecked}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Uptime: {service.uptime}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSystemStatusColor(service.status)}`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* System Maintenance */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 text-xl">🔧</div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Scheduled Maintenance
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Next scheduled maintenance: Sunday, September 15, 2025 at
                    2:00 AM IST (Expected duration: 2 hours)
                  </p>
                  <p className="text-blue-700 text-xs">
                    We'll notify all users 24 hours before any scheduled
                    maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* New Ticket Form Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Create Support Ticket
              </h3>
              <button
                onClick={() => setShowNewTicketForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Group Management</option>
                  <option>Member Issues</option>
                  <option>Technical Support</option>
                  <option>Account Problems</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the issue..."
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTicketForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
