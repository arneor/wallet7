// src/app/admin/settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Language Configuration
const availableLanguages = [
  {
    code: "en",
    label: "English",
    nativeName: "English",
    flag: "🇮🇳",
    region: "India",
    speakers: "125M",
  },
  {
    code: "ml",
    label: "Malayalam (മലയാളം)",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
    region: "Kerala",
    speakers: "35M",
  },
  {
    code: "ta",
    label: "Tamil (தமிழ்)",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    region: "Tamil Nadu",
    speakers: "78M",
  },
  {
    code: "te",
    label: "Telugu (తెలుగు)",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    region: "Andhra Pradesh",
    speakers: "96M",
  },
  {
    code: "kn",
    label: "Kannada (ಕನ್ನಡ)",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    region: "Karnataka",
    speakers: "44M",
  },
  {
    code: "hi",
    label: "Hindi (हिंदी)",
    nativeName: "हिंदी",
    flag: "🇮🇳",
    region: "Hindi Belt",
    speakers: "602M",
  },
  {
    code: "mr",
    label: "Marathi (मराठी)",
    nativeName: "मराठी",
    flag: "🇮🇳",
    region: "Maharashtra",
    speakers: "83M",
  },
  {
    code: "gu",
    label: "Gujarati (ગુજરાતી)",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    region: "Gujarat",
    speakers: "56M",
  },
  {
    code: "bn",
    label: "Bengali (বাংলা)",
    nativeName: "বাংলা",
    flag: "🇮🇳",
    region: "West Bengal",
    speakers: "103M",
  },
];

// Regional Settings Configuration
const regionalSettings = {
  en: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  ml: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  ta: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  te: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  kn: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  hi: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  mr: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  gu: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
  bn: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    timezone: "Asia/Kolkata",
    phoneCode: "+91",
  },
};

// TypeScript Interfaces
interface GeneralSettings {
  organizationName: string;
  currency: string;
  defaultContributionAmount: string;
  timezone: string;
  language: string;
  dateFormat: string;
  numberFormat: string;
  phoneFormat: string;
}

interface GroupSettings {
  defaultGroupSize: string;
  defaultRoundDuration: string;
  allowPartialContributions: boolean;
  autoCalculateDividend: boolean;
  requireMemberAgreement: boolean;
  maxGroupsPerAdmin: string;
  gracePeriodDays: string;
  enableGroupChat: boolean;
  allowMemberInvites: boolean;
}

interface MemberSettings {
  requireKYCVerification: boolean;
  allowMemberDataExport: boolean;
  enableMemberProfiles: boolean;
  trackContributionHistory: boolean;
  enableMemberRatings: boolean;
}

interface NotificationSettings {
  enableAutoReminders: boolean;
  reminderDaysBefore: string;
  enableContributionConfirmations: boolean;
  enablePayoutNotifications: boolean;
  enableGroupUpdates: boolean;
  preferredNotificationMethod: string;
  whatsappIntegration: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface SecuritySettings {
  requireTwoFactorAuth: boolean;
  sessionTimeoutMinutes: string;
  enableAuditLog: boolean;
  dataRetentionMonths: string;
  enableDataEncryption: boolean;
}

interface ComplianceSettings {
  enableRecordKeeping: boolean;
  requireGroupAgreements: boolean;
  enableRegularAudits: boolean;
  complianceReportingFrequency: string;
  enableDataBackup: boolean;
}

// Language Selector Component
const LanguageSelector: React.FC<{
  value: string;
  onChange: (language: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLanguages = availableLanguages.filter(
    (lang) =>
      lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLanguage = availableLanguages.find(
    (lang) => lang.code === value
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center space-x-3">
          <span className="text-xl">{selectedLanguage?.flag}</span>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {selectedLanguage?.label || "Select Language"}
            </div>
            <div className="text-xs text-gray-500">
              {selectedLanguage?.region} • {selectedLanguage?.speakers} speakers
            </div>
          </div>
        </span>
        <span className="text-gray-400">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-96 overflow-hidden">
          <div className="p-3 border-b bg-gray-50">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 border-b border-gray-100 transition-colors ${
                  value === lang.code ? "bg-blue-100 border-blue-200" : ""
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {lang.label}
                    </span>
                    {value === lang.code && (
                      <span className="text-blue-600 font-bold">✓</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lang.speakers} speakers
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    {lang.nativeName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    | "general"
    | "groups"
    | "members"
    | "notifications"
    | "security"
    | "compliance"
  >("general");
  const [hasChanges, setHasChanges] = useState(false);

  // Settings State
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    organizationName: "WALLET7 Management Hub",
    currency: "INR",
    defaultContributionAmount: "5000",
    timezone: "Asia/Kolkata",
    language: "en",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "indian",
    phoneFormat: "+91-XXXXX-XXXXX",
  });

  const [groupSettings, setGroupSettings] = useState<GroupSettings>({
    defaultGroupSize: "10",
    defaultRoundDuration: "monthly",
    allowPartialContributions: true,
    autoCalculateDividend: true,
    requireMemberAgreement: true,
    maxGroupsPerAdmin: "5",
    gracePeriodDays: "3",
    enableGroupChat: true,
    allowMemberInvites: true,
  });

  const [memberSettings, setMemberSettings] = useState<MemberSettings>({
    requireKYCVerification: true,
    allowMemberDataExport: true,
    enableMemberProfiles: true,
    trackContributionHistory: true,
    enableMemberRatings: false,
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      enableAutoReminders: true,
      reminderDaysBefore: "3",
      enableContributionConfirmations: true,
      enablePayoutNotifications: true,
      enableGroupUpdates: true,
      preferredNotificationMethod: "WhatsApp",
      whatsappIntegration: true,
      emailNotifications: true,
      smsNotifications: true,
    });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    requireTwoFactorAuth: false,
    sessionTimeoutMinutes: "120",
    enableAuditLog: true,
    dataRetentionMonths: "60",
    enableDataEncryption: true,
  });

  const [complianceSettings, setComplianceSettings] =
    useState<ComplianceSettings>({
      enableRecordKeeping: true,
      requireGroupAgreements: true,
      enableRegularAudits: false,
      complianceReportingFrequency: "quarterly",
      enableDataBackup: true,
    });

  // Auto-update settings when language changes
  useEffect(() => {
    const selectedLangSettings =
      regionalSettings[
        generalSettings.language as keyof typeof regionalSettings
      ];
    if (selectedLangSettings) {
      setGeneralSettings((prev) => ({
        ...prev,
        currency: selectedLangSettings.currency,
        dateFormat: selectedLangSettings.dateFormat,
        timezone: selectedLangSettings.timezone,
        phoneFormat: `${selectedLangSettings.phoneCode}-XXXXX-XXXXX`,
      }));
    }
  }, [generalSettings.language]);

  const handleGeneralChange = (
    key: keyof GeneralSettings,
    value: string | boolean
  ) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleGroupChange = (
    key: keyof GroupSettings,
    value: string | boolean
  ) => {
    setGroupSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleMemberChange = (
    key: keyof MemberSettings,
    value: string | boolean
  ) => {
    setMemberSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: string | boolean
  ) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSecurityChange = (
    key: keyof SecuritySettings,
    value: string | boolean
  ) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleComplianceChange = (
    key: keyof ComplianceSettings,
    value: string | boolean
  ) => {
    setComplianceSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log("Saving all settings:", {
      general: generalSettings,
      groups: groupSettings,
      members: memberSettings,
      notifications: notificationSettings,
      security: securitySettings,
      compliance: complianceSettings,
    });
    setHasChanges(false);
    alert("Settings saved successfully! 🎉");
  };

  const resetToDefaults = () => {
    if (
      confirm("Are you sure you want to reset all settings to default values?")
    ) {
      setGeneralSettings({
        organizationName: "WALLET7 Management Hub",
        currency: "INR",
        defaultContributionAmount: "5000",
        timezone: "Asia/Kolkata",
        language: "en",
        dateFormat: "DD/MM/YYYY",
        numberFormat: "indian",
        phoneFormat: "+91-XXXXX-XXXXX",
      });
      setHasChanges(true);
    }
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "groups", name: "Group Management", icon: "👥" },
    { id: "members", name: "Member Management", icon: "👤" },
    { id: "notifications", name: "Notifications", icon: "📢" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "compliance", name: "Compliance", icon: "📋" },
  ];

  const selectedLanguage = availableLanguages.find(
    (lang) => lang.code === generalSettings.language
  );

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
            ⚙️ WALLET7 Management Settings
          </h1>
          <p className="text-gray-600">
            Configure your WALLET7 group management platform preferences and
            rules
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
              <span>{selectedLanguage?.flag}</span>
              <span>{selectedLanguage?.nativeName}</span>
            </span>
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
              <span>🏢</span>
              <span>Management Only</span>
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetToDefaults}
            className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              hasChanges
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {hasChanges ? "💾 Save Changes" : "✅ All Saved"}
          </button>
        </div>
      </motion.div>

      {/* Settings Navigation */}
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
              </span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Settings Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-6"
      >
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                General Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Basic configuration for your WALLET7 management platform
              </p>
            </div>

            {/* Language & Regional Settings */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <span>🌍</span>
                <span>Language & Regional Settings</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Platform Language
                  </label>
                  <LanguageSelector
                    value={generalSettings.language}
                    onChange={(lang) => handleGeneralChange("language", lang)}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Interface language for the management platform
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={(e) =>
                      handleGeneralChange("dateFormat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DD/MM/YYYY">
                      DD/MM/YYYY (Indian format)
                    </option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US format)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO format)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number Format
                  </label>
                  <select
                    value={generalSettings.numberFormat}
                    onChange={(e) =>
                      handleGeneralChange("numberFormat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="indian">
                      1,00,000 (Indian Lakh system)
                    </option>
                    <option value="international">
                      100,000 (International)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Format
                  </label>
                  <input
                    type="text"
                    value={generalSettings.phoneFormat}
                    onChange={(e) =>
                      handleGeneralChange("phoneFormat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91-XXXXX-XXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Basic Organization Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={generalSettings.organizationName}
                  onChange={(e) =>
                    handleGeneralChange("organizationName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your WALLET7 organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Currency
                </label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) =>
                    handleGeneralChange("currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Contribution Amount
                </label>
                <input
                  type="number"
                  value={generalSettings.defaultContributionAmount}
                  onChange={(e) =>
                    handleGeneralChange(
                      "defaultContributionAmount",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="100"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Default amount for new groups
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) =>
                    handleGeneralChange("timezone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Mumbai">Asia/Mumbai (IST)</option>
                  <option value="Asia/Delhi">Asia/Delhi (IST)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Group Management Settings */}
        {activeTab === "groups" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Group Management Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Configure default rules and policies for WALLET7 groups
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Group Size
                </label>
                <input
                  type="number"
                  value={groupSettings.defaultGroupSize}
                  onChange={(e) =>
                    handleGroupChange("defaultGroupSize", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="3"
                  max="50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 8-15 members
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Round Duration
                </label>
                <select
                  value={groupSettings.defaultRoundDuration}
                  onChange={(e) =>
                    handleGroupChange("defaultRoundDuration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Groups per Admin
                </label>
                <input
                  type="number"
                  value={groupSettings.maxGroupsPerAdmin}
                  onChange={(e) =>
                    handleGroupChange("maxGroupsPerAdmin", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grace Period (Days)
                </label>
                <input
                  type="number"
                  value={groupSettings.gracePeriodDays}
                  onChange={(e) =>
                    handleGroupChange("gracePeriodDays", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="15"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Days after due date for contributions
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Group Policies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupSettings.allowPartialContributions}
                    onChange={(e) =>
                      handleGroupChange(
                        "allowPartialContributions",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Allow Partial Contributions
                    </div>
                    <div className="text-xs text-gray-500">
                      Members can contribute in installments
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupSettings.autoCalculateDividend}
                    onChange={(e) =>
                      handleGroupChange(
                        "autoCalculateDividend",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Auto-Calculate Dividend
                    </div>
                    <div className="text-xs text-gray-500">
                      Automatically calculate surplus distribution
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupSettings.requireMemberAgreement}
                    onChange={(e) =>
                      handleGroupChange(
                        "requireMemberAgreement",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Require Member Agreement
                    </div>
                    <div className="text-xs text-gray-500">
                      Members must accept group terms
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupSettings.enableGroupChat}
                    onChange={(e) =>
                      handleGroupChange("enableGroupChat", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Group Chat
                    </div>
                    <div className="text-xs text-gray-500">
                      Allow members to communicate in groups
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupSettings.allowMemberInvites}
                    onChange={(e) =>
                      handleGroupChange("allowMemberInvites", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Allow Member Invites
                    </div>
                    <div className="text-xs text-gray-500">
                      Members can invite others to join groups
                    </div>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Member Management Settings */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Member Management Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Configure member policies and data management
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Member Policies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={memberSettings.requireKYCVerification}
                    onChange={(e) =>
                      handleMemberChange(
                        "requireKYCVerification",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Require KYC Verification
                    </div>
                    <div className="text-xs text-gray-500">
                      Verify member identity documents
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={memberSettings.allowMemberDataExport}
                    onChange={(e) =>
                      handleMemberChange(
                        "allowMemberDataExport",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Allow Member Data Export
                    </div>
                    <div className="text-xs text-gray-500">
                      Members can download their data
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={memberSettings.enableMemberProfiles}
                    onChange={(e) =>
                      handleMemberChange(
                        "enableMemberProfiles",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Member Profiles
                    </div>
                    <div className="text-xs text-gray-500">
                      Members can create detailed profiles
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={memberSettings.trackContributionHistory}
                    onChange={(e) =>
                      handleMemberChange(
                        "trackContributionHistory",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Track Contribution History
                    </div>
                    <div className="text-xs text-gray-500">
                      Maintain detailed contribution records
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={memberSettings.enableMemberRatings}
                    onChange={(e) =>
                      handleMemberChange(
                        "enableMemberRatings",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Member Ratings
                    </div>
                    <div className="text-xs text-gray-500">
                      Members can rate each other's reliability
                    </div>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Communication & Notifications
              </h2>
              <p className="text-gray-600 mb-6">
                Configure automated reminders and member communications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Days Before Due Date
                </label>
                <input
                  type="number"
                  value={notificationSettings.reminderDaysBefore}
                  onChange={(e) =>
                    handleNotificationChange(
                      "reminderDaysBefore",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Notification Method
                </label>
                <select
                  value={notificationSettings.preferredNotificationMethod}
                  onChange={(e) =>
                    handleNotificationChange(
                      "preferredNotificationMethod",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="SMS">SMS</option>
                  <option value="Email">Email</option>
                  <option value="Push Notification">Push Notification</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Types
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enableAutoReminders}
                    onChange={(e) =>
                      handleNotificationChange(
                        "enableAutoReminders",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Automatic Contribution Reminders
                    </div>
                    <div className="text-xs text-gray-500">
                      Send reminders before due dates
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={
                      notificationSettings.enableContributionConfirmations
                    }
                    onChange={(e) =>
                      handleNotificationChange(
                        "enableContributionConfirmations",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Contribution Confirmations
                    </div>
                    <div className="text-xs text-gray-500">
                      Confirm when contributions are recorded
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enablePayoutNotifications}
                    onChange={(e) =>
                      handleNotificationChange(
                        "enablePayoutNotifications",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Payout Notifications
                    </div>
                    <div className="text-xs text-gray-500">
                      Notify members when it's their turn to receive
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enableGroupUpdates}
                    onChange={(e) =>
                      handleNotificationChange(
                        "enableGroupUpdates",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Group Updates
                    </div>
                    <div className="text-xs text-gray-500">
                      Send updates about group activities
                    </div>
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Communication Channels
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.whatsappIntegration}
                    onChange={(e) =>
                      handleNotificationChange(
                        "whatsappIntegration",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    💬 WhatsApp Integration
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      handleNotificationChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    📧 Email Notifications
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) =>
                      handleNotificationChange(
                        "smsNotifications",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    📱 SMS Notifications
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Security & Privacy
              </h2>
              <p className="text-gray-600 mb-6">
                Configure security policies for the management platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (Minutes)
                </label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeoutMinutes}
                  onChange={(e) =>
                    handleSecurityChange(
                      "sessionTimeoutMinutes",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="15"
                  max="480"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention Period (Months)
                </label>
                <input
                  type="number"
                  value={securitySettings.dataRetentionMonths}
                  onChange={(e) =>
                    handleSecurityChange("dataRetentionMonths", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="12"
                  max="120"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How long to keep completed group data
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Security Policies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={securitySettings.requireTwoFactorAuth}
                    onChange={(e) =>
                      handleSecurityChange(
                        "requireTwoFactorAuth",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Require Two-Factor Authentication
                    </div>
                    <div className="text-xs text-gray-500">
                      Enhanced security for admin accounts
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={securitySettings.enableAuditLog}
                    onChange={(e) =>
                      handleSecurityChange("enableAuditLog", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Audit Logging
                    </div>
                    <div className="text-xs text-gray-500">
                      Track all management activities
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={securitySettings.enableDataEncryption}
                    onChange={(e) =>
                      handleSecurityChange(
                        "enableDataEncryption",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Data Encryption
                    </div>
                    <div className="text-xs text-gray-500">
                      Encrypt sensitive member data
                    </div>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Settings */}
        {activeTab === "compliance" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Compliance & Record Keeping
              </h2>
              <p className="text-gray-600 mb-6">
                Configure compliance settings for proper record keeping
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reporting Frequency
                </label>
                <select
                  value={complianceSettings.complianceReportingFrequency}
                  onChange={(e) =>
                    handleComplianceChange(
                      "complianceReportingFrequency",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Compliance Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={complianceSettings.enableRecordKeeping}
                    onChange={(e) =>
                      handleComplianceChange(
                        "enableRecordKeeping",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Record Keeping
                    </div>
                    <div className="text-xs text-gray-500">
                      Maintain detailed records of all activities
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={complianceSettings.requireGroupAgreements}
                    onChange={(e) =>
                      handleComplianceChange(
                        "requireGroupAgreements",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Require Group Agreements
                    </div>
                    <div className="text-xs text-gray-500">
                      Members must sign group agreements
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={complianceSettings.enableRegularAudits}
                    onChange={(e) =>
                      handleComplianceChange(
                        "enableRegularAudits",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Regular Audits
                    </div>
                    <div className="text-xs text-gray-500">
                      Schedule periodic compliance audits
                    </div>
                  </span>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={complianceSettings.enableDataBackup}
                    onChange={(e) =>
                      handleComplianceChange(
                        "enableDataBackup",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Enable Data Backup
                    </div>
                    <div className="text-xs text-gray-500">
                      Automatic backup of all records
                    </div>
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="text-blue-600 text-2xl mr-4">📋</div>
                <div>
                  <h4 className="text-blue-900 font-medium">
                    WALLET7 Management Compliance
                  </h4>
                  <p className="text-blue-800 text-sm mt-2">
                    This management platform helps you maintain proper records
                    and documentation for your WALLET7 groups. It does not
                    process financial transactions but provides tools for
                    tracking contributions, managing group activities, and
                    maintaining compliance with local regulations.
                  </p>
                  <p className="text-blue-700 text-xs mt-3 italic">
                    Consult with legal experts for specific compliance
                    requirements in your jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Save Changes Warning */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50"
        >
          <div className="flex items-center space-x-3">
            <div className="text-yellow-600 text-xl">⚠️</div>
            <div>
              <p className="text-yellow-800 font-medium">
                You have unsaved changes
              </p>
              <p className="text-yellow-700 text-sm">
                Don't forget to save your settings!
              </p>
            </div>
            <button
              onClick={handleSaveSettings}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
            >
              Save Now
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
