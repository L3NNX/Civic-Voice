import { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TopbarProps {
  onLogout: () => void;
}

export function Topbar({ onLogout }: TopbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-slate-700/50 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search issues, departments..."
              className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-600/50 rounded-2xl text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-lg transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-slate-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-slate-300" />
            )}
          </button>

          <div className="relative">
            <button className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
                3
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-lg hover:shadow-xl"
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
              <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-600/50 py-2 z-50 overflow-hidden">
                <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  View Profile
                </a>
                <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  Settings
                </a>
                <hr className="border-gray-200/50 dark:border-gray-700/50 my-2" />
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
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