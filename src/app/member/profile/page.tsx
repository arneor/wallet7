// src/app/member/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  occupation: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    groupUpdates: boolean;
    paymentReminders: boolean;
    marketingEmails: boolean;
  };
  privacy: {
    profileVisibility: "public" | "members" | "private";
    showPhone: boolean;
    showAddress: boolean;
  };
}

type NotificationKey = keyof Profile["notifications"];
type PrivacyKey = keyof Profile["privacy"];

export default function MemberProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210", // Updated to Indian format
    address: "123 Main St, Mumbai, Maharashtra 400001", // Updated to Indian format
    dateOfBirth: "1985-06-15",
    occupation: "Software Engineer",
    notifications: {
      email: true,
      sms: false,
      push: true,
      groupUpdates: true,
      paymentReminders: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: "members",
      showPhone: true,
      showAddress: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Check if we're on desktop for section visibility
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Updating profile:", profile);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith("notifications.")) {
      const notificationKey = name.split(".")[1] as NotificationKey;
      setProfile({
        ...profile,
        notifications: {
          ...profile.notifications,
          [notificationKey]: checked,
        },
      });
    } else if (name.startsWith("privacy.")) {
      const privacyKey = name.split(".")[1] as PrivacyKey;
      setProfile({
        ...profile,
        privacy: {
          ...profile.privacy,
          [privacyKey]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your account information and preferences
          </p>
        </motion.div>

        {/* Success Message */}
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3"
          >
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-800 font-medium">
              Profile updated successfully!
            </p>
          </motion.div>
        )}

        {/* Mobile Section Tabs - Only visible on mobile */}
        <div className="lg:hidden">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                type="button"
              >
                <span role="img" aria-label={section.label}>
                  {section.icon}
                </span>
                <span className="hidden xs:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Full width on desktop, no sidebar */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            {(activeSection === "personal" || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span role="img" aria-label="Personal Information">
                        👤
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-6 border-b border-gray-100">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl sm:text-3xl text-white font-bold">
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <label
                        htmlFor="profilePicture"
                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Profile Picture
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Upload a professional photo. JPG, PNG formats, max 2MB.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("profilePicture")?.click()
                        }
                        className="text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Personal Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="occupation"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={profile.occupation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your profession"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter your complete address"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notification Preferences Section */}
            {(activeSection === "notifications" || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span role="img" aria-label="Notifications">
                        🔔
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Notification Preferences
                      </h2>
                      <p className="text-sm text-gray-600">
                        Choose how you want to be notified
                      </p>
                    </div>
                  </div>

                  <fieldset className="space-y-6">
                    <legend className="sr-only">
                      Notification preferences
                    </legend>

                    {/* Notification Methods */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">
                        Notification Methods
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "email",
                            label: "Email Notifications",
                            description: "Receive notifications via email",
                          },
                          {
                            key: "sms",
                            label: "SMS Notifications",
                            description:
                              "Receive text messages for urgent updates",
                          },
                          {
                            key: "push",
                            label: "Push Notifications",
                            description: "Browser and mobile app notifications",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center h-6 mt-1">
                              <input
                                type="checkbox"
                                id={`notifications.${item.key}`}
                                name={`notifications.${item.key}`}
                                checked={
                                  profile.notifications[
                                    item.key as NotificationKey
                                  ]
                                }
                                onChange={handleInputChange}
                                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <label
                                htmlFor={`notifications.${item.key}`}
                                className="block text-sm font-medium text-gray-900 cursor-pointer"
                              >
                                {item.label}
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notification Types */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">
                        What to notify about
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "groupUpdates",
                            label: "Group Updates",
                            description:
                              "New members, rule changes, announcements",
                          },
                          {
                            key: "paymentReminders",
                            label: "Contribution Reminders", // Updated terminology
                            description:
                              "Due dates, overdue contributions, confirmations",
                          },
                          {
                            key: "marketingEmails",
                            label: "Marketing & Promotions",
                            description:
                              "New features, tips, and promotional content",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center h-6 mt-1">
                              <input
                                type="checkbox"
                                id={`notifications.${item.key}`}
                                name={`notifications.${item.key}`}
                                checked={
                                  profile.notifications[
                                    item.key as NotificationKey
                                  ]
                                }
                                onChange={handleInputChange}
                                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <label
                                htmlFor={`notifications.${item.key}`}
                                className="block text-sm font-medium text-gray-900 cursor-pointer"
                              >
                                {item.label}
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </div>
              </motion.div>
            )}

            {/* Privacy Settings Section */}
            {(activeSection === "privacy" || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span role="img" aria-label="Privacy">
                        🔒
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Privacy Settings
                      </h2>
                      <p className="text-sm text-gray-600">
                        Control who can see your information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <label
                        htmlFor="privacy.profileVisibility"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Profile Visibility
                      </label>
                      <select
                        id="privacy.profileVisibility"
                        name="privacy.profileVisibility"
                        value={profile.privacy.profileVisibility}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="public">
                          Public - Anyone can see your profile
                        </option>
                        <option value="members">
                          Members Only - Only WALLET7 members can see
                        </option>
                        <option value="private">
                          Private - Only you can see your profile
                        </option>
                      </select>
                    </div>

                    {/* Information Visibility */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">
                        Information Visibility
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            key: "showPhone",
                            label: "Show Phone Number",
                            description:
                              "Other members can see your phone number",
                          },
                          {
                            key: "showAddress",
                            label: "Show Address",
                            description: "Other members can see your address",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center h-6 mt-1">
                              <input
                                type="checkbox"
                                id={`privacy.${item.key}`}
                                name={`privacy.${item.key}`}
                                checked={
                                  profile.privacy[
                                    item.key as keyof typeof profile.privacy
                                  ] as boolean
                                }
                                onChange={handleInputChange}
                                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <label
                                htmlFor={`privacy.${item.key}`}
                                className="block text-sm font-medium text-gray-900 cursor-pointer"
                              >
                                {item.label}
                              </label>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button - Sticky on Mobile */}
            <div className="sticky bottom-4 sm:static bg-white sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none shadow-lg sm:shadow-none border sm:border-0 border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
