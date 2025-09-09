// src/components/admin/QuickActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function QuickActions() {
  const actions = [
    {
      title: "Create New Group",
      description: "Start a new chit fund group",
      href: "/admin/groups/create",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Send Reminders",
      description: "Send payment reminders",
      href: "/admin/reminders",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM10.5 8.5L12 10l5-5M8 12V6a2 2 0 012-2h8a2 2 0 012 2v6"
          />
        </svg>
      ),
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "Generate Reports",
      description: "Export payment & ledger reports",
      href: "/admin/reports",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Member Management",
      description: "Add or manage members",
      href: "/admin/members",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div
                className={`${action.color} text-white p-4 rounded-lg transition-colors cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">{action.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-xs opacity-90 line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
