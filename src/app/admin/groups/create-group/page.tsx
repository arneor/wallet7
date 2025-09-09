// src/app/admin/create-group/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  description: string;
  contributionAmount: string;
  frequency: string;
  totalMembers: string;
  totalRounds: string;
  startDate: string;
  payoutOrder: string;
  rules: {
    latePenalty: string;
    gracePeriod: string;
    minimumBid: string;
  };
}

export default function CreateGroupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    contributionAmount: "",
    frequency: "monthly",
    totalMembers: "",
    totalRounds: "",
    startDate: "",
    payoutOrder: "lottery",
    rules: {
      latePenalty: "100",
      gracePeriod: "3",
      minimumBid: "500",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle group creation logic here
      console.log("Creating chit fund group:", formData);
      router.push("/admin/groups");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("rules.")) {
      const ruleKey = name.split(".")[1] as keyof FormData["rules"];
      setFormData({
        ...formData,
        rules: {
          ...formData.rules,
          [ruleKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const steps = [
    {
      id: 1,
      name: "Basic Information",
      description: "Group details and structure",
    },
    {
      id: 2,
      name: "Financial Setup",
      description: "Contribution and payout settings",
    },
    {
      id: 3,
      name: "Rules & Policies",
      description: "Group rules and penalties",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Create New Chit Fund Group
        </h1>
        <p className="text-gray-600 mt-2">
          Set up a new chit fund group with customizable rules and settings
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    currentStep > step.id
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {steps[currentStep - 1].name}
          </h2>
          <p className="text-sm text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chit Fund Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Family Savings Circle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the purpose and goals of this chit fund group"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="totalMembers"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Members <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="totalMembers"
                    name="totalMembers"
                    value={formData.totalMembers}
                    onChange={handleChange}
                    min="3"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalRounds"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Rounds <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="totalRounds"
                    name="totalRounds"
                    value={formData.totalRounds}
                    onChange={handleChange}
                    min="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Usually equals the number of members
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Financial Setup */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contributionAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Monthly Contribution Amount (₹){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="contributionAmount"
                    name="contributionAmount"
                    value={formData.contributionAmount}
                    onChange={handleChange}
                    min="100"
                    step="100"
                    placeholder="e.g., 5000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contribution Frequency{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="payoutOrder"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Payout Order Method <span className="text-red-500">*</span>
                </label>
                <select
                  id="payoutOrder"
                  name="payoutOrder"
                  value={formData.payoutOrder}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lottery">Lottery System</option>
                  <option value="bidding">Bidding/Auction</option>
                  <option value="fixed">Fixed Order</option>
                </select>
              </div>

              {/* Total Pool Calculation */}
              {formData.contributionAmount && formData.totalMembers && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Pool Calculation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">Total Pool per Round:</p>
                      <p className="font-bold text-blue-900">
                        ₹
                        {(
                          parseInt(formData.contributionAmount) *
                          parseInt(formData.totalMembers)
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Total Fund Value:</p>
                      <p className="font-bold text-blue-900">
                        ₹
                        {(
                          parseInt(formData.contributionAmount) *
                          parseInt(formData.totalMembers) *
                          parseInt(formData.totalRounds || "0")
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Duration:</p>
                      <p className="font-bold text-blue-900">
                        {formData.totalRounds} {formData.frequency} periods
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Rules & Policies */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="rules.latePenalty"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Late Payment Penalty (₹)
                  </label>
                  <input
                    type="number"
                    id="rules.latePenalty"
                    name="rules.latePenalty"
                    value={formData.rules.latePenalty}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rules.gracePeriod"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Grace Period (Days)
                  </label>
                  <input
                    type="number"
                    id="rules.gracePeriod"
                    name="rules.gracePeriod"
                    value={formData.rules.gracePeriod}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {formData.payoutOrder === "bidding" && (
                <div>
                  <label
                    htmlFor="rules.minimumBid"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Minimum Bid Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="rules.minimumBid"
                    name="rules.minimumBid"
                    value={formData.rules.minimumBid}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">
                  📋 Compliance Note
                </h3>
                <p className="text-sm text-yellow-800">
                  This chit fund group will be created in accordance with the
                  Chit Funds Act, 1982. All members will need to digitally sign
                  the chit fund agreement before participating.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {currentStep === 3 ? "Create Chit Fund Group" : "Next Step"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
