import  { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TopbarProps {
  onLogout: () => void;
}

export function Topbar({ onLogout }: TopbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search issues, departments..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-slate-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-slate-300" />
            )}
          </button>

          <div className="relative">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:dark:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100"
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  admin@civic.gov
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                  View Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                  Settings
                </a>
                <hr className="border-gray-200 dark:border-gray-700" />
                    <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}