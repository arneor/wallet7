'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'ROSCA Management',
    currency: 'USD',
    defaultContribution: '500',
    reminderDays: '3',
    autoReminders: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your ROSCA management preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Default Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            <div>
              <label htmlFor="defaultContribution" className="block text-sm font-medium text-gray-700 mb-2">
                Default Contribution Amount
              </label>
              <input
                type="number"
                id="defaultContribution"
                name="defaultContribution"
                value={settings.defaultContribution}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="reminderDays" className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Days Before Due Date
              </label>
              <input
                type="number"
                id="reminderDays"
                name="reminderDays"
                value={settings.reminderDays}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoReminders"
                  name="autoReminders"
                  checked={settings.autoReminders}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoReminders" className="ml-2 block text-sm text-gray-900">
                  Enable automatic reminders
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                  Email notifications
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                  SMS notifications
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
