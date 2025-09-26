import React from 'react';
import { Bell, Shield, Database, Mail } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure system preferences and administration options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New Issue Alerts
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get notified when new issues are submitted
                </p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Status Updates
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Notifications for issue status changes
                </p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security
            </h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Change Password
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Update your account password
              </p>
            </button>
            
            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enable 2FA for enhanced security
              </p>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Database className="w-5 h-5 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data Management
            </h3>
          </div>
          
          <div className="space-y-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Export All Data
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Backup Database
            </button>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Mail className="w-5 h-5 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Email Configuration
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SMTP Server
              </label>
              <input
                type="text"
                placeholder="smtp.example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Port
              </label>
              <input
                type="number"
                placeholder="587"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}